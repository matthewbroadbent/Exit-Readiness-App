import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaDownload, FaRedo, FaExclamationTriangle, FaCheckCircle, FaArrowRight, FaInfoCircle } from 'react-icons/fa'
import { useScore } from '../contexts/ScoreContext'
import { categories } from '../data/questions'
import { toast } from 'react-toastify'
import { generatePDF } from '../lib/pdfGenerator'
import ScoreChart from '../components/ScoreChart'
import UserDataForm from '../components/UserDataForm'
import ConsultationBooking from '../components/ConsultationBooking'
import { sendScoreReport } from '../lib/emailService'

function Results() {
  const navigate = useNavigate()
  const { scores, calculateOverallScore, completedCategories, resetAll } = useScore()
  const [isGenerating, setIsGenerating] = useState(false)
  const [showUserForm, setShowUserForm] = useState(false)
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [userInfo, setUserInfo] = useState(null)
  const [pdfDoc, setPdfDoc] = useState(null)
  const [isPreviewEnvironment, setIsPreviewEnvironment] = useState(false)
  
  // Check if we're in a preview environment
  useEffect(() => {
    const isXBeshPreview = window.location.hostname.includes('webcontainer') || 
                          window.location.hostname.includes('stackblitz') ||
                          window.location.hostname.includes('localhost');
    setIsPreviewEnvironment(isXBeshPreview);
  }, []);
  
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
      // Generate PDF report
      const pdfData = {
        totalScore: {
          score: overallScore,
          percentage: Math.round((overallScore / 5) * 100)
        },
        readinessLevel: getReadinessLevel(overallScore),
        scores: scores,
        categories: categories.reduce((acc, cat) => {
          acc[cat.id] = cat.title;
          return acc;
        }, {})
      };
      
      const doc = await generatePDF(pdfData);
      setPdfDoc(doc);
      
      // Show user form after PDF is generated
      setShowUserForm(true);
      toast.success('Report generated! Please complete the form to continue.');
    } catch (error) {
      console.error('PDF generation error:', error);
      toast.error('There was an error generating your report.');
    } finally {
      setIsGenerating(false);
    }
  }
  
  const getReadinessLevel = (score) => {
    if (score >= 4.5) return { level: 'Excellent', description: 'Your business is highly exit-ready' };
    if (score >= 4) return { level: 'Very Good', description: 'Your business is well-positioned for exit' };
    if (score >= 3) return { level: 'Good', description: 'Your business has a solid foundation but needs improvement in key areas' };
    if (score >= 2) return { level: 'Fair', description: 'Significant improvements needed before your business is exit-ready' };
    return { level: 'Poor', description: 'Your business requires substantial work to become exit-ready' };
  }
  
  const handleUserFormSubmit = async (formData) => {
    try {
      // Save user data
      setUserInfo(formData);
      
      // Show booking form
      setShowUserForm(false);
      setShowBookingForm(true);
      
      toast.success('Information received! Please schedule a consultation to receive your report.');
      
      // In a real implementation, you would save this data to your database
      // For now, we're just transitioning to the booking step
      
      return true;
    } catch (error) {
      console.error('Error processing user data:', error);
      toast.error('There was an error processing your information.');
      return false;
    }
  }
  
  const handleBookingComplete = async () => {
    try {
      // Send the report via email
      if (userInfo && pdfDoc) {
        try {
          const result = await sendScoreReport(userInfo, scores, pdfDoc);
          
          if (result.success) {
            if (result.warning) {
              toast.warning(result.warning);
            } else {
              toast.success('Your detailed report has been sent to your email!');
            }
          } else {
            // If email fails, fall back to direct download
            pdfDoc.save('exit-readiness-assessment.pdf');
            toast.warning('We couldn\'t send the email, but your report has been downloaded to your device.');
          }
        } catch (emailError) {
          console.error('Error sending email:', emailError);
          // Fall back to direct download
          pdfDoc.save('exit-readiness-assessment.pdf');
          toast.warning('We couldn\'t send the email, but your report has been downloaded to your device.');
        }
      } else {
        // If we don't have user info or PDF doc for some reason, show an error
        toast.error('There was an error processing your report. Please try again.');
      }
      
      // Reset the flow
      setShowBookingForm(false);
      setPdfDoc(null);
      setUserInfo(null);
      
      // Navigate to home
      navigate('/');
      
    } catch (error) {
      console.error('Error completing booking:', error);
      toast.error('There was an error completing your booking.');
      
      // Try to download the PDF as a fallback
      if (pdfDoc) {
        try {
          pdfDoc.save('exit-readiness-assessment.pdf');
          toast.info('Your report has been downloaded to your device.');
        } catch (pdfError) {
          console.error('Error downloading PDF:', pdfError);
        }
      }
    }
  }
  
  const handleUserFormCancel = () => {
    setShowUserForm(false);
    setPdfDoc(null);
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
      {showUserForm ? (
        <UserDataForm 
          onSubmit={handleUserFormSubmit}
          onCancel={handleUserFormCancel}
        />
      ) : showBookingForm ? (
        <ConsultationBooking 
          userInfo={userInfo}
          onBookingComplete={handleBookingComplete}
        />
      ) : (
        <>
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900">Your Exit Readiness Results</h1>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Based on your assessment, here's how your business scores on exit readiness.
            </p>
            
            {isPreviewEnvironment && (
              <div className="mt-4 bg-info-100 border border-info-300 text-info-800 px-4 py-3 rounded inline-flex items-center">
                <FaInfoCircle className="mr-2" />
                <span>Preview Mode: Some features like email sending are simulated in this environment.</span>
              </div>
            )}
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
            
            {/* Add Score Chart */}
            <div className="mt-8">
              <ScoreChart 
                scores={{
                  financialReadiness: scores.financial || 0,
                  businessOperations: scores.operations || 0,
                  legalCompliance: scores.legal || 0,
                  marketPosition: scores.market || 0,
                  successionPlanning: scores.team || 0,
                  personalReadiness: scores.personal || 0
                }} 
              />
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
              {isGenerating ? 'Generating Report...' : (
                <>
                  <FaDownload className="mr-2" />
                  Get Your Detailed Report
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
        </>
      )}
    </div>
  )
}

export default Results
