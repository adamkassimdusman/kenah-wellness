import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Shield, Lock, FileText, CheckCircle2, Phone, Mail, MapPin } from 'lucide-react';
import { PageId } from '../types';

interface PrivacyPolicyPageProps {
  onNavigate: (page: PageId) => void;
  onOpenAssessment: () => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({
  onNavigate,
  onOpenAssessment
}) => {
  return (
    <div className="space-y-16 pb-24 text-left font-sans">
      <Breadcrumbs items={[{ label: 'Privacy Policy' }]} onNavigate={onNavigate} />

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[32px] sm:rounded-[44px] bg-[#F8EDE2] p-8 sm:p-14 border border-[#EADBCC] relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-sm text-[#0B2B26] text-xs font-bold uppercase tracking-wider border border-[#0B2B26]/10">
              <Shield className="w-3.5 h-3.5 text-[#E89A24]" />
              <span>Legal & Data Protection</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0B2B26] font-display tracking-tight text-balance leading-[1.12]">
              Privacy Policy & Notice of Privacy Practices
            </h1>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-2xl pt-1">
              Effective Date: January 1, 2026 · Last Updated: September 2026
            </p>
          </div>
        </div>
      </section>

      {/* Content Container */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[32px] p-6 sm:p-12 border border-slate-200 shadow-xs space-y-10 text-slate-700 leading-relaxed text-sm sm:text-base">
          
          {/* Introduction */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B2B26] font-display">
              1. Our Commitment to Your Privacy
            </h2>
            <p>
              Kenah Wellness Services LLC ("Kenah Wellness," "we," "our," or "us") is dedicated to safeguarding the privacy and personal dignity of our clients, family members, job applicants, and website visitors. This Privacy Policy details how we collect, store, utilize, and protect personal and health-related information when you visit <strong>https://kenahwellness.com/</strong>, use our online forms, submit care assessments, or inquire about our Home Care and Pennsylvania Office of Developmental Programs (ODP) waiver services.
            </p>
            <p>
              We adhere to applicable federal and state data privacy regulations and maintain stringent confidentiality standards regarding all information provided to us.
            </p>
          </div>

          {/* Information Collected */}
          <div className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B2B26] font-display">
              2. Information We Collect
            </h2>
            <p>
              We collect information that you voluntarily furnish when interacting with our digital platform, including:
            </p>
            <ul className="space-y-2 list-disc list-inside pl-2 text-slate-600">
              <li>
                <strong className="text-slate-800">Contact & Identity Details:</strong> Full legal name, telephone number, email address, home address, and township or county of residence.
              </li>
              <li>
                <strong className="text-slate-800">Care Assessment & Intake Data:</strong> Information concerning the care recipient (e.g., senior parent, adult with intellectual or developmental disability), requested service lines (Personal Care, In-Home Respite, Habilitation, Community Participation Support, Dementia Care), scheduling requirements, and family care notes.
              </li>
              <li>
                <strong className="text-slate-800">Career & Employment Applications:</strong> Resume/bio summaries, years of caregiving experience, professional certifications (CNA, HHA, CPR), availability, and confirmation of mandatory Pennsylvania clearances and driver’s licensure.
              </li>
              <li>
                <strong className="text-slate-800">Technical & Device Data:</strong> Anonymized analytical metrics such as browser type, operating system, pages visited, and general geographic location, gathered via consent-based cookies.
              </li>
            </ul>
          </div>

          {/* Handling of Health and Assessment Information */}
          <div className="space-y-3 p-6 rounded-2xl bg-[#FAF4EE] border border-[#EADBCC]">
            <div className="flex items-center gap-2 text-[#0B2B26] font-bold text-base">
              <Lock className="w-5 h-5 text-[#E89A24]" />
              <h3>3. Sensitive Health & Waiver Information Handling</h3>
            </div>
            <p className="text-sm text-slate-700">
              Any medical diagnosis, disability assessment, or care schedule shared through our Free Assessment form is treated as strictly confidential. Such data is utilized solely for:
            </p>
            <ul className="text-xs sm:text-sm space-y-1 list-disc list-inside text-slate-600 pl-2">
              <li>Evaluating care requirements and drafting Individualized Support Plans (ISPs).</li>
              <li>Verifying eligibility with Pennsylvania County Supports Coordinators (SCs) and ODP administrative entities.</li>
              <li>Matching clients with trained caregivers and Direct Support Professionals (DSPs).</li>
            </ul>
            <p className="text-xs text-slate-500 pt-2 font-medium">
              We never disclose, rent, or sell client health or disability details to third-party commercial vendors or advertising networks.
            </p>
          </div>

          {/* How Information is Used */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B2B26] font-display">
              4. How We Use Collected Information
            </h2>
            <p>
              Your information is processed for specific, legitimate operational purposes:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70">
                <strong className="text-xs font-bold uppercase tracking-wider text-[#0B2B26] block mb-1">
                  Service Delivery
                </strong>
                <span className="text-xs text-slate-600">
                  To coordinate free in-home consultations, verify coverage, and launch personalized home care routines.
                </span>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70">
                <strong className="text-xs font-bold uppercase tracking-wider text-[#0B2B26] block mb-1">
                  Communication
                </strong>
                <span className="text-xs text-slate-600">
                  To respond to inquiries, confirm appointments, and provide family updates via phone or email.
                </span>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70">
                <strong className="text-xs font-bold uppercase tracking-wider text-[#0B2B26] block mb-1">
                  Recruitment & Safety
                </strong>
                <span className="text-xs text-slate-600">
                  To review caregiver applications and verify PA Department of Human Services compliance.
                </span>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/70">
                <strong className="text-xs font-bold uppercase tracking-wider text-[#0B2B26] block mb-1">
                  Quality Improvement
                </strong>
                <span className="text-xs text-slate-600">
                  To evaluate website usability, prevent fraudulent submissions, and enhance family resources.
                </span>
              </div>
            </div>
          </div>

          {/* Third-Party Disclosure */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B2B26] font-display">
              5. Disclosure to Third Parties
            </h2>
            <p>
              Kenah Wellness Services maintains strict non-disclosure practices. Information is disclosed solely in the following limited circumstances:
            </p>
            <ul className="space-y-2 list-disc list-inside pl-2 text-slate-600 text-sm">
              <li>
                <strong className="text-slate-800">Authorized Care Partners:</strong> County Supports Coordinators (SCs), registered nurses, and direct care personnel directly assigned to the client’s care plan.
              </li>
              <li>
                <strong className="text-slate-800">Regulatory Authorities:</strong> State agencies (such as the PA Department of Health or Department of Human Services) when legally required by state reporting regulations.
              </li>
              <li>
                <strong className="text-slate-800">Emergency Situations:</strong> Emergency medical personnel or first responders if necessary to safeguard the physical safety or life of a client.
              </li>
            </ul>
          </div>

          {/* Cookie Policy */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B2B26] font-display">
              6. Cookies & Consent Choices
            </h2>
            <p>
              We utilize essential operational cookies necessary for navigating our website and remembering assessment session states. We also provide opt-in settings for anonymous analytical cookies that help us understand web traffic patterns. You may accept, reject, or adjust your cookie preferences at any time using our Cookie Consent Banner or settings link.
            </p>
          </div>

          {/* Data Security */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B2B26] font-display">
              7. Data Security & Storage
            </h2>
            <p>
              We employ industry-standard technical safeguards, including HTTPS SSL encryption in transit, strict administrative role-based access controls, and secure data storage to protect personal records against unauthorized access, loss, or alteration.
            </p>
          </div>

          {/* Your Rights */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B2B26] font-display">
              8. Your Privacy Rights
            </h2>
            <p>
              You have the right to request access to the personal contact details we hold regarding your inquiry, request corrections to inaccurate records, or request deletion of contact information where legal retention requirements allow.
            </p>
          </div>

          {/* Contact Details */}
          <div className="pt-6 border-t border-slate-200 space-y-4">
            <h2 className="text-xl font-bold text-[#0B2B26] font-display">
              9. Privacy Officer Contact Information
            </h2>
            <p className="text-sm">
              For questions concerning this Privacy Policy, our data protection measures, or to exercise your rights, please reach out to our team:
            </p>
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm space-y-2">
              <div className="font-bold text-[#0B2B26]">Kenah Wellness Services LLC</div>
              <div className="flex items-center gap-2 text-slate-600">
                <MapPin className="w-4 h-4 text-[#E89A24]" />
                <span>2400 Ansys Drive, Suite 169, Canonsburg, PA 15317</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Phone className="w-4 h-4 text-[#E89A24]" />
                <a href="tel:+14125461860" className="hover:underline font-semibold text-[#0B2B26]">
                  +1 (412) 546-1860
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Mail className="w-4 h-4 text-[#E89A24]" />
                <a href="mailto:info@kenahwellness.com" className="hover:underline font-semibold text-[#0B2B26]">
                  info@kenahwellness.com
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* CTA Box */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[32px] bg-[#0B2B26] text-white p-8 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
          <div>
            <h3 className="text-xl font-bold font-display">
              Questions About In-Home Care or ODP Waivers?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Our clinical and intake coordinators are ready to assist your family with complete confidentiality.
            </p>
          </div>
          <button
            onClick={onOpenAssessment}
            className="px-6 py-3 rounded-full bg-[#E89A24] hover:bg-[#d68a18] text-white font-bold text-xs sm:text-sm transition-all shadow-md shrink-0 cursor-pointer"
          >
            Free Assessment
          </button>
        </div>
      </section>
    </div>
  );
};
