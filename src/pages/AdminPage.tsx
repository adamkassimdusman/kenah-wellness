import React, { useState, useEffect } from 'react';
import {
  Lock,
  Unlock,
  KeyRound,
  Plus,
  Trash2,
  Edit3,
  Check,
  Eye,
  ArrowLeft,
  Image as ImageIcon,
  BookOpen,
  Heart,
  ShieldCheck,
  LogOut,
  Upload,
  RefreshCw,
  Sparkles,
  ExternalLink,
  Save,
  X,
  Briefcase,
  FileText,
  Calendar,
  DollarSign,
  CheckCircle2,
  MapPin,
  User,
  Mail,
  Phone,
  AlertCircle,
  Filter,
  ChevronLeft,
  ChevronRight,
  Download,
  FileCheck2
} from 'lucide-react';
import { PageId, BlogPost, ServiceItem, AssessmentSubmission, JobPosting, JobApplication, UploadRequirement } from '../types';
import {
  getStoredBlogs,
  saveStoredBlogs,
  getStoredHomeCareServices,
  saveStoredHomeCareServices,
  getStoredOdpServices,
  saveStoredOdpServices,
  getStoredAssessments,
  saveStoredAssessments,
  updateAssessmentStatus,
  deleteAssessmentSubmission,
  getStoredJobs,
  saveStoredJobs,
  addStoredJob,
  updateStoredJob,
  deleteStoredJob,
  getStoredJobApplications,
  updateJobApplicationStatus,
  deleteJobApplication,
  isAdminAuthenticated,
  setAdminAuthenticated,
  verifyAdminCode,
  DATA_CHANGE_EVENT
} from '../utils/storage';
import { apiVerifyAdmin } from '../utils/api';

interface AdminPageProps {
  onNavigate: (page: PageId) => void;
  onSelectBlog: (post: BlogPost) => void;
  onSelectService: (service: ServiceItem) => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({
  onNavigate,
  onSelectBlog,
  onSelectService
}) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [pinCode, setPinCode] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<'assessments' | 'jobs' | 'applications' | 'blogs' | 'home-care' | 'odp'>('assessments');

  // Loaded Data
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [homeCareServices, setHomeCareServices] = useState<ServiceItem[]>([]);
  const [odpServices, setOdpServices] = useState<ServiceItem[]>([]);
  const [assessments, setAssessments] = useState<AssessmentSubmission[]>([]);
  const [jobs, setJobs] = useState<JobPosting[]>([]);
  const [jobApplications, setJobApplications] = useState<JobApplication[]>([]);

  // Assessment Management State
  const [selectedAssessment, setSelectedAssessment] = useState<AssessmentSubmission | null>(null);
  const [assessmentFilter, setAssessmentFilter] = useState<string>('all');

  // Sidebar Layout State (Left Collapsible)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);

  // Job Management State
  const [isJobModalOpen, setIsJobModalOpen] = useState<boolean>(false);
  const [editingJobId, setEditingJobId] = useState<string | null>(null);
  const [customUploadDocName, setCustomUploadDocName] = useState<string>('');
  const [jobForm, setJobForm] = useState<{
    title: string;
    department: string;
    location: string;
    type: JobPosting['type'];
    payRange: string;
    description: string;
    requirements: string;
    benefits: string;
    status: 'active' | 'closed';
    requiredUploads: UploadRequirement[];
  }>({
    title: '',
    department: 'Home Care Services',
    location: 'Canonsburg, PA',
    type: 'Full-time',
    payRange: '$17.00 - $22.00 / hr',
    description: '',
    requirements: 'Valid PA Driver’s License\nBackground clearances\nCPR certification',
    benefits: 'Weekly direct deposit\nFlexible scheduling\nPaid training',
    status: 'active',
    requiredUploads: [
      { id: 'cv', label: 'Resume / CV', required: true, description: 'Work history and background' },
      { id: 'license', label: "Driver's License / Photo ID", required: true, description: 'Valid driver’s license' },
      { id: 'cpr', label: 'CPR & First Aid Certificate', required: false, description: 'Current certification' },
      { id: 'clearances', label: 'PA Background Clearances', required: false, description: 'State police & child abuse reports' }
    ]
  });

