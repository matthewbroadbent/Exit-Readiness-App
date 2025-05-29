import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useScore } from '../contexts/ScoreContext'
import { categories, getRecommendations } from '../data/questions'
import ScoreChart from '../components/ScoreChart'
import { FaDownload, FaEnvelope, FaExclamationTriangle, FaRedo } from 'react-icons/fa'
import { generatePDF } from '../lib/pdfGenerator'
import { toast } from 'react-toastify'

function Results() {
  const navigate = useNavigate()
  const { scores, calculateTotalScore, getReadinessLevel, clearSavedData } = useScore()
  const [recommendations, setRecommendations] = useState({})
  const [showIncompleteWarning, setShowIncompleteWarning] = useState(false)
  
  useEffect(() => {
    // Check if assessment is complete
    const totalScore = calculateTotalScore().raw
    if (totalScore === 0) {
      setShowIncompleteWarning(true)
    } else {
      setShowIncompleteWarning(false)
      // Get recommendations based on scores
      setRecommendations(getRecommendations(scores))
    }
  }, [scores, calculateTotalScore])
  
  const handleDownloadPDF = () => {
    if (showIncompleteWarning) {
      toast.error('Please complete the assessment before downloading results')
      return
    }
    
    navigate('/contact', { state: { action: 'download' } })
  }
  
  const handleEmailResults = () => {
    if (showIncompleteWarning) {
      toast.error('Please complete the assessment before emailing results')
      return
    }
    
    navigate('/contact', { state: { action: 'email' } })
  }
  
  const handleStartAssessment = () => {
    navigate('/assessment')
  }
  
  const handleStartNewAssessment = () => {
    if (window.confirm('Are you sure you want to start a new assessment? This will clear all your current data.')) {
      clearSavedData()
      navigate('/assessment')
      toast.success('Started a new assessment')
    }
  }
  
  const readinessInfo = getReadinessLevel()
  const totalScore = calculateTotalScore()
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {showIncompleteWarning ? (
        <div className="bg-warning-50 border-l-4 border-warning-500 p-6 rounded-lg mb-8">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <FaExclamationTriangle className="h-6 w-6 text-warning-500" />
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-warning-700">Assessment Incomplete</h3>
              <p className="mt-2 text-warning-600">
                You haven't completed the assessment yet. Please complete all categories to see your full results.
              </p>
              <div className="mt-4">
                <button
                  onClick={handleStartAssessment}
                  className="btn btn-warning"
                >
                  Continue Assessment
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Exit Planning Results</h1>
            <p className="text-lg text-gray-600">
              Based on your responses, here's how ready your business is for exit
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 h-full">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Overall Readiness</h2>
                
                <div className="text-center py-6">
                  <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-primary-50 border-8 border-primary-100 mb-4">
                    <span className="text-4xl font-bold text-primary-700">{totalScore.percentage}%</span>
                  </div>
                  
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">{readinessInfo.level}</h3>
                  <p className="text-gray-600">{readinessInfo.description}</p>
                </div>
                
                <div className="mt-6 space-y-4">
                  <button
                    onClick={handleDownloadPDF}
                    className="btn btn-primary w-full flex items-center justify-center"
                  >
                    <FaDownload className="mr-2" /> Download PDF Report
                  </button>
                  
                  <button
                    onClick={handleEmailResults}
                    className="btn btn-secondary w-full flex items-center justify-center"
                  >
                    <FaEnvelope className="mr-2" /> Email Results
                  </button>
                  
                  <button
                    onClick={handleStartNewAssessment}
                    className="btn btn-outline w-full flex items-center justify-center"
                  >
                    <FaRedo className="mr-2" /> Start New Assessment
                  </button>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6 h-full">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Category Breakdown</h2>
                <ScoreChart scores={scores} />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Category Scores</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => {
                const score = scores[category.id] || 0
                let statusColor = 'text-danger-500'
                let statusText = 'Needs Improvement'
                
                if (score >= 8) {
                  statusColor = 'text-success-500'
                  statusText = 'Strong'
                } else if (score >= 5) {
                  statusColor = 'text-warning-500'
                  statusText = 'Moderate'
                }
                
                return (
                  <div key={category.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{category.title}</h3>
                      <span className="text-2xl font-bold text-primary-600">{score}/10</span>
                    </div>
                    <p className={`text-sm font-medium ${statusColor}`}>{statusText}</p>
                  </div>
                )
              })}
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Recommendations</h2>
            
            <div className="space-y-8">
              {categories.map((category) => {
                const categoryRecs = recommendations[category.id] || []
                
                if (categoryRecs.length === 0) {
                  return null
                }
                
                return (
                  <div key={category.id}>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">{category.title}</h3>
                    
                    <ul className="space-y-3">
                      {categoryRecs.map((rec, index) => (
                        <li key={index} className="flex">
                          <span className="text-primary-600 mr-2">•</span>
                          <span>{rec.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
              
              {Object.values(recommendations).every(recs => recs.length === 0) && (
                <p className="text-gray-600 text-center py-4">
                  Great job! Your business appears to be well-prepared for exit across all categories.
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Results
