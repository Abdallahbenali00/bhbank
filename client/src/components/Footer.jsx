const Footer = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Colonne 1 : À propos */}
          <div>
            <h3 className="text-lg font-bold text-red-600 mb-4">À propos</h3>
            <p className="text-sm">
              BH Bank est votre partenaire financier de confiance. Nous offrons des services bancaires sécurisés et fiables pour vous aider à atteindre vos objectifs financiers.
            </p>
          </div>

          {/* Colonne 2 : Liens rapides */}
          <div>
            <h3 className="text-lg font-bold text-red-600 mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-gray-400 hover:text-red-600">
                  Accueil
                </a>
              </li>
              <li>
                <a href="/about" className="text-gray-400 hover:text-red-600">
                  À propos
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-400 hover:text-red-600">
                  Contactez-nous
                </a>
              </li>
            </ul>
          </div>

          {/* Colonne 3 : Informations de contact */}
          <div>
            <h3 className="text-lg font-bold text-red-600 mb-4">Informations de contact</h3>
            <ul className="text-sm space-y-2">
              <li>Email : support@bhbank.com</li>
              <li>Téléphone : +216 71 123 456</li>
              <li>Adresse : 123 Rue de la Banque, Cité Financière</li>
            </ul>
          </div>
        </div>

        {/* Bas de page */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} BH Bank. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
