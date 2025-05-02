import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { 
  CurrencyDollarIcon, 
  ChartBarIcon, 
  ArrowLeftIcon, 
  ArrowRightIcon,
  CreditCardIcon
} from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';

const FinancialInfo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Vérification des données reçues
  useEffect(() => {
    if (!location.state?.professionalInfo) {
      toast.warning('Veuillez compléter les informations professionnelles d\'abord');
      navigate('/professional-info');
    }
  }, [location.state, navigate]);

  const { professionalInfo, ...simulationData } = location.state || {};

  const [formData, setFormData] = useState({
    monthlyIncome: '',
    otherIncome: '',
    hasLoans: null,
    loanAmount: '',
    monthlyExpenses: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Barre d'étapes
  const StepBar = () => {
    const steps = [
      { number: 1, label: 'Simulation' },
      { number: 2, label: 'Personnelles' },
      { number: 3, label: 'Professionnelles' },
      { number: 4, label: 'Financières' },
      { number: 5, label: 'Documents' }
    ];

    return (
      <div className="flex justify-center mb-8">
        <div className="flex items-center">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                  index < 3 ? 'bg-green-500 text-white' : 
                  index === 3 ? 'bg-blue-500 text-white' : 
                  'bg-gray-200'}`}>
                  {index < 3 ? '✓' : step.number}
                </div>
                <span className={`text-xs ${index === 3 ? 'font-medium' : ''}`}>
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`h-px w-8 mx-2 ${index < 3 ? 'bg-green-500' : 'bg-gray-300'}`} />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.monthlyIncome) {
      newErrors.monthlyIncome = 'Revenu mensuel requis';
    } else if (formData.monthlyIncome < 500) {
      newErrors.monthlyIncome = 'Minimum 500 DT';
    }

    if (formData.hasLoans === null) {
      newErrors.hasLoans = 'Veuillez sélectionner une option';
    } else if (formData.hasLoans && !formData.loanAmount) {
      newErrors.loanAmount = 'Montant requis si crédit en cours';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Veuillez corriger les erreurs');
      return;
    }

    setIsSubmitting(true);

    // Simulation de traitement
    setTimeout(() => {
      navigate('/documents-upload', {
        state: { 
          ...simulationData,
          professionalInfo,
          financialInfo: {
            monthlyIncome: Number(formData.monthlyIncome),
            otherIncome: Number(formData.otherIncome || 0),
            loanAmount: Number(formData.loanAmount || 0),
            monthlyExpenses: Number(formData.monthlyExpenses || 0)
          }
        } 
      });
      setIsSubmitting(false);
    }, 800);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <StepBar />

      <div className="mb-6">
        <Link 
          to="/professional-info" 
          state={location.state}
          className="inline-flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeftIcon className="w-5 h-5 mr-1" />
          Retour
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center mb-6">
          <ChartBarIcon className="w-8 h-8 text-blue-500 mr-2" />
          <h1 className="text-2xl font-bold text-gray-800">Informations Financières</h1>
        </div>

        <div className="space-y-6">
          {/* Section Revenus */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
              <CurrencyDollarIcon className="w-5 h-5 mr-2" />
              Revenus Mensuels
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Revenu net mensuel *
                </label>
                <div className="relative">
                  <CurrencyDollarIcon className="w-5 h-5 absolute left-3 top-3 text-gray-500" />
                  <input
                    type="number"
                    name="monthlyIncome"
                    value={formData.monthlyIncome}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-200 ${
                      errors.monthlyIncome ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="3000"
                    min="500"
                    required
                  />
                </div>
                {errors.monthlyIncome && (
                  <p className="mt-1 text-sm text-red-600">{errors.monthlyIncome}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Autres revenus
                </label>
                <div className="relative">
                  <CurrencyDollarIcon className="w-5 h-5 absolute left-3 top-3 text-gray-500" />
                  <input
                    type="number"
                    name="otherIncome"
                    value={formData.otherIncome}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200"
                    placeholder="0"
                    min="0"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section Dépenses */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
              <CreditCardIcon className="w-5 h-5 mr-2" />
              Engagements Financiers
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Avez-vous des crédits en cours ? *
                </label>
                <div className="flex gap-3">
                  {[true, false].map((option) => (
                    <button
                      key={option.toString()}
                      type="button"
                      onClick={() => {
                        setFormData(prev => ({ 
                          ...prev, 
                          hasLoans: option,
                          ...(option === false ? { loanAmount: '' } : {})
                        }));
                        if (errors.hasLoans) setErrors(prev => ({ ...prev, hasLoans: '' }));
                      }}
                      className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                        formData.hasLoans === option 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {option ? 'Oui' : 'Non'}
                    </button>
                  ))}
                </div>
                {errors.hasLoans && (
                  <p className="mt-1 text-sm text-red-600">{errors.hasLoans}</p>
                )}
              </div>

              {formData.hasLoans && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Montant total des mensualités *
                  </label>
                  <div className="relative">
                    <CurrencyDollarIcon className="w-5 h-5 absolute left-3 top-3 text-gray-500" />
                    <input
                      type="number"
                      name="loanAmount"
                      value={formData.loanAmount}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-200 ${
                        errors.loanAmount ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="500"
                      min="0"
                      required
                    />
                  </div>
                  {errors.loanAmount && (
                    <p className="mt-1 text-sm text-red-600">{errors.loanAmount}</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Boutons de navigation */}
          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={() => navigate('/professional-info', { state: location.state })}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-1" />
              Précédent
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 rounded-lg flex items-center transition-colors ${
                isSubmitting
                  ? 'bg-blue-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Envoi...
                </>
              ) : (
                <>
                  Suivant
                  <ArrowRightIcon className="w-5 h-5 ml-1" />
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FinancialInfo;