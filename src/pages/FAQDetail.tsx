import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { ArrowLeft, Tag, Calendar, MessageCircle } from 'lucide-react';

const categoryInfo = {
  policies: { title: 'Policies & Benefits', color: 'blue' },
  'it-systems': { title: 'IT Systems & Software', color: 'purple' },
  hardware: { title: 'Hardware & Devices', color: 'green' },
  network: { title: 'Network & Connectivity', color: 'orange' }
};

interface FAQDetailProps {
  onOpenChat?: () => void;
}

export default function FAQDetail({ onOpenChat }: FAQDetailProps) {
  const { categoryId, faqId } = useParams<{ categoryId: string; faqId: string }>();
  const { faqs } = useApp();

  const faq = faqs.find(f => f.id === faqId);
  const category = categoryInfo[categoryId as keyof typeof categoryInfo];

  if (!faq || !category) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-slate-900 mb-4">FAQ Not Found</h1>
        <Link to="/" className="text-blue-600 hover:text-blue-700">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  const handleChatClick = () => {
    if (onOpenChat) {
      onOpenChat();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Breadcrumbs */}
      <nav className="flex items-center space-x-2 text-sm text-slate-600">
        <Link to="/" className="hover:text-blue-600">Dashboard</Link>
        <span>/</span>
        <Link to={`/faq/${categoryId}`} className="hover:text-blue-600">{category.title}</Link>
        <span>/</span>
        <span className="text-slate-900">{faq.title}</span>
      </nav>

      {/* Back Button */}
      <Link 
        to={`/faq/${categoryId}`}
        className="inline-flex items-center space-x-2 text-slate-600 hover:text-slate-900 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to {category.title}</span>
      </Link>

      {/* FAQ Content */}
      <article className="bg-white rounded-xl p-8 shadow-sm border border-slate-100">
        {/* Header */}
        <header className="mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              category.color === 'blue' ? 'bg-blue-100 text-blue-700' :
              category.color === 'purple' ? 'bg-purple-100 text-purple-700' :
              category.color === 'green' ? 'bg-green-100 text-green-700' :
              'bg-orange-100 text-orange-700'
            }`}>
              {category.title}
            </span>
            <span className="flex items-center text-slate-500 text-sm">
              <Calendar className="w-4 h-4 mr-1" />
              Updated {new Date(faq.updatedAt).toLocaleDateString()}
            </span>
          </div>
          
          <h1 className="text-3xl font-bold text-slate-900 mb-4">{faq.title}</h1>
          
          {faq.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {faq.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2 py-1 bg-slate-100 text-slate-700 rounded-full text-sm"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Content */}
        <div className="prose prose-slate max-w-none">
          <div className="text-slate-700 leading-relaxed whitespace-pre-wrap">
            {faq.content}
          </div>
        </div>

        {/* Actions */}
        <footer className="mt-8 pt-6 border-t border-slate-200">
          <div className="flex items-center justify-between">
            <p className="text-slate-600">Was this helpful?</p>
            <button
              onClick={handleChatClick}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Need help? Use the chat widget below</span>
            </button>
          </div>
        </footer>
      </article>

      {/* Related FAQs */}
      <section className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Related FAQs</h2>
        <div className="space-y-3">
          {faqs
            .filter(f => f.id !== faq.id && f.category === faq.category)
            .slice(0, 3)
            .map((relatedFaq) => (
              <Link
                key={relatedFaq.id}
                to={`/faq/${categoryId}/${relatedFaq.id}`}
                className="block p-4 border border-slate-200 rounded-lg hover:border-blue-300 hover:bg-blue-50/50 transition-colors"
              >
                <h3 className="font-medium text-slate-900 hover:text-blue-700">
                  {relatedFaq.title}
                </h3>
                <p className="text-slate-600 text-sm mt-1 line-clamp-1">
                  {relatedFaq.content}
                </p>
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}