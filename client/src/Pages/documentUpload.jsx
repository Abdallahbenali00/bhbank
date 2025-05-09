import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  DocumentTextIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import axios from 'axios';

const DocumentsUpload = () => {
  const location = useLocation();
  const formData = location.state || {};

  const [documents, setDocuments] = useState({
    cinRecto: null,
    cinVerso: null,
    bankStatements: null,
    taxDeclaration: null,
    incomeProof: null,
    professionalCard: null,
    addressProof: null,
    carProforma: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const verifyIdentityCard = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:8000/analyze", formData);
      return res.data.result.trim().toLowerCase();
    } catch (error) {
      console.error("Verification error:", error);
      return "error";
    }
  };

  const handleFileChange = async (name, file) => {
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

    if (name === 'cinRecto' || name === 'cinVerso') {
      const result = await verifyIdentityCard(file);
      if (result === 'yes') {
        toast.success(`✅ ${name} vérifié : Carte d'identité détectée`);
      } else if (result === 'no') {
        toast.warning(`⚠️ ${name} ne semble pas être une carte d'identité valide`);
      } else {
        toast.error("Erreur lors de la vérification avec l'IA.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const requiredDocs = [
      { name: 'cinRecto', label: 'CIN Recto' },
      { name: 'cinVerso', label: 'CIN Verso' },
    ];

    const missingDocs = requiredDocs.filter(doc => !documents[doc.name]);

    if (missingDocs.length > 0) {
      toast.error(`Documents manquants: ${missingDocs.map(d => d.label).join(', ')}`);
      setIsSubmitting(false);
      return;
    }

    try {
      const formDataToSend = new FormData();

      // Add user + simulation + agency data
      formDataToSend.append("userData", JSON.stringify(formData));

      // Add all uploaded documents
      Object.entries(documents).forEach(([key, file]) => {
        if (file) {
          formDataToSend.append(key, file);
        }
      });

      await axios.post('http://localhost:5000/api/req/credits', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      toast.success("📤 Tous les documents et données ont été envoyés !");
    } catch (error) {
      console.error("Erreur lors de l'envoi final :", error);
      toast.error("❌ Erreur lors de la soumission finale.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const documentFields = [
    { name: 'cinRecto', label: 'CIN (Recto)', required: true, condition: true },
    { name: 'cinVerso', label: 'CIN (Verso)', required: true, condition: true },
    { name: 'bankStatements', label: 'Relevés bancaires (3 derniers mois)', required: false, condition: true },
    { name: 'taxDeclaration', label: 'Déclaration fiscale', required: false, condition: true },
    { name: 'incomeProof', label: 'Justificatif de revenus', required: false, condition: true },
    {
      name: 'professionalCard',
      label: formData?.professionalInfo?.profession === 'LIBERAL'
        ? 'Carte professionnelle'
        : 'Registre de commerce',
      required: false,
      condition: !!formData?.professionalInfo?.profession
    },
    { name: 'addressProof', label: 'Justificatif de domicile (moins de 3 mois)', required: false, condition: true },
    { name: 'carProforma', label: 'Facture pro-forma véhicule', required: false, condition: formData?.creditType === 'CREDIT_AUTO' },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6">
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center mb-6">
          <DocumentTextIcon className="w-8 h-8 text-blue-500 mr-2" />
          <h1 className="text-2xl font-bold text-gray-800">Téléversement des documents</h1>
        </div>

        <div className="mb-4 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-800">
            Veuillez téléverser vos documents (PDF, JPG ou PNG — max 5MB). Les deux côtés de la CIN sont obligatoires.
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

        <div className="flex justify-end mt-8">
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
              <>Soumettre</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DocumentsUpload;
