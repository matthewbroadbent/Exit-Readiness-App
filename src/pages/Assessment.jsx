import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FaArrowRight, FaArrowLeft, FaCheck } from 'react-icons/fa'
import { categories } from '../data/questions'
import { useScore } from '../contexts/ScoreContext'
import { toast } from 'react-toastify'
import CategoryCard from '../components/CategoryCard'

function Assessment() {
  const location = useLocation()
  const navigate = useNavigate()
  const { answers, saveAnswers, updateCategoryScore, markCategoryCompleted, completedCategories } = useScore()
  
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [currentAnswers, setCurrentAnswers] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Initialize from location state if available
  useEffect(() => {
    if (location.state?.categoryId) {
      const category = categories.find(c => c.id === location.state.categoryId)
      if (category) {
        handleCategorySelect(category.id)
      }
    }
  }, [location.state])
  
  // Load saved answers when category changes
  useEffect(() => {
    if (selectedCategory && answers[selectedCategory.id]) {
      setCurrentAnswers(answers[selectedCategory.id])
    } else {
      setCurrentAnswers({})
    }
  }, [selectedCategory, answers])
  
  const handleCategorySelect = (categoryId) => {
    const category = categories.find(c => c.id === categoryId)
    setSelectedCategory(category)
    setCurrentQuestionIndex(0)
  }
  
  const handleAnswerSelect = (questionId, value) => {
    setCurrentAnswers(prev => ({
      ...prev,
      [questionId]: value
    }))
  }
  
  const handleNext = () => {
    if (currentQuestionIndex < selectedCategory.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    }
  }
  
  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }
  
  const handleSubmit = async () => {
    if (Object.keys(currentAnswers).length !== selectedCategory.questions.length) {
      toast.error('Please answer all questions before submitting')
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Calculate score (average of all answers)
      const totalScore = Object.values(currentAnswers).reduce((sum, value) => sum + value, 0)
      const averageScore = Math.round(totalScore / selectedCategory.questions.length)
      
      // Save answers and update score
      saveAnswers(selectedCategory.id, currentAnswers)
      updateCategoryScore(selectedCategory.id, averageScore)
      markCategoryCompleted(selectedCategory.id)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success(`${selectedCategory.title} assessment completed!`)
      
      // Check if all categories are completed
      const allCompleted = categories.every(category => 
        completedCategories.includes(category.id) || category.id === selectedCategory.id
      )
      
      if (allCompleted) {
        navigate('/results')
      } else {
        setSelectedCategory(null)
      }
    } catch (error) {
      toast.error('There was an error saving your answers. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  const currentQuestion = selectedCategory?.questions[currentQuestionIndex]
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {!selectedCategory ? (
        <>
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900">Business Exit Readiness Assessment</h1>
            <p className="mt-4 text-lg font-medium text-white bg-primary-700 px-6 py-3 rounded-lg max-w-3xl mx-auto shadow-md">
              Select a category to begin your assessment. Each category contains 5 questions to evaluate your exit readiness.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <CategoryCard 
                key={category.id} 
                category={category} 
                completed={completedCategories.includes(category.id)}
                onClick={handleCategorySelect}
              />
            ))}
          </div>
          
          {completedCategories.length > 0 && (
            <div className="mt-12 text-center">
              <button
                onClick={() => navigate('/results')}
                className="btn btn-primary"
              >
                View Your Results
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-primary-600 hover:text-primary-800 font-medium flex items-center"
            >
              <FaArrowLeft className="mr-2" />
              Back to Categories
            </button>
            <h2 className="text-2xl font-bold text-gray-900 mt-4">{selectedCategory.title}</h2>
            <p className="text-gray-600">{selectedCategory.description}</p>
            
            <div className="mt-4 flex items-center">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-primary-600 h-2 rounded-full" 
                  style={{ width: `${((currentQuestionIndex + 1) / selectedCategory.questions.length) * 100}%` }}
                ></div>
              </div>
              <span className="ml-4 text-sm font-medium text-gray-600">
                Question {currentQuestionIndex + 1} of {selectedCategory.questions.length}
              </span>
            </div>
          </div>
          
          {currentQuestion && (
            <div className="bg-white shadow-md rounded-lg p-6 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">{currentQuestion.text}</h3>
              
              <div className="space-y-4">
                {currentQuestion.options.map((option) => (
                  <div 
                    key={option.value}
                    onClick={() => handleAnswerSelect(currentQuestion.id, option.value)}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      currentAnswers[currentQuestion.id] === option.value 
                        ? 'border-primary-500 bg-primary-50' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-start">
                      <div className={`flex-shrink-0 h-5 w-5 rounded-full border flex items-center justify-center ${
                        currentAnswers[currentQuestion.id] === option.value 
                          ? 'border-primary-500 bg-primary-500' 
                          : 'border-gray-300'
                      }`}>
                        {currentAnswers[currentQuestion.id] === option.value && (
                          <FaCheck className="h-3 w-3 text-white" />
                        )}
                      </div>
                      <div className="ml-3">
                        <p className="text-gray-900 font-medium">{option.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              className="btn btn-secondary"
            >
              <FaArrowLeft className="mr-2" />
              Previous
            </button>
            
            {currentQuestionIndex < selectedCategory.questions.length - 1 ? (
              <button
                onClick={handleNext}
                disabled={!currentAnswers[currentQuestion?.id]}
                className="btn btn-primary"
              >
                Next
                <FaArrowRight className="ml-2" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !currentAnswers[currentQuestion?.id]}
                className="btn btn-success"
              >
                {isSubmitting ? 'Submitting...' : 'Complete Assessment'}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Assessment
