import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaCheck, FaArrowLeft, FaHome, FaExternalLinkAlt, FaInfoCircle } from 'react-icons/fa';
import { toast } from 'react-toastify';

function ConsultationBooking({ userInfo, onBookingComplete }) {
  const navigate = useNavigate();
  const [bookingOption, setBookingOption] = useState('popup'); // 'popup' or 'inline'
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [isPreviewEnvironment, setIsPreviewEnvironment] = useState(false);
  const [scriptError, setScriptError] = useState(false);
  
  // Check if we're in a preview environment
  useEffect(() => {
    // Check for xBesh preview environment
    const isXBeshPreview = window.location.hostname.includes('webcontainer') || 
                          window.location.hostname.includes('stackblitz') ||
                          window.location.hostname.includes('localhost');
    setIsPreviewEnvironment(isXBeshPreview);
    
    // If in preview, log a message to help with debugging
    if (isXBeshPreview) {
      console.log('Preview environment detected - Google Calendar integration will be simulated');
    }
  }, []);
  
  // Add script to head for Google Calendar API - only in production
  useEffect(() => {
    if (isPreviewEnvironment) {
      // Don't load the script in preview environment
      return;
    }
    
    try {
      const script = document.createElement('script');
      script.src = 'https://calendar.google.com/calendar/scheduling-button-script.js';
      script.async = true;
      script.onload = () => {
        console.log('Google Calendar script loaded successfully');
        setScriptLoaded(true);
        setScriptError(false);
      };
      script.onerror = (error) => {
        console.warn('Failed to load Google Calendar script:', error);
        setScriptLoaded(false);
        setScriptError(true);
      };
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script);
      };
    } catch (error) {
      console.error('Error loading calendar script:', error);
      setScriptError(true);
    }
  }, [isPreviewEnvironment]);
  
  // Initialize Google Calendar button if popup option is selected and script is loaded
  useEffect(() => {
    if (isPreviewEnvironment || !scriptLoaded || bookingOption !== 'popup') {
      return;
    }
    
    const initializeCalendarButton = () => {
      try {
        if (window.calendar && window.calendar.schedulingButton) {
          const target = document.getElementById('calendar-popup-container');
          if (target) {
            window.calendar.schedulingButton.load({
              url: 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ1dDhVTC6nmAqTpQ744WdiVX5HYpBpJuieMFd2Bsk7-iFlARlw8EuBzT7ulHmXKp3ja2DPIdPsS?gv=true',
              color: '#039BE5',
              label: 'Book an appointment',
              target,
            });
          }
        } else {
          console.warn('Google Calendar API not available yet');
          // Set a timeout to try again
          setTimeout(initializeCalendarButton, 1000);
        }
      } catch (error) {
        console.error('Error initializing calendar button:', error);
        setScriptError(true);
      }
    };
    
    // Try to initialize immediately if the API is already loaded
    initializeCalendarButton();
    
    // Otherwise wait for the API to load
    window.addEventListener('load', initializeCalendarButton);
    
    return () => {
      window.removeEventListener('load', initializeCalendarButton);
    };
  }, [bookingOption, scriptLoaded, isPreviewEnvironment]);
  
  const handleConfirmBooking = async () => {
    setIsLoading(true);
    
    try {
      // In a real implementation, you would verify the booking was made
      // For now, we'll simulate a delay and then confirm
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setBookingConfirmed(true);
      toast.success('Consultation booked successfully!');
      
      // In a real implementation, you would:
      // 1. Save the booking information to your database
      // 2. Send confirmation emails
      // 3. Trigger the PDF email delivery
      
    } catch (error) {
      console.error('Error confirming booking:', error);
      toast.error('There was an error confirming your booking. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleCompleteProcess = () => {
    if (onBookingComplete) {
      onBookingComplete();
    } else {
      navigate('/');
    }
  };
  
  // Render a simulated calendar UI for preview environments instead of using iframes
  const renderSimulatedCalendar = () => {
    return (
      <div className="border border-gray-300 rounded-lg p-8 bg-gray-50">
        <h3 className="text-xl font-semibold mb-4">Simulated Calendar</h3>
        <div className="mb-6">
          <div className="flex justify-between mb-4">
            <button className="px-3 py-1 bg-gray-200 rounded">◀ Previous</button>
            <h4 className="text-lg font-medium">October 2023</h4>
            <button className="px-3 py-1 bg-gray-200 rounded">Next ▶</button>
          </div>
          
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            <div className="text-sm font-medium">Sun</div>
            <div className="text-sm font-medium">Mon</div>
            <div className="text-sm font-medium">Tue</div>
            <div className="text-sm font-medium">Wed</div>
            <div className="text-sm font-medium">Thu</div>
            <div className="text-sm font-medium">Fri</div>
            <div className="text-sm font-medium">Sat</div>
          </div>
          
          <div className="grid grid-cols-7 gap-1 text-center">
            {Array.from({ length: 31 }, (_, i) => (
              <div 
                key={i} 
                className={`p-2 ${i % 7 === 0 || i % 7 === 6 ? 'text-gray-400' : 'hover:bg-primary-100 cursor-pointer'} ${i === 15 ? 'bg-primary-100 text-primary-700 font-bold' : ''}`}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <h4 className="text-lg font-medium mb-2">Available Time Slots</h4>
          <div className="grid grid-cols-3 gap-2">
            <button className="p-2 border border-gray-300 rounded hover:bg-primary-50 hover:border-primary-300">9:00 AM</button>
            <button className="p-2 border border-gray-300 rounded hover:bg-primary-50 hover:border-primary-300">10:30 AM</button>
            <button className="p-2 border border-gray-300 rounded hover:bg-primary-50 hover:border-primary-300">1:00 PM</button>
            <button className="p-2 border border-gray-300 rounded hover:bg-primary-50 hover:border-primary-300">2:30 PM</button>
            <button className="p-2 border border-gray-300 rounded hover:bg-primary-50 hover:border-primary-300">4:00 PM</button>
            <button className="p-2 border border-primary-300 bg-primary-50 rounded font-medium text-primary-700">5:30 PM</button>
          </div>
        </div>
        
        <p className="text-sm text-gray-500 mb-4">
          This is a simulated calendar for the preview environment. In production, you would see the actual Google Calendar booking interface.
        </p>
        
        <div className="flex justify-center">
          <a 
            href="https://calendar.google.com/calendar/appointments/schedules/AcZssZ1dDhVTC6nmAqTpQ744WdiVX5HYpBpJuieMFd2Bsk7-iFlARlw8EuBzT7ulHmXKp3ja2DPIdPsS?gv=true"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <FaExternalLinkAlt className="mr-2" />
            Open Real Booking Calendar
          </a>
        </div>
      </div>
    );
  };
  
  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Schedule a Consultation</h2>
      
      {bookingConfirmed ? (
        <div className="text-center space-y-6">
          <div className="flex items-center justify-center">
            <div className="bg-success-100 text-success-600 rounded-full p-4">
              <FaCheck className="h-12 w-12" />
            </div>
          </div>
          
          <h3 className="text-xl font-semibold text-gray-900">Consultation Booked Successfully!</h3>
          
          <p className="text-gray-600">
            Thank you for scheduling a consultation with us! Your detailed exit readiness report will be sent to your email ({userInfo?.email}) shortly.
          </p>
          
          <p className="text-gray-600">
            Our team will review your assessment results before the call to provide you with the most valuable insights and recommendations.
          </p>
          
          <div className="mt-8">
            <button
              onClick={handleCompleteProcess}
              className="btn btn-primary"
            >
              Complete Process
            </button>
          </div>
        </div>
      ) : (
        <>
          <p className="text-gray-600 mb-8 text-center">
            <strong className="text-primary-600">Important:</strong> To receive your detailed exit readiness report, please schedule a consultation with our team. This allows us to provide personalized insights and recommendations based on your assessment results.
          </p>
          
          {isPreviewEnvironment && (
            <div className="bg-info-100 border border-info-300 text-info-800 px-4 py-3 rounded mb-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <FaInfoCircle className="h-5 w-5 text-info-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm">
                    <strong>Preview Mode:</strong> Calendar booking is simulated in this environment. In production, you'll see the actual Google Calendar booking interface.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {scriptError && !isPreviewEnvironment && (
            <div className="bg-warning-100 border border-warning-300 text-warning-800 px-4 py-3 rounded mb-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <FaInfoCircle className="h-5 w-5 text-warning-600" />
                </div>
                <div className="ml-3">
                  <p className="text-sm">
                    <strong>Note:</strong> We're having trouble loading the calendar booking interface. Please use the direct link below to book your appointment.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          <div className="space-y-6">
            {!isPreviewEnvironment && !scriptError && (
              <div className="flex justify-center space-x-4 mb-6">
                <button 
                  onClick={() => setBookingOption('popup')}
                  className={`px-4 py-2 rounded-md ${bookingOption === 'popup' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  <FaCalendarAlt className="inline mr-2" />
                  Popup Calendar
                </button>
                <button 
                  onClick={() => setBookingOption('inline')}
                  className={`px-4 py-2 rounded-md ${bookingOption === 'inline' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                  <FaCalendarAlt className="inline mr-2" />
                  Inline Calendar
                </button>
              </div>
            )}
            
            {isPreviewEnvironment ? (
              <div className="text-center mb-8">
                {renderSimulatedCalendar()}
              </div>
            ) : scriptError ? (
              <div className="text-center mb-8">
                <div className="border border-gray-300 rounded-lg p-8 bg-gray-50">
                  <h3 className="text-xl font-semibold mb-4">Alternative Booking Method</h3>
                  <p className="mb-4">
                    Please use the direct link below to book your appointment.
                  </p>
                  <a 
                    href="https://calendar.google.com/calendar/appointments/schedules/AcZssZ1dDhVTC6nmAqTpQ744WdiVX5HYpBpJuieMFd2Bsk7-iFlARlw8EuBzT7ulHmXKp3ja2DPIdPsS?gv=true"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    <FaExternalLinkAlt className="mr-2" />
                    Open Booking Calendar
                  </a>
                </div>
              </div>
            ) : bookingOption === 'popup' ? (
              <div className="text-center">
                <div id="calendar-popup-container" className="flex justify-center mb-8">
                  {/* Google Calendar Popup Button will be inserted here by script */}
                  {/* Fallback button in case the script doesn't load */}
                  {!scriptLoaded && (
                    <a 
                      href="https://calendar.google.com/calendar/appointments/schedules/AcZssZ1dDhVTC6nmAqTpQ744WdiVX5HYpBpJuieMFd2Bsk7-iFlARlw8EuBzT7ulHmXKp3ja2DPIdPsS?gv=true"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      <FaCalendarAlt className="mr-2" />
                      Book an appointment
                    </a>
                  )}
                </div>
              </div>
            ) : (
              <div className="calendar-container mb-8 border border-gray-300 rounded-lg overflow-hidden">
                {/* Replace iframe with a link for environments where iframe might be blocked */}
                <div className="text-center p-8">
                  <h3 className="text-xl font-semibold mb-4">Calendar Booking</h3>
                  <p className="mb-6">
                    Please use the button below to open the booking calendar in a new tab.
                  </p>
                  <a 
                    href="https://calendar.google.com/calendar/appointments/schedules/AcZssZ1dDhVTC6nmAqTpQ744WdiVX5HYpBpJuieMFd2Bsk7-iFlARlw8EuBzT7ulHmXKp3ja2DPIdPsS?gv=true" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    <FaExternalLinkAlt className="mr-2" />
                    Open Booking Calendar
                  </a>
                </div>
              </div>
            )}
            
            <div className="text-center border-t pt-6">
              <p className="text-gray-600 mb-4">
                After booking your appointment using the calendar above, click the button below to confirm and receive your report.
              </p>
              
              <button
                onClick={handleConfirmBooking}
                disabled={isLoading}
                className="btn btn-success"
              >
                {isLoading ? 'Processing...' : 'I\'ve Booked My Consultation'}
              </button>
            </div>
            
            <div className="mt-8 flex justify-between">
              <button
                onClick={() => navigate('/results')}
                className="btn btn-outline"
              >
                <FaArrowLeft className="mr-2" />
                Back to Results
              </button>
              
              <button
                onClick={() => navigate('/')}
                className="btn btn-secondary"
              >
                <FaHome className="mr-2" />
                Return to Home
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ConsultationBooking;