  // Application Management State
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);
  const [applicationFilter, setApplicationFilter] = useState<string>('all');

  // Toast / notification
  const [toastMessage, setToastMessage] = useState<string>('');

  // Category configuration for organizing blogs
  const PRESET_CATEGORIES = [
    'Caregiver Tips',
    'ODP Updates',
    'Company News',
    'Senior Home Care',
    'Dementia Support',
    'Family Resources',
    'In-Home Respite'
  ];

  // Blog Category Filter in Admin
  const [blogCategoryFilter, setBlogCategoryFilter] = useState<string>('All');

  // Blog Editor State
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [blogForm, setBlogForm] = useState<{
    title: string;
    category: string;
    customCategory: string;
    isCustomCategory: boolean;
    authorName: string;
    authorRole: string;
    readTime: string;
    date: string;
    image: string;
    excerpt: string;
    content: string;
    tags: string;
  }>({
    title: '',
    category: 'Caregiver Tips',
    customCategory: '',
    isCustomCategory: false,
    authorName: 'Kenah Care Team',
    authorRole: 'Care Specialist',
    readTime: '4 min read',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    image: '/Hero.jpg',
    excerpt: '',
    content: '',
    tags: 'Caregiver Tips, Family Support, Wellness'
  });

  // Service Editor State (for Home Care or ODP)
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [serviceType, setServiceType] = useState<'home-care' | 'odp-waiver'>('home-care');
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [serviceForm, setServiceForm] = useState<{
    title: string;
    shortDesc: string;
    fullDesc: string;
    bulletPoints: string;
    whoItIsFor: string;
    howWeHelp: string;
    paWaiverNote: string;
  }>({
    title: '',
    shortDesc: '',
    fullDesc: '',
    bulletPoints: 'Personal assistance\nDaily routine management\nSafety oversight',
    whoItIsFor: 'Individuals needing supportive in-home or community care',
    howWeHelp: 'Trained caregivers\nNurse-supervised plans\nFlexible scheduling',
    paWaiverNote: ''
  });

  // Presets for cover photos
  const COVER_PRESETS = [
    { label: 'Hero Nurse & Client', url: '/Hero.jpg' },
    { label: 'Home Care Support', url: '/home_care_support_1790585595209.jpg' },
    { label: 'Community Participation', url: '/odp_community_participation_1790585609197.jpg' },
    { label: 'Respite Care & Peace', url: '/respite_care_peace_1790585621073.jpg' }
  ];

  // Initialize
  useEffect(() => {
    if (isAdminAuthenticated()) {
      setIsAuthenticated(true);
      loadAllData();
    }
  }, []);

  const loadAllData = () => {
    setBlogs(getStoredBlogs());
    setHomeCareServices(getStoredHomeCareServices());
    setOdpServices(getStoredOdpServices());
    setAssessments(getStoredAssessments());
    setJobs(getStoredJobs());
    setJobApplications(getStoredJobApplications());
  };

  // Sync data automatically whenever changes happen anywhere
  useEffect(() => {
    const handleSync = () => {
      loadAllData();
    };
    window.addEventListener(DATA_CHANGE_EVENT, handleSync);
    return () => window.removeEventListener(DATA_CHANGE_EVENT, handleSync);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 4000);
  };

  // Assessment Handlers
  const handleUpdateAssessmentStatus = (id: string, status: AssessmentSubmission['status']) => {
    updateAssessmentStatus(id, status);
    setAssessments(getStoredAssessments());
    showToast(`Assessment status updated to "${status}"`);
  };

  const handleDeleteAssessment = (id: string) => {
    if (window.confirm('Are you sure you want to remove this assessment intake?')) {
      deleteAssessmentSubmission(id);
      setAssessments(getStoredAssessments());
      if (selectedAssessment?.id === id) setSelectedAssessment(null);
      showToast('Assessment record deleted.');
    }
  };

  // Job Handlers
  const handleOpenAddJob = () => {
    setEditingJobId(null);
    setJobForm({
      title: '',
      department: 'Home Care Services',
      location: 'Canonsburg, PA',
      type: 'Full-time',
      payRange: '$17.00 - $22.00 / hr',
      description: '',
      requirements: 'Valid PA Driver’s License\nClean background clearances\nCPR & First Aid certification',
      benefits: 'Competitive weekly pay\nFlexible scheduling\nPaid clinical training',
      status: 'active',
      requiredUploads: [
        { id: 'cv', label: 'Resume / CV', required: true, description: 'Work history and background' },
        { id: 'license', label: "Driver's License / Photo ID", required: true, description: 'Valid driver’s license' },
        { id: 'cpr', label: 'CPR & First Aid Certificate', required: false, description: 'Current certification' },
        { id: 'clearances', label: 'PA Background Clearances', required: false, description: 'State police & child abuse reports' }
      ]
    });
    setCustomUploadDocName('');
    setIsJobModalOpen(true);
  };

  const handleOpenEditJob = (job: JobPosting) => {
    setEditingJobId(job.id);
    setJobForm({
      title: job.title,
      department: job.department,
      location: job.location,
      type: job.type,
      payRange: job.payRange,
      description: job.description,
      requirements: job.requirements.join('\n'),
      benefits: job.benefits.join('\n'),
      status: job.status,
      requiredUploads: job.requiredUploads || [
        { id: 'cv', label: 'Resume / CV', required: true, description: 'Work history and background' },
        { id: 'license', label: "Driver's License / Photo ID", required: true, description: 'Valid driver’s license' }
      ]
    });
    setCustomUploadDocName('');
    setIsJobModalOpen(true);
  };

  const handleSaveJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobForm.title || !jobForm.description) {
      alert('Please provide a job title and description');
      return;
    }

    const reqs = jobForm.requirements
      .split('\n')
      .map((r) => r.trim())
      .filter((r) => r.length > 0);

    const bens = jobForm.benefits
      .split('\n')
      .map((b) => b.trim())
      .filter((b) => b.length > 0);

    if (editingJobId) {
      const updatedJob: JobPosting = {
        id: editingJobId,
        title: jobForm.title.trim(),
        department: jobForm.department.trim(),
        location: jobForm.location.trim(),
        type: jobForm.type,
        payRange: jobForm.payRange.trim(),
        description: jobForm.description.trim(),
        requirements: reqs,
        benefits: bens,
        postedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        status: jobForm.status,
        requiredUploads: jobForm.requiredUploads
      };
      updateStoredJob(updatedJob);
      setJobs(getStoredJobs());
      showToast('Job posting updated successfully! Live on Career page.');
    } else {
      const newJob: JobPosting = {
        id: `job-${Date.now()}`,
        title: jobForm.title.trim(),
        department: jobForm.department.trim(),
        location: jobForm.location.trim(),
        type: jobForm.type,
        payRange: jobForm.payRange.trim(),
        description: jobForm.description.trim(),
        requirements: reqs,
        benefits: bens,
        postedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        status: jobForm.status,
        requiredUploads: jobForm.requiredUploads
      };
      addStoredJob(newJob);
      setJobs(getStoredJobs());
      showToast('New job posted! Immediately visible on Career page.');
    }

    setIsJobModalOpen(false);
    setEditingJobId(null);
  };

  const handleDeleteJob = (id: string) => {
    if (window.confirm('Are you sure you want to remove this job posting?')) {
      deleteStoredJob(id);
      setJobs(getStoredJobs());
      showToast('Job posting removed.');
    }
  };

  // Job Application Handlers
  const handleUpdateApplicationStatus = (id: string, status: JobApplication['status']) => {
    updateJobApplicationStatus(id, status);
    setJobApplications(getStoredJobApplications());
    showToast(`Application status updated to "${status}"`);
  };

  const handleDeleteApplication = (id: string) => {
    if (window.confirm('Are you sure you want to delete this job application?')) {
      deleteJobApplication(id);
      setJobApplications(getStoredJobApplications());
      if (selectedApplication?.id === id) setSelectedApplication(null);
      showToast('Application deleted.');
    }
  };

  // Auth Handler
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check server-side rate limit & auth
    const serverRes = await apiVerifyAdmin(pinCode);
    if (!serverRes.success && serverRes.error?.includes('Too many')) {
      setAuthError(serverRes.error);
      return;
    }

    const isValid = await verifyAdminCode(pinCode);
    if (isValid || serverRes.success) {
      setAdminAuthenticated(true);
      setIsAuthenticated(true);
      setAuthError('');
      loadAllData();
      showToast('Welcome to the Kenah Administrative Portal');
    } else {
      setAuthError('Invalid authorization PIN. Please verify and try again.');
      setPinCode('');
    }
  };

  const handleLogout = () => {
    setAdminAuthenticated(false);
    setIsAuthenticated(false);
    setPinCode('');
  };

  // File upload for blog cover photo
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          setBlogForm((prev) => ({ ...prev, image: reader.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Save Blog
  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!blogForm.title || !blogForm.excerpt || !blogForm.content) {
      alert('Please fill out all required fields (title, excerpt, content)');
      return;
    }

    const paragraphs = blogForm.content
      .split('\n')
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    const tagsArray = blogForm.tags
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const finalCategory =
      blogForm.isCustomCategory && blogForm.customCategory.trim()
        ? blogForm.customCategory.trim()
        : blogForm.category || 'Caregiver Tips';

    if (editingBlogId) {
      // Edit existing
      const updatedList = blogs.map((b) => {
        if (b.id === editingBlogId) {
          return {
            ...b,
            title: blogForm.title,
            category: finalCategory,
            author: { name: blogForm.authorName, role: blogForm.authorRole },
            readTime: blogForm.readTime,
            date: blogForm.date,
            image: blogForm.image || '/Hero.jpg',
            excerpt: blogForm.excerpt,
            content: paragraphs,
            tags: tagsArray
          };
        }
        return b;
      });
      saveStoredBlogs(updatedList);
      setBlogs(updatedList);
      showToast('Article updated successfully!');
    } else {
      // Create new
      const newPost: BlogPost = {
        id: `blog-${Date.now()}`,
        slug: blogForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        title: blogForm.title,
        category: finalCategory,
        author: { name: blogForm.authorName, role: blogForm.authorRole },
        date: blogForm.date,
        readTime: blogForm.readTime,
        image: blogForm.image || '/Hero.jpg',
        excerpt: blogForm.excerpt,
        content: paragraphs,
        tags: tagsArray
      };
      const updatedList = [newPost, ...blogs];
      saveStoredBlogs(updatedList);
      setBlogs(updatedList);
      showToast('New article published to the live site!');
    }

    setIsBlogModalOpen(false);
    setEditingBlogId(null);
  };

  const handleOpenEditBlog = (post: BlogPost) => {
    setEditingBlogId(post.id);
    const isCustom = !PRESET_CATEGORIES.includes(post.category);
    setBlogForm({
      title: post.title,
      category: isCustom ? 'custom' : post.category,
      customCategory: isCustom ? post.category : '',
      isCustomCategory: isCustom,
      authorName: post.author.name,
      authorRole: post.author.role,
      readTime: post.readTime,
      date: post.date,
      image: post.image,
      excerpt: post.excerpt,
      content: post.content.join('\n\n'),
      tags: post.tags.join(', ')
    });
    setIsBlogModalOpen(true);
  };

  const handleDeleteBlog = (id: string) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      const updated = blogs.filter((b) => b.id !== id);
      saveStoredBlogs(updated);
      setBlogs(updated);
      showToast('Article removed from blog.');
    }
  };

  // Service Management
  const handleOpenAddService = (type: 'home-care' | 'odp-waiver') => {
    setServiceType(type);
    setEditingServiceId(null);
    setServiceForm({
      title: '',
      shortDesc: '',
      fullDesc: '',
      bulletPoints: 'Personal assistance\nDaily living routines\nNurse oversight',
      whoItIsFor: 'Individuals needing supportive care in Pennsylvania',
      howWeHelp: 'Certified caregivers\nCustomized plans\nFamily communication',
      paWaiverNote: type === 'odp-waiver' ? 'Authorized under Pennsylvania ODP Consolidated Waiver' : ''
    });
    setIsServiceModalOpen(true);
  };

  const handleOpenEditService = (service: ServiceItem) => {
    setServiceType(service.category);
    setEditingServiceId(service.id);
    setServiceForm({
      title: service.title,
      shortDesc: service.shortDesc,
      fullDesc: service.fullDesc,
      bulletPoints: service.bulletPoints.join('\n'),
      whoItIsFor: service.whoItIsFor,
      howWeHelp: service.howWeHelp.join('\n'),
      paWaiverNote: service.paWaiverNote || ''
    });
    setIsServiceModalOpen(true);
  };

  const handleSaveService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!serviceForm.title || !serviceForm.shortDesc || !serviceForm.fullDesc) {
      alert('Please fill in service title and descriptions');
      return;
    }

    const bullets = serviceForm.bulletPoints
      .split('\n')
      .map((b) => b.trim())
      .filter((b) => b.length > 0);

    const helps = serviceForm.howWeHelp
      .split('\n')
      .map((h) => h.trim())
      .filter((h) => h.length > 0);

    if (serviceType === 'home-care') {
      if (editingServiceId) {
        const updated = homeCareServices.map((s) => {
          if (s.id === editingServiceId) {
            return {
              ...s,
              title: serviceForm.title,
              shortDesc: serviceForm.shortDesc,
              fullDesc: serviceForm.fullDesc,
              bulletPoints: bullets,
              whoItIsFor: serviceForm.whoItIsFor,
              howWeHelp: helps
            };
          }
          return s;
        });
        saveStoredHomeCareServices(updated);
        setHomeCareServices(updated);
        showToast('Home Care service updated successfully!');
      } else {
        const newService: ServiceItem = {
          id: `hc-${Date.now()}`,
          category: 'home-care',
          title: serviceForm.title,
          shortDesc: serviceForm.shortDesc,
          fullDesc: serviceForm.fullDesc,
          iconName: 'PersonalCare',
          bulletPoints: bullets,
          whoItIsFor: serviceForm.whoItIsFor,
          howWeHelp: helps,
          keyHighlights: ['Nurse Supervised', 'Flexible Schedule', 'Certified Staff']
        };
        const updated = [...homeCareServices, newService];
        saveStoredHomeCareServices(updated);
        setHomeCareServices(updated);
        showToast('New Home Care service added to the directory!');
      }
    } else {
      // ODP Waiver
      if (editingServiceId) {
        const updated = odpServices.map((s) => {
          if (s.id === editingServiceId) {
            return {
              ...s,
              title: serviceForm.title,
              shortDesc: serviceForm.shortDesc,
              fullDesc: serviceForm.fullDesc,
              bulletPoints: bullets,
              whoItIsFor: serviceForm.whoItIsFor,
              howWeHelp: helps,
              paWaiverNote: serviceForm.paWaiverNote
            };
          }
          return s;
        });
        saveStoredOdpServices(updated);
        setOdpServices(updated);
        showToast('ODP Waiver service updated successfully!');
      } else {
        const newService: ServiceItem = {
          id: `odp-${Date.now()}`,
          category: 'odp-waiver',
          title: serviceForm.title,
          shortDesc: serviceForm.shortDesc,
          fullDesc: serviceForm.fullDesc,
          iconName: 'InHomeRespite',
          bulletPoints: bullets,
          whoItIsFor: serviceForm.whoItIsFor,
          howWeHelp: helps,
          paWaiverNote: serviceForm.paWaiverNote,
          keyHighlights: ['Consolidated Waiver', 'Community Inclusion', 'Certified DSP']
        };
        const updated = [...odpServices, newService];
        saveStoredOdpServices(updated);
        setOdpServices(updated);
        showToast('New ODP Waiver service added to the directory!');
      }
    }

    setIsServiceModalOpen(false);
    setEditingServiceId(null);
  };

  const handleDeleteService = (id: string, type: 'home-care' | 'odp') => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      if (type === 'home-care') {
        const updated = homeCareServices.filter((s) => s.id !== id);
        saveStoredHomeCareServices(updated);
        setHomeCareServices(updated);
      } else {
        const updated = odpServices.filter((s) => s.id !== id);
        saveStoredOdpServices(updated);
        setOdpServices(updated);
      }
      showToast('Service removed.');
    }
  };

  // ==========================================
  // UN-AUTHENTICATED PIN ENTRY VIEW
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0B2B26] flex items-center justify-center px-4 py-12 text-left font-sans">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-white/20">
          <div className="text-center space-y-3 mb-8">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#FAF4EE] text-[#0B2B26] flex items-center justify-center shadow-inner">
              <Lock className="w-7 h-7 text-[#0B2B26]" />
            </div>
            <h1 className="text-2xl font-extrabold text-[#0B2B26] font-display">
              Administrative Portal
            </h1>
            <p className="text-xs sm:text-sm text-slate-500">
              Please enter your 4-digit authorization PIN to access content management.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Security PIN
              </label>
              <div className="relative">
                <input
                  type="password"
                  inputMode="numeric"
                  maxLength={6}
                  value={pinCode}
                  onChange={(e) => {
                    setPinCode(e.target.value);
                    if (authError) setAuthError('');
                  }}
                  autoFocus
                  placeholder="••••"
                  className="w-full text-center tracking-[0.5em] text-2xl font-bold py-3.5 px-4 rounded-2xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B2B26] focus:border-transparent text-[#0B2B26]"
                />
                <KeyRound className="w-5 h-5 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                {authError}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-full bg-[#0B2B26] hover:bg-[#071E1A] text-white font-bold text-sm transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4 text-[#F2D701]" />
              <span>Authorize Access</span>
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <button
              onClick={() => onNavigate('home')}
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors inline-flex items-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Public Website</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // AUTHENTICATED MANAGEMENT DASHBOARD VIEW
  // ==========================================
  return (
    <div className="bg-[#FAF8F5] min-h-screen text-left font-sans flex flex-col md:flex-row">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0B2B26] text-white px-5 py-3 rounded-2xl shadow-xl border border-white/20 text-xs sm:text-sm font-semibold flex items-center gap-2.5 animate-fadeIn">
          <Sparkles className="w-4 h-4 text-[#F2D701]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Left Collapsible Navigation Sidebar */}
      <aside
        className={`bg-[#0B2B26] text-white flex flex-col justify-between transition-all duration-300 ease-in-out shrink-0 z-40 sticky top-0 md:h-screen ${
          isSidebarCollapsed ? 'w-full md:w-20' : 'w-full md:w-64 lg:w-72'
        }`}
      >
        <div>
          {/* Brand & Collapse Toggle */}
          <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between gap-2">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center font-bold text-sm shrink-0 border border-white/10 shadow-xs">
                KW
              </div>
              {!isSidebarCollapsed && (
                <div className="min-w-0">
                  <h2 className="text-sm font-bold font-display text-white truncate">
                    Kenah Portal
                  </h2>
                  <span className="text-[10px] text-emerald-400 font-semibold block">
                    Administrative Core
                  </span>
                </div>
              )}
            </div>

            {/* Collapse toggle button for Desktop */}
            <button
              type="button"
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="hidden md:flex p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title={isSidebarCollapsed ? 'Expand Navigation' : 'Collapse Navigation'}
            >
              {isSidebarCollapsed ? (
                <ChevronRight className="w-4 h-4 text-[#E89A24]" />
              ) : (
                <ChevronLeft className="w-4 h-4 text-slate-400 hover:text-white" />
              )}
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1.5">
            {/* Assessments Tab */}
            <button
              onClick={() => setActiveTab('assessments')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'assessments'
                  ? 'bg-[#E89A24] text-white shadow-md'
                  : 'text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
              title="Care Assessments Intake"
            >
              <Calendar className="w-4 h-4 shrink-0" />
              {!isSidebarCollapsed && (
                <span className="flex-1 text-left truncate">Care Assessments</span>
              )}
              {assessments.filter((a) => a.status === 'new').length > 0 && (
                <span
                  className={`rounded-full font-extrabold text-[10px] ${
                    isSidebarCollapsed
                      ? 'w-2 h-2 bg-emerald-400'
                      : 'px-1.5 py-0.5 bg-emerald-400 text-[#0B2B26]'
                  }`}
                >
                  {!isSidebarCollapsed && assessments.filter((a) => a.status === 'new').length}
                </span>
              )}
            </button>

            {/* Job Postings Tab */}
            <button
              onClick={() => setActiveTab('jobs')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'jobs'
                  ? 'bg-[#E89A24] text-white shadow-md'
                  : 'text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
              title="Careers & Job Postings"
            >
              <Briefcase className="w-4 h-4 shrink-0" />
              {!isSidebarCollapsed && (
                <span className="flex-1 text-left truncate">Job Postings</span>
              )}
              {!isSidebarCollapsed && (
                <span className="text-[11px] text-white/60">({jobs.length})</span>
              )}
            </button>

            {/* Applications Tab */}
            <button
              onClick={() => setActiveTab('applications')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'applications'
                  ? 'bg-[#E89A24] text-white shadow-md'
                  : 'text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
              title="Job Applications Dossiers"
            >
              <User className="w-4 h-4 shrink-0" />
              {!isSidebarCollapsed && (
                <span className="flex-1 text-left truncate">Applications</span>
              )}
              {jobApplications.filter((a) => a.status === 'new').length > 0 && (
                <span
                  className={`rounded-full font-extrabold text-[10px] ${
                    isSidebarCollapsed
                      ? 'w-2 h-2 bg-emerald-400'
                      : 'px-1.5 py-0.5 bg-emerald-400 text-[#0B2B26]'
                  }`}
                >
                  {!isSidebarCollapsed && jobApplications.filter((a) => a.status === 'new').length}
                </span>
              )}
            </button>

            {/* Blogs Tab */}
            <button
              onClick={() => setActiveTab('blogs')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'blogs'
                  ? 'bg-[#E89A24] text-white shadow-md'
                  : 'text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
              title="Care Blogs & Insights"
            >
              <BookOpen className="w-4 h-4 shrink-0" />
              {!isSidebarCollapsed && (
                <span className="flex-1 text-left truncate">Care Articles</span>
              )}
              {!isSidebarCollapsed && (
                <span className="text-[11px] text-white/60">({blogs.length})</span>
              )}
            </button>

            {/* Home Care Tab */}
            <button
              onClick={() => setActiveTab('home-care')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'home-care'
                  ? 'bg-[#E89A24] text-white shadow-md'
                  : 'text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
              title="Home Care Directory"
            >
              <Heart className="w-4 h-4 shrink-0" />
              {!isSidebarCollapsed && (
                <span className="flex-1 text-left truncate">Home Care</span>
              )}
            </button>

            {/* ODP Waivers Tab */}
            <button
              onClick={() => setActiveTab('odp')}
              className={`w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'odp'
                  ? 'bg-[#E89A24] text-white shadow-md'
                  : 'text-slate-300 hover:bg-white/10 hover:text-white'
              }`}
              title="ODP Waiver Services"
            >
              <ShieldCheck className="w-4 h-4 shrink-0" />
              {!isSidebarCollapsed && (
                <span className="flex-1 text-left truncate">ODP Waivers</span>
              )}
            </button>
          </nav>
        </div>

        {/* Sidebar Footer Actions */}
        <div className="p-3 border-t border-white/10 space-y-1">
          <button
            onClick={() => onNavigate('home')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-slate-300 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
            title="View Live Website"
          >
            <ExternalLink className="w-4 h-4 shrink-0" />
            {!isSidebarCollapsed && <span>Live Website</span>}
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-bold text-rose-300 hover:bg-rose-500/20 hover:text-rose-200 transition-colors cursor-pointer"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {!isSidebarCollapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Workspace */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        {/* =========================================================
            TAB: CARE ASSESSMENTS INTAKE (Received from Free Assessment)
           ========================================================= */}
        {activeTab === 'assessments' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl p-6 border border-slate-200/80">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-bold text-[#0B2B26] font-display">
                    Free Care Assessments & Client Inquiries
                  </h2>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#FAF4EE] text-[#E89A24] font-bold text-xs">
                    Live Feed
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  All submissions from the Free Assessment questionnaire appear here immediately. Review needs, call families, and coordinate care.
                </p>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <button
                  onClick={() => {
                    const csvContent =
                      'data:text/csv;charset=utf-8,' +
                      ['Ref,Name,Phone,Email,County,Service,Timeframe,Status,Date']
                        .concat(
                          assessments.map(
                            (a) =>
                              `"${a.referenceCode}","${a.name}","${a.phone}","${a.email}","${a.county}","${a.serviceCategory}","${a.timeframe}","${a.status}","${a.submittedAt}"`
                          )
                        )
                        .join('\n');
                    const encodedUri = encodeURI(csvContent);
                    const link = document.createElement('a');
                    link.setAttribute('href', encodedUri);
                    link.setAttribute('download', `kenah-care-assessments-${Date.now()}.csv`);
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                  className="px-4 py-2 rounded-full border border-slate-300 hover:border-slate-800 text-xs font-semibold text-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-[#0B2B26]" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 bg-white rounded-2xl p-4 border border-slate-200/80">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mr-2">
                Filter Status:
              </span>
              {['all', 'new', 'contacted', 'scheduled', 'completed', 'archived'].map((st) => (
                <button
                  key={st}
                  onClick={() => setAssessmentFilter(st)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer capitalize ${
                    assessmentFilter === st
                      ? 'bg-[#0B2B26] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {st} (
                  {st === 'all'
                    ? assessments.length
                    : assessments.filter((a) => a.status === st).length}
                  )
                </button>
              ))}
            </div>

            {/* Submissions List */}
            {assessments.filter((a) => assessmentFilter === 'all' || a.status === assessmentFilter).length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
                <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800">No assessment inquiries found</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  There are no assessments matching the selected status. When someone fills out the Free Assessment form on the site, it will instantly display here.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {assessments
                  .filter((a) => assessmentFilter === 'all' || a.status === assessmentFilter)
                  .map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-6"
                    >
                      <div className="space-y-3 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-100 text-[#0B2B26]">
                            {item.referenceCode}
                          </span>
                          <span
                            className={`text-xs font-bold px-2.5 py-0.5 rounded-full capitalize ${
                              item.status === 'new'
                                ? 'bg-amber-100 text-amber-800 ring-1 ring-amber-300'
                                : item.status === 'contacted'
                                ? 'bg-blue-100 text-blue-800'
                                : item.status === 'scheduled'
                                ? 'bg-purple-100 text-purple-800'
                                : item.status === 'completed'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            ● {item.status}
                          </span>
                          <span className="text-xs text-slate-400">
                            Submitted: {item.submittedAt}
                          </span>
                        </div>

                        <div>
                          <h3 className="text-lg font-bold text-[#0B2B26] font-display">
                            {item.name}
                          </h3>
                          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 mt-1">
                            <a
                              href={`tel:${item.phone}`}
                              className="inline-flex items-center gap-1 font-semibold text-[#0B2B26] hover:underline"
                            >
                              <Phone className="w-3.5 h-3.5 text-[#E89A24]" />
                              <span>{item.phone || 'No phone'}</span>
                            </a>
                            <a
                              href={`mailto:${item.email}`}
                              className="inline-flex items-center gap-1 text-slate-600 hover:underline"
                            >
                              <Mail className="w-3.5 h-3.5 text-slate-400" />
                              <span>{item.email || 'No email'}</span>
                            </a>
                            <span className="inline-flex items-center gap-1 text-slate-500">
                              <MapPin className="w-3.5 h-3.5 text-slate-400" />
                              <span>{item.township ? `${item.township}, ` : ''}{item.county}</span>
                            </span>
                          </div>
                        </div>

                        {/* Recipient & Selected Services */}
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                            For: <strong className="text-slate-800">{item.recipient}</strong>
                          </span>
                          <span className="text-slate-300">•</span>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                            Timeframe: <strong className="text-slate-800">{item.timeframe}</strong>
                          </span>
                          <span className="text-slate-300">•</span>
                          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                            Hours: <strong className="text-slate-800">{item.hoursPerWeek}</strong>
                          </span>
                        </div>

                        {item.selectedServices && item.selectedServices.length > 0 && (
                          <div className="flex flex-wrap items-center gap-1.5 pt-1">
                            {item.selectedServices.map((srv, idx) => (
                              <span
                                key={idx}
                                className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-[#FAF4EE] text-[#0B2B26] border border-[#EADBCC]"
                              >
                                {srv}
                              </span>
                            ))}
                          </div>
                        )}

                        {item.notes && (
                          <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 italic">
                            "{item.notes}"
                          </p>
                        )}
                      </div>

                      {/* Status Selector & Actions */}
                      <div className="flex md:flex-col items-center md:items-end justify-between gap-3 border-t md:border-t-0 pt-4 md:pt-0 shrink-0">
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 md:text-right">
                            Update Status:
                          </label>
                          <select
                            value={item.status}
                            onChange={(e) =>
                              handleUpdateAssessmentStatus(item.id, e.target.value as any)
                            }
                            className="text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-[#0B2B26]"
                          >
                            <option value="new">New Inquiry</option>
                            <option value="contacted">Contacted</option>
                            <option value="scheduled">Assessment Scheduled</option>
                            <option value="completed">Completed / Active</option>
                            <option value="archived">Archived</option>
                          </select>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedAssessment(item)}
                            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer text-xs font-bold flex items-center gap-1"
                            title="View Full Intake Details"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Details</span>
                          </button>
                          <button
                            onClick={() => handleDeleteAssessment(item.id)}
                            className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors cursor-pointer"
                            title="Delete Record"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}

        {/* =========================================================
            TAB: JOB POSTINGS MANAGEMENT (Careers Page)
           ========================================================= */}
        {activeTab === 'jobs' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl p-6 border border-slate-200/80">
              <div>
                <h2 className="text-xl font-bold text-[#0B2B26] font-display">
                  Career Job Postings
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Manage open positions shown on the public Careers page. Any additions, updates, or status changes reflect instantly.
                </p>
              </div>

              <button
                onClick={handleOpenAddJob}
                className="px-5 py-3 rounded-full bg-[#E89A24] hover:bg-[#d68a18] text-white font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95 flex items-center gap-2 cursor-pointer self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Post New Job</span>
              </button>
            </div>

            {/* Job Listings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#F8EDE2] text-[#0B2B26]">
                        {job.department}
                      </span>
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                          job.status === 'active'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-100 text-slate-500'
                        }`}
                      >
                        {job.status === 'active' ? 'Active Posting' : 'Closed'}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[#0B2B26] font-display">
                      {job.title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                      <span className="font-semibold text-[#0B2B26] flex items-center gap-1">
                        <DollarSign className="w-3.5 h-3.5 text-[#E89A24]" />
                        <span>{job.payRange}</span>
                      </span>
                      <span>•</span>
                      <span>{job.type}</span>
                      <span>•</span>
                      <span>{job.location}</span>
                    </div>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {job.description}
                    </p>

                    <div className="space-y-1 pt-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                        Requirements ({job.requirements.length}):
                      </span>
                      {job.requirements.slice(0, 2).map((req, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-xs text-slate-700">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{req}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400">
                      Posted: {job.postedDate}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEditJob(job)}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                        title="Edit Job"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteJob(job.id)}
                        className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors cursor-pointer"
                        title="Delete Job"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================
            TAB: JOB APPLICATIONS RECEIVED
           ========================================================= */}
        {activeTab === 'applications' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl p-6 border border-slate-200/80">
              <div>
                <h2 className="text-xl font-bold text-[#0B2B26] font-display">
                  Caregiver & DSP Applications
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Review applicant profiles, qualifications, clearances, and contact candidates for interviews.
                </p>
              </div>

              <div className="text-xs text-slate-500 font-semibold">
                Total Applicants: {jobApplications.length}
              </div>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 bg-white rounded-2xl p-4 border border-slate-200/80">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mr-2">
                Filter Status:
              </span>
              {['all', 'new', 'reviewing', 'interview_scheduled', 'hired', 'declined'].map((st) => (
                <button
                  key={st}
                  onClick={() => setApplicationFilter(st)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer capitalize ${
                    applicationFilter === st
                      ? 'bg-[#0B2B26] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {st.replace('_', ' ')} (
                  {st === 'all'
                    ? jobApplications.length
                    : jobApplications.filter((a) => a.status === st).length}
                  )
                </button>
              ))}
            </div>

            {/* Applications List */}
            {jobApplications.filter((a) => applicationFilter === 'all' || a.status === applicationFilter).length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
                <User className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-800">No applications found</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                  There are no candidates matching this filter.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {jobApplications
                  .filter((a) => applicationFilter === 'all' || a.status === applicationFilter)
                  .map((app) => (
                    <div
                      key={app.id}
                      className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-6"
                    >
                      <div className="space-y-3 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#FAF4EE] text-[#0B2B26]">
                            Role: {app.jobTitle}
                          </span>
                          <span
                            className={`text-xs font-bold px-2.5 py-0.5 rounded-full capitalize ${
                              app.status === 'new'
                                ? 'bg-amber-100 text-amber-800'
                                : app.status === 'reviewing'
                                ? 'bg-blue-100 text-blue-800'
                                : app.status === 'interview_scheduled'
                                ? 'bg-purple-100 text-purple-800'
                                : app.status === 'hired'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-rose-100 text-rose-800'
                            }`}
                          >
                            ● {app.status.replace('_', ' ')}
                          </span>
                          <span className="text-xs text-slate-400">
                            Applied: {app.submittedAt}
                          </span>
                        </div>

                        <div>
                          <h3 className="text-lg font-bold text-[#0B2B26] font-display">
                            {app.applicantName}
                          </h3>
                          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 mt-1">
                            <a
                              href={`tel:${app.phone}`}
                              className="inline-flex items-center gap-1 font-semibold text-[#0B2B26] hover:underline"
                            >
                              <Phone className="w-3.5 h-3.5 text-[#E89A24]" />
                              <span>{app.phone}</span>
                            </a>
                            <a
                              href={`mailto:${app.email}`}
                              className="inline-flex items-center gap-1 text-slate-600 hover:underline"
                            >
                              <Mail className="w-3.5 h-3.5 text-slate-400" />
                              <span>{app.email}</span>
                            </a>
                            <span className="inline-flex items-center gap-1 text-slate-500">
                              <MapPin className="w-3.5 h-3.5 text-slate-400" />
                              <span>{app.city}</span>
                            </span>
                          </div>
                        </div>

                        {/* Credentials & Bio */}
                        <div className="flex flex-wrap items-center gap-3 text-xs">
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 font-semibold text-slate-700">
                            Exp: {app.experienceYears}
                          </span>
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 font-semibold text-slate-700">
                            Avail: {app.availability}
                          </span>
                          {app.hasDriverLicense && (
                            <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 font-semibold flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              <span>Driver's License</span>
                            </span>
                          )}
                          {app.hasClearances && (
                            <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 font-semibold flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              <span>PA Clearances</span>
                            </span>
                          )}
                        </div>

                        {app.resumeOrBio && (
                          <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100 line-clamp-2">
                            "{app.resumeOrBio}"
                          </p>
                        )}
                      </div>

                      {/* Status Selector & Actions */}
                      <div className="flex md:flex-col items-center md:items-end justify-between gap-3 border-t md:border-t-0 pt-4 md:pt-0 shrink-0">
                        <div>
                          <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1 md:text-right">
                            Candidate Status:
                          </label>
                          <select
                            value={app.status}
                            onChange={(e) =>
                              handleUpdateApplicationStatus(app.id, e.target.value as any)
                            }
                            className="text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-[#0B2B26]"
                          >
                            <option value="new">New Applicant</option>
                            <option value="reviewing">Under Review</option>
                            <option value="interview_scheduled">Interview Scheduled</option>
                            <option value="hired">Hired</option>
                            <option value="declined">Declined</option>
                          </select>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedApplication(app)}
                            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer text-xs font-bold flex items-center gap-1"
                            title="View Full Profile"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span className="hidden sm:inline">Profile</span>
                          </button>
                          <button
                            onClick={() => handleDeleteApplication(app.id)}
                            className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors cursor-pointer"
                            title="Delete Application"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}

        {/* =========================================================
            TAB 1: BLOGS MANAGEMENT
           ========================================================= */}
        {activeTab === 'blogs' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl p-6 border border-slate-200/80">
              <div>
                <h2 className="text-xl font-bold text-[#0B2B26] font-display">
                  Family Care Blog Articles
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Add new guides, upload cover photos, and edit existing articles. All updates appear immediately on the full blog page and home page.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingBlogId(null);
                  setBlogForm({
                    title: '',
                    category: 'Caregiver Tips',
                    customCategory: '',
                    isCustomCategory: false,
                    authorName: 'Kenah Care Team',
                    authorRole: 'Care Specialist',
                    readTime: '4 min read',
                    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
                    image: '/Hero.jpg',
                    excerpt: '',
                    content: '',
                    tags: 'Caregiver Tips, Family Support, Wellness'
                  });
                  setIsBlogModalOpen(true);
                }}
                className="px-5 py-3 rounded-full bg-[#E89A24] hover:bg-[#d68a18] text-white font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95 flex items-center gap-2 cursor-pointer self-start sm:self-auto"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Blog Article</span>
              </button>
            </div>

            {/* Category Organization Filter Bar */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200/80 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
                  Organize by Category:
                </span>
                <span className="text-xs text-slate-500">
                  Showing {blogs.filter((b) => blogCategoryFilter === 'All' || b.category === blogCategoryFilter).length} of {blogs.length} articles
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {Array.from(new Set(['All', ...PRESET_CATEGORIES, ...blogs.map((b) => b.category)])).map((cat) => {
                  const count = cat === 'All' ? blogs.length : blogs.filter((b) => b.category === cat).length;
                  return (
                    <button
                      key={cat}
                      onClick={() => setBlogCategoryFilter(cat)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                        blogCategoryFilter === cat
                          ? 'bg-[#0B2B26] text-white shadow-xs'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <span>{cat}</span>
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
                          blogCategoryFilter === cat ? 'bg-white/20 text-white' : 'bg-white text-slate-600'
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Blog List Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs
                .filter((post) => blogCategoryFilter === 'All' || post.category === blogCategoryFilter)
                .map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs flex flex-col justify-between"
                >
                  <div className="relative h-48 bg-slate-100 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/Hero.jpg';
                      }}
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full bg-[#0B2B26]/85 backdrop-blur-sm text-white text-[11px] font-semibold">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] text-slate-400 mb-1 flex items-center gap-2">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                      <h3 className="text-base font-bold text-[#0B2B26] font-display line-clamp-2 mb-2">
                        {post.title}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between gap-2">
                      <button
                        onClick={() => onSelectBlog(post)}
                        className="text-xs font-bold text-[#0B2B26] hover:text-[#E89A24] flex items-center gap-1 cursor-pointer"
                        title="Open Full Page View"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Page</span>
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenEditBlog(post)}
                          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                          title="Edit Article"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteBlog(post.id)}
                          className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors cursor-pointer"
                          title="Delete Article"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================
            TAB 2: HOME CARE SERVICES MANAGEMENT
           ========================================================= */}
        {activeTab === 'home-care' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl p-6 border border-slate-200/80">
              <div>
                <h2 className="text-xl font-bold text-[#0B2B26] font-display">
                  Home Care Services Directory
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Manage personal care, senior care, dementia care, and add custom home care services.
                </p>
              </div>

              <button
                onClick={() => handleOpenAddService('home-care')}
                className="px-5 py-3 rounded-full bg-[#0B2B26] hover:bg-[#071E1A] text-white font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95 flex items-center gap-2 cursor-pointer self-start sm:self-auto"
              >
                <Plus className="w-4 h-4 text-[#F2D701]" />
                <span>Add Home Care Service</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {homeCareServices.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="inline-block px-2.5 py-0.5 rounded-full bg-[#E6F7F4] text-emerald-900 text-[10px] font-bold uppercase tracking-wider mb-2">
                      Home Care
                    </div>
                    <h3 className="text-lg font-bold text-[#0B2B26] font-display mb-1">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                      {service.shortDesc}
                    </p>

                    <div className="space-y-1 text-xs text-slate-500">
                      <p>
                        <strong>Inclusions:</strong> {service.bulletPoints.length} tasks
                      </p>
                      <p className="line-clamp-1">
                        <strong>For:</strong> {service.whoItIsFor}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between gap-2">
                    <button
                      onClick={() => onSelectService(service)}
                      className="text-xs font-bold text-[#0B2B26] hover:text-[#E89A24] flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Full Page</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEditService(service)}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteService(service.id, 'home-care')}
                        className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* =========================================================
            TAB 3: ODP WAIVER SERVICES MANAGEMENT
           ========================================================= */}
        {activeTab === 'odp' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white rounded-2xl p-6 border border-slate-200/80">
              <div>
                <h2 className="text-xl font-bold text-[#0B2B26] font-display">
                  Pennsylvania ODP Waiver Services Directory
                </h2>
                <p className="text-xs sm:text-sm text-slate-500">
                  Manage In-Home Respite, Out-of-Home Respite, Habilitation, Community Participation Support, and add new authorized waiver supports.
                </p>
              </div>

              <button
                onClick={() => handleOpenAddService('odp-waiver')}
                className="px-5 py-3 rounded-full bg-[#0B2B26] hover:bg-[#071E1A] text-white font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95 flex items-center gap-2 cursor-pointer self-start sm:self-auto"
              >
                <Plus className="w-4 h-4 text-[#F2D701]" />
                <span>Add ODP Waiver Service</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {odpServices.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="inline-block px-2.5 py-0.5 rounded-full bg-[#FAF4EE] text-amber-900 text-[10px] font-bold uppercase tracking-wider mb-2">
                      PA ODP Waiver
                    </div>
                    <h3 className="text-lg font-bold text-[#0B2B26] font-display mb-1">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                      {service.shortDesc}
                    </p>

                    <div className="space-y-1 text-xs text-slate-500">
                      {service.paWaiverNote && (
                        <p className="line-clamp-1 text-emerald-800 font-semibold">
                          {service.paWaiverNote}
                        </p>
                      )}
                      <p>
                        <strong>Highlights:</strong> {service.bulletPoints.length} points
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between gap-2">
                    <button
                      onClick={() => onSelectService(service)}
                      className="text-xs font-bold text-[#0B2B26] hover:text-[#E89A24] flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Full Page</span>
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenEditService(service)}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteService(service.id, 'odp')}
                        className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* =========================================================
          MODAL: ADD / EDIT BLOG ARTICLE WITH COVER PHOTO
         ========================================================= */}
      {isBlogModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[92vh] flex flex-col">
            <div className="px-6 sm:px-8 py-5 bg-[#0B2B26] text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <BookOpen className="w-5 h-5 text-[#F2D701]" />
                <h3 className="text-lg font-bold font-display">
                  {editingBlogId ? 'Edit Blog Article' : 'Add New Blog Article'}
                </h3>
              </div>
              <button
                onClick={() => setIsBlogModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBlog} className="p-6 sm:p-8 overflow-y-auto space-y-6 text-left">
              {/* Title */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  value={blogForm.title}
                  onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                  placeholder="e.g. Navigating In-Home Respite Care in Southwestern PA"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B2B26] text-sm"
                />
              </div>

              {/* Category & Read Time */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={blogForm.isCustomCategory ? 'custom' : blogForm.category}
                    onChange={(e) => {
                      if (e.target.value === 'custom') {
                        setBlogForm({ ...blogForm, isCustomCategory: true, category: 'custom' });
                      } else {
                        setBlogForm({
                          ...blogForm,
                          isCustomCategory: false,
                          category: e.target.value,
                          customCategory: ''
                        });
                      }
                    }}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B2B26] text-sm bg-white"
                  >
                    {PRESET_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                    <option value="custom">+ Create New Custom Category...</option>
                  </select>

                  {blogForm.isCustomCategory && (
                    <div className="mt-2 animate-in fade-in duration-200">
                      <input
                        type="text"
                        required
                        value={blogForm.customCategory}
                        onChange={(e) => setBlogForm({ ...blogForm, customCategory: e.target.value })}
                        placeholder="Type new category name (e.g. Caregiver Tips)"
                        className="w-full px-4 py-2 rounded-xl border border-[#E89A24] focus:outline-none focus:ring-2 focus:ring-[#E89A24] text-xs bg-amber-50/50"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Read Time
                  </label>
                  <input
                    type="text"
                    value={blogForm.readTime}
                    onChange={(e) => setBlogForm({ ...blogForm, readTime: e.target.value })}
                    placeholder="e.g. 5 min read"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B2B26] text-sm"
                  />
                </div>
              </div>

              {/* Author Info & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Author Name
                  </label>
                  <input
                    type="text"
                    value={blogForm.authorName}
                    onChange={(e) => setBlogForm({ ...blogForm, authorName: e.target.value })}
                    placeholder="e.g. Elena Rostova, MSW"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B2B26] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Author Role
                  </label>
                  <input
                    type="text"
                    value={blogForm.authorRole}
                    onChange={(e) => setBlogForm({ ...blogForm, authorRole: e.target.value })}
                    placeholder="e.g. Care Coordinator"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B2B26] text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Published Date
                  </label>
                  <input
                    type="text"
                    value={blogForm.date}
                    onChange={(e) => setBlogForm({ ...blogForm, date: e.target.value })}
                    placeholder="e.g. Sep 29, 2026"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B2B26] text-sm"
                  />
                </div>
              </div>

              {/* COVER PHOTO SECTION (Required by User) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-[#0B2B26]" />
                    <span>Blog Cover Photo *</span>
                  </label>
                  <span className="text-[11px] text-slate-500">URL, upload or preset</span>
                </div>

                {/* Image URL input */}
                <div>
                  <input
                    type="text"
                    value={blogForm.image}
                    onChange={(e) => setBlogForm({ ...blogForm, image: e.target.value })}
                    placeholder="Enter image URL or select a preset below..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B2B26] text-sm bg-white"
                  />
                </div>

                {/* Upload File Input */}
                <div className="flex flex-wrap items-center gap-3">
                  <label className="px-4 py-2 rounded-xl bg-white border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 flex items-center gap-2 cursor-pointer shadow-xs">
                    <Upload className="w-3.5 h-3.5 text-[#0B2B26]" />
                    <span>Upload Local Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileUpload}
                      className="hidden"
                    />
                  </label>

                  <span className="text-xs text-slate-400">or choose quick preset:</span>
                </div>

                {/* Presets */}
                <div className="flex flex-wrap gap-2">
                  {COVER_PRESETS.map((preset) => (
                    <button
                      key={preset.url}
                      type="button"
                      onClick={() => setBlogForm({ ...blogForm, image: preset.url })}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                        blogForm.image === preset.url
                          ? 'bg-[#0B2B26] text-white border-[#0B2B26]'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-400'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                {/* Live Preview */}
                {blogForm.image && (
                  <div className="pt-2">
                    <p className="text-[11px] text-slate-500 font-semibold mb-1">Cover Photo Preview:</p>
                    <div className="relative w-full h-44 rounded-xl overflow-hidden border border-slate-300 bg-slate-200">
                      <img
                        src={blogForm.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/Hero.jpg';
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Excerpt / Summary */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Article Summary / Excerpt *
                </label>
                <textarea
                  rows={2}
                  required
                  value={blogForm.excerpt}
                  onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                  placeholder="A brief overview displayed on cards and search results..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B2B26] text-sm resize-none"
                />
              </div>

              {/* Full Content */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Full Article Body (Separate paragraphs with an empty line) *
                </label>
                <textarea
                  rows={8}
                  required
                  value={blogForm.content}
                  onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                  placeholder="Write the full content of the article here. Each blank line creates a separate readable paragraph on the full article page..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B2B26] text-sm leading-relaxed"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Tags (Comma separated)
                </label>
                <input
                  type="text"
                  value={blogForm.tags}
                  onChange={(e) => setBlogForm({ ...blogForm, tags: e.target.value })}
                  placeholder="Home Care, Pittsburgh, ODP Waiver, Respite"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B2B26] text-sm"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsBlogModalOpen(false)}
                  className="px-5 py-2.5 rounded-full border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-7 py-2.5 rounded-full bg-[#0B2B26] hover:bg-[#071E1A] text-white font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4 text-[#F2D701]" />
                  <span>{editingBlogId ? 'Save Changes' : 'Publish Article'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================
          MODAL: ADD / EDIT SERVICE (HOME CARE OR ODP WAIVER)
         ========================================================= */}
      {isServiceModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[92vh] flex flex-col">
            <div className="px-6 sm:px-8 py-5 bg-[#0B2B26] text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                {serviceType === 'home-care' ? (
                  <Heart className="w-5 h-5 text-[#F2D701]" />
                ) : (
                  <ShieldCheck className="w-5 h-5 text-[#F2D701]" />
                )}
                <h3 className="text-lg font-bold font-display">
                  {editingServiceId ? 'Edit Service' : 'Add New Service'} ({serviceType === 'home-care' ? 'Home Care' : 'ODP Waiver'})
                </h3>
              </div>
              <button
                onClick={() => setIsServiceModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveService} className="p-6 sm:p-8 overflow-y-auto space-y-5 text-left">
              {/* Title */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Service Title *
                </label>
                <input
                  type="text"
                  required
                  value={serviceForm.title}
                  onChange={(e) => setServiceForm({ ...serviceForm, title: e.target.value })}
                  placeholder="e.g. Specialized Overnight Respite"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B2B26] text-sm"
                />
              </div>

              {/* PA Waiver Note (only for ODP) */}
              {serviceType === 'odp-waiver' && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Pennsylvania State Authorization Note
                  </label>
                  <input
                    type="text"
                    value={serviceForm.paWaiverNote}
                    onChange={(e) => setServiceForm({ ...serviceForm, paWaiverNote: e.target.value })}
                    placeholder="e.g. Authorized under Pennsylvania ODP Consolidated Waiver"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B2B26] text-sm"
                  />
                </div>
              )}

              {/* Short Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Short Description (For cards & listings) *
                </label>
                <textarea
                  rows={2}
                  required
                  value={serviceForm.shortDesc}
                  onChange={(e) => setServiceForm({ ...serviceForm, shortDesc: e.target.value })}
                  placeholder="Brief 1-2 sentence summary of this care offering..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B2B26] text-sm resize-none"
                />
              </div>

              {/* Full Description */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Full Page Description (For dedicated service page) *
                </label>
                <textarea
                  rows={4}
                  required
                  value={serviceForm.fullDesc}
                  onChange={(e) => setServiceForm({ ...serviceForm, fullDesc: e.target.value })}
                  placeholder="Detailed explanation of clinical scope, care delivery, and benefits..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B2B26] text-sm"
                />
              </div>

              {/* Inclusions (What's Included) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  What's Included (One task per line)
                </label>
                <textarea
                  rows={4}
                  value={serviceForm.bulletPoints}
                  onChange={(e) => setServiceForm({ ...serviceForm, bulletPoints: e.target.value })}
                  placeholder="Personal hygiene support&#10;Meal preparation&#10;Medication reminders&#10;Transfer assistance"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B2B26] text-sm"
                />
              </div>

              {/* Who It Is For */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Who This Service Is For
                </label>
                <input
                  type="text"
                  value={serviceForm.whoItIsFor}
                  onChange={(e) => setServiceForm({ ...serviceForm, whoItIsFor: e.target.value })}
                  placeholder="e.g. Seniors, adults recovering from surgery, and waiver recipients"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B2B26] text-sm"
                />
              </div>

              {/* How We Help */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  How We Deliver Care (One highlight per line)
                </label>
                <textarea
                  rows={3}
                  value={serviceForm.howWeHelp}
                  onChange={(e) => setServiceForm({ ...serviceForm, howWeHelp: e.target.value })}
                  placeholder="PA-certified caregivers&#10;Nurse-supervised plans&#10;Continuous communication"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B2B26] text-sm"
                />
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsServiceModalOpen(false)}
                  className="px-5 py-2.5 rounded-full border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-7 py-2.5 rounded-full bg-[#0B2B26] hover:bg-[#071E1A] text-white font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95 cursor-pointer flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4 text-[#F2D701]" />
                  <span>{editingServiceId ? 'Save Changes' : 'Publish Service'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================
          MODAL: VIEW FULL CARE ASSESSMENT DETAILS
         ========================================================= */}
      {selectedAssessment && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[92vh] flex flex-col animate-in fade-in duration-200">
            <div className="px-6 sm:px-8 py-5 bg-[#0B2B26] text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-[#E89A24]" />
                <div>
                  <h3 className="text-lg font-bold font-display">
                    Care Assessment Intake Dossier
                  </h3>
                  <p className="text-xs text-slate-300 font-mono">
                    Ref: {selectedAssessment.referenceCode}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedAssessment(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-left text-xs sm:text-sm">
              {/* Client Info Grid */}
              <div className="p-5 rounded-2xl bg-[#FAF4EE] border border-[#EADBCC] space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#E89A24]">
                    Client / Point of Contact
                  </span>
                  <span className="font-semibold text-slate-500 text-xs">
                    Submitted: {selectedAssessment.submittedAt}
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-800">
                  <div>
                    <span className="text-slate-500 block text-xs">Full Name:</span>
                    <strong className="text-base font-bold text-[#0B2B26]">{selectedAssessment.name}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-xs">Care Recipient:</span>
                    <strong>{selectedAssessment.recipient}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-xs">Phone Number:</span>
                    <a href={`tel:${selectedAssessment.phone}`} className="font-semibold text-[#0B2B26] hover:underline">
                      {selectedAssessment.phone || 'N/A'}
                    </a>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-xs">Email Address:</span>
                    <a href={`mailto:${selectedAssessment.email}`} className="font-semibold text-[#0B2B26] hover:underline">
                      {selectedAssessment.email || 'N/A'}
                    </a>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-xs">Location:</span>
                    <span>{selectedAssessment.township ? `${selectedAssessment.township}, ` : ''}{selectedAssessment.county}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-xs">Current Status:</span>
                    <span className="capitalize font-bold text-emerald-800">{selectedAssessment.status}</span>
                  </div>
                </div>
              </div>

              {/* Support Requirements */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Care Schedule & Services Requested
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <div>
                    <span className="text-slate-500 text-xs block">Service Line:</span>
                    <strong className="capitalize">{selectedAssessment.serviceCategory}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 text-xs block">Preferred Timeframe:</span>
                    <strong>{selectedAssessment.timeframe}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 text-xs block">Hours per Week:</span>
                    <strong>{selectedAssessment.hoursPerWeek}</strong>
                  </div>
                </div>

                <div>
                  <span className="text-slate-500 text-xs block mb-1 font-semibold">
                    Specific In-Home or Community Supports:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedAssessment.selectedServices.map((srv, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-xl bg-white border border-slate-300 font-semibold text-[#0B2B26] text-xs shadow-2xs"
                      >
                        ✓ {srv}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedAssessment.notes && (
                  <div>
                    <span className="text-slate-500 text-xs block mb-1 font-semibold">
                      Client Notes & Special Instructions:
                    </span>
                    <div className="p-4 bg-amber-50/60 border border-amber-200/80 rounded-2xl text-slate-800 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
                      {selectedAssessment.notes}
                    </div>
                  </div>
                )}
              </div>

              {/* Status Update Quick Select */}
              <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-700">Change Status:</span>
                  <select
                    value={selectedAssessment.status}
                    onChange={(e) => {
                      const newSt = e.target.value as any;
                      handleUpdateAssessmentStatus(selectedAssessment.id, newSt);
                      setSelectedAssessment({ ...selectedAssessment, status: newSt });
                    }}
                    className="text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="completed">Completed</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDeleteAssessment(selectedAssessment.id)}
                    className="px-4 py-2 rounded-xl text-rose-700 bg-rose-50 hover:bg-rose-100 text-xs font-bold cursor-pointer"
                  >
                    Delete Record
                  </button>
                  <button
                    onClick={() => setSelectedAssessment(null)}
                    className="px-6 py-2 rounded-xl bg-[#0B2B26] text-white text-xs font-bold hover:bg-[#071E1A] cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          MODAL: ADD / EDIT JOB POSTING
         ========================================================= */}
      {isJobModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[92vh] flex flex-col animate-in fade-in duration-200">
            <div className="px-6 sm:px-8 py-5 bg-[#0B2B26] text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <Briefcase className="w-5 h-5 text-[#E89A24]" />
                <h3 className="text-lg font-bold font-display">
                  {editingJobId ? 'Edit Job Posting' : 'Post New Career Opportunity'}
                </h3>
              </div>
              <button
                onClick={() => setIsJobModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveJob} className="p-6 sm:p-8 overflow-y-auto space-y-5 text-left">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Job Title *
                </label>
                <input
                  type="text"
                  required
                  value={jobForm.title}
                  onChange={(e) => setJobForm({ ...jobForm, title: e.target.value })}
                  placeholder="e.g. Direct Support Professional (DSP) - ODP Waiver"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#0B2B26] text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Department
                  </label>
                  <select
                    value={jobForm.department}
                    onChange={(e) => setJobForm({ ...jobForm, department: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs bg-white"
                  >
                    <option>Home Care Services</option>
                    <option>ODP Waiver Services</option>
                    <option>Specialized Care</option>
                    <option>ODP & Family Respite</option>
                    <option>Clinical Administration</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Employment Type
                  </label>
                  <select
                    value={jobForm.type}
                    onChange={(e) => setJobForm({ ...jobForm, type: e.target.value as any })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs bg-white"
                  >
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>PRN</option>
                    <option>Flexible</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Status
                  </label>
                  <select
                    value={jobForm.status}
                    onChange={(e) => setJobForm({ ...jobForm, status: e.target.value as any })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-xs bg-white"
                  >
                    <option value="active">Active (Visible)</option>
                    <option value="closed">Closed / Archived</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Pay Range *
                  </label>
                  <input
                    type="text"
                    required
                    value={jobForm.payRange}
                    onChange={(e) => setJobForm({ ...jobForm, payRange: e.target.value })}
                    placeholder="e.g. $17.50 - $22.00 / hr"
                    className="w-full px-4 py-2 rounded-xl border border-slate-300 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Job Location *
                  </label>
                  <input
                    type="text"
                    required
                    value={jobForm.location}
                    onChange={(e) => setJobForm({ ...jobForm, location: e.target.value })}
                    placeholder="e.g. Canonsburg, PA & Allegheny County"
                    className="w-full px-4 py-2 rounded-xl border border-slate-300 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Job Description *
                </label>
                <textarea
                  rows={4}
                  required
                  value={jobForm.description}
                  onChange={(e) => setJobForm({ ...jobForm, description: e.target.value })}
                  placeholder="Describe day-to-day duties, client interaction, and purpose..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Requirements (One per line)
                </label>
                <textarea
                  rows={3}
                  value={jobForm.requirements}
                  onChange={(e) => setJobForm({ ...jobForm, requirements: e.target.value })}
                  placeholder="Valid Driver's license&#10;Clean clearances&#10;CPR certified"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Benefits & Perks (One per line)
                </label>
                <textarea
                  rows={3}
                  value={jobForm.benefits}
                  onChange={(e) => setJobForm({ ...jobForm, benefits: e.target.value })}
                  placeholder="Weekly direct deposit&#10;Paid training&#10;Flexible schedules"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm"
                />
              </div>

              {/* Document Uploads Configuration for Applicants */}
              <div className="space-y-3 pt-3 border-t border-slate-200">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                    Required Document Uploads for Applicants
                  </label>
                  <p className="text-xs text-slate-500">
                    Configure which credentials or certificates applicants must upload when applying for this role.
                  </p>
                </div>

                <div className="space-y-2">
                  {jobForm.requiredUploads.map((uploadReq, idx) => (
                    <div
                      key={uploadReq.id}
                      className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center gap-2.5">
                        <FileCheck2 className="w-4 h-4 text-[#E89A24] shrink-0" />
                        <div>
                          <span className="font-bold text-slate-800">{uploadReq.label}</span>
                          {uploadReq.description && (
                            <span className="text-[11px] text-slate-400 block">
                              {uploadReq.description}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            const updated = jobForm.requiredUploads.map((u, i) =>
                              i === idx ? { ...u, required: !u.required } : u
                            );
                            setJobForm({ ...jobForm, requiredUploads: updated });
                          }}
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold cursor-pointer transition-colors ${
                            uploadReq.required
                              ? 'bg-rose-100 text-rose-800 border border-rose-200'
                              : 'bg-slate-200 text-slate-600'
                          }`}
                        >
                          {uploadReq.required ? 'Mandatory' : 'Optional'}
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            const updated = jobForm.requiredUploads.filter((_, i) => i !== idx);
                            setJobForm({ ...jobForm, requiredUploads: updated });
                          }}
                          className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                          title="Remove requirement"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Custom Upload Requirement input */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="text"
                    value={customUploadDocName}
                    onChange={(e) => setCustomUploadDocName(e.target.value)}
                    placeholder="e.g. CNA Registry Card, TB Screening, CPR Certificate..."
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-300 text-xs"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (!customUploadDocName.trim()) return;
                      const newReq: UploadRequirement = {
                        id: `custom-${Date.now()}`,
                        label: customUploadDocName.trim(),
                        required: true,
                        description: 'Mandatory applicant certificate'
                      };
                      setJobForm({
                        ...jobForm,
                        requiredUploads: [...jobForm.requiredUploads, newReq]
                      });
                      setCustomUploadDocName('');
                    }}
                    className="px-4 py-2 bg-[#0B2B26] hover:bg-[#071E1A] text-white text-xs font-bold rounded-xl cursor-pointer"
                  >
                    + Add Upload Requirement
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsJobModalOpen(false)}
                  className="px-5 py-2.5 rounded-full border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-7 py-2.5 rounded-full bg-[#0B2B26] hover:bg-[#071E1A] text-white font-bold text-xs sm:text-sm shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4 text-[#F2D701]" />
                  <span>{editingJobId ? 'Save Changes' : 'Publish Job'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================
          MODAL: VIEW FULL JOB APPLICATION DOSSIER
         ========================================================= */}
      {selectedApplication && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[92vh] flex flex-col animate-in fade-in duration-200">
            <div className="px-6 sm:px-8 py-5 bg-[#0B2B26] text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <User className="w-5 h-5 text-[#E89A24]" />
                <h3 className="text-lg font-bold font-display">
                  Applicant Profile: {selectedApplication.applicantName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedApplication(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto space-y-4 text-left text-xs sm:text-sm">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  APPLIED POSITION
                </span>
                <strong className="text-base font-bold text-[#0B2B26] block">
                  {selectedApplication.jobTitle}
                </strong>
                <span className="text-xs text-slate-500 block">
                  Applied on {selectedApplication.submittedAt}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-800">
                <div>
                  <span className="text-slate-500 block text-xs">Phone:</span>
                  <a href={`tel:${selectedApplication.phone}`} className="font-semibold text-[#0B2B26] hover:underline">
                    {selectedApplication.phone}
                  </a>
                </div>
                <div>
                  <span className="text-slate-500 block text-xs">Email:</span>
                  <a href={`mailto:${selectedApplication.email}`} className="font-semibold text-[#0B2B26] hover:underline">
                    {selectedApplication.email}
                  </a>
                </div>
                <div>
                  <span className="text-slate-500 block text-xs">Location / City:</span>
                  <span>{selectedApplication.city}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-xs">Experience:</span>
                  <span>{selectedApplication.experienceYears}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-xs">Availability:</span>
                  <span>{selectedApplication.availability}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-xs">Current Status:</span>
                  <span className="capitalize font-bold text-emerald-800">
                    {selectedApplication.status.replace('_', ' ')}
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-slate-500 text-xs block font-semibold">
                  Applicant Bio & Summary:
                </span>
                <div className="p-4 bg-[#FAF4EE] border border-[#EADBCC] rounded-2xl text-slate-800 text-xs leading-relaxed whitespace-pre-wrap">
                  {selectedApplication.resumeOrBio}
                </div>
              </div>

              {/* Uploaded Certificates & Credentials Section */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="text-slate-700 text-xs font-bold uppercase tracking-wider block">
                    Uploaded Documents & Certificates ({selectedApplication.uploadedDocuments?.length || 0})
                  </span>
                  {selectedApplication.uploadedDocuments && selectedApplication.uploadedDocuments.length > 0 && (
                    <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      Files Attached
                    </span>
                  )}
                </div>

                {selectedApplication.uploadedDocuments && selectedApplication.uploadedDocuments.length > 0 ? (
                  <div className="space-y-2">
                    {selectedApplication.uploadedDocuments.map((doc, idx) => (
                      <div
                        key={doc.id || idx}
                        className="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between gap-3 shadow-2xs"
                      >
                        <div className="flex items-center gap-2.5 overflow-hidden">
                          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                            <FileCheck2 className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="text-xs font-bold text-slate-800 truncate">
                              {doc.name}
                            </div>
                            <div className="text-[10px] text-slate-400">
                              {doc.category} · {(doc.size / 1024).toFixed(1)} KB
                            </div>
                          </div>
                        </div>

                        {doc.dataUrl ? (
                          <a
                            href={doc.dataUrl}
                            download={doc.name}
                            className="px-3 py-1.5 rounded-lg bg-[#0B2B26] hover:bg-[#071E1A] text-white text-[11px] font-bold flex items-center gap-1.5 shrink-0 transition-colors"
                            title={`Download ${doc.name}`}
                          >
                            <Download className="w-3.5 h-3.5 text-[#E89A24]" />
                            <span>Download / View</span>
                          </a>
                        ) : (
                          <span className="text-[10px] text-slate-400">Attached</span>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-3 bg-slate-50 rounded-xl border border-dashed border-slate-200 text-slate-400 text-xs text-center">
                    No certificate files uploaded with this submission.
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-700">Update Status:</span>
                  <select
                    value={selectedApplication.status}
                    onChange={(e) => {
                      const newSt = e.target.value as any;
                      handleUpdateApplicationStatus(selectedApplication.id, newSt);
                      setSelectedApplication({ ...selectedApplication, status: newSt });
                    }}
                    className="text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-300 bg-white"
                  >
                    <option value="new">New</option>
                    <option value="reviewing">Reviewing</option>
                    <option value="interview_scheduled">Interview Scheduled</option>
                    <option value="hired">Hired</option>
                    <option value="declined">Declined</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDeleteApplication(selectedApplication.id)}
                    className="px-4 py-2 rounded-xl text-rose-700 bg-rose-50 hover:bg-rose-100 text-xs font-bold cursor-pointer"
                  >
                    Delete Application
                  </button>
                  <button
                    onClick={() => setSelectedApplication(null)}
                    className="px-6 py-2 rounded-xl bg-[#0B2B26] text-white text-xs font-bold hover:bg-[#071E1A] cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
