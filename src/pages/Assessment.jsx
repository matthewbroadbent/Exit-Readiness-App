import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { categories } from '../data/questions'
import { useScore } from '../contexts/ScoreContext'
import QuestionCard from '../components/QuestionCard'
import ProgressBar from '../components/ProgressBar'
import CategoryCard from '../components/CategoryCard'

function Assessment() {
  const navigate = useNavigate()
  const location = useLocation()
  const { scores, updateCategory, answers } = useScore()
  
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0)
  const [currentCategory, setCurrentCategory] = useState(categories[0])
  const [answeredQuestions, setAnsweredQuestions] = useState({})
  const [completedCategories, setCompletedCategories] = useState([])
  
  useEffect(() => {
    // Check if a specific category was requested
    if (location.state?.categoryId) {
      const index = categories.findIndex(c => c.id === location.state.categoryId)
      if (index !== -1) {
        setCurrentCategoryIndex(index)
        setCurrentCategory(categories[index])
      }
    }
    
    // Initialize answered questions from context
    const answered = {}
    Object.keys(answers).forEach(categoryId => {
      answered[categoryId] = Object.keys(answers[categoryId] || {}).length
    })
    setAnsweredQuestions(answered)
    
    // Initialize completed categories
    const completed = []
    categories.forEach(category => {
      const categoryAnswers = answers[category.id] || {}
      if (Object.keys(categoryAnswers).length === category.questions.length) {
        completed.push(category.id)
      }
    })
    setCompletedCategories(completed)
  }, [location.state, answers])
  
  const handleCategorySelect = (categoryId) => {
    const index = categories.findIndex(c => c.id === categoryId)
    if (index !== -1) {
      setCurrentCategoryIndex(index)
      setCurrentCategory(categories[index])
    }
  }
  
  const handleQuestionAnswer = (questionId, value) => {
    // Update answered questions count
    setAnsweredQuestions(prev => ({
      ...prev,
      [currentCategory.id]: (prev[currentCategory.id] || 0) + 1
    }))
    
    // Check if category is complete
    const categoryAnswers = answers[currentCategory.id] || {}
    const updatedAnswers = { ...categoryAnswers, [questionId]: value }
    
    if (Object.keys(updatedAnswers).length === currentCategory.questions.length) {
      // Calculate category score (average of all answers)
      const total = Object.values(updatedAnswers).reduce((sum, val) => sum + val, 0)
      const average = Math.round(total / currentCategory.questions.length)
      
      // Update category score
      updateCategory(currentCategory.id, average)
      
      // Mark category as completed
      if (!completedCategories.includes(currentCategory.id)) {
        setCompletedCategories(prev => [...prev, currentCategory.id])
      }
    }
  }
  
  const handleNext = () => {
    if (currentCategoryIndex < categories.length - 1) {
      setCurrentCategoryIndex(currentCategoryIndex + 1)
      setCurrentCategory(categories[currentCategoryIndex + 1])
    } else {
      navigate('/results')
    }
  }
  
  const handlePrevious = () => {
    if (currentCategoryIndex > 0) {
      setCurrentCategoryIndex(currentCategoryIndex - 1)
      setCurrentCategory(categories[currentCategoryIndex - 1])
    }
  }
  
  const handleViewResults = () => {
    navigate('/results')
  }
  
  const getCategoryProgress = (categoryId) => {
    return (answeredQuestions[categoryId] || 0) / (categories.find(c => c.id === categoryId)?.questions.length || 1) * 100
  }
  
  const getTotalProgress = () => {
    const totalQuestions = categories.reduce((sum, category) => sum + category.questions.length, 0)
    const totalAnswered = Object.values(answeredQuestions).reduce((sum, count) => sum + count, 0)
    return (totalAnswered / totalQuestions) * 100
  }
  
  const isCategoryComplete = (categoryId) => {
    return completedCategories.includes(categoryId)
  }
  
  const allCategoriesCompleted = completedCategories.length === categories.length
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Business Exit Planning Assessment</h1>
        <p className="text-lg text-gray-600 mb-6">
          Complete all six categories to receive your comprehensive exit readiness score and recommendations.
        </p>
        
        <ProgressBar 
          value={Math.round(getTotalProgress())} 
          max={100} 
          label="Overall Progress" 
          className="mb-8"
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {categories.map((category) => (
            <div key={category.id} className="flex flex-col">
              <CategoryCard 
                category={category} 
                completed={isCategoryComplete(category.id)}
                onClick={handleCategorySelect}
              />
              <ProgressBar 
                value={Math.round(getCategoryProgress(category.id))} 
                max={100} 
                className="mt-2" 
              />
            </div>
          ))}
        </div>
        
        {allCategoriesCompleted && (
          <div className="text-center mb-8">
            <button 
              onClick={handleViewResults}
              className="btn btn-success text-lg px-8 py-3"
            >
              View Your Results
            </button>
          </div>
        )}
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">{currentCategory.title}</h2>
          <span className="text-sm font-medium text-gray-600">
            Category {currentCategoryIndex + 1} of {categories.length}
          </span>
        </div>
        
        <p className="text-gray-600 mb-6">{currentCategory.description}</p>
        
        <div className="space-y-6">
          {currentCategory.questions.map((question) => (
            <QuestionCard 
              key={question.id} 
              question={question} 
              categoryId={currentCategory.id}
              onAnswer={handleQuestionAnswer}
            />
          ))}
        </div>
        
        <div className="flex justify-between mt-8">
          <button 
            onClick={handlePrevious}
            disabled={currentCategoryIndex === 0}
            className={`btn ${currentCategoryIndex === 0 ? 'bg-gray-300 cursor-not-allowed' : 'btn-secondary'}`}
          >
            Previous Category
          </button>
          
          <button 
            onClick={handleNext}
            className="btn btn-primary"
          >
            {currentCategoryIndex < categories.length - 1 ? 'Next Category' : 'View Results'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Assessment
