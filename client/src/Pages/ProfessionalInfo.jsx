import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { BriefcaseIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';

// StepBar réutilisable
const StepBar = ({ currentStep = 3 }) => {
  const steps = [
    { number: 1, label: 'Simulation crédit' },
    { number: 2, label: 'Info personnelles' },
    { number: 3, label: 'Info professionnelles' },
    { number: 4, label: 'Info financières' },
    { number: 5, label: 'Choix Agence' },
    { number: 6, label: 'Documents' }
  ];

  return (
    <div className="flex justify-center mb-8">
      <div className="flex items-center">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.number;
          const isActive = currentStep === step.number;

          return (
            <div key={step.number} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                    isCompleted
                      ? 'bg-green-500 text-white'
                      : isActive
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {isCompleted ? '✓' : step.number}
                </div>
                <span
                  className={`text-xs ${
                    isActive ? 'font-medium text-blue-700' : 'text-gray-600'
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-px w-8 mx-2 ${
                    isCompleted ? 'bg-green-500' : isActive ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ProfessionalInfo = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state) {
      toast.warning("Veuillez compléter les informations personnelles d'abord");
      navigate('/personal-info');
    }
  }, [location.state, navigate]);

  const { personalInfo = {}, ...simulationData } = location.state || {};

  const [formData, setFormData] = useState({
    profession: '',
    company: '',
    workDuration: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const professionOptions = [
    'Salarié',
    'Profession libérale',
    'Fonctionnaire',
    'Artisan',
    'Commerçant',
    'Retraité',
    'Autre'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.profession.trim()) newErrors.profession = 'Profession requise';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error('Veuillez sélectionner votre profession');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      navigate('/infos-financiers', {
        state: {
          ...simulationData,
          personalInfo,
          professionalInfo: formData
        }
      });
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="max-w-xl mx-auto p-4 md:p-6 bg-white shadow-md rounded-lg">
      <StepBar currentStep={3} />

      <div className="mb-6">
        <Link
          to="/personal-info"
          state={location.state}
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-1" />
          Retour
        </Link>
      </div>

      <div className="flex items-center mb-6">
        <BriefcaseIcon className="w-8 h-8 text-blue-500 mr-2" />
        <h1 className="text-2xl font-bold text-gray-800">Informations Professionnelles</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Profession */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Profession *
          </label>
          <select
            name="profession"
            value={formData.profession}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500 ${
              errors.profession ? 'border-red-500' : 'border-gray-300'
            }`}
            required
          >
            <option value="">Sélectionnez votre profession</option>
            {professionOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          {errors.profession && (
            <p className="mt-1 text-sm text-red-600">{errors.profession}</p>
          )}
        </div>

        {/* Entreprise */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Entreprise
          </label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="Nom de l'entreprise"
          />
        </div>

        {/* Ancienneté */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Ancienneté (années)
          </label>
          <input
            type="number"
            name="workDuration"
            value={formData.workDuration}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="Ex: 5"
            min="0"
            max="50"
          />
        </div>

        {/* Boutons */}
        <div className="flex justify-between pt-6">
          <button
            type="button"
            onClick={() => navigate('/personal-info', { state: location.state })}
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Retour
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-2 rounded-lg flex items-center ${
              isSubmitting
                ? 'bg-blue-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            } text-white transition-colors`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Envoi...
              </>
            ) : (
              'Continuer'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfessionalInfo;
