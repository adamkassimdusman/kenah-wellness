import React from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { FileText, AlertCircle, CheckCircle2, Phone, Mail, MapPin, Scale } from 'lucide-react';
import { PageId } from '../types';

interface TermsConditionsPageProps {
  onNavigate: (page: PageId) => void;
  onOpenAssessment: () => void;
}

export const TermsConditionsPage: React.FC<TermsConditionsPageProps> = ({
  onNavigate,
  onOpenAssessment
}) => {
  return (
    <div className="space-y-16 pb-24 text-left font-sans">
      <Breadcrumbs items={[{ label: 'Terms & Conditions' }]} onNavigate={onNavigate} />

      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-[32px] sm:rounded-[44px] bg-[#F8EDE2] p-8 sm:p-14 border border-[#EADBCC] relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-sm text-[#0B2B26] text-xs font-bold uppercase tracking-wider border border-[#0B2B26]/10">
              <Scale className="w-3.5 h-3.5 text-[#E89A24]" />
              <span>Terms of Service</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0B2B26] font-display tracking-tight text-balance leading-[1.12]">
              Terms of Use & Service Agreement
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
          
          {/* Section 1 */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B2B26] font-display">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing, browsing, or utilizing the website <strong>https://kenahwellness.com/</strong>, requesting a free assessment, or engaging services provided by Kenah Wellness Services LLC ("Kenah Wellness," "we," "our," or "us"), you acknowledge that you have read, understood, and agreed to be bound by these Terms of Use and our accompanying Privacy Policy.
            </p>
            <p>
              If you do not agree with any part of these terms, please refrain from using this website or submitting personal inquiries through our digital portals.
            </p>
          </div>

          {/* Section 2: Medical Disclaimer */}
          <div className="p-6 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2 text-amber-900">
            <div className="flex items-center gap-2 font-bold text-base text-amber-950">
              <AlertCircle className="w-5 h-5 text-[#E89A24]" />
              <h3>2. Medical Emergency & Clinical Disclaimer</h3>
            </div>
            <p className="text-xs sm:text-sm leading-relaxed">
              <strong>THIS WEBSITE AND OUR SERVICES ARE NOT INTENDED FOR MEDICAL EMERGENCIES.</strong> If you or your loved one is experiencing a life-threatening medical emergency, call 911 immediately or proceed to the nearest emergency room.
            </p>
            <p className="text-xs sm:text-sm leading-relaxed text-amber-800">
              Kenah Wellness provides non-medical home care, personal hygiene support, companionship, respite care, and Pennsylvania Office of Developmental Programs (ODP) waiver services. Information provided on this website is for educational and informational purposes only and does not constitute medical advice or clinical diagnosis.
            </p>
          </div>

          {/* Section 3 */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B2B26] font-display">
              3. Scope of Services & Free Assessments
            </h2>
            <p>
              Kenah Wellness Services operates as a licensed home care agency in the Commonwealth of Pennsylvania, delivering:
            </p>
            <ul className="space-y-1.5 list-disc list-inside text-slate-600 pl-2 text-sm sm:text-base">
              <li>Senior Home Care & Personal Assistance</li>
              <li>Dementia Care & Memory Support Routines</li>
              <li>In-Home Respite & Out-of-Home Community Respite</li>
              <li>Habilitation (HAB) and Daily Living Skills Coaching</li>
              <li>Community Participation Support (CPS) for Adults with Intellectual Disabilities & Autism</li>
              <li>Companionship, Errand Assistance, and Homemaking</li>
            </ul>
            <p>
              Our <strong>Free Assessment</strong> is a complimentary evaluation conducted at your residence or virtually to review care preferences and verify eligibility. Requesting an assessment does not create a binding service contract until a formal Service Agreement or Individualized Support Plan (ISP) authorization is executed.
            </p>
          </div>

          {/* Section 4 */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B2B26] font-display">
              4. User Responsibilities & Accurate Information
            </h2>
            <p>
              When utilizing our online assessment intake forms, contact pages, or career application tools, you agree to:
            </p>
            <ul className="space-y-2 list-disc list-inside text-slate-600 pl-2 text-sm sm:text-base">
              <li>Provide accurate, truthful, and current information regarding care recipients or applicant credentials.</li>
              <li>Not impersonate any individual or submit false information on behalf of another party without lawful authorization.</li>
              <li>Not attempt to compromise website security, introduce malicious code, or scrape site content.</li>
            </ul>
          </div>

          {/* Section 5 */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B2B26] font-display">
              5. Intellectual Property Rights
            </h2>
            <p>
              All materials displayed on this website—including text, graphics, logos, brand emblems, photographic imagery, blog guides, and software code—are the intellectual property of Kenah Wellness Services LLC or its licensors. Unauthorized reproduction, modification, or commercial distribution is prohibited.
            </p>
          </div>

          {/* Section 6 */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B2B26] font-display">
              6. Limitation of Liability
            </h2>
            <p>
              To the fullest extent permitted by Pennsylvania law, Kenah Wellness Services LLC shall not be liable for any indirect, incidental, consequential, or punitive damages arising from your access to or inability to use this website, including errors or interruptions in digital transmission.
            </p>
          </div>

          {/* Section 7 */}
          <div className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B2B26] font-display">
              7. Governing Law & Jurisdiction
            </h2>
            <p>
              These Terms of Use shall be governed by and construed in accordance with the laws of the Commonwealth of Pennsylvania, without giving effect to conflict of laws principles. Any legal proceedings arising from these terms shall be instituted in the state or federal courts situated in Washington County or Allegheny County, Pennsylvania.
            </p>
          </div>

          {/* Section 8: Contact */}
          <div className="pt-6 border-t border-slate-200 space-y-4">
            <h2 className="text-xl font-bold text-[#0B2B26] font-display">
              8. Contact & Notice Information
            </h2>
            <p className="text-sm">
              If you have any questions or require legal notice communication regarding these terms, please contact:
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
              Ready to Discuss Personalized Home Care?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Speak with a local care coordinator or schedule your free in-home consultation today.
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
