import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReclamationsTable = () => {
  const [reclamations, setReclamations] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/rec/get')
      .then(res => setReclamations(res.data))
      .catch(err => console.error('Erreur de chargement', err));
  }, []);

  return (
    <div className="min-h-screen bg-white px-4 py-10">
      <h1 className="text-3xl font-bold text-black mb-8 text-center border-b-2 border-red-600 pb-4">
        Liste des Réclamations
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-red-600 rounded-lg shadow-md">
          <thead className="bg-red-600 text-white">
            <tr>
              <th className="px-6 py-3 text-left">Nom</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Message</th>
              <th className="px-6 py-3 text-left">Date</th>
            </tr>
          </thead>
          <tbody className="text-black">
            {reclamations.map((rec, index) => (
              <tr
                key={rec._id}
                className={index % 2 === 0 ? 'bg-white' : 'bg-gray-100'}
              >
                <td className="px-6 py-4 border-t border-red-600">{rec.name}</td>
                <td className="px-6 py-4 border-t border-red-600">{rec.email}</td>
                <td className="px-6 py-4 border-t border-red-600">{rec.message}</td>
                <td className="px-6 py-4 border-t border-red-600">{new Date(rec.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReclamationsTable;
