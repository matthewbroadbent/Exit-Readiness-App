import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useScore } from '../contexts/ScoreContext'
import { FaEnvelope, FaPhone, FaUser, FaBuilding, FaDownload } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { supabase } from '../lib/supabaseClient'

function Contact() {
  const navigate = useNavigate()
  const location = useLocation()
  const { userInfo, setUserInfo, scores, calculateTotalScore, getReadinessLevel } = useScore()
  
  const [formData, setFormData] = useState({
    name: userInfo.name || '',
    email: userInfo.email || '',
    phone: userInfo.phone || '',
    company: '',
    message: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [actionType, setActionType] = useState('contact')
  
  useEffect(() => {
    // Check if we're coming from results page with a specific action
    if (location.state?.action) {
      setActionType(location.state.action)
      
      // Set appropriate default message based on action
      if (location.state.action === 'download') {
        setFormData(prev => ({
          ...prev,
          message: 'I would like to download my Exit Planning Assessment results.'
        }))
      } else if (location.state.action === 'email') {
        setFormData(prev => ({
          ...prev,
          message: 'I would like to receive my Exit Planning Assessment results via email.'
        }))
      }
    }
  }, [location.state])
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Update user info in context for name, email, and phone
    if (['name', 'email', 'phone'].includes(name)) {
      setUserInfo(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    try {
      // In preview mode, simulate success without actual API calls
      if (import.meta.env.DEV) {
        console.log('Preview mode: Form submitted', {
          formData,
          scores,
          totalScore: calculateTotalScore().percentage,
          readinessLevel: getReadinessLevel().level,
          actionType
        })
        
        // Show success message
        toast.success(
          actionType === 'download' 
            ? 'Your PDF report is being generated and will download shortly.' 
            : actionType === 'email'
              ? 'Your results have been sent to your email.'
              : 'Your message has been sent successfully.'
        )
        
        // Redirect based on action type
        if (actionType === 'download' || actionType === 'email') {
          setTimeout(() => {
            navigate('/results')
          }, 2000)
        } else {
          setTimeout(() => {
            navigate('/')
          }, 2000)
        }
        
        setIsSubmitting(false)
        return
      }
      
      // Save contact info and assessment results to database
      const totalScore = calculateTotalScore()
      const readinessLevel = getReadinessLevel()
      
      const { error } = await supabase
        .from('assessment_results')
        .insert([
          {
            user_name: formData.name,
            user_email: formData.email,
            user_phone: formData.phone,
            company_name: formData.company,
            message: formData.message,
            scores: scores,
            total_score: totalScore.percentage,
            readiness_level: readinessLevel.level,
            action_type: actionType
          }
        ])
      
      if (error) throw error
      
      // Show success message
      toast.success(
        actionType === 'download' 
          ? 'Your PDF report is being generated and will download shortly.' 
          : actionType === 'email'
            ? 'Your results have been sent to your email.'
            : 'Your message has been sent successfully.'
      )
      
      // Redirect based on action type
      if (actionType === 'download') {
        // Trigger PDF download
        // This would typically call your PDF generation function
        setTimeout(() => {
          navigate('/results')
        }, 2000)
      } else if (actionType === 'email') {
        // Email has been sent via backend
        setTimeout(() => {
          navigate('/results')
        }, 2000)
      } else {
        // Regular contact form
        setTimeout(() => {
          navigate('/')
        }, 2000)
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      toast.error('There was an error processing your request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {actionType === 'download' 
              ? 'Download Your Results' 
              : actionType === 'email'
                ? 'Email Your Results'
                : 'Contact Us'}
          </h1>
          <p className="text-lg text-gray-600">
            {actionType === 'download' 
              ? 'Please provide your information to download your Exit Planning Assessment results.' 
              : actionType === 'email'
                ? 'Please provide your information to receive your results via email.'
                : 'Have questions about exit planning? Get in touch with our team.'}
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaUser className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="pl-10 w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="John Smith"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="pl-10 w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaPhone className="text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="pl-10 w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaBuilding className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="pl-10 w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Your Company, Inc."
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="How can we help you with your exit planning needs?"
                ></textarea>
              </div>
              
              <div className="flex items-center">
                <input
                  id="copy-matthew"
                  name="copy-matthew"
                  type="checkbox"
                  defaultChecked={true}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label htmlFor="copy-matthew" className="ml-2 block text-sm text-gray-700">
                  Send a copy to matthew@norivane.com
                </label>
              </div>
              
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`btn btn-primary px-8 py-3 flex items-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {actionType === 'download' && <FaDownload className="mr-2" />}
                  {actionType === 'email' && <FaEnvelope className="mr-2" />}
                  
                  {isSubmitting 
                    ? 'Processing...' 
                    : actionType === 'download'
                      ? 'Download Results'
                      : actionType === 'email'
                        ? 'Email Results'
                        : 'Send Message'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact
