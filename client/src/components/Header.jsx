import { Link } from 'react-router-dom';
import BHimg from '../assets/mainlogo.jpg';

const Header = () => {
  return (
    <header className="bg-black text-white py-4 shadow-lg">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3">
          <img
            src={BHimg}
            alt="BH Bank Logo"
            className="w-20 h-auto rounded-xl"
          />
          <span className="text-2xl font-bold text-red-600">BH Bank</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-8 text-sm font-medium">
          <Link to="/" className="hover:text-red-600 transition-colors">Accueil</Link>
          <Link to="/about" className="hover:text-red-600 transition-colors">À propos</Link>
          <Link to="/contact" className="hover:text-red-600 transition-colors">Contact</Link>
          <Link
            to="/signin"
            className="bg-red-600 text-white px-4 py-1 rounded-lg hover:bg-red-700 transition duration-300"
          >
            Connexion
          </Link>
        </nav>

        {/* Menu mobile (visuel uniquement, sans logique de toggle ici) */}
        <div className="md:hidden">
          <button className="text-white focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
