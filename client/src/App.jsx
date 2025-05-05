import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Chat from "./pages/chat.jsx";
import PersonalInfo from "./pages/PersonalInfo.jsx";
import Contact from "./pages/Contact.jsx";
import CreditSimulation from "./Pages/CreditSimulation.jsx";
import ProfessionalInfo from "./pages/ProfessionalInfo.jsx";
import Signup from "./pages/Signup.jsx";
import Singin from "./pages/SingIn.jsx";
import InfosFinanciers from "./pages/Infos-financiers.jsx";
import DocumentUpload from "./pages/documentUpload.jsx";
import DemandeEligible from "./pages/demande-eligible.jsx";
import Dashboard from './Pages/Dashboard';
import CreditsPage from "./admin/CreditsPage.jsx";
import CreditDetails from "./admin/CreditDetails.jsx";
import Reclamations from "./admin/ReclamationsTable.jsx"
import Admin from "./admin/Admin.jsx"
import UsersPage from "./admin/UsersPage.jsx"

function App() {
  return (
    <Router>
      <Header />
       <ToastContainer position="top-center" autoClose={3000} />
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/personal-info" element={<PersonalInfo />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/credit-simulation" element={<CreditSimulation />} />
        <Route path="/professional-info" element={<ProfessionalInfo />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Singin />} />
        <Route path="/infos-financiers" element={<InfosFinanciers />} />
        <Route path="/documents-upload" element={<DocumentUpload />} />
        <Route path="/demande-eligible" element={<DemandeEligible />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/credits" element={<CreditsPage />} />
        <Route path="/admin/credits/:id" element={<CreditDetails />} />
        <Route path="/admin/rec" element={<Reclamations />} />
        <Route path="/admin/users" element={<UsersPage/>} />




      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
