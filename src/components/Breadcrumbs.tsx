import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { PageId } from '../types';

interface BreadcrumbsProps {
  items: { label: string; page?: PageId; onClick?: () => void }[];
  onNavigate: (page: PageId) => void;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, onNavigate }) => {
  return (
    <nav aria-label="Breadcrumb" className="py-3 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <ol className="flex items-center gap-2 text-xs text-slate-500 flex-wrap">
        <li>
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-1 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </button>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <React.Fragment key={index}>
              <ChevronRight className="w-3 h-3 text-slate-400 shrink-0" aria-hidden="true" />
              <li>
                {!isLast && item.onClick ? (
                  <button
                    onClick={item.onClick}
                    className="hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                ) : !isLast && item.page ? (
                  <button
                    onClick={() => onNavigate(item.page!)}
                    className="hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                ) : (
                  <span className="font-semibold text-slate-900" aria-current={isLast ? 'page' : undefined}>
                    {item.label}
                  </span>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};
