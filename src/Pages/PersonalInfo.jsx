import { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const PersonalInfoForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const simulationData = location.state || {};

  const [formData, setFormData] = useState({
    lastName: '',
    firstName: '',
    phone: '',
    cin: '',
    email: '',
    birthDate: '',
    address: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  // Composant de la barre d'étapes
  const StepBar = ({ currentStep = 2 }) => {
    const steps = [
      { number: 1, label: 'Simulation crédit' },
      { number: 2, label: 'Info personnelles' },
      { number: 3, label: 'Info professionnelles' },
      { number: 4, label: 'Info financières' },
      { number: 5, label: 'Upload documents' }
    ];

    return (
      <div className="flex justify-center mb-10">
        <div className="flex items-center">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 ${
                  currentStep >= step.number ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {step.number}
                </div>
                <span className={`text-sm font-medium ${
                  currentStep >= step.number ? 'text-blue-600' : 'text-gray-500'
                }`}>{step.label}</span>
              </div>
              
              {index < steps.length - 1 && (
                <div className={`h-px w-16 ${currentStep > step.number ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const validateField = (name, value) => {
    let error = '';
    switch(name) {
      case 'cin':
        if (!/^\d{8}$/.test(value)) error = '8 chiffres requis';
        break;
      case 'phone':
        if (!/^\d{8}$/.test(value)) error = '8 chiffres requis';
        break;
      case 'email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Email invalide';
        break;
      case 'birthDate':
        if (new Date(value) > new Date()) error = 'Date future invalide';
        break;
      default:
        if (!value.trim()) error = 'Champ requis';
    }
    setErrors(prev => ({ ...prev, [name]: error }));
    return !error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationResults = Object.entries(formData).map(([name, value]) => 
      validateField(name, value)
    );

    if (validationResults.some(valid => !valid)) {
      alert('Veuillez corriger les erreurs dans le formulaire');
      return;
    }

    if (!acceptTerms) {
      alert('Vous devez accepter les conditions pour continuer');
      return;
    }

    setIsSubmitting(true);
    
    // Redirection vers ProfessionalInfo
    navigate('/professional-info', { 
      state: { 
        ...simulationData,
        personalInfo: formData 
      } 
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white min-h-screen">
      {/* Barre d'étapes - Étape 2 active */}
      <StepBar currentStep={2} />

      <div className="mb-8">
        <Link to="/credit-simulation" className="text-blue-600 hover:underline flex items-center">
          <ArrowLeftIcon className="h-5 w-5 mr-1" />
          Retour à la simulation
        </Link>
        {simulationData.creditType && (
          <div className="mt-4 bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-800 mb-2">
              Simulation de crédit: {simulationData.creditType}
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <p><span className="font-medium">Montant:</span> {new Intl.NumberFormat('fr-FR').format(simulationData.loanAmount)} DT</p>
              <p><span className="font-medium">Durée:</span> {simulationData.duration} mois</p>
              <p><span className="font-medium">Taux:</span> {simulationData.annualRate}%</p>
              <p><span className="font-medium">Mensualité:</span> {simulationData.monthlyPayment} DT</p>
            </div>
          </div>
        )}
      </div>

      <h2 className="text-2xl font-bold text-gray-800 mb-6">Informations personnelles</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(formData).map(([name, value]) => (
            <div key={name} className={name === 'address' ? 'md:col-span-2' : ''}>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {{
                  lastName: 'Nom',
                  firstName: 'Prénom',
                  phone: 'Téléphone',
                  cin: 'Numéro CIN',
                  email: 'Adresse email',
                  birthDate: 'Date de naissance',
                  address: 'Adresse complète'
                }[name]}
              </label>
              <input
                type={name === 'birthDate' ? 'date' : 'text'}
                name={name}
                value={value}
                onChange={handleChange}
                className={`w-full p-3 rounded-md border ${
                  errors[name] ? 'border-red-500' : 'border-gray-300'
                } focus:ring-blue-500 focus:border-blue-500`}
                {...(name === 'cin' && { maxLength: 8, placeholder: '8 chiffres' })}
                {...(name === 'phone' && { pattern: '\\d{8}', placeholder: '8 chiffres' })}
              />
              {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
            </div>
          ))}
        </div>

        {/* Case à cocher pour accepter les règles */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="accept-terms"
                name="accept-terms"
                type="checkbox"
                checked={acceptTerms}
                onChange={(e) => setAcceptTerms(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                required
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="accept-terms" className="font-medium text-gray-700">
                J'accepte les conditions générales
              </label>
              <p className="text-gray-500">
                En cochant cette case, je reconnais avoir lu et accepté les conditions
                générales d'utilisation et la politique de confidentialité.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-6 py-3 rounded-lg flex items-center ${
              isSubmitting
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Envoi en cours...
              </>
            ) : (
              <>
                Continuer vers les informations professionnelles
                <ArrowRightIcon className="h-5 w-5 ml-2" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfoForm;