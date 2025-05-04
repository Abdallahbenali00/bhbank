import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  DocumentTextIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';

const DocumentsUpload = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state || {};

  const [documents, setDocuments] = useState({
    cinRecto: null,
    cinVerso: null,
    bankStatements: null,
    taxDeclaration: null,
    incomeProof: null,
    professionalCard: null,
    addressProof: null,
    carProforma: null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Étapes avec "Documents" en 6e position
  const StepBar = () => {
    const steps = [
      { number: 1, label: 'Simulation' },
      { number: 2, label: 'Personnelles' },
      { number: 3, label: 'Professionnelles' },
      { number: 4, label: 'Financières' },
      { number: 5, label: 'Choix Agence' },
      { number: 6, label: 'Documents' }
    ];

    return (
      <div className="flex justify-center mb-8">
        <div className="flex items-center">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                    index < 5
                      ? 'bg-green-500 text-white'
                      : index === 5
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200'
                  }`}
                >
                  {index < 5 ? '✓' : step.number}
                </div>
                <span className={`text-xs ${index === 5 ? 'font-medium' : ''}`}>
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-px w-8 mx-2 ${
                    index < 5 ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const handleFileChange = (name, file) => {
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Fichier trop volumineux (max 5MB)');
      return;
    }

    const validTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      toast.error('Format non supporté (JPEG, PNG ou PDF uniquement)');
      return;
    }

    setDocuments(prev => ({ ...prev, [name]: file }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const requiredDocs = [
      { name: 'cinRecto', label: 'CIN Recto' },
      { name: 'cinVerso', label: 'CIN Verso' },
      { name: 'taxDeclaration', label: 'Déclaration fiscale' },
      { name: 'incomeProof', label: 'Justificatif de revenus' },
      { name: 'addressProof', label: 'Justificatif de domicile' }
    ];

    const missingDocs = requiredDocs.filter(doc => !documents[doc.name]);

    if (missingDocs.length > 0) {
      toast.error(
        `Documents manquants: ${missingDocs.map(d => d.label).join(', ')}`
      );
      setIsSubmitting(false);
      return;
    }

    try {
      console.log('Documents à envoyer:', documents);

      setTimeout(() => {
        navigate('/summary', {
          state: {
            ...formData,
            documents
          }
        });
      }, 1500);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error("Erreur lors de l'upload des documents");
      setIsSubmitting(false);
    }
  };

  const documentFields = [
    {
      name: 'cinRecto',
      label: 'CIN (Recto)',
      required: true,
      condition: true
    },
    {
      name: 'cinVerso',
      label: 'CIN (Verso)',
      required: true,
      condition: true
    },
    {
      name: 'bankStatements',
      label: 'Relevés bancaires (3 derniers mois)',
      required: formData?.financialInfo?.bank !== 'INTERNE',
      condition: true
    },
    {
      name: 'taxDeclaration',
      label: 'Déclaration fiscale',
      required: true,
      condition: true
    },
    {
      name: 'incomeProof',
      label: 'Justificatif de revenus',
      required: true,
      condition: true
    },
    {
      name: 'professionalCard',
      label:
        formData?.professionalInfo?.profession === 'LIBERAL'
          ? 'Carte professionnelle'
          : 'Registre de commerce',
      required: true,
      condition: !!formData?.professionalInfo?.profession
    },
    {
      name: 'addressProof',
      label: 'Justificatif de domicile (moins de 3 mois)',
      required: true,
      condition: true
    },
    {
      name: 'carProforma',
      label: 'Facture pro-forma véhicule',
      required: true,
      condition: formData?.creditType === 'CREDIT_AUTO'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <StepBar />


      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center mb-6">
          <DocumentTextIcon className="w-8 h-8 text-blue-500 mr-2" />
          <h1 className="text-2xl font-bold text-gray-800">Téléversement des documents</h1>
        </div>

        <div className="mb-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Note :</strong> Veuillez uploader des documents clairs et lisibles au format PDF, JPG ou PNG (5MB max par fichier)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {documentFields.map(field => (
            field.condition && (
              <div key={field.name} className="p-4 border rounded-lg hover:border-blue-300 transition-colors">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </label>

                <div className="flex items-center">
                  <label className="flex-1 cursor-pointer">
                    <div className={`py-2 px-3 rounded-lg border-2 border-dashed ${
                      documents[field.name] ? 'border-green-300 bg-green-50' : 'border-gray-300 hover:border-blue-400'
                    } transition-colors`}>
                      <div className="flex flex-col items-center justify-center py-4">
                        {documents[field.name] ? (
                          <span className="text-sm font-medium text-green-700 text-center">
                            {documents[field.name].name}
                          </span>
                        ) : (
                          <span className="text-sm text-gray-600 text-center">
                            Cliquer pour sélectionner un fichier
                          </span>
                        )}
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => e.target.files[0] && handleFileChange(field.name, e.target.files[0])}
                      />
                    </div>
                  </label>

                  {documents[field.name] && (
                    <button
                      type="button"
                      onClick={() => setDocuments(prev => ({ ...prev, [field.name]: null }))}
                      className="ml-2 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            )
          ))}
        </div>

        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={() => navigate('/demande-eligible', { state: location.state })}

            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-1" />
            Précédent
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-4 py-2 rounded-lg flex items-center ${
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
                Envoi en cours...
              </>
            ) : (
              <>
                Soumettre la demande
                <ArrowRightIcon className="w-5 h-5 ml-1" />
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DocumentsUpload;
