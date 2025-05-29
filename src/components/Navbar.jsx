import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  
  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const isActive = (path) => {
    return location.pathname === path ? 'text-primary-600 font-semibold' : 'text-gray-700 hover:text-primary-600'
  }

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-primary-700">Business Exit Scorecard</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link to="/" className={`${isActive('/')} transition-colors duration-200 px-3 py-2 text-sm font-medium`}>
              Home
            </Link>
            <Link to="/assessment" className={`${isActive('/assessment')} transition-colors duration-200 px-3 py-2 text-sm font-medium`}>
              Assessment
            </Link>
            <Link to="/results" className={`${isActive('/results')} transition-colors duration-200 px-3 py-2 text-sm font-medium`}>
              Results
            </Link>
            <Link to="/contact" className={`${isActive('/contact')} transition-colors duration-200 px-3 py-2 text-sm font-medium`}>
              Contact
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <FaTimes className="block h-6 w-6" /> : <FaBars className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className={`${isActive('/') ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-100 hover:text-primary-600'} block px-3 py-2 rounded-md text-base font-medium`}
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/assessment" 
              className={`${isActive('/assessment') ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-100 hover:text-primary-600'} block px-3 py-2 rounded-md text-base font-medium`}
              onClick={() => setIsOpen(false)}
            >
              Assessment
            </Link>
            <Link 
              to="/results" 
              className={`${isActive('/results') ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-100 hover:text-primary-600'} block px-3 py-2 rounded-md text-base font-medium`}
              onClick={() => setIsOpen(false)}
            >
              Results
            </Link>
            <Link 
              to="/contact" 
              className={`${isActive('/contact') ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-100 hover:text-primary-600'} block px-3 py-2 rounded-md text-base font-medium`}
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
