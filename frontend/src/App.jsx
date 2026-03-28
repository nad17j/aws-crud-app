// frontend/src/App.jsx

import { useState, useEffect } from 'react';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';

function App() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/api/notes/');
      const data = await res.json();
      setNotes(data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
    setLoading(false);
  };

  const handleSubmit = async (formData) => {
    setLoading(true);
    try {
      const url = editingNote 
        ? `http://localhost:8000/api/notes/${editingNote.id}/`
        : 'http://localhost:8000/api/notes/';
      
      const method = editingNote ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        body: formData,  // FormData handles file upload
      });
      
      if (res.ok) {
        fetchNotes();  // Refresh list
        setEditingNote(null);
      }
    } catch (error) {
      console.error('Error saving note:', error);
    }
    setLoading(false);
  };

  const handleEdit = (note) => setEditingNote(note);
  const handleDelete = async (id) => {
    await fetch(`http://localhost:8000/api/notes/${id}/`, { method: 'DELETE' });
    fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">📝 AWS File Upload CRUD</h1>
      
      <NoteForm onSubmit={handleSubmit} note={editingNote} />
      
      {loading && <p className="text-center py-4">Loading...</p>}
      
      <NoteList 
        notes={notes} 
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default App;
