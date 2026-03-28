// frontend/src/components/NoteForm.jsx

import { useState } from 'react';

export default function NoteForm({ onSubmit, note }) {
  const [formData, setFormData] = useState({
    title: note?.title || '',
    description: note?.description || '',
    attachment: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    if (formData.attachment) data.append('attachment', formData.attachment);
    onSubmit(data);
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">{note ? 'Edit Note' : 'Create Note'}</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">📝 Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">📄 Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full p-3 border border-gray-300 rounded-lg h-28 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>
        
        {/* ← YOUR UPLOAD BUTTON HERE */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700 flex items-center">
            📎 Attachment (PDF/Image)
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-400 transition-colors">
            <input
              type="file"
              onChange={(e) => setFormData({...formData, attachment: e.target.files[0]})}
              className="w-full h-full opacity-0 absolute cursor-pointer"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
              <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span className="text-lg font-medium text-gray-700">Click to upload file</span>
              <span className="text-sm text-gray-500">{formData.attachment?.name || 'No file chosen'}</span>
            </label>
          </div>
        </div>
        
        <button 
          type="submit" 
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 shadow-lg transform hover:-translate-y-0.5 transition-all"
          disabled={!formData.title || !formData.description}
        >
          {note ? '✏️ Update Note' : '➕ Create Note'}
        </button>
      </form>
    </div>
  );
}
