import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [credits, setCredits] = useState([]);
  const [userName, setUserName] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Fetch user's credit data by CIN
  useEffect(() => {
    const cin = localStorage.getItem('cin');
    if (!cin) return;

    axios
      .get(`http://localhost:5000/api/req/credits/cin/${cin}`)
      .then((res) => {
        setCredits(res.data);
        if (res.data.length > 0) {
          const { firstName, lastName } = res.data[0].personalInfo;
          setUserName(`${firstName || ''} ${lastName || ''}`.trim());
        }
      })
      .catch((err) => {
        console.error('Erreur lors du chargement des crédits :', err);
      });
  }, []);

  const paginatedCredits = credits.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="min-h-screen flex font-sans bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-6">
        <div className="mb-8">
          <h2 className="text-gray-800 text-lg font-bold">ESPACE ÉTAT EMPRUNT</h2>
        </div>
        <ul>
          <li className="text-white bg-green-700 px-4 py-2 rounded cursor-pointer">MES DEMANDES</li>
        </ul>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="flex justify-end mb-6 text-right">
          <p className="font-semibold text-lg">{userName || 'Utilisateur'}</p>
        </div>

        <h1 className="text-2xl font-bold text-green-700 mb-6 text-center">DEMANDES DE FINANCEMENT</h1>

        {/* Table */}
        <div className="overflow-auto bg-white shadow rounded-lg">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="px-6 py-3">CIN</th>
                <th className="px-6 py-3">Montant</th>
                <th className="px-6 py-3">Échéance</th>
                <th className="px-6 py-3">Taux</th>
                <th className="px-6 py-3">Statut</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCredits.map((credit, index) => (
                <tr key={index} className="border-t">
                  <td className="px-6 py-3">{credit.personalInfo.cin}</td>
                  <td className="px-6 py-3">{credit.creditAmount} DT</td>
                  <td className="px-6 py-3">{credit.monthlyPayment} DT/mois</td>
                  <td className="px-6 py-3">{credit.interestRate}%</td>
                  <td className="px-6 py-3">{credit.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({
            length: Math.ceil(credits.length / rowsPerPage),
          }).map((_, index) => (
            <button
              key={index + 1}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === index + 1 ? 'bg-black text-white' : 'bg-white border'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
