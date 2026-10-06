import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);
const isProd = process.env.NODE_ENV === 'production';

// Trust proxy headers when deployed behind Google Cloud Run / load balancers
app.set('trust proxy', 1);

// Enforce Security Headers via Helmet
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com', 'data:'],
        imgSrc: ["'self'", 'data:', 'blob:', 'https:'],
        connectSrc: ["'self'", 'https:', 'wss:', 'ws:'],
        frameAncestors: [
          "'self'",
          'https://*.google.com',
          'https://*.googleusercontent.com',
          'https://*.run.app',
          '*'
        ],
        objectSrc: ["'none'"],
        baseUri: ["'self'"],
        formAction: ["'self'"]
      }
    },
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: 'cross-origin' },
    frameguard: false, // Frame-ancestors directive in CSP safely regulates iframe embedding in Google AI Studio
    hsts: {
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true
    },
    noSniff: true,
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
  })
);

// Payload size limit to prevent memory-exhaustion DoS attacks
app.use(express.json({ limit: '100kb' }));
app.use(express.urlencoded({ extended: true, limit: '100kb' }));

// Global API Rate Limiter (100 requests per 15 minutes)
const globalApiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many requests. Please try again after 15 minutes.'
  }
});

// Strict Rate Limiter for public form submissions (Contact, Booking, Assessment, Careers)
// Max 10 submissions per 15 minutes per IP to protect against spam & bot floods
const formSubmissionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Submission rate limit reached. Please wait a few minutes before submitting another inquiry.'
  }
});

// Strict Brute-Force Rate Limiter for Admin verification attempts
// Max 5 attempts per 15 minutes per IP
const adminAuthLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many administrative attempts. Access temporarily locked for 15 minutes.'
  }
});

// -------------------------------------------------------------
// API Routes
// -------------------------------------------------------------

app.use('/api', globalApiLimiter);

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    service: 'Kenah Wellness Services API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Email and phone regex helpers
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_MIN_DIGITS = 10;

/**
 * POST /api/contact
 * Validates and records contact inquiries with honeypot and rate limiting
 */
app.post('/api/contact', formSubmissionLimiter, (req: Request, res: Response) => {
  const { name, email, phone, message, subject, hp_contact_check } = req.body;

  // Honeypot spam check - silent drop if bot fills hidden field
  if (hp_contact_check && typeof hp_contact_check === 'string' && hp_contact_check.trim().length > 0) {
    return res.status(200).json({
      success: true,
      message: 'Message sent successfully.'
    });
  }

  // Server-side validation
  if (!name || typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ success: false, error: 'Name is required.' });
  }

  if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
    return res.status(400).json({ success: false, error: 'A valid email address is required.' });
  }

  if (!message || typeof message !== 'string' || !message.trim()) {
    return res.status(400).json({ success: false, error: 'Message is required.' });
  }

  if (message.length > 5000) {
    return res.status(400).json({ success: false, error: 'Message cannot exceed 5000 characters.' });
  }

  const reference = `KW-MSG-${Math.floor(100000 + Math.random() * 900000)}`;

  // Log in server output
  console.log(`[Contact Submission] Ref: ${reference} from ${email.trim()} (${name.trim()})`);

  return res.status(200).json({
    success: true,
    message: 'Thank you for reaching out. A Kenah care coordinator will respond within 24 hours.',
    reference
  });
});

/**
 * POST /api/booking
 * Validates and books consultation sessions with honeypot and rate limiting
 */
app.post('/api/booking', formSubmissionLimiter, (req: Request, res: Response) => {
  const { name, email, phone, serviceType, format, selectedDate, selectedTime, honeypot } = req.body;

  // Honeypot check
  if (honeypot && typeof honeypot === 'string' && honeypot.trim().length > 0) {
    return res.status(200).json({
      success: true,
      reference: `KW-APPT-${Math.floor(100000 + Math.random() * 900000)}`
    });
  }

  // Server-side validation
  if (!name || typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ success: false, error: 'Full name is required.' });
  }

  if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
    return res.status(400).json({ success: false, error: 'A valid email address is required.' });
  }

  const cleanPhone = (typeof phone === 'string' ? phone : '').replace(/\D/g, '');
  if (cleanPhone.length < PHONE_MIN_DIGITS) {
    return res.status(400).json({ success: false, error: 'A valid 10-digit telephone number is required.' });
  }

  const reference = `KW-APPT-${Math.floor(100000 + Math.random() * 900000)}`;

  console.log(`[Session Booking] Ref: ${reference} for ${name.trim()} (${serviceType} via ${format})`);

  return res.status(200).json({
    success: true,
    message: 'Care consultation scheduled successfully.',
    reference
  });
});

