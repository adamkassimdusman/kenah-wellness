import React, { useEffect } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  User,
  Share2,
  Tag,
  CheckCircle2,
  Phone,
  Sparkles,
  ChevronRight,
  Bookmark,
  ShieldCheck
} from 'lucide-react';
import { BlogPost, PageId } from '../types';
import { getStoredBlogs } from '../utils/storage';

interface BlogDetailPageProps {
  post: BlogPost | null;
  onNavigate: (page: PageId) => void;
  onSelectBlog: (post: BlogPost) => void;
  onOpenAssessment: () => void;
}

export const BlogDetailPage: React.FC<BlogDetailPageProps> = ({
  post,
  onNavigate,
  onSelectBlog,
  onOpenAssessment
}) => {
  const allBlogs = getStoredBlogs();
  const currentPost = post || allBlogs[0];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPost.id]);

  const currentIndex = allBlogs.findIndex((b) => b.id === currentPost.id);
  const prevPost = currentIndex > 0 ? allBlogs[currentIndex - 1] : allBlogs[allBlogs.length - 1];
  const nextPost = currentIndex < allBlogs.length - 1 ? allBlogs[currentIndex + 1] : allBlogs[0];

  const relatedPosts = allBlogs.filter((b) => b.id !== currentPost.id).slice(0, 3);

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: currentPost.title,
          text: currentPost.excerpt,
          url: window.location.href
        })
        .catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-left font-sans pb-24">
      {/* Top Breadcrumb & Navigation Bar */}
      <div className="bg-white border-b border-slate-200/80 sticky top-16 z-20 backdrop-blur-md bg-white/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 overflow-x-auto whitespace-nowrap">
            <button
              onClick={() => onNavigate('home')}
              className="hover:text-[#0B2B26] font-medium cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <button
              onClick={() => onNavigate('blog')}
              className="hover:text-[#0B2B26] font-medium cursor-pointer"
            >
              Care Blog
            </button>
            <ChevronRight className="w-3.5 h-3.5 shrink-0" />
            <span className="text-[#0B2B26] font-bold truncate max-w-[200px] sm:max-w-md">
              {currentPost.title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('blog')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Back to All Articles</span>
              <span className="sm:hidden">Articles</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-[#0B2B26] to-[#12463F] text-white pt-12 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F2D701_1px,transparent_1px)] [background-size:20px_20px]" />

        <div className="max-w-4xl mx-auto relative z-10 space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3.5 py-1 rounded-full bg-[#E89A24] text-white text-xs font-bold uppercase tracking-wider">
              {currentPost.category}
            </span>
            <span className="text-xs text-slate-300 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#F2D701]" />
              {currentPost.date}
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-xs text-slate-300 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#4EBAA8]" />
              {currentPost.readTime}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display text-white leading-[1.2]">
            {currentPost.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-3xl">
            {currentPost.excerpt}
          </p>

          {/* Author Byline & Share Bar */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/15 border border-white/20 flex items-center justify-center text-white font-bold text-sm">
                <User className="w-5 h-5 text-[#F2D701]" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">{currentPost.author.name}</p>
                <p className="text-xs text-slate-300">{currentPost.author.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Article Body & Cover Image Container */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        {/* Cover Photo */}
        <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border-4 sm:border-8 border-white bg-white">
          <div className="relative w-full aspect-[16/9] max-h-[460px] overflow-hidden bg-slate-100">
            <img
              src={currentPost.image}
              alt={currentPost.title}
              className="w-full h-full object-cover object-center"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/Hero.jpg';
              }}
            />
          </div>
        </div>

        {/* Content Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-sm border border-slate-200/80 mt-8 space-y-8">
          {/* Key Takeaways Box */}
          <div className="p-6 rounded-2xl bg-[#F8EDE2] border border-[#EADBCC] space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0B2B26]">
              <Sparkles className="w-4 h-4 text-[#E89A24]" />
              <span>Key Clinical & Family Takeaways</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Person-centered care is rooted in honoring the unique dignity and daily rhythms of each individual. Kenah Wellness Services guides families across Western PA through every step of in-home care delivery and ODP waiver funding.
            </p>
          </div>

          {/* Formatted Paragraphs */}
          <div className="space-y-6 text-slate-700 text-base sm:text-lg leading-relaxed">
            {currentPost.content.map((paragraph, idx) => (
              <p key={idx} className="first-letter:text-3xl first-letter:font-bold first-letter:text-[#0B2B26] first-letter:mr-1">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Tags */}
          <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5" />
              Tags:
            </span>
            {currentPost.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Consultation Callout Banner */}
          <div className="rounded-2xl bg-gradient-to-r from-[#0B2B26] to-[#12463F] text-white p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
            <div className="space-y-2 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-[#F2D701] text-[11px] font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Pennsylvania Home Care & ODP Guidance</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-display">
                Need Help Navigating Care for Your Loved One?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md">
                Our care coordinators provide 100% free assessments to help you determine eligible waiver hours or home care schedules.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full sm:w-auto">
              <button
                onClick={onOpenAssessment}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#E89A24] hover:bg-[#d68a18] text-white font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95 cursor-pointer whitespace-nowrap"
              >
                Book Free Assessment
              </button>
              <a
                href="tel:7245842817"
                className="w-full sm:w-auto px-5 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs sm:text-sm border border-white/20 flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <Phone className="w-3.5 h-3.5 text-[#F2D701]" />
                <span>(724) 584-2817</span>
              </a>
            </div>
          </div>

          {/* Prev / Next Pagination */}
          <div className="pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => onSelectBlog(prevPost)}
              className="p-4 rounded-2xl border border-slate-200 hover:border-[#0B2B26] transition-all text-left flex items-center gap-3 group cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-slate-400 group-hover:text-[#0B2B26] transition-colors shrink-0" />
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Previous Article</span>
                <span className="text-xs sm:text-sm font-bold text-[#0B2B26] truncate block">{prevPost.title}</span>
              </div>
            </button>

            <button
              onClick={() => onSelectBlog(nextPost)}
              className="p-4 rounded-2xl border border-slate-200 hover:border-[#0B2B26] transition-all text-right flex items-center justify-end gap-3 group cursor-pointer"
            >
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Next Article</span>
                <span className="text-xs sm:text-sm font-bold text-[#0B2B26] truncate block">{nextPost.title}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#0B2B26] transition-colors shrink-0" />
            </button>
          </div>
        </div>

        {/* Related Articles Grid */}
        {relatedPosts.length > 0 && (
          <div className="mt-14 space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold text-[#0B2B26] font-display">
              More Family Care Resources
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedPosts.map((related) => (
                <div
                  key={related.id}
                  onClick={() => onSelectBlog(related)}
                  className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div className="relative h-40 overflow-hidden bg-slate-100">
                    <img
                      src={related.image}
                      alt={related.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/Hero.jpg';
                      }}
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <span className="px-2 py-0.5 rounded-full bg-[#0B2B26]/90 text-white text-[10px] font-semibold">
                        {related.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] text-slate-400 mb-1 flex items-center gap-1.5">
                        <span>{related.date}</span>
                        <span>•</span>
                        <span>{related.readTime}</span>
                      </div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#0B2B26] group-hover:text-[#E89A24] transition-colors line-clamp-2 leading-snug">
                        {related.title}
                      </h4>
                    </div>

                    <div className="pt-3 border-t border-slate-100 mt-3 flex items-center justify-between text-[11px] font-bold text-[#0B2B26] group-hover:text-[#E89A24]">
                      <span>Read Guide</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
