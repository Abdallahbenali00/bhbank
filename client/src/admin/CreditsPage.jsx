import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreditsPage = () => {
  const [credits, setCredits] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/req/credits')
      .then(res => setCredits(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: '2rem', backgroundColor: '#fff', minHeight: '100vh' }}>
      <h2 style={{ color: '#c00000', marginBottom: '1.5rem' }}>Demandes de crédit</h2>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)'
      }}>
        <thead style={{ backgroundColor: '#c00000', color: '#fff' }}>
          <tr>
            <th style={cellStyle}>Nom complet</th>
            <th style={cellStyle}>Type de crédit</th>
            <th style={cellStyle}>Montant</th>
            <th style={cellStyle}>Durée</th>
            <th style={cellStyle}>Mensualité</th>
            <th style={cellStyle}>Statut</th>
            <th style={cellStyle}>Action</th>
          </tr>
        </thead>
        <tbody>
          {credits.map(credit => (
            <tr key={credit._id} style={{ backgroundColor: '#f9f9f9', borderBottom: '1px solid #ddd' }}>
              <td style={cellStyle}>{credit.personalInfo?.lastName} {credit.personalInfo?.firstName}</td>
              <td style={cellStyle}>{credit.creditType}</td>
              <td style={cellStyle}>{credit.duration} mois</td>
              <td style={cellStyle}>{credit.monthlyPayment} TND</td>
              <td style={cellStyle}>{credit.status || 'En attente'}</td>
              <td style={cellStyle}>
                <button
                  onClick={() => navigate(`/admin/credits/${credit._id}`)}
                  style={buttonStyle}
                >
                  Voir plus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const cellStyle = {
  padding: '12px 16px',
  textAlign: 'left'
};

const buttonStyle = {
  backgroundColor: '#c00000',
  color: '#fff',
  border: 'none',
  padding: '6px 12px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: 'bold'
};

export default CreditsPage;
