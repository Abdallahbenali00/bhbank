import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-12 pb-6">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-gray-700 pb-10">
          {/* À propos */}
          <div>
            <h3 className="text-xl font-semibold text-red-600 mb-4">À propos</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              BH Bank est votre partenaire financier de confiance. Nous offrons des services bancaires
              sécurisés, transparents et innovants pour répondre aux besoins de chaque client.
            </p>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className="text-xl font-semibold text-red-600 mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-white transition">Accueil</a></li>
              <li><a href="/about" className="text-gray-400 hover:text-white transition">À propos</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-white transition">Contactez-nous</a></li>
              <li><a href="/credit-simulation" className="text-gray-400 hover:text-white transition">Simulation crédit</a></li>
            </ul>
          </div>

          {/* Contact + Réseaux sociaux */}
          <div>
            <h3 className="text-xl font-semibold text-red-600 mb-4">Contact</h3>
            <ul className="text-gray-400 text-sm space-y-3">
              <li className="flex items-center gap-2"><FaEnvelope className="text-red-600" /> support@bhbank.com</li>
              <li className="flex items-center gap-2"><FaPhoneAlt className="text-red-600" /> +216 71 123 456</li>
              <li className="flex items-center gap-2"><FaMapMarkerAlt className="text-red-600" /> 123 Rue de la Banque, Tunis</li>
              <li className="text-xs mt-2 text-gray-500">Ouvert du Lundi au Vendredi, 8h - 17h</li>
            </ul>

            <div className="flex gap-4 mt-5 text-red-600">
              <a href="https://www.facebook.com/BHBankTunisie" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebook className="hover:text-white transition" />
              </a>
              <a href="https://twitter.com/BHBankTN" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FaTwitter className="hover:text-white transition" />
              </a>
              <a href="https://www.linkedin.com/company/bh-bank" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedin className="hover:text-white transition" />
              </a>
            </div>
          </div>
        </div>

        {/* Mention légale */}
        <div className="mt-6 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} BH Bank. Tous droits réservés.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
