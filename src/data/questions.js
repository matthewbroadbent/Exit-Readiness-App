export const categories = [
  {
    id: 'financialReadiness',
    title: 'Financial Readiness',
    description: 'Assess the financial health and documentation of your business',
    icon: 'money',
    questions: [
      {
        id: 'financialStatements',
        text: 'Do you have accurate and up-to-date financial statements for the past 3-5 years?',
        options: [
          { value: 0, text: 'No financial statements available' },
          { value: 3, text: 'Basic financial statements, but not professionally prepared' },
          { value: 7, text: 'Financial statements available but not for all years' },
          { value: 10, text: 'Complete, professionally prepared financial statements for 3-5 years' }
        ]
      },
      {
        id: 'revenueGrowth',
        text: 'How has your revenue growth trended over the past 3 years?',
        options: [
          { value: 0, text: 'Declining revenue' },
          { value: 3, text: 'Flat revenue (0-2% growth)' },
          { value: 7, text: 'Moderate growth (3-10%)' },
          { value: 10, text: 'Strong growth (>10% annually)' }
        ]
      },
      {
        id: 'profitMargins',
        text: 'How do your profit margins compare to industry standards?',
        options: [
          { value: 0, text: 'Significantly below industry average' },
          { value: 3, text: 'Somewhat below industry average' },
          { value: 7, text: 'At industry average' },
          { value: 10, text: 'Above industry average' }
        ]
      },
      {
        id: 'cashFlow',
        text: 'How would you describe your business cash flow?',
        options: [
          { value: 0, text: 'Frequently negative cash flow' },
          { value: 3, text: 'Occasionally negative cash flow' },
          { value: 7, text: 'Stable, predictable cash flow' },
          { value: 10, text: 'Strong, growing cash flow' }
        ]
      },
      {
        id: 'debtLevel',
        text: 'What is your current business debt level?',
        options: [
          { value: 0, text: 'High debt level (debt-to-equity ratio > 2)' },
          { value: 3, text: 'Moderate debt level (debt-to-equity ratio 1-2)' },
          { value: 7, text: 'Low debt level (debt-to-equity ratio 0.5-1)' },
          { value: 10, text: 'Very low or no debt (debt-to-equity ratio < 0.5)' }
        ]
      }
    ]
  },
  {
    id: 'businessOperations',
    title: 'Business Operations',
    description: 'Evaluate the operational structure and processes of your business',
    icon: 'cogs',
    questions: [
      {
        id: 'documentedProcesses',
        text: 'To what extent are your business processes documented?',
        options: [
          { value: 0, text: 'No documented processes' },
          { value: 3, text: 'Some key processes documented' },
          { value: 7, text: 'Most processes documented but not regularly updated' },
          { value: 10, text: 'Comprehensive, up-to-date process documentation' }
        ]
      },
      {
        id: 'managementTeam',
        text: 'How developed is your management team?',
        options: [
          { value: 0, text: 'Owner-dependent with no management team' },
          { value: 3, text: 'Basic management structure but still owner-dependent' },
          { value: 7, text: 'Solid management team with some owner dependency' },
          { value: 10, text: 'Strong management team that operates independently' }
        ]
      },
      {
        id: 'employeeRetention',
        text: 'What is your employee retention rate?',
        options: [
          { value: 0, text: 'High turnover (>25% annually)' },
          { value: 3, text: 'Moderate turnover (15-25% annually)' },
          { value: 7, text: 'Low turnover (5-15% annually)' },
          { value: 10, text: 'Very low turnover (<5% annually)' }
        ]
      },
      {
        id: 'technologySystems',
        text: 'How would you rate your business technology systems?',
        options: [
          { value: 0, text: 'Outdated or minimal technology' },
          { value: 3, text: 'Basic systems with limited integration' },
          { value: 7, text: 'Modern systems with some integration' },
          { value: 10, text: 'State-of-the-art, fully integrated systems' }
        ]
      },
      {
        id: 'supplierRelationships',
        text: 'How stable are your supplier relationships?',
        options: [
          { value: 0, text: 'Heavy reliance on one or few suppliers' },
          { value: 3, text: 'Some key supplier dependencies' },
          { value: 7, text: 'Diversified supplier base with some long-term relationships' },
          { value: 10, text: 'Diverse supplier base with strong, documented relationships' }
        ]
      }
    ]
  },
  {
    id: 'legalCompliance',
    title: 'Legal & Compliance',
    description: 'Review the legal structure and compliance status of your business',
    icon: 'balance-scale',
    questions: [
      {
        id: 'legalStructure',
        text: 'Is your business legal structure optimal for a sale or transfer?',
        options: [
          { value: 0, text: 'Structure not suitable for transfer/sale' },
          { value: 3, text: 'Structure needs significant changes' },
          { value: 7, text: 'Structure mostly suitable with minor changes needed' },
          { value: 10, text: 'Optimal structure already in place for transfer/sale' }
        ]
      },
      {
        id: 'contracts',
        text: 'How well-documented and transferable are your key contracts?',
        options: [
          { value: 0, text: 'Informal arrangements, few written contracts' },
          { value: 3, text: 'Some key contracts in place but not transferable' },
          { value: 7, text: 'Most contracts documented but some transfer issues' },
          { value: 10, text: 'All key contracts documented and transferable' }
        ]
      },
      {
        id: 'intellectualProperty',
        text: 'How well-protected is your intellectual property?',
        options: [
          { value: 0, text: 'No IP protection in place' },
          { value: 3, text: 'Some IP identified but limited protection' },
          { value: 7, text: 'Most IP protected but some gaps exist' },
          { value: 10, text: 'All IP properly identified and protected' }
        ]
      },
      {
        id: 'regulatoryCompliance',
        text: 'What is your level of regulatory compliance?',
        options: [
          { value: 0, text: 'Significant compliance issues or unknown status' },
          { value: 3, text: 'Some compliance issues being addressed' },
          { value: 7, text: 'Generally compliant with minor issues' },
          { value: 10, text: 'Fully compliant with all regulations' }
        ]
      },
      {
        id: 'litigation',
        text: 'Does your business face any litigation or legal disputes?',
        options: [
          { value: 0, text: 'Active major litigation or disputes' },
          { value: 3, text: 'Some ongoing legal issues' },
          { value: 7, text: 'Minor legal issues or recently resolved disputes' },
          { value: 10, text: 'No current or pending litigation' }
        ]
      }
    ]
  },
  {
    id: 'marketPosition',
    title: 'Market Position',
    description: 'Assess your business position in the marketplace',
    icon: 'chart-line',
    questions: [
      {
        id: 'customerDiversification',
        text: 'How diversified is your customer base?',
        options: [
          { value: 0, text: 'Highly concentrated (top client >30% of revenue)' },
          { value: 3, text: 'Somewhat concentrated (top 3 clients >50% of revenue)' },
          { value: 7, text: 'Moderately diversified (no client >15% of revenue)' },
          { value: 10, text: 'Well diversified (no client >10% of revenue)' }
        ]
      },
      {
        id: 'marketTrends',
        text: 'How favorable are the trends in your market?',
        options: [
          { value: 0, text: 'Declining market' },
          { value: 3, text: 'Stable but not growing market' },
          { value: 7, text: 'Moderately growing market' },
          { value: 10, text: 'Rapidly growing market' }
        ]
      },
      {
        id: 'competitivePosition',
        text: 'How strong is your competitive position?',
        options: [
          { value: 0, text: 'Weak position with many stronger competitors' },
          { value: 3, text: 'Average position among many competitors' },
          { value: 7, text: 'Strong position with clear differentiation' },
          { value: 10, text: 'Market leader with sustainable advantages' }
        ]
      },
      {
        id: 'brandReputation',
        text: 'How would you rate your brand strength and reputation?',
        options: [
          { value: 0, text: 'Weak or negative brand reputation' },
          { value: 3, text: 'Limited brand recognition' },
          { value: 7, text: 'Positive reputation in specific markets' },
          { value: 10, text: 'Strong, widely recognized positive brand' }
        ]
      },
      {
        id: 'growthPotential',
        text: 'What is the growth potential for your business?',
        options: [
          { value: 0, text: 'Limited growth potential' },
          { value: 3, text: 'Some growth opportunities but significant barriers' },
          { value: 7, text: 'Good growth potential with reasonable investment' },
          { value: 10, text: 'Excellent growth potential with clear pathways' }
        ]
      }
    ]
  },
  {
    id: 'successionPlanning',
    title: 'Succession Planning',
    description: 'Evaluate your succession planning and exit strategy readiness',
    icon: 'users',
    questions: [
      {
        id: 'exitStrategy',
        text: 'Do you have a defined exit strategy?',
        options: [
          { value: 0, text: 'No exit strategy considered' },
          { value: 3, text: 'Basic ideas but no formal plan' },
          { value: 7, text: 'Formal plan but not fully developed' },
          { value: 10, text: 'Comprehensive, documented exit strategy' }
        ]
      },
      {
        id: 'successionPlan',
        text: 'Do you have a succession plan for key roles?',
        options: [
          { value: 0, text: 'No succession planning' },
          { value: 3, text: 'Informal succession considerations' },
          { value: 7, text: 'Succession plans for some key positions' },
          { value: 10, text: 'Comprehensive succession plans for all key roles' }
        ]
      },
      {
        id: 'ownershipTransition',
        text: 'How prepared are you for ownership transition?',
        options: [
          { value: 0, text: 'No preparation for transition' },
          { value: 3, text: 'Limited discussion with potential successors' },
          { value: 7, text: 'Active preparation with identified successors' },
          { value: 10, text: 'Fully prepared with documented transition plan' }
        ]
      },
      {
        id: 'businessValuation',
        text: 'Have you had a professional business valuation?',
        options: [
          { value: 0, text: 'No valuation performed' },
          { value: 3, text: 'Informal estimate only' },
          { value: 7, text: 'Valuation performed but not recently' },
          { value: 10, text: 'Recent professional valuation completed' }
        ]
      },
      {
        id: 'advisoryTeam',
        text: 'Do you have an exit advisory team assembled?',
        options: [
          { value: 0, text: 'No advisory team' },
          { value: 3, text: 'Some advisors but not exit-focused' },
          { value: 7, text: 'Partial team of exit advisors' },
          { value: 10, text: 'Complete team of exit specialists' }
        ]
      }
    ]
  },
  {
    id: 'personalReadiness',
    title: 'Personal Readiness',
    description: 'Assess your personal and financial readiness for business exit',
    icon: 'user',
    questions: [
      {
        id: 'personalGoals',
        text: 'How clear are your personal goals post-exit?',
        options: [
          { value: 0, text: 'No consideration of post-exit life' },
          { value: 3, text: 'Vague ideas about post-exit activities' },
          { value: 7, text: 'Clear goals but no detailed plans' },
          { value: 10, text: 'Well-defined personal plan for post-exit life' }
        ]
      },
      {
        id: 'financialIndependence',
        text: 'How financially independent are you from the business?',
        options: [
          { value: 0, text: 'Completely dependent on business income' },
          { value: 3, text: 'Highly dependent with limited outside assets' },
          { value: 7, text: 'Partially independent with significant outside assets' },
          { value: 10, text: 'Financially independent regardless of business' }
        ]
      },
      {
        id: 'retirementPlanning',
        text: 'How developed is your retirement planning?',
        options: [
          { value: 0, text: 'No retirement planning' },
          { value: 3, text: 'Basic retirement savings but inadequate' },
          { value: 7, text: 'Solid retirement plan but some gaps' },
          { value: 10, text: 'Comprehensive retirement plan in place' }
        ]
      },
      {
        id: 'estatePlanning',
        text: 'What is the status of your estate planning?',
        options: [
          { value: 0, text: 'No estate planning' },
          { value: 3, text: 'Basic will but no comprehensive plan' },
          { value: 7, text: 'Estate plan exists but needs updating' },
          { value: 10, text: 'Comprehensive, updated estate plan' }
        ]
      },
      {
        id: 'emotionalReadiness',
        text: 'How emotionally prepared are you to exit your business?',
        options: [
          { value: 0, text: 'Strong emotional attachment, not ready to exit' },
          { value: 3, text: 'Conflicted about exiting' },
          { value: 7, text: 'Mentally prepared but some concerns' },
          { value: 10, text: 'Fully prepared emotionally for exit' }
        ]
      }
    ]
  }
]

