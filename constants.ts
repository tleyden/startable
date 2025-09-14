export const FAKE_PLAN_JSON = `{
  "progressWeights": [
    {
      "area": "market_validation",
      "weight": 0,
      "description": "No customer contact or revenue validation has been achieved.",
      "rationale": "The provided information lacks any evidence of customer interaction or payment commitments, suggesting purely theoretical market validation.",
      "relevance": 1,
      "keyAchievements": [],
      "mainGaps": [
        "No customer interviews or interactions reported",
        "No revenue, pre-orders, or payment commitments",
        "Lack of customer retention and satisfaction metrics",
        "Unit economics and business model remain unvalidated"
      ]
    },
    {
      "area": "vision_clarity",
      "weight": 0.2,
      "description": "Broad problem area identified with unclear target customer and success metrics.",
      "rationale": "The vision of creating an 'Uber for dogs' suggests a service-based model targeting pet owners, but lacks specificity in problem-solution fit, target customer segmentation, and success criteria.",
      "relevance": 1,
      "keyAchievements": [
        "Identified a service concept targeting dog owners"
      ],
      "mainGaps": [
        "Undefined problem statement and solution details",
        "Lack of specific target customer identification",
        "No clear or measurable success metrics"
      ]
    },
    {
      "area": "founder_capacity",
      "weight": 0,
      "description": "Founder lacks relevant experience, availability, and resources.",
      "rationale": "Identifying as a dog and the minimal provided information suggest significant constraints on relevant experience, time commitment, and access to resources.",
      "relevance": 1,
      "keyAchievements": [],
      "mainGaps": [
        "No relevant experience or domain expertise",
        "Availability and commitment levels are unclear but presumed minimal",
        "Significant resource constraints and no team or support system"
      ]
    },
    {
      "area": "business_model",
      "weight": 0,
      "description": "No clear business model, monetization plan, or economic validation provided.",
      "rationale": "While the concept implies a service model, no specific revenue or monetization strategies are mentioned, indicating a lack of business model development.",
      "relevance": 1,
      "keyAchievements": [],
      "mainGaps": [
        "No defined revenue or monetization model",
        "Absence of unit economics calculation or validation",
        "Lack of pricing strategy or customer willingness to pay analysis"
      ]
    },
    {
      "area": "market_opportunity",
      "weight": 0.2,
      "description": "Minimal market research implied by the service concept, but size, trends, and timing are unclear.",
      "rationale": "The idea suggests an emerging market opportunity in pet services, but lacks concrete data on market size, growth trends, or competitive landscape analysis.",
      "relevance": 1,
      "keyAchievements": [],
      "mainGaps": [
        "No detailed market size data or growth indicators",
        "Lack of research on market trends or customer segments",
        "Unclear timing for market entry"
      ]
    },
    {
      "area": "competitive_position",
      "weight": 0,
      "description": "No differentiation or competitive analysis has been conducted.",
      "rationale": "There is no information provided on competitive landscape analysis, unique value proposition, or defensible advantages, indicating a lack of competitive position assessment.",
      "relevance": 1,
      "keyAchievements": [],
      "mainGaps": [
        "Absence of competitive landscape analysis",
        "No defined unique value proposition or differentiation factors",
        "Lack of defensible competitive advantages or moats"
      ]
    }
  ],
  "nextSteps": [
    {
      "phase": "Idea Refinement and Research",
      "priority": "critical",
      "timeframe": "2-4 weeks",
      "prerequisites": [],
      "tasks": [
        {
          "description": "Define the core problem and solution more clearly, focusing on specific customer pain points and potential services",
          "effort": "low",
          "owner": "Founder",
          "dependencies": [],
          "outcome": "A clearer vision with defined problem-solution fit",
          "skillsRequired": [
            "Research",
            "Customer Discovery"
          ],
          "resources": [
            "Internet",
            "Potential customer networks"
          ]
        },
        {
          "description": "Conduct market research to understand the size, trends, and competitive landscape of the pet services industry",
          "effort": "medium",
          "owner": "Founder",
          "dependencies": [],
          "outcome": "Identification of market opportunity and initial competitive position",
          "skillsRequired": [
            "Market Analysis",
            "Research"
          ],
          "resources": [
            "Market reports",
            "Competitor data"
          ]
        }
      ],
      "successCriteria": [
        "Defined problem-solution fit with a clear value proposition",
        "Completed basic market research validating the opportunity size and trends"
      ],
      "riskMitigation": [
        "Leverage online communities and existing networks for initial research",
        "Focus on low-cost, high-impact research methods"
      ]
    },
    {
      "phase": "Foundation Building",
      "priority": "high",
      "timeframe": "3-6 months",
      "prerequisites": [
        "Idea Refinement and Research"
      ],
      "tasks": [
        {
          "description": "Address founder capacity by seeking co-founders or advisors with business and pet industry experience",
          "effort": "medium",
          "owner": "Founder",
          "dependencies": [
            "Clear vision and research findings"
          ],
          "outcome": "Strengthened team capacity with complementary skills and experiences",
          "skillsRequired": [
            "Networking",
            "Recruitment"
          ],
          "resources": [
            "Industry events",
            "Online platforms"
          ]
        },
        {
          "description": "Develop a minimum viable product (MVP) based on refined problem and solution understanding",
          "effort": "large",
          "owner": "Technical Co-founder/Advisor",
          "dependencies": [
            "Co-founder or advisor on board"
          ],
          "outcome": "A basic but functional service platform for initial customer feedback",
          "skillsRequired": [
            "Product Development",
            "Software Engineering"
          ],
          "resources": [
            "Development tools",
            "Initial technical infrastructure"
          ]
        }
      ],
      "successCriteria": [
        "Recruitment of at least one co-founder or advisor with complementary skills",
        "Launch of MVP for early customer feedback and validation"
      ],
      "riskMitigation": [
        "Prioritize co-founder/advisor search in relevant networks and events",
        "Start MVP development with lean methodologies to minimize costs"
      ]
    }
  ],
  "overallReadiness": 0.1,
  "estimatedTimeToCompletion": "9-12 months for initial validation and team building",
  "criticalPath": [
    "Clarify and refine startup idea and market understanding",
    "Conduct foundational market and competitive research",
    "Build a foundational team with necessary skills and resources",
    "Develop and test an MVP based on refined vision"
  ]
}`;
