import { FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa'

function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-secondary-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Business Exit Planning Scorecard</h3>
            <p className="text-secondary-300 text-sm">
              Assess your business exit readiness and get personalized recommendations to maximize your exit value.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-secondary-300 text-sm">
              <li><a href="/" className="hover:text-white transition-colors duration-200">Home</a></li>
              <li><a href="/assessment" className="hover:text-white transition-colors duration-200">Take Assessment</a></li>
              <li><a href="/results" className="hover:text-white transition-colors duration-200">View Results</a></li>
              <li><a href="/contact" className="hover:text-white transition-colors duration-200">Contact Us</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4 text-secondary-300">
              <a href="#" className="hover:text-white transition-colors duration-200">
                <FaLinkedin size={24} />
              </a>
              <a href="#" className="hover:text-white transition-colors duration-200">
                <FaTwitter size={24} />
              </a>
              <a href="mailto:matthew@norivane.com" className="hover:text-white transition-colors duration-200">
                <FaEnvelope size={24} />
              </a>
            </div>
            <p className="mt-4 text-secondary-300 text-sm">
              Email: matthew@norivane.com
            </p>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-secondary-700 text-center text-secondary-400 text-sm">
          <p>&copy; {currentYear} Business Exit Planning Scorecard. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
