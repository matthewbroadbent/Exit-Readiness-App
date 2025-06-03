// Email Service
// This is a mock implementation for the preview mode

export const sendReportEmail = async (userInfo, reportData, pdfDoc) => {
  console.log('Sending report email to:', userInfo);
  console.log('With report data:', reportData);
  
  // In a real implementation, this would use a service like EmailJS, SendGrid, or a backend API
  // to send the email with the PDF attachment
  
  // For now, we'll just simulate a successful email send
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Email sent successfully!');
      resolve({ success: true });
    }, 1500);
  });
};
