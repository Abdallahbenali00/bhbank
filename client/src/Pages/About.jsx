import React from 'react';
import team1 from '../assets/team1.jpg'; // <-- Import de l'image locale
import team2 from '../assets/team2.jpg'; // <-- Import de l'image locale
const About = () => {
  return (
    <div className="bg-gray-100">
      {/* Section Héro */}
      <div className="bg-black text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">À propos de BH Bank Tunisia</h1>
          <p className="text-xl">Votre partenaire financier de confiance</p>
        </div>
      </div>

      {/* Section À propos */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-red-600 mb-6">Qui sommes-nous ?</h2>
            <p className="text-gray-700 leading-relaxed">
              BH Bank Tunisia est une institution financière de premier plan, dédiée à offrir des solutions bancaires innovantes aux particuliers et aux entreprises. Forte d’une longue histoire, nous sommes reconnus pour notre fiabilité, notre excellence et notre engagement envers nos clients.
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Notre mission est d’accompagner nos clients avec une gamme complète de produits et services financiers adaptés à leurs besoins. Que vous recherchiez une solution bancaire personnelle, un prêt professionnel ou un placement, BH Bank est là pour vous.
            </p>
          </div>
          <div>
            <img 
              src="https://managers.tn/wp-content/uploads/2022/04/Photo-Siege-BH-Bank.jpg" 
              alt="BH Bank Tunisia" 
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Section Équipe */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-blue-900 text-center mb-12">Notre Équipe</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="text-center">
              <img 
                src={team1} 
                alt="Membre 1" 
                className="rounded-full w-48 h-48 mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold">Abdallah Ben Ali</h3>
              <p className="text-gray-600">Directeur Général (CEO)</p>
            </div>
            <div className="text-center">
            <img 
                src={team2} 
                alt="Membre 2" 
                className="rounded-full w-48 h-48 mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold">Dhafer Gharbi</h3>
              <p className="text-gray-600">Directeur Financière (CFO)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
