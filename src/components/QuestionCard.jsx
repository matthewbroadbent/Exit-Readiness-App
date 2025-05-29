import { useState, useEffect } from 'react'
import { useScore } from '../contexts/ScoreContext'

function QuestionCard({ question, categoryId, onAnswer }) {
  const { answers, updateAnswers } = useScore()
  const [selectedValue, setSelectedValue] = useState(null)
  
  useEffect(() => {
    // Initialize from context if available
    if (answers[categoryId] && answers[categoryId][question.id] !== undefined) {
      setSelectedValue(answers[categoryId][question.id])
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
    <div className="card mb-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">{question.text}</h3>
      
      <div className="space-y-3">
        {question.options.map((option) => (
          <div 
            key={option.value}
            className={`p-3 border rounded-lg cursor-pointer transition-colors duration-200 ${
              selectedValue === option.value 
                ? 'bg-primary-50 border-primary-500' 
                : 'border-gray-300 hover:bg-gray-50'
            }`}
            onClick={() => handleOptionSelect(option.value)}
          >
            <div className="flex items-center">
              <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                selectedValue === option.value 
                  ? 'border-primary-600' 
                  : 'border-gray-400'
              }`}>
                {selectedValue === option.value && (
                  <div className="w-3 h-3 rounded-full bg-primary-600"></div>
                )}
              </div>
              <span className="ml-3 text-gray-800">{option.text}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default QuestionCard
