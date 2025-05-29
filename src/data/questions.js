// Sample assessment categories and questions
export const categories = [
  {
    id: 'financialReadiness',
    title: 'Financial Readiness',
    icon: 'chart-line',
    description: 'Evaluate your business financial health and readiness for exit.',
    questions: [
      {
        id: 'fin1',
        text: 'How consistently has your business shown profit growth over the past 3 years?',
        options: [
          { value: 10, text: 'Consistent growth of 15%+ annually' },
          { value: 8, text: 'Steady growth of 5-15% annually' },
          { value: 5, text: 'Fluctuating but generally positive' },
          { value: 3, text: 'Mostly flat or minimal growth' },
          { value: 1, text: 'Declining or unprofitable' }
        ]
      },
      {
        id: 'fin2',
        text: 'How well-documented and organized are your financial records?',
        options: [
          { value: 10, text: 'Comprehensive, audited financial statements for 5+ years' },
          { value: 8, text: 'Well-organized records with 3+ years of clean financials' },
          { value: 5, text: 'Adequate records but some inconsistencies' },
          { value: 3, text: 'Basic financial tracking with gaps' },
          { value: 1, text: 'Minimal or disorganized financial records' }
        ]
      },
      {
        id: 'fin3',
        text: 'How diversified is your customer/client base?',
        options: [
          { value: 10, text: 'Highly diversified, no client represents >5% of revenue' },
          { value: 8, text: 'Well diversified, no client represents >10% of revenue' },
          { value: 5, text: 'Moderately diversified, largest client is 10-20% of revenue' },
          { value: 3, text: 'Limited diversity, 1-2 clients represent 20-50% of revenue' },
          { value: 1, text: 'Highly concentrated, one client represents >50% of revenue' }
        ]
      },
      {
        id: 'fin4',
        text: 'How would you rate your business valuation knowledge?',
        options: [
          { value: 10, text: 'Professional valuation completed within past year' },
          { value: 8, text: 'Good understanding of business value with informal valuation' },
          { value: 5, text: 'Some understanding of valuation methods' },
          { value: 3, text: 'Limited knowledge of business value' },
          { value: 1, text: 'No understanding of business valuation' }
        ]
      }
    ]
  },
  {
    id: 'businessOperations',
    title: 'Business Operations',
    icon: 'cogs',
    description: 'Assess how well your business functions without your direct involvement.',
    questions: [
      {
        id: 'ops1',
        text: 'How well could your business operate without your daily involvement?',
        options: [
          { value: 10, text: 'Business runs smoothly without my involvement for extended periods' },
          { value: 8, text: 'Business operates well with minimal weekly oversight' },
          { value: 5, text: 'Business needs my attention several times weekly' },
          { value: 3, text: 'Business requires my daily involvement' },
          { value: 1, text: 'Business cannot function without me' }
        ]
      },
      {
        id: 'ops2',
        text: 'How well documented are your business processes and procedures?',
        options: [
          { value: 10, text: 'Comprehensive documentation for all key processes' },
          { value: 8, text: 'Most important processes are well documented' },
          { value: 5, text: 'Some processes documented, but with gaps' },
          { value: 3, text: 'Minimal documentation exists' },
          { value: 1, text: 'No formal documentation of processes' }
        ]
      },
      {
        id: 'ops3',
        text: 'How strong is your management team beyond yourself?',
        options: [
          { value: 10, text: 'Complete team that could run the business without me' },
          { value: 8, text: 'Strong team that handles most functions independently' },
          { value: 5, text: 'Capable team but still dependent on me for key decisions' },
          { value: 3, text: 'Limited management beyond myself' },
          { value: 1, text: 'No management team beyond myself' }
        ]
      },
      {
        id: 'ops4',
        text: 'How scalable are your business operations?',
        options: [
          { value: 10, text: 'Highly scalable with systems to handle significant growth' },
          { value: 8, text: 'Good scalability with some systems in place' },
          { value: 5, text: 'Moderately scalable but would require investment' },
          { value: 3, text: 'Limited scalability with current systems' },
          { value: 1, text: 'Not scalable beyond current size' }
        ]
      }
    ]
  },
  {
    id: 'legalCompliance',
    title: 'Legal & Compliance',
    icon: 'balance-scale',
    description: 'Evaluate your legal preparedness and compliance status.',
    questions: [
      {
        id: 'legal1',
        text: 'How well-organized are your business legal documents and contracts?',
        options: [
          { value: 10, text: 'All documents organized, reviewed, and current' },
          { value: 8, text: 'Most documents organized with minor updates needed' },
          { value: 5, text: 'Basic organization but several documents need review' },
          { value: 3, text: 'Poorly organized with significant gaps' },
          { value: 1, text: 'Disorganized or missing critical documents' }
        ]
      },
      {
        id: 'legal2',
        text: 'How protected is your intellectual property?',
        options: [
          { value: 10, text: 'All IP formally protected and documented' },
          { value: 8, text: 'Most valuable IP protected' },
          { value: 5, text: 'Some IP protected but gaps exist' },
          { value: 3, text: 'Minimal IP protection in place' },
          { value: 1, text: 'No formal IP protection' }
        ]
      },
      {
        id: 'legal3',
        text: 'How current is your compliance with industry regulations?',
        options: [
          { value: 10, text: 'Fully compliant with all regulations, regularly audited' },
          { value: 8, text: 'Generally compliant with good monitoring systems' },
          { value: 5, text: 'Mostly compliant but some areas need attention' },
          { value: 3, text: 'Significant compliance gaps exist' },
          { value: 1, text: 'Major compliance issues or unknown status' }
        ]
      },
      {
        id: 'legal4',
        text: 'How well are your customer/vendor relationships legally protected?',
        options: [
          { value: 10, text: 'All relationships have current, comprehensive contracts' },
          { value: 8, text: 'Most important relationships have solid contracts' },
          { value: 5, text: 'Basic contracts in place but some need updating' },
          { value: 3, text: 'Few formal contracts exist' },
          { value: 1, text: 'No formal contracts with customers/vendors' }
        ]
      }
    ]
  },
  {
    id: 'marketPosition',
    title: 'Market Position',
    icon: 'chart-bar',
    description: 'Assess your competitive position and market strength.',
    questions: [
      {
        id: 'market1',
        text: 'How strong is your business brand in your market?',
        options: [
          { value: 10, text: 'Market leader with strong brand recognition' },
          { value: 8, text: 'Well-established brand with good recognition' },
          { value: 5, text: 'Moderate brand recognition in our market' },
          { value: 3, text: 'Limited brand recognition' },
          { value: 1, text: 'Little to no brand recognition' }
        ]
      },
      {
        id: 'market2',
        text: 'How would you rate your business growth potential?',
        options: [
          { value: 10, text: 'Exceptional growth potential in expanding markets' },
          { value: 8, text: 'Strong growth potential with clear opportunities' },
          { value: 5, text: 'Moderate growth potential' },
          { value: 3, text: 'Limited growth potential' },
          { value: 1, text: 'Stagnant or declining market' }
        ]
      },
      {
        id: 'market3',
        text: 'How differentiated is your business from competitors?',
        options: [
          { value: 10, text: 'Unique offering with strong competitive advantages' },
          { value: 8, text: 'Clear differentiation from most competitors' },
          { value: 5, text: 'Some differentiation but similar to competitors' },
          { value: 3, text: 'Minimal differentiation' },
          { value: 1, text: 'No meaningful differentiation' }
        ]
      },
      {
        id: 'market4',
        text: 'How stable and recurring is your revenue?',
        options: [
          { value: 10, text: '80%+ recurring revenue with long-term contracts' },
          { value: 8, text: '50-80% recurring or highly predictable revenue' },
          { value: 5, text: '30-50% recurring revenue' },
          { value: 3, text: '10-30% recurring revenue' },
          { value: 1, text: 'Little to no recurring revenue' }
        ]
      }
    ]
  },
  {
    id: 'successionPlanning',
    title: 'Succession Planning',
    icon: 'users',
    description: 'Evaluate your readiness for leadership transition.',
    questions: [
      {
        id: 'succession1',
        text: 'Do you have a formal succession plan in place?',
        options: [
          { value: 10, text: 'Comprehensive plan with timeline and training in progress' },
          { value: 8, text: 'Formal plan exists but implementation just beginning' },
          { value: 5, text: 'Basic plan outlined but not formalized' },
          { value: 3, text: 'Informal thoughts but no actual plan' },
          { value: 1, text: 'No succession planning at all' }
        ]
      },
      {
        id: 'succession2',
        text: 'Have you identified potential successors for key roles?',
        options: [
          { value: 10, text: 'Successors identified and being developed for all key roles' },
          { value: 8, text: 'Successors identified for most key roles' },
          { value: 5, text: 'Some potential successors identified' },
          { value: 3, text: 'Limited successor identification' },
          { value: 1, text: 'No successors identified' }
        ]
      },
      {
        id: 'succession3',
        text: 'How prepared is your business for an unexpected leadership transition?',
        options: [
          { value: 10, text: 'Fully prepared with emergency plan and trained personnel' },
          { value: 8, text: 'Good preparation with basic emergency plans' },
          { value: 5, text: 'Some preparation but significant gaps exist' },
          { value: 3, text: 'Minimal preparation' },
          { value: 1, text: 'Completely unprepared' }
        ]
      },
      {
        id: 'succession4',
        text: 'How well have you documented your unique knowledge and relationships?',
        options: [
          { value: 10, text: 'Comprehensive documentation and knowledge transfer in progress' },
          { value: 8, text: 'Good documentation of most critical knowledge' },
          { value: 5, text: 'Some documentation but significant gaps remain' },
          { value: 3, text: 'Minimal documentation of key knowledge' },
          { value: 1, text: 'No documentation of personal knowledge or relationships' }
        ]
      }
    ]
  },
  {
    id: 'personalReadiness',
    title: 'Personal Readiness',
    icon: 'user',
    description: 'Assess your personal and financial readiness for exit.',
    questions: [
      {
        id: 'personal1',
        text: 'How clear are your personal goals for after the business exit?',
        options: [
          { value: 10, text: 'Very clear goals with specific plans in place' },
          { value: 8, text: 'Clear goals but plans still developing' },
          { value: 5, text: 'General ideas but no specific goals' },
          { value: 3, text: 'Limited thought given to post-exit life' },
          { value: 1, text: 'No consideration of life after business' }
        ]
      },
      {
        id: 'personal2',
        text: 'How prepared are you financially for a business exit?',
        options: [
          { value: 10, text: 'Comprehensive financial plan with exit proceeds factored in' },
          { value: 8, text: 'Good financial preparation with some planning' },
          { value: 5, text: 'Some financial planning but gaps exist' },
          { value: 3, text: 'Limited financial preparation' },
          { value: 1, text: 'No financial planning for post-exit' }
        ]
      },
      {
        id: 'personal3',
        text: 'How emotionally prepared are you to exit your business?',
        options: [
          { value: 10, text: 'Fully prepared and looking forward to transition' },
          { value: 8, text: 'Generally prepared with some reservations' },
          { value: 5, text: 'Mixed feelings about exiting' },
          { value: 3, text: 'Significant emotional attachment making exit difficult' },
          { value: 1, text: 'Not emotionally prepared to exit' }
        ]
      },
      {
        id: 'personal4',
        text: 'How aligned are stakeholders (family, partners) with your exit plans?',
        options: [
          { value: 10, text: 'Full alignment with all stakeholders engaged in planning' },
          { value: 8, text: 'General alignment with most stakeholders' },
          { value: 5, text: 'Mixed alignment with some disagreements' },
          { value: 3, text: 'Limited alignment with significant concerns' },
          { value: 1, text: 'No alignment or communication about exit' }
        ]
      }
    ]
  }
]

