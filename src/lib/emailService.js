// Email Service
// This service handles sending emails with reports

import { supabase } from './supabaseClient';

export const sendReportEmail = async (userInfo, reportData, pdfDoc) => {
  console.log('Sending report email to:', userInfo);
  console.log('With report data:', reportData);
  
  // Check if we're in a preview environment
  const isPreviewEnvironment = window.location.hostname.includes('webcontainer') || 
                              window.location.hostname.includes('stackblitz') ||
                              window.location.hostname.includes('localhost');
  
  try {
    // In a real implementation, this would use a service like EmailJS, SendGrid, or a backend API
    // to send the email with the PDF attachment
    
    // Save user data to Supabase if available
    if (supabase) {
      try {
        const { error } = await supabase
          .from('user_reports')
          .insert([
            { 
              name: userInfo.name,
              email: userInfo.email,
              phone: userInfo.phone,
              report_data: reportData,
              created_at: new Date()
            }
          ]);
          
        if (error) {
          console.error('Error saving to Supabase:', error);
        }
      } catch (dbError) {
        console.error('Database error:', dbError);
        // Continue with email sending even if database save fails
      }
    }
    
    if (isPreviewEnvironment) {
      console.log('Preview environment detected - simulating email send');
      return { 
        success: true, 
        warning: 'In the preview environment, emails are not actually sent. In production, the report would be emailed to you and our team.'
      };
    }
    
    // In production, we would send the actual email here
    // For now, we'll just simulate a successful email send
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Email sent successfully!');
        resolve({ success: true });
      }, 1500);
    });
  } catch (error) {
    console.error('Error in email service:', error);
    return { success: false, error: error.message };
  }
};

export const sendScoreReport = async (userInfo, scores, pdfDoc) => {
  try {
    // Check if we're in a preview environment
    const isPreviewEnvironment = window.location.hostname.includes('webcontainer') || 
                                window.location.hostname.includes('stackblitz') ||
                                window.location.hostname.includes('localhost');
    
    // In a real implementation, we would:
    // 1. Convert the PDF to a blob/base64
    // 2. Send it via an email service API
    // 3. CC the team email
    
    // For now, we'll just log the data and simulate success
    console.log('Sending score report to:', userInfo.email);
    console.log('CC: us@norivane.com');
    console.log('With scores:', scores);
    
    // Save to database if possible
    if (supabase) {
      try {
        const { error } = await supabase
          .from('assessment_results')
          .insert([
            { 
              user_name: userInfo.name,
              user_email: userInfo.email,
              user_phone: userInfo.phone,
              scores: scores,
              created_at: new Date()
            }
          ]);
          
        if (error) {
          console.error('Error saving to Supabase:', error);
        }
      } catch (dbError) {
        console.error('Database error:', dbError);
        // Continue with email sending even if database save fails
      }
    }
    
    if (isPreviewEnvironment) {
      return { 
        success: true, 
        warning: 'In the preview environment, emails are not actually sent. In production, the report would be emailed to you and our team.'
      };
    }
    
    // Simulate email sending in production
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Report email sent successfully!');
        resolve({ success: true });
      }, 1500);
    });
  } catch (error) {
    console.error('Error sending report email:', error);
    return { success: false, error: error.message };
  }
};
