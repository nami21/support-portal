// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useApp } from '../contexts/AppContext';
// import { useAuth } from '../contexts/AuthContext';
// import { ArrowLeft, Upload, X, CheckCircle } from 'lucide-react';

// const categories = [
//   { id: 'it-support', title: 'IT Support' },
//   { id: 'hr', title: 'Human Resources' },
//   { id: 'facilities', title: 'Facilities' },
//   { id: 'other', title: 'Other' }
// ];

// const priorities = [
//   { id: 'low', title: 'Low', color: 'bg-green-100 text-green-700' },
//   { id: 'medium', title: 'Medium', color: 'bg-yellow-100 text-yellow-700' },
//   { id: 'high', title: 'High', color: 'bg-orange-100 text-orange-700' },
//   { id: 'urgent', title: 'Urgent', color: 'bg-red-100 text-red-700' }
// ];

// export default function CreateTicket() {
//   const { createTicket } = useApp();
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const [isSubmitted, setIsSubmitted] = useState(false);
  
//   const [formData, setFormData] = useState({
//     title: '',
//     category: 'it-support' as any,
//     priority: 'medium' as any,
//     description: '',
//     attachments: [] as string[]
//   });

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
    
//     createTicket({
//       ...formData,
//       createdBy: user?.id || 'unknown'
//     });
    
//     setIsSubmitted(true);
//     setTimeout(() => {
//       navigate('/');
//     }, 2000);
//   };

//   const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(e.target.files || []);
//     const fileNames = files.map(file => file.name);
//     setFormData(prev => ({
//       ...prev,
//       attachments: [...prev.attachments, ...fileNames]
//     }));
//   };

//   const removeAttachment = (index: number) => {
//     setFormData(prev => ({
//       ...prev,
//       attachments: prev.attachments.filter((_, i) => i !== index)
//     }));
//   };

//   if (isSubmitted) {
//     return (
//       <div className="max-w-2xl mx-auto">
//         <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-100 text-center">
//           <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
//           <h1 className="text-2xl font-bold text-slate-900 mb-2">Ticket Created Successfully!</h1>
//           <p className="text-slate-600 mb-6">
//             Your support ticket has been submitted. You'll receive updates via email.
//           </p>
//           <Link 
//             to="/" 
//             className="inline-flex items-center px-6 py-3 bg-black text-white rounded-lg hover:bg-grey-800 transition-all"
//           >
//             Return to Dashboard
//           </Link>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-2xl mx-auto space-y-6">
//       {/* Header */}
//       <div className="flex items-center space-x-4">
//         <Link 
//           to="/" 
//           className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
//         >
//           <ArrowLeft className="w-5 h-5 text-slate-600" />
//         </Link>
//         <div>
//           <h1 className="text-3xl font-bold text-slate-900">Create Support Ticket</h1>
//           <p className="text-slate-600 mt-1">Submit a request for assistance</p>
//         </div>
//       </div>

//       {/* Form */}
//       <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-100">
//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Title */}
//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-2">
//               Title *
//             </label>
//             <input
//               type="text"
//               value={formData.title}
//               onChange={(e) => setFormData({...formData, title: e.target.value})}
//               className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-grey-500 focus:border-transparent"
//               placeholder="Brief description of your issue"
//               required
//             />
//           </div>

//           {/* Category and Priority 
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-2">
//                 Category *
//               </label>
//               <select
//                 value={formData.category}
//                 onChange={(e) => setFormData({...formData, category: e.target.value as any})}
//                 className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               >
//                 {categories.map((category) => (
//                   <option key={category.id} value={category.id}>
//                     {category.title}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-slate-700 mb-2">
//                 Priority Level *
//               </label>
//               <select
//                 value={formData.priority}
//                 onChange={(e) => setFormData({...formData, priority: e.target.value as any})}
//                 className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//               >
//                 {priorities.map((priority) => (
//                   <option key={priority.id} value={priority.id}>
//                     {priority.title}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>
//           */}

//           {/* Description */}
//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-2">
//               Description *
//             </label>
//             <textarea
//               value={formData.description}
//               onChange={(e) => setFormData({...formData, description: e.target.value})}
//               className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-grey-500 focus:border-transparent"
//               rows={6}
//               placeholder="Please provide detailed information about your issue..."
//               required
//             />
//           </div>

//           {/* Attachments */}
//           <div>
//             <label className="block text-sm font-medium text-slate-700 mb-2">
//               Attachments
//             </label>
//             <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
//               <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
//               <p className="text-slate-600 mb-2">Drop files here or click to upload</p>
//               <input
//                 type="file"
//                 multiple
//                 onChange={handleFileUpload}
//                 className="hidden"
//                 id="file-upload"
//               />
//               <label
//                 htmlFor="file-upload"
//                 className="inline-flex items-center px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 cursor-pointer transition-colors"
//               >
//                 Choose Files
//               </label>
//             </div>

//             {/* Attachment List */}
//             {formData.attachments.length > 0 && (
//               <div className="mt-4 space-y-2">
//                 {formData.attachments.map((attachment, index) => (
//                   <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
//                     <span className="text-sm text-slate-700">{attachment}</span>
//                     <button
//                       type="button"
//                       onClick={() => removeAttachment(index)}
//                       className="text-slate-400 hover:text-red-500 transition-colors"
//                     >
//                       <X className="w-4 h-4" />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Submit Button */}
//           <div className="flex justify-end space-x-4 pt-6">
//             <Link
//               to="/"
//               className="px-6 py-3 text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
//             >
//               Cancel
//             </Link>
//             <button
//               type="submit"
//               className="px-6 py-3 bg-black text-white rounded-lg hover:bg-grey-800 transition-all"
//             >
//               Create Ticket
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// } 