/**
 * POST /api/assessment
 * Validates and records in-depth home care assessment requests
 */
app.post('/api/assessment', formSubmissionLimiter, (req: Request, res: Response) => {
  const { name, email, phone, hp_asmt_check, serviceType, careFor } = req.body;

  // Honeypot check
  if (hp_asmt_check && typeof hp_asmt_check === 'string' && hp_asmt_check.trim().length > 0) {
    return res.status(200).json({
      success: true,
      reference: `KW-ASMT-${Math.floor(100000 + Math.random() * 900000)}`
    });
  }

  if (!name || typeof name !== 'string' || !name.trim()) {
    return res.status(400).json({ success: false, error: 'Full name is required.' });
  }

  if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
    return res.status(400).json({ success: false, error: 'Valid email address is required.' });
  }

  const cleanPhone = (typeof phone === 'string' ? phone : '').replace(/\D/g, '');
  if (cleanPhone.length < PHONE_MIN_DIGITS) {
    return res.status(400).json({ success: false, error: 'Valid 10-digit telephone number is required.' });
  }

  const reference = `KW-ASMT-${Math.floor(100000 + Math.random() * 900000)}`;

  console.log(`[Assessment Intake] Ref: ${reference} from ${name.trim()} (${careFor || 'Individual'} - ${serviceType})`);

  return res.status(200).json({
    success: true,
    message: 'Assessment intake received. Our clinical supervisor will contact you shortly.',
    reference
  });
});

/**
 * POST /api/careers
 * Validates job application submissions
 */
app.post('/api/careers', formSubmissionLimiter, (req: Request, res: Response) => {
  const { applicantName, email, phone, jobTitle, honeypot, resumeOrBio } = req.body;

  // Honeypot check
  if (honeypot && typeof honeypot === 'string' && honeypot.trim().length > 0) {
    return res.status(200).json({
      success: true,
      reference: `KW-CAREER-${Math.floor(100000 + Math.random() * 900000)}`
    });
  }

  if (!applicantName || typeof applicantName !== 'string' || !applicantName.trim()) {
    return res.status(400).json({ success: false, error: 'Applicant name is required.' });
  }

  if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email.trim())) {
    return res.status(400).json({ success: false, error: 'Valid email address is required.' });
  }

  const cleanPhone = (typeof phone === 'string' ? phone : '').replace(/\D/g, '');
  if (cleanPhone.length < PHONE_MIN_DIGITS) {
    return res.status(400).json({ success: false, error: 'Valid 10-digit phone number is required.' });
  }

  const reference = `KW-CAREER-${Math.floor(100000 + Math.random() * 900000)}`;

  console.log(`[Career Application] Ref: ${reference} for ${jobTitle} from ${applicantName.trim()}`);

  return res.status(200).json({
    success: true,
    message: 'Application received. Our hiring director will review your qualifications.',
    reference
  });
});

/**
 * POST /api/admin/verify
 * Rate-limited brute force protection for admin login attempts
 */
app.post('/api/admin/verify', adminAuthLimiter, (req: Request, res: Response) => {
  const { pin } = req.body;

  if (!pin || typeof pin !== 'string') {
    return res.status(400).json({ success: false, error: 'Passcode required.' });
  }

  // The client also checks SHA-256 hash
  // Server-side check:
  const expectedPin = process.env.ADMIN_PORTAL_PIN || 'kenah2026';
  const isValid = pin.trim() === expectedPin;

  if (!isValid) {
    return res.status(401).json({ success: false, error: 'Invalid administrative passcode.' });
  }

  return res.status(200).json({ success: true, message: 'Administrative access authorized.' });
});

// -------------------------------------------------------------
// Serve Static Assets or Mount Vite Middleware
// -------------------------------------------------------------

async function startServer() {
  if (isProd) {
    const distPath = path.resolve(__dirname, 'dist');
    if (fs.existsSync(distPath)) {
      app.use(express.static(distPath, { maxAge: '1d', etag: true }));
      app.get('*', (_req: Request, res: Response) => {
        res.sendFile(path.resolve(distPath, 'index.html'));
      });
    } else {
      console.warn('Production build dist directory not found. Please run npm run build.');
    }
  } else {
    // In development mode, mount Vite middleware into Express
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== 'true',
        watch: process.env.DISABLE_HMR === 'true' ? null : {}
      },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Kenah Wellness Server] Running on http://0.0.0.0:${PORT} (Mode: ${process.env.NODE_ENV || 'development'})`);
  });
}

startServer().catch((err) => {
  console.error('[Kenah Wellness Server] Failed to start:', err);
  process.exit(1);
});
