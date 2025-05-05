import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import BhPhoto from '../assets/BH-Bank.jpg';
import { validateEmail, validateCin, validateRip } from '../functions/validate';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [Cin, setCin] = useState('');
  const [Rip, setRip] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    let emailError = '';
    let CinError = '';
    let RipError = '';
    let passwordError = '';

    if (!validateEmail(email)) emailError = 'Adresse email invalide';
    if (!validateCin(Cin)) CinError = 'Le CIN doit contenir 8 chiffres.';
    if (!validateRip(Rip)) RipError = 'Le RIB doit contenir 12 chiffres.';
    if (password.length < 6) passwordError = 'Mot de passe trop court.';

    if (emailError || CinError || RipError || passwordError) {
      setErrors({ email: emailError, Cin: CinError, Rip: RipError, password: passwordError });
      if (emailError) toast.error(emailError);
      if (CinError) toast.error(CinError);
      if (RipError) toast.error(RipError);
      if (passwordError) toast.error(passwordError);
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        email,
        password,
        CIN: Cin,
        RIB: Rip,
      });

      toast.success('✅ Inscription réussie !');
      setTimeout(() => navigate('/signin'), 3000);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Erreur serveur');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-10">
        <img src={BhPhoto} alt="Logo BH Bank" className="w-36 mx-auto mb-6" />
        <h2 className="text-3xl font-semibold text-center mb-8 text-gray-800">Créer un compte</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <label>Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          {/* CIN */}
          <div>
            <label>CIN</label>
            <input
              type="text"
              maxLength={8}
              value={Cin}
              onChange={(e) => setCin(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
            {errors.Cin && <p className="text-red-500 text-sm">{errors.Cin}</p>}
          </div>

          {/* RIB */}
          <div>
            <label>RIB</label>
            <input
              type="text"
              maxLength={12}
              value={Rip}
              onChange={(e) => setRip(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
            {errors.Rip && <p className="text-red-500 text-sm">{errors.Rip}</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
          >
            S'inscrire
          </button>
        </form>
        <p className="text-center text-sm mt-6">
          Déjà inscrit ? <Link to="/signin" className="text-red-600">Se connecter</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
