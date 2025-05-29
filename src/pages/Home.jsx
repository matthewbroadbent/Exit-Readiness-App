import { useNavigate } from 'react-router-dom'
import { FaChartLine, FaClipboardCheck, FaFileAlt, FaEnvelope } from 'react-icons/fa'
import { categories } from '../data/questions'
import CategoryCard from '../components/CategoryCard'

function Home() {
  const navigate = useNavigate()
  
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-700 to-primary-900 text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Is Your Business Ready for Exit?
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8">
              Assess your business exit readiness with our comprehensive scorecard and get personalized recommendations to maximize your exit value.
            </p>
            <button 
              onClick={() => navigate('/assessment')}
              className="btn btn-success text-lg px-8 py-3"
            >
              Start Your Assessment
            </button>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Our scorecard helps you identify strengths and weaknesses in your exit planning process
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="mx-auto w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4">
                <FaClipboardCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Complete Assessment</h3>
              <p className="text-gray-600">Answer questions across six key business exit readiness categories</p>
            </div>
            
            <div className="text-center p-6">
              <div className="mx-auto w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4">
                <FaChartLine className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Your Score</h3>
              <p className="text-gray-600">Receive a detailed breakdown of your exit readiness by category</p>
            </div>
            
            <div className="text-center p-6">
              <div className="mx-auto w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4">
                <FaFileAlt className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Review Recommendations</h3>
              <p className="text-gray-600">Get personalized recommendations to improve your exit readiness</p>
            </div>
            
            <div className="text-center p-6">
              <div className="mx-auto w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4">
                <FaEnvelope className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Receive PDF Report</h3>
              <p className="text-gray-600">Download a comprehensive PDF report with your scores and action plan</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Assessment Categories</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Our comprehensive assessment evaluates six critical areas of business exit readiness
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="p-8 md:p-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Assess Your Business Exit Readiness?</h2>
              <p className="text-lg text-gray-600 mb-6">
                Take our comprehensive assessment to identify strengths and weaknesses in your exit planning process and receive personalized recommendations.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button 
                  onClick={() => navigate('/assessment')}
                  className="btn btn-primary text-lg px-8 py-3"
                >
                  Start Assessment
                </button>
                <button 
                  onClick={() => navigate('/contact')}
                  className="btn btn-secondary text-lg px-8 py-3"
                >
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
