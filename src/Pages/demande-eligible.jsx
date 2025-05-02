import { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';

const AgencySelection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const simulationData = location.state || {};
  
  const [selectedGovernorate, setSelectedGovernorate] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedAgency, setSelectedAgency] = useState('');

  const governorates = {
    "Kairouan": ["Kairouan", "Ariana", "Ben Arous"],
    "Ariana": ["Ariana", "Soukra"],
    "Sfax": ["Sfax", "Sakiet Ezzit"],
    "Sousse": ["Sousse", "Msaken"],
    "Tunis": ["Tunis", "Le Bardo", "La Marsa"],
    "Nabeul": ["Nabeul", "Hammamet"],
    "Bizerte": ["Bizerte", "Menzel Bourguiba"],
    "Gabes": ["Gabes", "Matmata"],
    "Gafsa": ["Gafsa", "Metlaoui"],
    "Jendouba": ["Jendouba", "Tabarka"],
    "Kasserine": ["Kasserine", "Sbeitla"],
    "Kebili": ["Kebili", "Douz"],
    "Kef": ["Le Kef", "Tajerouine"],
    "Mahdia": ["Mahdia", "Boumerdes"],
    "Manouba": ["Manouba", "Douar Hicher"],
    "Medenine": ["Medenine", "Zarzis"],
    "Monastir": ["Monastir", "Moknine"],
    "Sidi Bouzid": ["Sidi Bouzid", "Regueb"],
    "Siliana": ["Siliana", "Gaafour"],
    "Tataouine": ["Tataouine", "Remada"],
    "Tozeur": ["Tozeur", "Nefta"],
    "Zaghouan": ["Zaghouan", "Zriba"]
  };

  const agenciesByCity = {
    "Kairouan": ["KAIROUAN CENTRE", "KAIROUAN IBN EL JAZZAR"],
    "Ariana": ["Agence Ariana Ville", "Agence Ennasr"],
    "Sfax": ["Agence Sfax Médina", "Agence Route El Ain"],
    "Sousse": ["Agence Sousse Centre", "Agence Msaken"],
    "Tunis": ["Agence Tunis Centre", "Agence Lac"],
    "Nabeul": ["Agence Nabeul Ville", "Agence Hammamet"]
  };

  const handleSubmit = () => {
    const completeData = {
      ...simulationData,
      agencyInfo: {
        governorate: selectedGovernorate,
        city: selectedCity,
        agency: selectedAgency
      }
    };
    navigate('/documents-upload', { state: completeData });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-8">
        <Link to="/infos-financiers" className="text-blue-600 hover:underline">
          ← Retour
        </Link>
        {simulationData.creditType && (
          <div className="mt-4 bg-blue-50 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-800">
              {simulationData.creditType} : {simulationData.monthlyPayment}DT/mois
            </h3>
          </div>
        )}
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-blue-800">Choix de l'agence</h2>

        {/* Sélections gouvernorat/ville/agence */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gouvernorat
            <select
              value={selectedGovernorate}
              onChange={(e) => {
                setSelectedGovernorate(e.target.value);
                setSelectedCity('');
                setSelectedAgency('');
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            >
              <option value="">Veuillez choisir un gouvernorat</option>
              {Object.keys(governorates).map((gov) => (
                <option key={gov} value={gov}>{gov}</option>
              ))}
            </select>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ville
            <select
              value={selectedCity}
              onChange={(e) => {
                setSelectedCity(e.target.value);
                setSelectedAgency('');
              }}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
              disabled={!selectedGovernorate}
            >
              <option value="">Veuillez choisir une ville</option>
              {selectedGovernorate && governorates[selectedGovernorate]?.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Agence
            <select
              value={selectedAgency}
              onChange={(e) => setSelectedAgency(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
              disabled={!selectedCity}
            >
              <option value="">Veuillez choisir une agence</option>
              {selectedCity && agenciesByCity[selectedCity]?.map((agency) => (
                <option key={agency} value={agency}>{agency}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-6">
          <p className="text-gray-600 mb-4">
            Il ne vous reste qu'une petite étape pour finaliser votre demande :
            <ul className="list-disc pl-6 mt-2 space-y-2">
              <li>Joindre les documents nécessaires à votre dossier</li>
              <li>Ouvrir un compte auprès d'une agence BH banque</li>
              <li>Domicilier votre salaire chez BH banque</li>
            </ul>
          </p>
          <button
            onClick={handleSubmit}
            className={`w-full py-3 px-4 rounded-md font-medium ${
              selectedGovernorate && selectedCity && selectedAgency 
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
            disabled={!selectedGovernorate || !selectedCity || !selectedAgency}
          >
            Compléter mon dossier
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgencySelection;