/* frontend/src/components/NoteList.jsx */

export default function NoteList({ notes, onEdit, onDelete }) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Notes ({notes.length})</h2>
      {notes.map(note => (
        <div key={note.id} className="bg-white border rounded-lg p-6 mb-4 shadow-sm">
          <h3 className="text-xl font-bold mb-2">{note.title}</h3>
          <p className="text-gray-700 mb-3">{note.description}</p>
          {note.attachment && (
            <a href={note.attachment} target="_blank" rel="noopener noreferrer" 
               className="text-blue-500 hover:underline">
              📎 {note.attachment.split('/').pop()}
            </a>
          )}
          <div className="flex gap-2 mt-4">
            <button onClick={() => onEdit(note)} 
                    className="px-4 py-1 bg-green-500 text-white rounded hover:bg-green-600">
              Edit
            </button>
            <button onClick={() => onDelete(note.id)} 
                    className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
