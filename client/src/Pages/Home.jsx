import React from 'react';
import { Link } from 'react-router-dom';
import { Bell } from 'lucide-react';

const NotificationBell = () => (
  <div className="absolute top-6 right-6 z-20">
    <button className="relative">
      <Bell className="w-6 h-6 text-white hover:text-red-500 transition" />
      <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
        1
      </span>
    </button>
  </div>
);

const Home = () => {
  return (
    <div className="bg-gray-100 relative">
      {/* Section Héros */}
      <div className="relative bg-black text-white py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://via.placeholder.com/1920x800')] bg-cover bg-center opacity-50"></div>
        
       

        <NotificationBell />
        <div className="container mx-auto text-center relative z-10 px-4">
          <h1 className="text-5xl font-bold mb-6">Concrétisez vos projets avec BH Bank Tunisie</h1>
          <p className="text-xl mb-8">Simulez votre crédit en ligne et bénéficiez d’un accompagnement sur mesure</p>
          <Link 
            to="/credit-simulation" 
            className="bg-white text-blue-900 px-8 py-3 rounded-full font-semibold hover:bg-red-600 hover:text-white transition duration-300"
          >
            Faire une demande de crédit
          </Link>
        </div>
      </div>

      {/* Section Étapes de la demande */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-black mb-12">
            Demande de crédit rapide, sécurisée et <span className="text-blue-700">100% en ligne</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                number: "1",
                title: "Simulez votre crédit",
                description: "selon votre besoin en quelques minutes",
              },
              {
                number: "2",
                title: "Renseignez vos informations",
                description: "professionnelles, personnelles et financières",
              },
              {
                number: "3",
                title: "Téléchargez vos pièces",
                description: "justificatives depuis votre ordinateur ou smartphone",
              },
              {
                number: "4",
                title: "Souscrivez gratuitement",
                description: "à la signature électronique DIGIGO pour signer votre contrat",
              },
            ].map((step, idx) => (
              <div
                key={idx}
                className="bg-gray-50 p-6 rounded-lg border hover:shadow-md transition-shadow duration-300 text-left"
              >
                <div className="flex items-center mb-4">
                  <div className="text-3xl font-bold text-red-600 mr-3">{step.number}</div>
                  <div className="text-lg font-semibold text-gray-900">{step.title}</div>
                </div>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section À propos */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-black mb-4">Pourquoi choisir BH Bank Tunisie ?</h2>
            <p className="text-gray-700 text-lg mb-4">
              BH Bank Tunisie est une banque de référence, reconnue pour son expertise et son engagement envers ses clients.
            </p>
            <p className="text-gray-700 text-lg mb-4">
              Notre mission : vous offrir des solutions financières simples, accessibles et adaptées à vos besoins.
            </p>
            <p className="text-gray-700 text-lg">
              Choisir BH Bank Tunisie, c’est opter pour l’innovation, la sécurité et un service de qualité centré sur l’humain.
            </p>
          </div>
          <div>
            <img 
              src="https://cdn2.webmanagercenter.com/wmc/wp-content/uploads/2023/04/tunisie-wmc-bourse-bh.jpg" 
              alt="Siège BH Bank Tunisie" 
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        </div>
      </section>

      {/* Section Tableau de bord */}
      <section className="bg-white py-16">
        <div className="container mx-auto text-center px-6">
          <h2 className="text-3xl font-bold text-black mb-6">Gérez vos demandes en un seul endroit</h2>
          <p className="text-gray-700 text-lg mb-6">
            Consultez vos demandes de financement, suivez leur état d’avancement et accédez à vos documents depuis votre tableau de bord personnel.
          </p>
          <Link
            to="/dashboard"
            className="bg-green-700 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-800 transition duration-300"
          >
            Accéder à mon tableau de bord
          </Link>
        </div>
      </section>

      {/* Section Nos Valeurs */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-black text-center mb-12">Nos Valeurs</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Engagement', text: 'Nous nous engageons à fournir un service bancaire de qualité, transparent et accessible pour tous.' },
              { title: 'Esprit d’équipe', text: 'Le travail collaboratif est au cœur de nos performances et de notre succès collectif.' },
              { title: 'Excellence', text: 'Nous visons l’excellence dans toutes nos actions pour offrir un service optimal à nos clients.' },
            ].map((valeur, idx) => (
              <div key={idx} className="text-center bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-2xl font-semibold mb-4 text-red-600">{valeur.title}</h3>
                <p className="text-gray-700">{valeur.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section Chatbot */}
      <section className="bg-blue-50 py-16">
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <img 
            src="https://img.freepik.com/vecteurs-premium/illustration-plate-facile-utiliser-services-bancaires-mobiles_203633-7624.jpg?w=740" 
            alt="Assistant Chatbot" 
            className="rounded-lg shadow-lg w-full max-w-md mx-auto"
          />
          <div>
            <h2 className="text-3xl font-bold text-black mb-6">Besoin d’aide ? Discutez avec notre assistant IA</h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              Notre assistant virtuel est disponible 24h/24 pour répondre à vos questions sur nos services, vous aider à gérer vos comptes et vous accompagner dans vos démarches bancaires.
            </p>
            <Link 
              to="/chat"
              className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-300 inline-block"
            >
              Lancer la discussion
            </Link>
          </div>
        </div>
      </section>

      {/* Section Appel à l'action */}
      <section className="bg-black text-white py-20 text-center px-4">
        <h2 className="text-4xl font-bold mb-6">Prêt à évoluer avec nous ?</h2>
        <p className="text-xl mb-8">Rejoignez BH Bank Tunisie dès aujourd’hui et faites le premier pas vers vos objectifs financiers.</p>
        <Link 
          to="/signUp" 
          className="bg-white text-blue-900 px-8 py-3 rounded-full font-semibold hover:bg-blue-100 transition duration-300"
        >
          Commencer
        </Link>
      </section>
    </div>
  );
};

export default Home;
