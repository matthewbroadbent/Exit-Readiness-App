// PDF Generator Utility
import jsPDF from 'jspdf';
import 'jspdf-autotable';

export const generatePDF = async (data) => {
  try {
    // Create a new PDF document
    const doc = new jsPDF();
    
    // Add title
    doc.setFontSize(20);
    doc.setTextColor(0, 51, 102);
    doc.text('Business Exit Readiness Assessment', 105, 20, { align: 'center' });
    
    // Add date
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, 30, { align: 'center' });
    
    // Add overall score section
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text('Overall Exit Readiness Score', 20, 45);
    
    // Add score circle
    const scoreColor = data.totalScore.percentage >= 80 ? [39, 174, 96] : 
                      data.totalScore.percentage >= 60 ? [241, 196, 15] : 
                      [231, 76, 60];
    
    doc.setFillColor(...scoreColor);
    doc.circle(40, 60, 10, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(14);
    doc.text(data.totalScore.score.toString(), 40, 63, { align: 'center' });
    
    // Add readiness level
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.text(`Readiness Level: ${data.readinessLevel.level}`, 60, 60);
    doc.setFontSize(11);
    doc.text(data.readinessLevel.description, 60, 70);
    
    // Add category scores table
    doc.setFontSize(16);
    doc.text('Category Breakdown', 20, 90);
    
    const tableData = Object.entries(data.scores).map(([categoryId, score]) => {
      const categoryName = data.categories[categoryId] || categoryId;
      let recommendation = '';
      
      if (score >= 4) {
        recommendation = 'Well-positioned. Continue to maintain and improve.';
      } else if (score >= 3) {
        recommendation = 'Solid foundation but opportunities for improvement exist.';
      } else {
        recommendation = 'Significant improvements needed before exit-ready.';
      }
      
      return [categoryName, `${score}/5`, recommendation];
    });
    
    doc.autoTable({
      startY: 100,
      head: [['Category', 'Score', 'Recommendation']],
      body: tableData,
      theme: 'striped',
      headStyles: { fillColor: [41, 128, 185], textColor: 255 },
      styles: { fontSize: 10 }
    });
    
    // Add next steps section
    const finalY = doc.lastAutoTable.finalY || 180;
    
    doc.setFontSize(16);
    doc.text('Next Steps', 20, finalY + 20);
    
    doc.setFontSize(11);
    const nextSteps = [
      '1. Review your detailed category scores and recommendations.',
      '2. Focus on improving areas with the lowest scores first.',
      '3. Consider working with an exit planning specialist to develop a comprehensive strategy.',
      '4. Reassess your exit readiness every 6-12 months to track progress.'
    ];
    
    nextSteps.forEach((step, index) => {
      doc.text(step, 20, finalY + 35 + (index * 10));
    });
    
    // Add footer
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('Powered by Norivane Exit Planning Solutions', 105, 285, { align: 'center' });
    
    // Save the PDF
    doc.save('exit-readiness-assessment.pdf');
    
    return doc; // Return the doc object for potential further use
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};
