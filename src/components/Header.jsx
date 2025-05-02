import { Link } from 'react-router-dom';
import BHimg from '../assets/mainlogo.jpg';

const Header = () => {
  return (
    <header className="bg-black text-white py-4 shadow-lg">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo and Image in a Single Div */}
        <div className="flex items-center space-x-4">
  {/* Responsive Image */}
  <div className="w-4xl md:w-24 lg:w-32">
    <Link to="/" className="text-2xl font-bold text-red-600">
      <img
        src={BHimg}
        alt="BH Bank Logo"
        className="w-full h-auto rounded-2xl" // Make the image fully rounded
      />
    </Link>
  </div>
</div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="hover:text-red-600">
            Home
          </Link>
          <Link to="/about" className="hover:text-red-600">
            About
          </Link>
          <Link to="/contact" className="hover:text-red-600">
            Contact Us
          </Link>
          <Link
  to="/signin"
  className="bg-red-600 text-white px-4 py-1 rounded-lg hover:bg-red-700 transition-colors duration-300"
>
  Login
</Link>
          
        </nav>

        {/* Mobile Menu Button (Hamburger) */}
        <button className="md:hidden text-white focus:outline-none">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/s"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;