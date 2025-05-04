import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CreditSimulation = () => {
  const navigate = useNavigate();
  const [selectedCredit, setSelectedCredit] = useState(null);
  const [loanAmount, setLoanAmount] = useState(10000);
  const [duration, setDuration] = useState(36);
  const [tmmRate] = useState(7.25);
  const [clientType, setClientType] = useState('salarié secteur public');
  const currentStep = 1;

  const creditTypes = [
    {
      id: 1,
      name: 'CREDIT CONSOMMATION',
      icon: '🛒',
      description: 'Financement sans objet',
      maxAmount: null,
      minDuration: 12,
      maxDuration: 36,
      rateFormula: tmm => tmm + 5,
      clientTypes: ['salarié secteur public', 'salarié secteur privé', 'profession libérale', 'retraité'],
      insuranceRate: 0.005,
      comments: 'Éligibilité: CDI ou ancienneté > 1 an. Documents: CNI, bulletins de salaire, RIB'
    },
    {
      id: 2,
      name: 'CREDIT AMENAGEMENT',
      icon: '🏠',
      description: 'Financement avec objet (devis/facture pro format requis)',
      maxAmount: null,
      minDuration: 37,
      maxDuration: 84,
      rateFormula: tmm => tmm + 4,
      clientTypes: ['salarié secteur public titulaire', 'salarié secteur public contractuel', 'salarié secteur privé', 'profession libérale', 'retraité'],
      insuranceRate: 0.005,
      comments: 'Devis obligatoire. Autofinancement: 0%. Documents: CNI, bulletins de salaire, RIB, devis'
    },
    {
      id: 3,
      name: 'CREDIT ORDINATEUR',
      icon: '💻',
      description: 'Financement avec objet (facture pro format requise)',
      maxAmount: 2500,
      minDuration: 12,
      maxDuration: 36,
      rateFormula: tmm => tmm + 3,
      clientTypes: ['salarié secteur public titulaire', 'salarié secteur public contractuel', 'salarié secteur privé', 'profession libérale', 'retraité'],
      insuranceRate: 0.005,
      comments: 'Facture pro format obligatoire. Plafond: 2500 DT. Documents: CNI, bulletins de salaire, RIB, facture'
    }
  ];

  useEffect(() => {
    if (selectedCredit?.maxAmount && loanAmount > selectedCredit.maxAmount) {
      setLoanAmount(selectedCredit.maxAmount);
    }
  }, [selectedCredit, loanAmount]);

  const handleCreditSelection = (credit) => {
    setSelectedCredit(credit);
    setDuration(credit.id === 2 ? 37 : 36);
  };

  const calculateMonthlyPayment = () => {
    if (!selectedCredit) return 0;
    const annualRate = selectedCredit.rateFormula(tmmRate) / 100;
    const monthlyRate = annualRate / 12;
    const monthlyPayment = (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -duration));
    const insurance = loanAmount * selectedCredit.insuranceRate / 12;
    return (monthlyPayment + insurance).toFixed(2);
  };

  const handleContinue = () => {
    if (!selectedCredit) {
      alert('Veuillez sélectionner un type de crédit');
      return;
    }
    const simulationData = {
      creditType: selectedCredit.name,
      annualRate: selectedCredit.rateFormula(tmmRate),
      loanAmount,
      duration,
      monthlyPayment: calculateMonthlyPayment(),
      clientType,
      tmmRate,
    };
    navigate('/personal-info', { state: simulationData });
  };

  const steps = [
    { number: 1, label: 'Simulation' },
    { number: 2, label: 'Personnelles' },
    { number: 3, label: 'Professionnelles' },
    { number: 4, label: 'Financières' },
    { number: 5, label: 'Choix Agence' },
    { number: 6, label: 'Documents' }
  ];

  const StepBar = () => (
    <div className="flex justify-center mb-10">
      <div className="flex items-center">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                  currentStep > step.number
                    ? 'bg-green-500 text-white'
                    : currentStep === step.number
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {currentStep > step.number ? '✓' : step.number}
              </div>
              <span
                className={`text-xs ${
                  currentStep === step.number ? 'font-medium text-blue-700' : 'text-gray-600'
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`h-px w-8 mx-2 ${
                  currentStep > step.number
                    ? 'bg-green-500'
                    : currentStep === step.number
                    ? 'bg-blue-500'
                    : 'bg-gray-300'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-3xl mx-auto p-6 min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <StepBar />

      {/* Bloc crédit */}
      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-800">
          <span className="border-b-4 border-blue-500 pb-2">Choisissez votre type de crédit</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {creditTypes.map((credit) => (
            <div
              key={credit.id}
              onClick={() => handleCreditSelection(credit)}
              className={`p-6 rounded-xl border-2 cursor-pointer transition-all ${
                selectedCredit?.id === credit.id
                  ? 'border-blue-500 bg-blue-50 shadow-md'
                  : 'border-gray-200 hover:border-blue-300 bg-white'
              }`}
            >
              <div className="text-4xl mb-3 text-center">{credit.icon}</div>
              <h3 className="text-lg font-bold text-center text-gray-800 mb-2">{credit.name}</h3>
              <p className="text-sm text-gray-600 text-center mb-3">{credit.description}</p>
              {credit.maxAmount && (
                <div className="text-xs text-white bg-red-500 rounded-full px-3 py-1 text-center w-fit mx-auto">
                  Plafond: {credit.maxAmount} DT
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Paramètres */}
      {selectedCredit && (
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-blue-800 flex items-center">
            <span className="bg-blue-100 p-2 rounded-full mr-3">
              💡
            </span>
            Paramètres du crédit
          </h2>

          <div className="space-y-6">
            {/* Montant */}
            <div>
              <label className="block text-gray-700 font-medium mb-3">
                Montant du crédit (DT)
                {selectedCredit.maxAmount && (
                  <span className="text-sm text-gray-500 ml-2">(Maximum: {selectedCredit.maxAmount} DT)</span>
                )}
              </label>
              <div className="flex items-center">
                <input
                  type="range"
                  min="100"
                  max={selectedCredit.maxAmount || 50000}
                  step="100"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="ml-4 w-32 text-right font-bold text-blue-600">
                  {new Intl.NumberFormat('fr-FR').format(loanAmount)} DT
                </span>
              </div>
            </div>

            {/* Durée */}
            <div>
              <label className="block text-gray-700 font-medium mb-3">
                Durée (mois)
                <span className="text-sm text-gray-500 ml-2">
                  (De {selectedCredit.minDuration} à {selectedCredit.maxDuration} mois)
                </span>
              </label>
              <div className="flex items-center">
                <input
                  type="range"
                  min={selectedCredit.minDuration}
                  max={selectedCredit.maxDuration}
                  step="1"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="ml-4 w-20 text-right font-bold text-blue-600">
                  {duration} mois
                </span>
              </div>
            </div>

            {/* Type de client */}
            <div>
              <label className="block text-gray-700 font-medium mb-3">Type de client</label>
              <select
                value={clientType}
                onChange={(e) => setClientType(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {selectedCredit.clientTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Résumé */}
            <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
              <h3 className="text-xl font-bold mb-4 text-blue-800">Récapitulatif</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-500">Taux annuel</p>
                  <p className="text-lg font-bold text-blue-600">
                    TMM ({tmmRate}%) + {selectedCredit.rateFormula(tmmRate) - tmmRate}% = {selectedCredit.rateFormula(tmmRate)}%
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-500">Mensualité estimée</p>
                  <p className="text-lg font-bold text-green-600">
                    {calculateMonthlyPayment()} DT/mois <span className="text-xs text-gray-500">(incl. assurance)</span>
                  </p>
                </div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-sm font-medium text-gray-700 mb-2">Conditions spécifiques:</p>
                <p className="text-sm text-gray-600">{selectedCredit.comments}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bouton */}
      <div className="text-center">
        <button
          onClick={handleContinue}
          disabled={!selectedCredit}
          className={`px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 ${
            selectedCredit
              ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-900 transform hover:-translate-y-1'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Continuer vers la demande
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline-block ml-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CreditSimulation;
