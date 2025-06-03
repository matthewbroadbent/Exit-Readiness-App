import React from 'react'
import { Link } from 'react-router-dom'
import { FaExclamationTriangle, FaArrowLeft } from 'react-icons/fa'

function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <FaExclamationTriangle className="mx-auto h-12 w-12 text-warning-500" />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Page Not Found</h2>
            <p className="mt-2 text-sm text-gray-600">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>
          <div className="mt-6">
            <Link
              to="/"
              className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <FaArrowLeft className="mr-2" />
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound
