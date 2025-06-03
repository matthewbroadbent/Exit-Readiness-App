export const categories = [
  {
    id: 'financial',
    title: 'Financial Readiness',
    description: 'Evaluate your financial documentation, performance metrics, and valuation readiness',
    icon: 'money',
    questions: [
      {
        id: 'financial_1',
        text: 'Do you have at least 3 years of clean, audited financial statements?',
        options: [
          { value: 1, text: 'No financial statements prepared' },
          { value: 2, text: 'Financial statements exist but have not been reviewed or audited' },
          { value: 3, text: 'Financial statements reviewed but not audited' },
          { value: 4, text: 'Some years audited, some reviewed' },
          { value: 5, text: 'Three or more years of audited financial statements' }
        ]
      },
      {
        id: 'financial_2',
        text: 'How well documented are your financial forecasts and assumptions?',
        options: [
          { value: 1, text: 'No formal forecasts exist' },
          { value: 2, text: 'Basic forecasts without detailed assumptions' },
          { value: 3, text: 'Forecasts with some documented assumptions' },
          { value: 4, text: 'Detailed forecasts with most assumptions documented' },
          { value: 5, text: 'Comprehensive forecasts with all assumptions thoroughly documented' }
        ]
      },
      {
        id: 'financial_3',
        text: 'How consistent has your revenue growth been over the past 3 years?',
        options: [
          { value: 1, text: 'Declining revenue' },
          { value: 2, text: 'Flat or inconsistent revenue' },
          { value: 3, text: 'Moderate growth (5-10% annually)' },
          { value: 4, text: 'Strong growth (10-20% annually)' },
          { value: 5, text: 'Exceptional growth (>20% annually)' }
        ]
      },
      {
        id: 'financial_4',
        text: 'How diversified is your customer base?',
        options: [
          { value: 1, text: 'One customer represents >50% of revenue' },
          { value: 2, text: 'Top 3 customers represent >50% of revenue' },
          { value: 3, text: 'Top 5 customers represent >50% of revenue' },
          { value: 4, text: 'Top 10 customers represent >50% of revenue' },
          { value: 5, text: 'No single customer represents >10% of revenue' }
        ]
      },
      {
        id: 'financial_5',
        text: 'Have you had a formal business valuation performed in the last 2 years?',
        options: [
          { value: 1, text: 'Never had a formal valuation' },
          { value: 2, text: 'Informal valuation only' },
          { value: 3, text: 'Formal valuation but more than 2 years ago' },
          { value: 4, text: 'Formal valuation within last 2 years' },
          { value: 5, text: 'Multiple formal valuations with different methodologies' }
        ]
      }
    ]
  },
  {
    id: 'operations',
    title: 'Operational Efficiency',
    description: 'Assess your operational processes, documentation, and scalability',
    icon: 'cogs',
    questions: [
      {
        id: 'operations_1',
        text: 'How well documented are your key operational processes?',
        options: [
          { value: 1, text: 'No formal documentation exists' },
          { value: 2, text: 'Limited documentation of some processes' },
          { value: 3, text: 'Key processes documented but not regularly updated' },
          { value: 4, text: 'Most processes well documented and updated' },
          { value: 5, text: 'Comprehensive documentation of all processes with regular updates' }
        ]
      },
      {
        id: 'operations_2',
        text: 'How dependent is the business on your personal involvement in daily operations?',
        options: [
          { value: 1, text: 'Business cannot function without my daily involvement' },
          { value: 2, text: 'Business struggles significantly without my regular involvement' },
          { value: 3, text: 'Business can function for short periods without my involvement' },
          { value: 4, text: 'Business runs smoothly with my occasional oversight' },
          { value: 5, text: 'Business operates independently of my involvement' }
        ]
      },
      {
        id: 'operations_3',
        text: 'How scalable are your current operational systems?',
        options: [
          { value: 1, text: 'Systems would fail with any significant growth' },
          { value: 2, text: 'Systems would require major overhaul to scale' },
          { value: 3, text: 'Systems could handle moderate growth with some adjustments' },
          { value: 4, text: 'Systems designed for scalability with minor adjustments needed' },
          { value: 5, text: 'Systems fully scalable with no significant changes needed' }
        ]
      },
      {
        id: 'operations_4',
        text: 'How well managed is your supply chain and vendor relationships?',
        options: [
          { value: 1, text: 'Heavy reliance on single suppliers with no contracts' },
          { value: 2, text: 'Some key suppliers with informal agreements' },
          { value: 3, text: 'Multiple suppliers with some formal contracts' },
          { value: 4, text: 'Diversified supplier base with most relationships formalized' },
          { value: 5, text: 'Fully diversified supplier base with all formal agreements in place' }
        ]
      },
      {
        id: 'operations_5',
        text: 'How effective are your quality control and continuous improvement processes?',
        options: [
          { value: 1, text: 'No formal quality control processes' },
          { value: 2, text: 'Basic quality checks but no improvement system' },
          { value: 3, text: 'Established quality control with occasional improvements' },
          { value: 4, text: 'Robust quality system with regular improvement initiatives' },
          { value: 5, text: 'Comprehensive quality management system with continuous improvement culture' }
        ]
      }
    ]
  },
  {
    id: 'legal',
    title: 'Legal & Compliance',
    description: 'Review your legal structure, contracts, intellectual property, and regulatory compliance',
    icon: 'balance-scale',
    questions: [
      {
        id: 'legal_1',
        text: 'How well protected is your intellectual property?',
        options: [
          { value: 1, text: 'No formal IP protection in place' },
          { value: 2, text: 'Some IP identified but limited protection' },
          { value: 3, text: 'Key IP protected but gaps exist' },
          { value: 4, text: 'Most IP properly protected and documented' },
          { value: 5, text: 'All IP comprehensively protected, documented and regularly reviewed' }
        ]
      },
      {
        id: 'legal_2',
        text: 'How current and comprehensive are your customer and vendor contracts?',
        options: [
          { value: 1, text: 'Few or no formal contracts in place' },
          { value: 2, text: 'Basic contracts but outdated or incomplete' },
          { value: 3, text: 'Standard contracts in place but not regularly reviewed' },
          { value: 4, text: 'Comprehensive contracts with most relationships' },
          { value: 5, text: 'All relationships governed by thorough, current contracts' }
        ]
      },
      {
        id: 'legal_3',
        text: 'How well prepared are you for regulatory compliance audits?',
        options: [
          { value: 1, text: 'Significant compliance issues exist' },
          { value: 2, text: 'Some compliance measures in place but gaps exist' },
          { value: 3, text: 'Generally compliant but documentation incomplete' },
          { value: 4, text: 'Fully compliant with good documentation' },
          { value: 5, text: 'Exemplary compliance with comprehensive documentation' }
        ]
      },
      {
        id: 'legal_4',
        text: 'How well structured is your business from a legal perspective for a potential sale?',
        options: [
          { value: 1, text: 'Legal structure would complicate a sale' },
          { value: 2, text: 'Basic legal structure but would need significant work' },
          { value: 3, text: 'Adequate structure but some reorganization needed' },
          { value: 4, text: 'Good structure with minor adjustments needed' },
          { value: 5, text: 'Optimal legal structure for a clean sale' }
        ]
      },
      {
        id: 'legal_5',
        text: 'How well documented and resolved are any past or current legal disputes?',
        options: [
          { value: 1, text: 'Active significant disputes with poor documentation' },
          { value: 2, text: 'Some active disputes with limited documentation' },
          { value: 3, text: 'Minor active issues, past issues documented' },
          { value: 4, text: 'No active disputes, past issues well documented and resolved' },
          { value: 5, text: 'No history of significant disputes or all fully resolved and documented' }
        ]
      }
    ]
  },
  {
    id: 'market',
    title: 'Market Position',
    description: 'Evaluate your competitive advantage, market trends, and growth potential',
    icon: 'chart-line',
    questions: [
      {
        id: 'market_1',
        text: 'How well defined and defensible is your competitive advantage?',
        options: [
          { value: 1, text: 'No clear competitive advantage' },
          { value: 2, text: 'Advantage exists but is easily replicated' },
          { value: 3, text: 'Moderate advantage with some barriers to replication' },
          { value: 4, text: 'Strong advantage that is difficult to replicate' },
          { value: 5, text: 'Unique, sustainable advantage with high barriers to entry' }
        ]
      },
      {
        id: 'market_2',
        text: 'How favorable are the growth trends in your primary markets?',
        options: [
          { value: 1, text: 'Markets in decline' },
          { value: 2, text: 'Flat markets with limited growth potential' },
          { value: 3, text: 'Moderate growth in some market segments' },
          { value: 4, text: 'Strong growth across most market segments' },
          { value: 5, text: 'High-growth markets with exceptional potential' }
        ]
      },
      {
        id: 'market_3',
        text: 'How diversified are your revenue streams?',
        options: [
          { value: 1, text: 'Single product/service line' },
          { value: 2, text: 'Limited diversification with heavy reliance on primary offering' },
          { value: 3, text: 'Multiple offerings but significant concentration' },
          { value: 4, text: 'Well-diversified offerings with some concentration' },
          { value: 5, text: 'Highly diversified revenue streams across products/services' }
        ]
      },
      {
        id: 'market_4',
        text: 'How strong is your brand recognition and reputation in your market?',
        options: [
          { value: 1, text: 'Little to no brand recognition' },
          { value: 2, text: 'Limited recognition in niche segments' },
          { value: 3, text: 'Moderate recognition in primary markets' },
          { value: 4, text: 'Strong recognition and positive reputation' },
          { value: 5, text: 'Market leader with exceptional brand equity' }
        ]
      },
      {
        id: 'market_5',
        text: 'How well positioned is your business for emerging market trends?',
        options: [
          { value: 1, text: 'Not aligned with market trends' },
          { value: 2, text: 'Limited awareness of trends with minimal adaptation' },
          { value: 3, text: 'Aware of trends with some adaptation in progress' },
          { value: 4, text: 'Well-aligned with current trends' },
          { value: 5, text: 'Ahead of market trends with proactive positioning' }
        ]
      }
    ]
  },
  {
    id: 'team',
    title: 'Management & Team',
    description: 'Assess your leadership structure, team capabilities, and succession planning',
    icon: 'users',
    questions: [
      {
        id: 'team_1',
        text: 'How strong is your management team beyond the owner/founder?',
        options: [
          { value: 1, text: 'No management team beyond owner' },
          { value: 2, text: 'Limited management with significant gaps' },
          { value: 3, text: 'Core management team but some key positions unfilled' },
          { value: 4, text: 'Strong team covering most key functions' },
          { value: 5, text: 'Complete, experienced management team across all functions' }
        ]
      },
      {
        id: 'team_2',
        text: 'How well documented are your HR policies, procedures and employee agreements?',
        options: [
          { value: 1, text: 'No formal HR documentation' },
          { value: 2, text: 'Basic documentation but significant gaps' },
          { value: 3, text: 'Standard documentation but not consistently implemented' },
          { value: 4, text: 'Comprehensive documentation with good implementation' },
          { value: 5, text: 'Complete, professional HR systems fully implemented' }
        ]
      },
      {
        id: 'team_3',
        text: 'How developed is your succession planning for key positions?',
        options: [
          { value: 1, text: 'No succession planning in place' },
          { value: 2, text: 'Informal discussions but no formal plans' },
          { value: 3, text: 'Some positions with identified successors but limited development' },
          { value: 4, text: 'Most key positions with succession plans and development in progress' },
          { value: 5, text: 'Comprehensive succession planning with development for all key roles' }
        ]
      },
      {
        id: 'team_4',
        text: 'How would you rate employee retention and satisfaction?',
        options: [
          { value: 1, text: 'High turnover with significant satisfaction issues' },
          { value: 2, text: 'Above-average turnover with some satisfaction concerns' },
          { value: 3, text: 'Average turnover and satisfaction levels' },
          { value: 4, text: 'Below-average turnover with good satisfaction' },
          { value: 5, text: 'Exceptional retention with high satisfaction and engagement' }
        ]
      },
      {
        id: 'team_5',
        text: 'How effective are your training and development programs?',
        options: [
          { value: 1, text: 'No formal training programs' },
          { value: 2, text: 'Basic training for essential functions only' },
          { value: 3, text: 'Standard training programs but limited development' },
          { value: 4, text: 'Good training with development for key positions' },
          { value: 5, text: 'Comprehensive training and development across all levels' }
        ]
      }
    ]
  },
  {
    id: 'personal',
    title: 'Personal Readiness',
    description: 'Evaluate your personal and financial preparation for a business exit',
    icon: 'user',
    questions: [
      {
        id: 'personal_1',
        text: 'How clear is your personal vision for life after business exit?',
        options: [
          { value: 1, text: 'Have not considered post-exit plans' },
          { value: 2, text: 'Vague ideas but no concrete plans' },
          { value: 3, text: 'Some planning but significant uncertainty' },
          { value: 4, text: 'Clear vision with some specific plans' },
          { value: 5, text: 'Comprehensive personal plan for post-exit life' }
        ]
      },
      {
        id: 'personal_2',
        text: 'How prepared is your personal financial plan for life after exit?',
        options: [
          { value: 1, text: 'No personal financial planning for exit' },
          { value: 2, text: 'Basic understanding of needs but no formal planning' },
          { value: 3, text: 'Some planning but gaps in analysis' },
          { value: 4, text: 'Detailed planning with professional advice' },
          { value: 5, text: 'Comprehensive financial plan with multiple scenarios analyzed' }
        ]
      },
      {
        id: 'personal_3',
        text: 'How well have you prepared your family for the business exit?',
        options: [
          { value: 1, text: 'No family discussions about exit' },
          { value: 2, text: 'Limited discussions with immediate family' },
          { value: 3, text: 'Some family planning but not comprehensive' },
          { value: 4, text: 'Good communication with family and basic planning' },
          { value: 5, text: 'Comprehensive family planning with professional guidance' }
        ]
      },
      {
        id: 'personal_4',
        text: 'How clear are you on your desired exit timeline?',
        options: [
          { value: 1, text: 'No timeline considered' },
          { value: 2, text: 'Vague idea but no specific timeline' },
          { value: 3, text: 'General timeline but flexible' },
          { value: 4, text: 'Specific timeline with some planning' },
          { value: 5, text: 'Clear timeline with comprehensive planning' }
        ]
      },
      {
        id: 'personal_5',
        text: 'How emotionally prepared are you to separate from the business?',
        options: [
          { value: 1, text: 'Strong emotional attachment with no separation planning' },
          { value: 2, text: 'Significant attachment with minimal preparation' },
          { value: 3, text: 'Moderate attachment with some preparation' },
          { value: 4, text: 'Limited attachment with good preparation' },
          { value: 5, text: 'Emotionally ready with comprehensive preparation' }
        ]
      }
    ]
  }
]