export const getRecommendations = (scores) => {
  const recommendations = {
    financialReadiness: [
      { threshold: 3, text: 'Work with an accountant to create professional financial statements for the past 3-5 years.' },
      { threshold: 5, text: 'Implement strategies to improve profit margins to meet or exceed industry standards.' },
      { threshold: 7, text: 'Develop a plan to reduce business debt and improve your debt-to-equity ratio.' }
    ],
    businessOperations: [
      { threshold: 3, text: 'Document all key business processes and create operations manuals.' },
      { threshold: 5, text: 'Develop a stronger management team that can operate without owner involvement.' },
      { threshold: 7, text: 'Implement employee retention strategies to reduce turnover.' }
    ],
    legalCompliance: [
      { threshold: 3, text: 'Consult with a business attorney to optimize your legal structure for sale/transfer.' },
      { threshold: 5, text: 'Review and formalize all key contracts to ensure they are transferable.' },
      { threshold: 7, text: 'Identify and protect all intellectual property assets.' }
    ],
    marketPosition: [
      { threshold: 3, text: 'Diversify your customer base to reduce dependency on top clients.' },
      { threshold: 5, text: 'Develop strategies to strengthen your competitive position and brand.' },
      { threshold: 7, text: 'Create a growth plan that a potential buyer could implement.' }
    ],
    successionPlanning: [
      { threshold: 3, text: 'Develop a formal exit strategy with timeline and goals.' },
      { threshold: 5, text: 'Create succession plans for all key positions in the company.' },
      { threshold: 7, text: 'Obtain a professional business valuation.' }
    ],
    personalReadiness: [
      { threshold: 3, text: 'Define clear personal and financial goals for your life after business exit.' },
      { threshold: 5, text: 'Work with a financial advisor to ensure financial independence post-exit.' },
      { threshold: 7, text: 'Update or create a comprehensive estate plan.' }
    ]
  }

  const result = {}
  
  Object.keys(scores).forEach(category => {
    const score = scores[category]
    result[category] = recommendations[category].filter(rec => score <= rec.threshold)
  })
  
  return result
}
