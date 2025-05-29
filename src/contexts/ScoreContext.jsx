import { createContext, useContext, useState } from 'react'

const ScoreContext = createContext()

export function useScore() {
  return useContext(ScoreContext)
}

export function ScoreProvider({ children }) {
  const [scores, setScores] = useState({
    financialReadiness: 0,
    businessOperations: 0,
    legalCompliance: 0,
    marketPosition: 0,
    successionPlanning: 0,
    personalReadiness: 0
  })
  
  const [answers, setAnswers] = useState({})
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: ''
  })

  const updateCategory = (category, score) => {
    setScores(prev => ({
      ...prev,
      [category]: score
    }))
  }

  const updateAnswers = (category, questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [category]: {
        ...(prev[category] || {}),
        [questionId]: value
      }
    }))
  }

  const calculateTotalScore = () => {
    const total = Object.values(scores).reduce((sum, score) => sum + score, 0)
    const maxPossible = Object.keys(scores).length * 10
    return {
      raw: total,
      percentage: Math.round((total / maxPossible) * 100)
    }
  }

  const getReadinessLevel = () => {
    const percentage = calculateTotalScore().percentage
    
    if (percentage >= 90) return { level: 'Excellent', description: 'Your business is well-positioned for exit.' }
    if (percentage >= 75) return { level: 'Good', description: 'Your business is mostly ready for exit with minor improvements needed.' }
    if (percentage >= 60) return { level: 'Moderate', description: 'Your business has a solid foundation but needs significant work before exit.' }
    if (percentage >= 40) return { level: 'Fair', description: 'Your business requires substantial improvements before considering an exit.' }
    return { level: 'Poor', description: 'Your business needs extensive work in most areas before an exit is feasible.' }
  }

  const value = {
    scores,
    updateCategory,
    answers,
    updateAnswers,
    calculateTotalScore,
    getReadinessLevel,
    userInfo,
    setUserInfo
  }

  return (
    <ScoreContext.Provider value={value}>
      {children}
    </ScoreContext.Provider>
  )
}
