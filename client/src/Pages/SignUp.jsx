import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BhPhoto from '../assets/BH-Bank.jpg';
import { validateEmail, validateCin, validateRip } from '../functions/validate';

const SignUp = () => {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [Cin, setCin] = useState('');
  const [Rip, setRip] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    let emailError = '';
    let CinError = '';
    let RipError = '';

    if (!validateEmail(email)) {
      emailError = 'Adresse email invalide';
    }

    if (!validateCin(Cin)) {
      CinError = 'Le CIN doit contenir uniquement des chiffres et être exactement de 8 caractères.';
    }

    if (!validateRip(Rip)) {
      RipError = 'Le RIB doit contenir exactement 12 chiffres.';
    }

    if (emailError || CinError || RipError) {
      setErrors({ email: emailError, Cin: CinError, Rip: RipError });

      if (emailError) toast.error(emailError);
      if (CinError) toast.error(CinError);
      if (RipError) toast.error(RipError);

      return;
    }

    toast.success('✅ Inscription réussie !', {
      position: 'top-center',
      autoClose: 3000,
      pauseOnHover: false,
    });

    // Redirige vers Home après 3s
    setTimeout(() => {
      navigate('/');
    }, 3100);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-10">
        <img src={BhPhoto} alt="Logo BH Bank" className="w-36 mx-auto mb-6" />
        <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">Créer un compte</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="exemple@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none transition duration-300 ${
                errors.email ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-2 focus:ring-red-500'
              }`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          {/* CIN */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CIN</label>
            <input
              type="text"
              placeholder="8 chiffres"
              maxLength={8}
              value={Cin}
              onChange={(e) => setCin(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none transition duration-300 ${
                errors.Cin ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-2 focus:ring-red-500'
              }`}
            />
            {errors.Cin && <p className="text-red-500 text-sm mt-1">{errors.Cin}</p>}
          </div>

          {/* RIB */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">RIB</label>
            <input
              type="text"
              placeholder="12 chiffres"
              maxLength={12}
              value={Rip}
              onChange={(e) => setRip(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none transition duration-300 ${
                errors.Rip ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-2 focus:ring-red-500'
              }`}
            />
            {errors.Rip && <p className="text-red-500 text-sm mt-1">{errors.Rip}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2.5 px-4 rounded-xl text-lg font-medium transition duration-300"
          >
            S'inscrire
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-gray-600 mt-6">
          Vous avez déjà un compte ?{' '}
          <Link to="/signin" className="text-red-600 hover:underline font-medium">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
