// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="bg-gray-100">
      {/* Section Héros */}
      <div className="relative bg-black text-white py-32">
        <div className="absolute inset-0 bg-[url('https://via.placeholder.com/1920x800')] bg-cover bg-center opacity-50"></div>
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-5xl font-bold mb-6">Bienvenue chez BH Bank Tunisie</h1>
          <p className="text-xl mb-8">Votre partenaire de confiance pour la croissance financière</p>
          <Link 
            to="/credit-simulation" 
            className="bg-white text-blue-900 px-8 py-3 rounded-full font-semibold hover:bg-red-600 transition duration-300"
          >
            Découvrir nos services
          </Link>
        </div>
      </div>

      {/* Section À propos */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-black mb-6">À propos de BH Bank Tunisie</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              BH Bank Tunisie est une institution financière de premier plan, dédiée à fournir des solutions bancaires innovantes aux particuliers et aux entreprises. Forts d’une riche histoire s’étalant sur plusieurs décennies, nous avons bâti une réputation de confiance, de fiabilité et d’excellence dans le secteur financier.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Notre mission est de renforcer les capacités de nos clients en leur offrant une large gamme de produits et services financiers adaptés à leurs besoins spécifiques. Que vous recherchiez des services bancaires personnels, des prêts professionnels ou des opportunités d’investissement, BH Bank Tunisie est là pour vous aider à atteindre vos objectifs financiers.
            </p>
          </div>
          <div>
            <img 
              src="https://cdn2.webmanagercenter.com/wmc/wp-content/uploads/2023/04/tunisie-wmc-bourse-bh.jpg" 
              alt="BH Bank Tunisie" 
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Section Services */}
      <div id="services" className="bg-white py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-black text-center mb-12">Nos Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <img 
                src="https://img.freepik.com/vecteurs-premium/illustration-plate-facile-utiliser-services-bancaires-mobiles_203633-7624.jpg?w=740" 
                alt="Banque personnelle" 
                className="w-20 h-20 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Banque personnelle</h3>
              <p className="text-gray-600">Des solutions financières adaptées pour mieux gérer votre argent.</p>
            </div>
            <div className="text-center bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <img 
                src="https://img.freepik.com/photos-gratuite/audit-actifs-du-compte-banque-comptabilite-finance-concept_53876-124924.jpg?t=st=1742785124~exp=1742788724~hmac=2399694239c542486d534436c0a11012981cfe613e83a6785f4c04df6ae12ca0&w=996" 
                alt="Prêts professionnels" 
                className="w-20 h-20 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Prêts professionnels</h3>
              <p className="text-gray-600">Des options de prêt flexibles pour soutenir la croissance de votre entreprise.</p>
            </div>
            <div className="text-center bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <img 
                src="https://img.freepik.com/photos-gratuite/graphique-investissement-economie-bourse_53876-138489.jpg?t=st=1742785168~exp=1742788768~hmac=f64b3216305e878437b3204175f57a6171f5aad817f2b453721e21d6769647b2&w=996" 
                alt="Solutions d’investissement" 
                className="w-20 h-20 mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold mb-2">Solutions d’investissement</h3>
              <p className="text-gray-600">Des conseils d’experts et des outils pour faire fructifier votre patrimoine.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Section Chatbot */}
      <div className="bg-blue-50 py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://img.freepik.com/vecteurs-premium/illustration-plate-facile-utiliser-services-bancaires-mobiles_203633-7624.jpg?w=740" 
                alt="Assistant Chatbot" 
                className="rounded-lg shadow-lg w-full max-w-md mx-auto"
              />
            </div>
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
        </div>
      </div>

      {/* Section Appel à l'action */}
      <div className="bg-black text-white py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Prêt à évoluer avec nous ?</h2>
          <p className="text-xl mb-8">Rejoignez BH Bank Tunisie dès aujourd’hui et faites le premier pas vers vos objectifs financiers.</p>
          <a 
            href="/signUp" 
            className="bg-white text-blue-900 px-8 py-3 rounded-full font-semibold hover:bg-blue-100 transition duration-300"
          >
            Commencer
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
