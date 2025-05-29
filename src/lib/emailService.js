import emailjs from 'emailjs-com'
import { supabase } from './supabaseClient'

export const sendScoreReport = async (userInfo, scores, pdfDoc) => {
  try {
    // Convert PDF to base64
    const pdfBase64 = pdfDoc.output('datauristring')
    
    // Calculate overall score
    const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0)
    const maxPossible = Object.keys(scores).length * 10
    const percentage = Math.round((totalScore / maxPossible) * 100)
    
    // Get readiness level
    let readinessLevel = 'Poor'
    
    if (percentage >= 90) readinessLevel = 'Excellent'
    else if (percentage >= 75) readinessLevel = 'Good'
    else if (percentage >= 60) readinessLevel = 'Moderate'
    else if (percentage >= 40) readinessLevel = 'Fair'
    
    // Save to database
    await supabase
      .from('scorecard_submissions')
      .insert([
        { 
          name: userInfo.name,
          email: userInfo.email,
          phone: userInfo.phone,
          scores: scores,
          total_score: percentage,
          readiness_level: readinessLevel
        }
      ])
    
    // Send email using EmailJS
    const templateParams = {
      to_email: userInfo.email,
      to_name: userInfo.name,
      cc_email: 'matthew@norivane.com',
      subject: 'Your Business Exit Planning Scorecard Results',
      message: `Thank you for completing the Business Exit Planning Scorecard. Your overall readiness score is ${percentage}% (${readinessLevel}). Please find your detailed report attached.`,
      pdf_attachment: pdfBase64
    }
    
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      templateParams,
      import.meta.env.VITE_EMAILJS_USER_ID
    )
    
    return { success: true }
  } catch (error) {
    console.error('Error sending email:', error)
    return { 
      success: false, 
      error: error.message || 'Failed to send email. Please try again later.'
    }
  }
}
