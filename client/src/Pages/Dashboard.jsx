import React, { useState } from 'react';

const data = [
  { id: '7777-0110', date: '21/08/2014', montant: '100.000,000', echeance: '4,000 DT', taux: '12', statut: 'En cours de vérification' },
  { id: '7777-0111', date: '22/08/2014', montant: '150.000,000', echeance: '3,200 DT', taux: '10', statut: 'Dossier accepté' },
  // ... ajoute plus de lignes
];

const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const paginatedData = data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  return (
    <div className="min-h-screen flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6">
        <div className="mb-8">
          <h2 className="text-gray-800 text-lg font-bold">ESPACE ETAT EMPRUNT</h2>
        </div>
        <ul>
          <li className="text-white bg-green-700 px-4 py-2 rounded cursor-pointer">MES DEMANDES</li>
        </ul>
      </aside>

      {/* Main Content */}
      <div className="flex-1 bg-gray-50 p-8">
        <div className="flex justify-end mb-6 text-right">
          <p className="font-semibold text-lg">Jihene Hkimi</p>
        </div>

        <h1 className="text-2xl font-bold text-green-700 mb-6 text-center">DEMANDES DE FINANCEMENT</h1>

        {/* Table */}
        <div className="overflow-auto bg-white shadow rounded-lg">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-6 py-3">Identifiant demande</th>
                <th className="px-6 py-3">Date demande</th>
                <th className="px-6 py-3">Montant demandé</th>
                <th className="px-6 py-3">Échéance</th>
                <th className="px-6 py-3">Taux</th>
                <th className="px-6 py-3">Statut</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, index) => (
                <tr key={index} className="border-t">
                  <td className="px-6 py-3 text-blue-600 hover:underline cursor-pointer">{row.id}</td>
                  <td className="px-6 py-3">{row.date}</td>
                  <td className="px-6 py-3">{row.montant}</td>
                  <td className="px-6 py-3">{row.echeance}</td>
                  <td className="px-6 py-3">{row.taux}</td>
                  <td className="px-6 py-3">{row.statut}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6 space-x-2">
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded ${currentPage === page ? 'bg-black text-white' : 'bg-white border'}`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
