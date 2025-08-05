// import React from 'react';
// import { Quote } from 'lucide-react';

// export const MotivationalQuote: React.FC = () => {
//   return (
//     <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-sm border border-indigo-100 p-6 relative overflow-hidden max-w-md mx-auto">
//       {/* Background decoration */}
//       <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-indigo-200 to-purple-200 rounded-full opacity-20 transform translate-x-8 -translate-y-8"></div>
//       <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-purple-200 to-pink-200 rounded-full opacity-20 transform -translate-x-6 translate-y-6"></div>

//       {/* Header */}
//       <div className="flex items-center gap-2 mb-4 relative z-10">
//         <Quote className="w-5 h-5 text-indigo-600" />
//         <h3 className="font-semibold text-gray-900">Daily Inspiration</h3>
//       </div>

//       {/* Quote Content */}
//       <div className="relative z-10 space-y-4">
//         <p className="text-gray-800 text-lg leading-relaxed font-medium italic">
//           "The only way to do great work is to love what you do."
//         </p>

//         <div className="flex items-center justify-between">
//           <p className="text-gray-700 font-semibold">— Steve Jobs</p>
//           <span className="px-2 py-1 text-xs font-medium rounded-full bg-orange-100 text-orange-700">
//             motivation
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };
 import React from 'react';
import { Quote } from 'lucide-react';
import { motivationalQuotes } from '../../lib/mockData';

export const MotivationalQuote: React.FC = () => {
  const today = new Date();
  const dayOfYear = Math.floor(
    (Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()) -
     Date.UTC(today.getFullYear(), 0, 0)) / 86400000
  );
  const quoteIndex = dayOfYear % motivationalQuotes.length;
  const quote = motivationalQuotes[quoteIndex];

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-sm border border-indigo-100 p-6 relative overflow-hidden max-w-md mx-auto">
    <div className="bg-gradient-to-br from-grey-50 to-grey-100 rounded-xl shadow-sm border border-grey-200 p-6 relative overflow-hidden max-w-md mx-auto">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-grey-300 to-grey-400 rounded-full opacity-20 transform translate-x-8 -translate-y-8"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-grey-300 to-grey-400 rounded-full opacity-20 transform -translate-x-6 translate-y-6"></div>

      {/* Header */}
      <div className="flex items-center gap-2 mb-4 relative z-10">
        <Quote className="w-5 h-5 text-black" />
        <h3 className="font-semibold text-gray-900">Daily Inspiration</h3>
      </div>

      {/* Quote Content */}
      <div className="relative z-10 space-y-4">
        <p className="text-gray-800 text-lg leading-relaxed font-medium italic">
          "{quote.text}"
        </p>

        <div className="flex items-center justify-between">
          <p className="text-gray-700 font-semibold">— {quote.author}</p>
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-grey-200 text-grey-800 capitalize">
            {quote.category}
          </span>
        </div>
      </div>
    </div>
    </div>
  );
};
