import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreditDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [credit, setCredit] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/req/credits/${id}`)
      .then(res => setCredit(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleStatusChange = (status) => {
    axios.put(`http://localhost:5000/api/req/credits/${id}/status`, { status })
      .then(() => navigate('/admin'))
      .catch(err => console.error(err));
  };

  if (!credit) return <div>Chargement...</div>;

  return (
    <div style={{ padding: '2rem', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <h2 style={{ color: '#c00000', marginBottom: '1.5rem' }}>
        Détails de la demande de crédit
      </h2>

      <div style={cardStyle}>
        <h3 style={subHeader}>Informations personnelles</h3>
        <p><strong>Nom:</strong> {credit.personalInfo.lastName}</p>
        <p><strong>Prénom:</strong> {credit.personalInfo.firstName}</p>
        <p><strong>CIN:</strong> {credit.personalInfo.cin}</p>
        <p><strong>Téléphone:</strong> {credit.personalInfo.phone}</p>
        <p><strong>Email:</strong> {credit.personalInfo.email}</p>
        <p><strong>Date de naissance:</strong> {credit.personalInfo.dateOfBirth}</p>
        <p><strong>Adresse:</strong> {credit.personalInfo.address}</p>
      </div>

      <div style={cardStyle}>
        <h3 style={subHeader}>Informations professionnelles</h3>
        <p><strong>Profession:</strong> {credit.professionalInfo.profession}</p>
        <p><strong>Entreprise:</strong> {credit.professionalInfo.company}</p>
        <p><strong>Type de contrat:</strong> {credit.professionalInfo.contractType}</p>
        <p><strong>Ancienneté:</strong> {credit.professionalInfo.seniority}</p>
      </div>

      <div style={cardStyle}>
        <h3 style={subHeader}>Informations financières</h3>
        <p><strong>Revenu mensuel:</strong> {credit.financialInfo.monthlyIncome} TND</p>
        <p><strong>Autres revenus:</strong> {credit.financialInfo.otherIncome} TND</p>
        <p><strong>Montant demandé:</strong> {credit.financialInfo.loanAmount} TND</p>
        <p><strong>Dépenses mensuelles:</strong> {credit.financialInfo.monthlyExpenses} TND</p>
      </div>

      <div style={cardStyle}>
        <h3 style={subHeader}>Agence</h3>
        <p><strong>Gouvernorat:</strong> {credit.agencyInfo.governorate}</p>
        <p><strong>Ville:</strong> {credit.agencyInfo.city}</p>
        <p><strong>Agence:</strong> {credit.agencyInfo.agency}</p>
      </div>

      <div style={cardStyle}>
        <h3 style={subHeader}>Informations du crédit</h3>
        <p><strong>Type:</strong> {credit.creditType}</p>
        <p><strong>Montant:</strong> {credit.creditAmount} TND</p>
        <p><strong>Durée:</strong> {credit.duration} mois</p>
        <p><strong>Mensualité:</strong> {credit.monthlyPayment} TND</p>
        <p><strong>Statut:</strong> {credit.status || 'En attente'}</p>
        <p><strong>Date de création:</strong> {new Date(credit.createdAt).toLocaleString()}</p>
      </div>

      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
        <button style={{ ...buttonStyle, backgroundColor: '#c00000' }} onClick={() => handleStatusChange('approuvé')}>
          Approuver
        </button>
        <button style={{ ...buttonStyle, backgroundColor: '#333' }} onClick={() => handleStatusChange('rejeté')}>
          Rejeter
        </button>
      </div>
    </div>
  );
};

const cardStyle = {
  marginBottom: '1.5rem',
  padding: '1.5rem',
  border: '1px solid #ddd',
  borderRadius: '8px',
  backgroundColor: '#fff',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
  maxWidth: '500px'
};

const subHeader = {
  color: '#c00000',
  marginBottom: '0.75rem'
};

const buttonStyle = {
  color: '#fff',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '4px',
  fontWeight: 'bold',
  cursor: 'pointer'
};

export default CreditDetails;
