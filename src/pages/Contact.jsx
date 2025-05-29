import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useScore } from '../contexts/ScoreContext'
import { generatePDF } from '../lib/pdfGenerator'
import { sendScoreReport } from '../lib/emailService'
import { toast } from 'react-toastify'
import { FaUser, FaEnvelope, FaPhone, FaPaperPlane, FaSpinner } from 'react-icons/fa'

function Contact() {
  const navigate = useNavigate()
  const location = useLocation()
  const { scores, userInfo, setUserInfo, calculateTotalScore } = useScore()
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formAction, setFormAction] = useState('contact')
  
  useEffect(() => {
    if (location.state?.action) {
      setFormAction(location.state.action)
    }
  }, [location.state])
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setUserInfo(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate form
    if (!userInfo.name || !userInfo.email || !userInfo.phone) {
      toast.error('Please fill in all fields')
      return
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(userInfo.email)) {
      toast.error('Please enter a valid email address')
      return
    }
    
    setIsSubmitting(true)
    
    try {
      if (formAction === 'download' || formAction === 'email') {
        // Check if assessment is complete
        const totalScore = calculateTotalScore().raw
        if (totalScore === 0) {
          toast.error('Please complete the assessment before requesting results')
          setIsSubmitting(false)
          return
        }
        
        // Generate PDF
        const pdfDoc = generatePDF(scores, userInfo)
        
        if (formAction === 'download') {
          // Download PDF
          pdfDoc.save('Business_Exit_Planning_Scorecard.pdf')
          toast.success('PDF downloaded successfully')
        } else {
          // Send email with PDF
          const result = await sendScoreReport(userInfo, scores, pdfDoc)
          
          if (result.success) {
            toast.success('Results sent to your email successfully')
          } else {
            toast.error(result.error || 'Failed to send email. Please try again later.')
          }
        }
      } else {
        // Just contact form submission
        toast.success('Thank you for your message. We will contact you soon.')
      }
      
      // Navigate to home after successful submission
      setTimeout(() => {
        navigate('/')
      }, 2000)
    } catch (error) {
      console.error('Error:', error)
      toast.error('An error occurred. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  const getFormTitle = () => {
    switch (formAction) {
      case 'download':
        return 'Download Your Results'
      case 'email':
        return 'Email Your Results'
      default:
        return 'Contact Us'
    }
  }
  
  const getFormDescription = () => {
    switch (formAction) {
      case 'download':
        return 'Please provide your information to download your personalized exit planning scorecard.'
      case 'email':
        return 'Please provide your information to receive your exit planning scorecard via email.'
      default:
        return 'Have questions about business exit planning? Fill out the form below and we\'ll get back to you.'
    }
  }
  
  const getSubmitButtonText = () => {
    switch (formAction) {
      case 'download':
        return 'Download PDF'
      case 'email':
        return 'Send to Email'
      default:
        return 'Send Message'
    }
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{getFormTitle()}</h1>
          <p className="text-lg text-gray-600">
            {getFormDescription()}
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="label">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={userInfo.name}
                    onChange={handleChange}
                    className="input pl-10"
                    placeholder="Your full name"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="label">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={userInfo.email}
                    onChange={handleChange}
                    className="input pl-10"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="phone" className="label">
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaPhone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={userInfo.phone}
                    onChange={handleChange}
                    className="input pl-10"
                    placeholder="(123) 456-7890"
                    required
                  />
                </div>
              </div>
              
              {formAction === 'contact' && (
                <div>
                  <label htmlFor="message" className="label">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="input"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
              )}
              
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary w-full flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="mr-2" />
                      {getSubmitButtonText()}
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
        
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            By submitting this form, you agree to our{' '}
            <a href="#" className="text-primary-600 hover:text-primary-500">
              Privacy Policy
            </a>{' '}
            and{' '}
            <a href="#" className="text-primary-600 hover:text-primary-500">
              Terms of Service
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

export default Contact
