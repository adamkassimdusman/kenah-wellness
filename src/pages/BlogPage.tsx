import React, { useState, useEffect } from 'react';
import { Search, Calendar, Clock, ArrowRight, BookOpen, User, Tag, ChevronRight, X, Phone } from 'lucide-react';
import { BlogPost, PageId } from '../types';
import { getStoredBlogs, DATA_CHANGE_EVENT } from '../utils/storage';

interface BlogPageProps {
  onNavigate: (page: PageId) => void;
  onOpenAssessment: () => void;
  onSelectBlog: (post: BlogPost) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({
  onNavigate,
  onOpenAssessment,
  onSelectBlog
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [blogsList, setBlogsList] = useState<BlogPost[]>(() => getStoredBlogs());

  useEffect(() => {
    const handleDataUpdate = () => {
      setBlogsList(getStoredBlogs());
    };
    window.addEventListener(DATA_CHANGE_EVENT, handleDataUpdate);
    return () => window.removeEventListener(DATA_CHANGE_EVENT, handleDataUpdate);
  }, []);

  const baseCategories = [
    'All',
    'Caregiver Tips',
    'ODP Updates',
    'Company News',
    'Senior Home Care',
    'Dementia Care'
  ];

  // Dynamically collect unique categories from existing stored blogs
  const storedCategories = Array.from(new Set(blogsList.map((b) => b.category).filter(Boolean)));
  const categories = Array.from(new Set([...baseCategories, ...storedCategories]));

  const filteredPosts = blogsList.filter((post) => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPost = blogsList[0];

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-left font-sans pb-24">
      {/* Hero Header */}
      <section className="bg-[#0B2B26] text-white pt-16 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F2D701_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-[#F2D701] text-xs font-semibold uppercase tracking-wider mb-4 border border-white/15">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Care Resources & Insights</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-display mb-4 text-white">
              Kenah Wellness Family Care Blog
            </h1>
            <p className="text-base sm:text-lg text-slate-200 leading-relaxed max-w-2xl">
              Practical guides, caregiver advice, and expert navigation for Pennsylvania Home Care and ODP Waiver programs.
            </p>
          </div>

          {/* Search Bar & Filter Tabs */}
          <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 max-w-2xl">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles by topic, keyword, or waiver..."
                className="w-full pl-11 pr-4 py-3 rounded-full bg-white text-slate-900 placeholder:text-slate-400 text-sm focus:outline-hidden focus:ring-2 focus:ring-[#F2D701] shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs bg-slate-100 rounded-full p-1 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <button
              onClick={onOpenAssessment}
              className="px-6 py-3 rounded-full bg-[#E89A24] hover:bg-[#d68a18] text-white font-bold text-sm transition-all shadow-md active:scale-95 whitespace-nowrap cursor-pointer"
            >
              Free Assessment
            </button>
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-2 sm:p-3 flex items-center gap-2 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#0B2B26] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Featured Post (Only shown if 'All' and no search query) */}
        {selectedCategory === 'All' && !searchQuery && featuredPost && (
          <div className="mb-12">
            <div className="text-xs font-bold uppercase tracking-wider text-[#0B2B26] mb-3 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#E89A24]"></span>
              Featured Guide
            </div>
            <div
              onClick={() => onSelectBlog(featuredPost)}
              className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all grid grid-cols-1 lg:grid-cols-12 group cursor-pointer"
            >
              <div className="lg:col-span-6 relative h-64 lg:h-auto overflow-hidden bg-slate-100">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/Hero.jpg';
                  }}
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-[#0B2B26]/90 backdrop-blur-md text-white text-xs font-semibold">
                    {featuredPost.category}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#E89A24]" />
                      {featuredPost.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#4EBAA8]" />
                      {featuredPost.readTime}
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#0B2B26] group-hover:text-[#E89A24] transition-colors tracking-tight font-display mb-3">
                    {featuredPost.title}
                  </h2>

                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {featuredPost.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-[#E6F7F4] flex items-center justify-center text-[#0B2B26] font-bold text-xs">
                      {featuredPost.author.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-900">{featuredPost.author.name}</p>
                      <p className="text-[11px] text-slate-500">{featuredPost.author.role}</p>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0B2B26] group-hover:bg-[#071E1A] text-white text-xs sm:text-sm font-semibold transition-all">
                    <span>Read Full Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Article Grid Header */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0B2B26] tracking-tight font-display">
            {selectedCategory === 'All' ? 'Latest Care Articles' : `${selectedCategory} Articles`}
          </h2>
          <span className="text-xs sm:text-sm text-slate-500 font-medium">
            Showing {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'}
          </span>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800 mb-1">No articles found</h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto mb-4">
              We couldn't find any articles matching your search criteria. Try a different keyword or category.
            </p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="px-4 py-2 rounded-full bg-[#0B2B26] text-white text-xs font-semibold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                onClick={() => onSelectBlog(post)}
                className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all flex flex-col group cursor-pointer justify-between"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
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

                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-[#E89A24]" />
                        {post.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#4EBAA8]" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-[#0B2B26] group-hover:text-[#E89A24] transition-colors leading-snug mb-2 font-display">
                      {post.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6">
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-600 font-medium truncate max-w-[140px]">
                      By {post.author.name}
                    </span>

                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#0B2B26] group-hover:text-[#E89A24] transition-colors">
                      <span>Open Full Page</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Free Assessment Consultation Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="rounded-[36px] bg-[#0B2B26] text-white p-8 sm:p-12 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-[#F2D701]">
                Need Personalized Advice?
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold font-display">
                Talk to a Kenah Care Coordinator
              </h3>
              <p className="text-slate-300 text-sm max-w-xl">
                Have specific questions about waiver eligibility or home care hours? We are here to support your family every step of the way.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onOpenAssessment}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#E89A24] hover:bg-[#d68a18] text-white font-bold text-sm sm:text-base transition-all shadow-md active:scale-95 cursor-pointer whitespace-nowrap"
              >
                Schedule Free Assessment
              </button>
              <a
                href="tel:+14125461860"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-sm transition-all border border-white/20 inline-flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <Phone className="w-4 h-4 text-[#F2D701]" />
                <span>Call +1 (412) 546-1860</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
