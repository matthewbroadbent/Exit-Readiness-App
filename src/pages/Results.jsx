import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaDownload, FaRedo, FaExclamationTriangle, FaCheckCircle, FaArrowRight } from 'react-icons/fa'
import { useScore } from '../contexts/ScoreContext'
import { categories } from '../data/questions'
import { toast } from 'react-toastify'

function Results() {
  const navigate = useNavigate()
  const { scores, calculateOverallScore, completedCategories, resetAll } = useScore()
  const [isGenerating, setIsGenerating] = useState(false)
  
  const overallScore = calculateOverallScore()
  
  const getScoreColor = (score) => {
    if (score >= 4) return 'text-success-600'
    if (score >= 3) return 'text-warning-600'
    return 'text-danger-600'
  }
  
  const getScoreBackground = (score) => {
    if (score >= 4) return 'bg-success-100'
    if (score >= 3) return 'bg-warning-100'
    return 'bg-danger-100'
  }
  
  const getRecommendation = (categoryId, score) => {
    if (score >= 4) {
      return 'Your business is well-positioned in this area. Continue to maintain and improve these practices.'
    } else if (score >= 3) {
      return 'Your business has a solid foundation but there are opportunities for improvement.'
    } else {
      switch (categoryId) {
        case 'financial':
          return 'Consider working with a financial advisor to improve your financial documentation and forecasting.'
        case 'operations':
          return 'Focus on documenting key processes and reducing operational dependencies on key individuals.'
        case 'legal':
          return 'Consult with legal counsel to address compliance issues and strengthen contractual protections.'
        case 'market':
          return 'Develop strategies to strengthen your competitive position and diversify revenue streams.'
        case 'team':
          return 'Invest in building a stronger management team and implementing succession planning.'
        case 'personal':
          return 'Work with a financial planner and exit planning specialist to develop your personal exit strategy.'
        default:
          return 'This area needs significant improvement before your business is exit-ready.'
      }
    }
  }
  
  const handleDownloadPDF = async () => {
    setIsGenerating(true)
    
    try {
      // Simulate PDF generation
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast.success('PDF report generated successfully!')
      // In a real app, this would trigger a download
    } catch (error) {
      toast.error('There was an error generating your PDF report.')
    } finally {
      setIsGenerating(false)
    }
  }
  
  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all your assessment data? This cannot be undone.')) {
      resetAll()
      navigate('/')
      toast.info('Assessment data has been reset.')
    }
  }
  
  // Check if user has completed any assessments
  if (completedCategories.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <FaExclamationTriangle className="mx-auto h-12 w-12 text-warning-500" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">No Assessment Data</h2>
          <p className="mt-2 text-lg text-gray-600">
            You haven't completed any category assessments yet.
          </p>
          <div className="mt-6">
            <button
              onClick={() => navigate('/assessment')}
              className="btn btn-primary"
            >
              Start Assessment
            </button>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900">Your Exit Readiness Results</h1>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          Based on your assessment, here's how your business scores on exit readiness.
        </p>
      </div>
      
      {/* Overall Score */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Overall Exit Readiness Score</h2>
          <div className={`inline-flex items-center justify-center h-32 w-32 rounded-full ${getScoreBackground(overallScore)} mb-4`}>
            <span className={`text-4xl font-bold ${getScoreColor(overallScore)}`}>{overallScore}/5</span>
          </div>
          <p className="text-lg text-gray-700">
            {overallScore >= 4 ? (
              <span className="flex items-center justify-center">
                <FaCheckCircle className="text-success-500 mr-2" />
                Your business is well-positioned for a successful exit
              </span>
            ) : overallScore >= 3 ? (
              <span>Your business has a solid foundation but needs improvement in key areas</span>
            ) : (
              <span className="flex items-center justify-center">
                <FaExclamationTriangle className="text-warning-500 mr-2" />
                Significant improvements needed before your business is exit-ready
              </span>
            )}
          </p>
        </div>
      </div>
      
      {/* Category Scores */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Category Breakdown</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {categories.map((category) => {
          const score = scores[category.id] || 0
          const completed = completedCategories.includes(category.id)
          
          return (
            <div key={category.id} className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-900">{category.title}</h3>
                  {completed ? (
                    <span className={`text-2xl font-bold ${getScoreColor(score)}`}>{score}/5</span>
                  ) : (
                    <span className="text-sm bg-gray-100 text-gray-600 py-1 px-2 rounded">Not Completed</span>
                  )}
                </div>
                
                {completed ? (
                  <>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                      <div 
                        className={`h-2.5 rounded-full ${score >= 4 ? 'bg-success-500' : score >= 3 ? 'bg-warning-500' : 'bg-danger-500'}`} 
                        style={{ width: `${(score / 5) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-gray-600">{getRecommendation(category.id, score)}</p>
                  </>
                ) : (
                  <div className="mt-4">
                    <button
                      onClick={() => navigate('/assessment', { state: { categoryId: category.id } })}
                      className="btn btn-secondary btn-sm"
                    >
                      Complete This Assessment
                      <FaArrowRight className="ml-2" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
      
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        <button
          onClick={handleDownloadPDF}
          disabled={isGenerating}
          className="btn btn-primary"
        >
          {isGenerating ? 'Generating PDF...' : (
            <>
              <FaDownload className="mr-2" />
              Download PDF Report
            </>
          )}
        </button>
        <button
          onClick={() => navigate('/assessment')}
          className="btn btn-secondary"
        >
          Continue Assessment
        </button>
        <button
          onClick={handleReset}
          className="btn btn-danger"
        >
          <FaRedo className="mr-2" />
          Reset All Data
        </button>
      </div>
    </div>
  )
}

export default Results
