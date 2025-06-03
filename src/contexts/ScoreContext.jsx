import React, { createContext, useContext, useState, useEffect } from 'react'

const ScoreContext = createContext()

export function useScore() {
  return useContext(ScoreContext)
}

export function ScoreProvider({ children }) {
  const [scores, setScores] = useState({})
  const [answers, setAnswers] = useState({})
  const [completedCategories, setCompletedCategories] = useState([])
  
  // Load saved data from localStorage on initial render
  useEffect(() => {
    const savedScores = localStorage.getItem('exitReadyScores')
    const savedAnswers = localStorage.getItem('exitReadyAnswers')
    const savedCompletedCategories = localStorage.getItem('exitReadyCompletedCategories')
    
    if (savedScores) setScores(JSON.parse(savedScores))
    if (savedAnswers) setAnswers(JSON.parse(savedAnswers))
    if (savedCompletedCategories) setCompletedCategories(JSON.parse(savedCompletedCategories))
  }, [])
  
  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('exitReadyScores', JSON.stringify(scores))
    localStorage.setItem('exitReadyAnswers', JSON.stringify(answers))
    localStorage.setItem('exitReadyCompletedCategories', JSON.stringify(completedCategories))
  }, [scores, answers, completedCategories])
  
  // Update scores for a category
  const updateCategoryScore = (categoryId, score) => {
    setScores(prevScores => ({
      ...prevScores,
      [categoryId]: score
    }))
  }
  
  // Save answers for a category
  const saveAnswers = (categoryId, categoryAnswers) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [categoryId]: categoryAnswers
    }))
  }
  
  // Mark a category as completed
  const markCategoryCompleted = (categoryId) => {
    if (!completedCategories.includes(categoryId)) {
      setCompletedCategories(prev => [...prev, categoryId])
    }
  }
  
  // Calculate overall score
  const calculateOverallScore = () => {
    if (Object.keys(scores).length === 0) return 0
    
    const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0)
    return Math.round(totalScore / Object.keys(scores).length)
  }
  
  // Reset all data
  const resetAll = () => {
    setScores({})
    setAnswers({})
    setCompletedCategories([])
    localStorage.removeItem('exitReadyScores')
    localStorage.removeItem('exitReadyAnswers')
    localStorage.removeItem('exitReadyCompletedCategories')
  }
  
  const value = {
    scores,
    answers,
    completedCategories,
    updateCategoryScore,
    saveAnswers,
    markCategoryCompleted,
    calculateOverallScore,
    resetAll
  }
  
  return (
    <ScoreContext.Provider value={value}>
      {children}
    </ScoreContext.Provider>
  )
}
