import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios'; 
import 'react-toastify/dist/ReactToastify.css';
import BhPhoto from '../assets/BH-Bank.jpg';
import { validateCin, validateRip } from '../functions/validate';

const SignIn = () => {
  const [errors, setErrors] = useState({});
  const [Cin, setCin] = useState('');
  const [Rip, setRip] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    let CinError = '';
    let RipError = '';
  
    if (!validateCin(Cin)) {
      CinError = 'Le CIN doit contenir exactement 8 chiffres.';
    }
  
    if (!validateRip(Rip)) {
      RipError = 'Le RIB doit contenir exactement 12 chiffres.';
    }
  
    if (CinError || RipError) {
      setErrors({ Cin: CinError, Rip: RipError });
  
      if (CinError) toast.error(CinError);
      if (RipError) toast.error(RipError);
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        CIN: Cin,
        RIB: Rip,
      });
  
      toast.success('✅ Connexion réussie !');
  
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('admin', response.data.user.admin); // optional
  
      // Redirect based on admin flag
      if (response.data.user.admin === 1) {
        navigate('/admin');
      } else {
        navigate('/');
      }
  
    } catch (error) {
      const errMsg = error.response?.data?.error || 'Erreur de connexion.';
      toast.error(`❌ ${errMsg}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <img src={BhPhoto} alt="BH Bank" className="w-36 mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Connexion</h2>

        <form onSubmit={handleSubmit}>
          {/* CIN Input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">CIN</label>
            <input
              type="text"
              placeholder="Votre CIN"
              value={Cin}
              onChange={(e) => setCin(e.target.value)}
              maxLength={8}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none transition duration-300 ${
                errors.Cin ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-2 focus:ring-red-500'
              }`}
            />
            {errors.Cin && <p className="text-red-500 text-sm mt-1">{errors.Cin}</p>}
          </div>

          {/* RIB Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">RIB</label>
            <input
              type="text"
              placeholder="Votre RIB"
              value={Rip}
              onChange={(e) => setRip(e.target.value)}
              maxLength={12}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none transition duration-300 ${
                errors.Rip ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-2 focus:ring-red-500'
              }`}
            />
            {errors.Rip && <p className="text-red-500 text-sm mt-1">{errors.Rip}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
          >
            Se connecter
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Vous n'avez pas de compte ?{' '}
          <Link to="/signup" className="text-red-600 hover:underline font-medium">
            Créer un compte
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
