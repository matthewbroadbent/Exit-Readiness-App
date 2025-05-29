import React, { useState, useEffect } from 'react'
import { useScore } from '../contexts/ScoreContext'

function QuestionCard({ question, categoryId, onAnswer }) {
  const { answers, updateAnswers } = useScore()
  const [selectedValue, setSelectedValue] = useState(null)
  
  // Load saved answer from context if available
  useEffect(() => {
    const savedAnswer = answers[categoryId]?.[question.id]
    if (savedAnswer !== undefined) {
      setSelectedValue(savedAnswer)
    }
  }, [answers, categoryId, question.id])
  
  const handleOptionSelect = (value) => {
    setSelectedValue(value)
    updateAnswers(categoryId, question.id, value)
    if (onAnswer) {
      onAnswer(question.id, value)
    }
  }
  
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h3 className="text-lg font-medium text-gray-900 mb-4">{question.text}</h3>
      
      <div className="space-y-3">
        {question.options.map((option) => (
          <div 
            key={option.value}
            className={`flex items-center p-3 rounded-md cursor-pointer transition-colors ${
              selectedValue === option.value 
                ? 'bg-primary-100 border border-primary-300' 
                : 'bg-white border hover:bg-gray-100'
            }`}
            onClick={() => handleOptionSelect(option.value)}
          >
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3 ${
              selectedValue === option.value 
                ? 'border-primary-500' 
                : 'border-gray-300'
            }`}>
              {selectedValue === option.value && (
                <div className="w-3 h-3 rounded-full bg-primary-500"></div>
              )}
            </div>
            <span className="text-gray-800">{option.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default QuestionCard
