import { jsPDF } from 'jspdf'
import 'jspdf-autotable'
import { categories, getRecommendations } from '../data/questions'

export const generatePDF = (scores, userInfo) => {
  const doc = new jsPDF()
  const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0)
  const maxPossible = Object.keys(scores).length * 10
  const percentage = Math.round((totalScore / maxPossible) * 100)
  
  // Get readiness level
  let readinessLevel = 'Poor'
  let description = 'Your business needs extensive work in most areas before an exit is feasible.'
  
  if (percentage >= 90) {
    readinessLevel = 'Excellent'
    description = 'Your business is well-positioned for exit.'
  } else if (percentage >= 75) {
    readinessLevel = 'Good'
    description = 'Your business is mostly ready for exit with minor improvements needed.'
  } else if (percentage >= 60) {
    readinessLevel = 'Moderate'
    description = 'Your business has a solid foundation but needs significant work before exit.'
  } else if (percentage >= 40) {
    readinessLevel = 'Fair'
    description = 'Your business requires substantial improvements before considering an exit.'
  }
  
  // Get recommendations
  const recommendations = getRecommendations(scores)
  
  // Add header
  doc.setFontSize(20)
  doc.setTextColor(0, 102, 204)
  doc.text('Business Exit Planning Scorecard', 105, 20, { align: 'center' })
  
  // Add user info
  doc.setFontSize(12)
  doc.setTextColor(0, 0, 0)
  doc.text(`Prepared for: ${userInfo.name}`, 20, 35)
  doc.text(`Email: ${userInfo.email}`, 20, 42)
  doc.text(`Phone: ${userInfo.phone}`, 20, 49)
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 56)
  
  // Add overall score
  doc.setFillColor(240, 240, 240)
  doc.rect(20, 65, 170, 25, 'F')
  doc.setFontSize(14)
  doc.setTextColor(0, 0, 0)
  doc.text('Overall Exit Readiness', 105, 75, { align: 'center' })
  doc.setFontSize(16)
  doc.setTextColor(0, 102, 204)
  doc.text(`${readinessLevel} (${percentage}%)`, 105, 85, { align: 'center' })
  
  // Add description
  doc.setFontSize(12)
  doc.setTextColor(0, 0, 0)
  doc.text(description, 20, 100)
  
  // Add category scores
  doc.setFontSize(14)
  doc.setTextColor(0, 0, 0)
  doc.text('Category Scores', 20, 115)
  
  const tableData = categories.map(category => [
    category.title,
    `${scores[category.id] || 0}/10`,
    scores[category.id] >= 8 ? 'Strong' : scores[category.id] >= 5 ? 'Moderate' : 'Needs Improvement'
  ])
  
  doc.autoTable({
    startY: 120,
    head: [['Category', 'Score', 'Status']],
    body: tableData,
    theme: 'striped',
    headStyles: { fillColor: [0, 102, 204] },
    styles: { halign: 'center' },
    columnStyles: {
      0: { halign: 'left' }
    }
  })
  
  // Add recommendations
  doc.setFontSize(14)
  doc.setTextColor(0, 0, 0)
  doc.text('Key Recommendations', 20, doc.lastAutoTable.finalY + 20)
  
  let recommendationsY = doc.lastAutoTable.finalY + 25
  
  Object.keys(recommendations).forEach(category => {
    const categoryRecs = recommendations[category]
    if (categoryRecs.length > 0) {
      const categoryInfo = categories.find(c => c.id === category)
      
      // Check if we need a new page
      if (recommendationsY > 250) {
        doc.addPage()
        recommendationsY = 20
      }
      
      doc.setFontSize(12)
      doc.setTextColor(0, 102, 204)
      doc.text(categoryInfo.title, 20, recommendationsY)
      recommendationsY += 7
      
      categoryRecs.forEach(rec => {
        // Check if we need a new page
        if (recommendationsY > 270) {
          doc.addPage()
          recommendationsY = 20
        }
        
        doc.setFontSize(10)
        doc.setTextColor(0, 0, 0)
        doc.text(`• ${rec.text}`, 25, recommendationsY)
        recommendationsY += 7
      })
      
      recommendationsY += 5
    }
  })
  
  // Add footer
  const pageCount = doc.internal.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFontSize(10)
    doc.setTextColor(150, 150, 150)
    doc.text(`Business Exit Planning Scorecard | Page ${i} of ${pageCount}`, 105, 285, { align: 'center' })
  }
  
  return doc
}
