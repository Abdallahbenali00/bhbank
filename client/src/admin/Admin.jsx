import React from 'react';
import { useNavigate } from 'react-router-dom';

const Admin = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center space-y-6">
      <h1 className="text-3xl font-bold text-black mb-6">Espace Admin</h1>

      <div className="space-y-4 w-full max-w-xs">
        <button
          onClick={() => navigate("/admin/users")}
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
        >
          Liste des utilisateurs
        </button>

        <button
          onClick={() => navigate("/admin/rec")}
          className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
        >
          Réclamations
        </button>

        <button
          onClick={() => navigate("/admin/credits")}
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
        >
          Liste des crédits
        </button>
      </div>
    </div>
  );
};

export default Admin;
