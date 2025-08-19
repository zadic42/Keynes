import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: any) => {
    return location.pathname === path;
  };

  const navItems = [
    { name: 'Home', href: '/', isRoute: true },
    { name: 'About', href: '/about', isRoute: true },
    { name: 'Services', href: '/services', isRoute: true },
    { name: 'Contact', href: '/contactus', isRoute: false },
  ];

  const handleNavClick = (item: any) => {
    setIsMobileMenuOpen(false);

    // If it's a hash link and we're not on the home page, navigate to home first
    if (!item.isRoute && location.pathname !== '/') {
      // Navigate to home page, then scroll to section after a brief delay
      window.location.href = '/' + item.href;
    }
  };

  return (
    <header className={`fixed font-poppins top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg p-3' : 'bg-transparent'
      }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className={`transition-colors duration-300 ${isScrolled ? 'text-gray-900' : 'text-white'
                }`}
            >
              <div className='flex items-center'>
                <img src="/logos/keyness_logo.png" className='w-[80px] h-[80px]' alt="" />

                <div className='flex flex-col ml-3'>
                  <p
                    className={`font-bold 
                    ${isScrolled ? 'text-xl' : 'text-2xl'}`}
                  >
                    Keynes Group
                  </p>

                  <p className='text-[10px]'>Doing more, for you!</p>
                </div>
              </div>

            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              item.isRoute ? (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`font-medium transition-colors duration-300 hover:text-blue-500 ${isActive(item.href)
                    ? 'text-blue-500 border-b-2 border-blue-500 pb-1'
                    : isScrolled ? 'text-gray-700' : 'text-white'
                    }`}
                >
                  {item.name}
                </Link>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => handleNavClick(item)}
                  className={`font-medium transition-colors duration-300 hover:text-blue-500 ${isScrolled ? 'text-gray-700' : 'text-white'
                    }`}
                >
                  {item.name}
                </a>
              )
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-md transition-colors duration-300 ${isScrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white hover:text-amber-500'
                }`}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white shadow-lg rounded-lg mt-2 p-4">
            <nav className="space-y-3">
              {navItems.map((item) => (
                item.isRoute ? (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block font-medium transition-colors duration-300 hover:text-amber-500 ${isActive(item.href)
                      ? 'text-amber-500 font-semibold'
                      : 'text-gray-700'
                      }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block text-gray-700 hover:text-amber-500 font-medium transition-colors duration-300"
                    onClick={() => handleNavClick(item)}
                  >
                    {item.name}
                  </a>
                )
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;