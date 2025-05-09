// src/Document.jsx
import { useState } from 'react';
import axios from 'axios';

function Document() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:8000/analyze", formData);
      setResult(res.data.result);
    } catch (err) {
      console.error(err);
      setResult("Error during analysis.");
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1>Upload ID Document</h1>

      <input
        type="file"
        accept="image/*"
        onChange={e => setFile(e.target.files[0])}
        style={{ marginBottom: '1rem' }}
      />

      <br />

      <button
        onClick={handleUpload}
        disabled={!file}
        style={{
          backgroundColor: file ? '#007bff' : '#aaa',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '5px',
          cursor: file ? 'pointer' : 'not-allowed',
          marginTop: '1rem',
        }}
      >
        Analyze
      </button>

      <p style={{ marginTop: '2rem', fontSize: '1.2rem' }}>{result}</p>
    </div>
  );
}

export default Document;
