import { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

// Barre de progression uniforme
const StepBar = ({ currentStep = 1 }) => {
  const steps = [
    { number: 1, label: 'Simulation' },
    { number: 2, label: 'Personnelles' },
    { number: 3, label: 'Professionnelles' },
    { number: 4, label: 'Financières' },
    { number: 5, label: 'Choix Agence' },
    { number: 6, label: 'Documents' }
  ];

  return (
    <div className="flex flex-col items-center mb-8">
      <div className="flex items-center">
        {steps.map((step, index) => {
          const isCompleted = step.number < currentStep;
          const isCurrent = step.number === currentStep;

          return (
            <div key={step.number} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 text-sm font-semibold ${
                    isCompleted
                      ? 'bg-green-500 text-white'
                      : isCurrent
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {isCompleted ? '✓' : step.number}
                </div>
                <span className={`text-xs ${isCurrent ? 'font-medium text-blue-700' : 'text-gray-600'}`}>
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-px w-8 mx-2 ${
                    step.number < currentStep
                      ? 'bg-green-500'
                      : step.number === currentStep
                      ? 'bg-blue-500'
                      : 'bg-gray-300'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Encart de simulation */}
      {currentStep === 2 && (
        <div className="mt-4 bg-blue-50 p-3 rounded-lg border border-blue-200 max-w-3xl w-full text-sm text-blue-700">
          <SimulationInfo />
        </div>
      )}
    </div>
  );
};

// Composant pour afficher les infos de simulation si elles existent
const SimulationInfo = () => {
  const { state } = useLocation();
  const simulationData = state || {};

  if (!simulationData?.creditType) return null;

  return (
    <p>
      <strong>Type:</strong> {simulationData.creditType} |{' '}
      <strong>Montant:</strong> {new Intl.NumberFormat('fr-FR').format(simulationData.loanAmount)} DT |{' '}
      <strong>Durée:</strong> {simulationData.duration} mois |{' '}
      <strong>Taux:</strong> {simulationData.annualRate}% |{' '}
      <strong>Mensualité:</strong> {simulationData.monthlyPayment} DT
    </p>
  );
};

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

  const validateField = (name, value) => {
    let error = '';
    switch (name) {
      case 'cin':
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

    const isValid = Object.entries(formData).every(([name, value]) => validateField(name, value));

    if (!isValid) {
      alert('Veuillez corriger les erreurs dans le formulaire');
      return;
    }

    if (!acceptTerms) {
      alert('Vous devez accepter les conditions pour continuer');
      return;
    }

    setIsSubmitting(true);

    navigate('/professional-info', {
      state: {
        ...simulationData,
        personalInfo: formData
      }
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white min-h-screen">
      <StepBar currentStep={2} />

      <div className="mb-8">
        <Link to="/credit-simulation" className="text-blue-600 hover:underline flex items-center">
          <ArrowLeftIcon className="h-5 w-5 mr-1" />
          Retour à la simulation
        </Link>
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

        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-4 text-justify text-sm text-gray-700">
  <details className="mb-2">
    <summary className="cursor-pointer text-blue-600">Voir plus...</summary>
    <p className="mt-2">
      Les données personnelles pourront donner lieu à l’exercice du droit d’accès, de rectification et d’opposition dans les conditions prévues par la loi organique n° 2004-63 du 27 juillet 2004, portant sur la protection des données à caractère personnel, par courrier adressé à Attijari bank Tunisie.
      <br /><br />
      Du fait de la validation de sa demande de simulation du crédit, l’utilisateur déclare être informé des dispositions précédentes et autorise expressément la banque à traiter ces données pour les finalités et dans les conditions ci-dessus.
    </p>
  </details>

  <div className="flex items-start">
    <input
      id="confirm-accuracy"
      name="confirm-accuracy"
      type="checkbox"
      className="h-4 w-4 mt-1 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
      required
    />
    <label htmlFor="confirm-accuracy" className="ml-3 text-sm">
      Je confirme l’exactitude des informations renseignées
    </label>
  </div>

  <div className="flex items-start">
    <input
      id="accept-terms"
      name="accept-terms"
      type="checkbox"
      checked={acceptTerms}
      onChange={(e) => setAcceptTerms(e.target.checked)}
      className="h-4 w-4 mt-1 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
      required
    />
    <label htmlFor="accept-terms" className="ml-3 text-sm">
      J’ai lu et j’accepte les conditions générales d’utilisation
    </label>
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