// Get recommendations based on scores
export const getRecommendations = (scores) => {
  const recommendations = {}
  
  // Financial Readiness recommendations
  if (scores.financialReadiness < 8) {
    recommendations.financialReadiness = [
      { text: 'Implement more rigorous financial tracking and reporting systems.' },
      { text: 'Consider a professional business valuation to establish a baseline.' },
      { text: 'Develop strategies to diversify your customer/client base.' }
    ]
    
    if (scores.financialReadiness < 5) {
      recommendations.financialReadiness.push(
        { text: 'Work with a financial advisor to improve profitability and growth metrics.' },
        { text: 'Address any cash flow issues before considering exit options.' }
      )
    }
  }
  
  // Business Operations recommendations
  if (scores.businessOperations < 8) {
    recommendations.businessOperations = [
      { text: 'Document all critical business processes and procedures.' },
      { text: 'Develop systems that reduce dependence on the owner.' },
      { text: 'Strengthen your management team through hiring or training.' }
    ]
    
    if (scores.businessOperations < 5) {
      recommendations.businessOperations.push(
        { text: 'Implement a structured transition plan to reduce your operational involvement.' },
        { text: 'Consider bringing in an operations consultant to improve systems.' }
      )
    }
  }
  
  // Legal & Compliance recommendations
  if (scores.legalCompliance < 8) {
    recommendations.legalCompliance = [
      { text: 'Conduct a comprehensive legal audit of all contracts and documents.' },
      { text: 'Ensure all intellectual property is properly protected.' },
      { text: 'Address any regulatory compliance issues.' }
    ]
    
    if (scores.legalCompliance < 5) {
      recommendations.legalCompliance.push(
        { text: 'Engage legal counsel to review and update all critical agreements.' },
        { text: 'Implement a compliance management system for ongoing monitoring.' }
      )
    }
  }
  
  // Market Position recommendations
  if (scores.marketPosition < 8) {
    recommendations.marketPosition = [
      { text: 'Develop strategies to strengthen your brand recognition.' },
      { text: 'Identify and capitalize on your unique competitive advantages.' },
      { text: 'Explore opportunities to increase recurring revenue streams.' }
    ]
    
    if (scores.marketPosition < 5) {
      recommendations.marketPosition.push(
        { text: 'Consider a market analysis to identify growth opportunities.' },
        { text: 'Develop a strategic plan to improve market positioning before exit.' }
      )
    }
  }
  
  // Succession Planning recommendations
  if (scores.successionPlanning < 8) {
    recommendations.successionPlanning = [
      { text: 'Develop a formal succession plan with clear timelines.' },
      { text: 'Identify and begin developing potential successors for key roles.' },
      { text: 'Document your unique knowledge and customer relationships.' }
    ]
    
    if (scores.successionPlanning < 5) {
      recommendations.successionPlanning.push(
        { text: 'Create an emergency succession plan for unexpected transitions.' },
        { text: 'Consider hiring or developing leadership talent to fill critical gaps.' }
      )
    }
  }
  
  // Personal Readiness recommendations
  if (scores.personalReadiness < 8) {
    recommendations.personalReadiness = [
      { text: 'Clarify your personal goals and vision for life after business.' },
      { text: 'Work with a financial advisor to ensure post-exit financial security.' },
      { text: 'Begin preparing emotionally for the transition away from the business.' }
    ]
    
    if (scores.personalReadiness < 5) {
      recommendations.personalReadiness.push(
        { text: 'Consider working with a coach or counselor on the emotional aspects of exit.' },
        { text: 'Engage family members and key stakeholders in exit planning discussions.' }
      )
    }
  }
  
  return recommendations
}
