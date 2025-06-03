import React from 'react'
import { FaMoneyBill, FaCogs, FaBalanceScale, FaChartLine, FaUsers, FaUser } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

function CategoryCard({ category, completed = false, onClick }) {
  const navigate = useNavigate()
  
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'money':
        return <FaMoneyBill className="h-6 w-6 text-primary-600" />
      case 'cogs':
        return <FaCogs className="h-6 w-6 text-primary-600" />
      case 'balance-scale':
        return <FaBalanceScale className="h-6 w-6 text-primary-600" />
      case 'chart-line':
        return <FaChartLine className="h-6 w-6 text-primary-600" />
      case 'users':
        return <FaUsers className="h-6 w-6 text-primary-600" />
      case 'user':
        return <FaUser className="h-6 w-6 text-primary-600" />
      default:
        return <FaChartLine className="h-6 w-6 text-primary-600" />
    }
  }
  
  const handleClick = () => {
    if (onClick) {
      onClick(category.id)
    } else {
      navigate('/assessment', { state: { categoryId: category.id } })
    }
  }
  
  return (
    <div 
      className={`card hover:shadow-lg transition-shadow duration-300 cursor-pointer ${completed ? 'border-l-4 border-success-500' : ''}`}
      onClick={handleClick}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0 p-3 bg-primary-50 rounded-lg">
          {getIcon(category.icon)}
        </div>
        <div className="ml-4">
          <h3 className="text-lg font-semibold text-gray-900">{category.title}</h3>
          <p className="mt-1 text-sm text-gray-600">{category.description}</p>
          {completed && (
            <span className="inline-flex items-center mt-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-50 text-success-700">
              Completed
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default CategoryCard
