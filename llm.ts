import OpenAI from 'openai';

export interface ProgressWeight {
  area: string;
  weight: number;
  description: string;
  rationale: string;
  relevance: number;
  keyAchievements: string[];
  mainGaps: string[];
}

export interface Task {
  description: string;
  effort: 'small' | 'medium' | 'large';
  owner: string;
  dependencies: string[];
  outcome: string;
  skillsRequired: string[];
  resources: string[];
}

export interface NextStep {
  phase: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  timeframe: string;
  prerequisites: string[];
  tasks: Task[];
  successCriteria: string[];
  riskMitigation: string[];
}

export interface RoadmapOutput {
  progressWeights: ProgressWeight[];
  nextSteps: NextStep[];
  overallReadiness: number;
  estimatedTimeToCompletion: string;
  criticalPath: string[];
}

export async function generatePlan(
  openaiApiKey: string,
  interviewQuestions: string[],
  interviewAnswers: string[]
): Promise<RoadmapOutput> {
  const openai = new OpenAI({
    apiKey: openaiApiKey,
  });

  const prompt = `# Startup Roadmap Evaluation Prompt

## Task
Analyze the provided startup validation markdown document and generate a comprehensive roadmap assessment focused on startup success factors. Evaluate progress across the 6 key validation areas and create prioritized next steps for startup growth.

## Input
You will receive a structured markdown document containing organized information about market validation, vision clarity, founder capacity, business model, market opportunity, and competitive position.

interviewQuestions:

${interviewQuestions.join('\n')}

interviewAnswers:

${interviewAnswers.join('\n')}


## Output Requirements
Return a valid JSON object matching the RoadmapOutput structure with startup-focused assessments. The JSON must be properly formatted and include all required fields.

## Startup Validation Framework

### Assessment Methodology
1. **Evidence-Based Scoring** - Base weights on concrete evidence from the markdown
2. **Startup Stage Consideration** - Adjust expectations based on venture maturity
3. **Critical Path Focus** - Prioritize activities that unlock the next stage of growth
4. **Risk-Adjusted Planning** - Account for common startup failure modes

### Validation Area Evaluation Criteria

### MARKET_VALIDATION (0-1 scale)
**Weight Calculation Based On:**
- **1.0**: 10+ paying customers, proven unit economics, strong retention, validated pricing
- **0.8**: 5+ paying customers or strong pilot program, positive economics trending
- **0.6**: 3+ pilot customers, clear willingness to pay, basic economic validation
- **0.4**: 15+ customer interviews, clear demand signals, some willingness to pay
- **0.2**: 5+ customer interviews, general interest but no payment validation
- **0.0**: No customer contact, purely theoretical validation

**Key Evidence:**
- Number of customer interactions and depth of feedback
- Revenue, pre-orders, or payment commitments
- Customer retention and satisfaction metrics
- Unit economics and business model validation

### VISION_CLARITY (0-1 scale)
**Weight Calculation Based On:**
- **1.0**: Crystal clear problem-solution fit, specific target customer, measurable success criteria
- **0.8**: Well-defined problem and solution, clear target market, some success metrics
- **0.6**: Good problem understanding, defined customer segment, basic success criteria
- **0.4**: General problem identified, somewhat defined target, vague success measures
- **0.2**: Broad problem area, multiple customer types, unclear success definition
- **0.0**: Vague problem, undefined target customer, no success metrics

**Key Evidence:**
- Specificity of problem statement and solution approach
- Target customer definition and segmentation
- Value proposition clarity and differentiation
- Measurable success criteria and goals

### FOUNDER_CAPACITY (0-1 scale)
**Weight Calculation Based On:**
- **1.0**: Strong domain expertise, complementary co-founder, full-time commitment, adequate resources
- **0.8**: Good relevant experience, mostly full-time, sufficient resources, some team gaps
- **0.6**: Some relevant experience, part-time but committed, limited resources, clear skill gaps
- **0.4**: Limited relevant experience, part-time availability, resource constrained, major skill gaps
- **0.2**: Minimal relevant experience, very limited time, severe resource constraints
- **0.0**: No relevant experience, minimal availability, no resources or team

**Key Evidence:**
- Domain expertise and relevant industry experience
- Technical and business skill alignment with venture needs
- Time commitment and availability
- Team composition and identified skill gaps
- Access to resources and support systems

### BUSINESS_MODEL (0-1 scale)
**Weight Calculation Based On:**
- **1.0**: Validated revenue model, proven unit economics, scalable monetization, clear pricing
- **0.8**: Defined revenue model, positive unit economics, tested pricing strategy
- **0.6**: Clear monetization approach, basic unit economics, some pricing validation
- **0.4**: General revenue plan, unclear economics, untested pricing
- **0.2**: Vague monetization ideas, no economic validation, no pricing strategy
- **0.0**: No clear business model, no monetization plan, economics unknown

**Key Evidence:**
- Revenue model definition and validation
- Unit economics (CAC, LTV, margins) and profitability path
- Pricing strategy and customer willingness to pay
- Scalability of the business model

### MARKET_OPPORTUNITY (0-1 scale)
**Weight Calculation Based On:**
- **1.0**: Large market with validated size, strong growth trends, clear timing advantage
- **0.8**: Good market size with research backing, positive trends, decent timing
- **0.6**: Moderate market opportunity, some research, emerging trends
- **0.4**: Small or uncertain market size, limited research, unclear trends
- **0.2**: Minimal market research, questionable size, poor timing indicators
- **0.0**: No market research, unknown opportunity size, bad timing

**Key Evidence:**
- Market size data (TAM, SAM) and research quality
- Market trends and growth indicators
- Market timing and competitive landscape evolution
- Customer segment analysis and opportunity sizing

### COMPETITIVE_POSITION (0-1 scale)
**Weight Calculation Based On:**
- **1.0**: Strong differentiation, clear competitive advantages, defensible moats, superior solution
- **0.8**: Good differentiation, some competitive advantages, developing moats
- **0.6**: Basic differentiation, few competitive advantages, unclear defensibility
- **0.4**: Limited differentiation, weak competitive position, easily replicable
- **0.2**: Minimal differentiation, strong existing competition, commodity solution
- **0.0**: No clear differentiation, dominated market, no competitive advantage

**Key Evidence:**
- Competitive landscape analysis depth and accuracy
- Unique value proposition and differentiation factors
- Defensible competitive advantages and moats
- Market positioning strategy

## Next Steps Generation Framework

### Priority Levels for Startups
- **Critical**: Addresses immediate existential risks or unlocks major progress
- **High**: Important for near-term growth and validation
- **Medium**: Valuable for efficiency and optimization
- **Low**: Nice-to-have improvements or future considerations

### Common Startup Next Step Categories

#### Customer Validation Phase
- Launch pilot programs with target customers
- Conduct customer development interviews
- Test pricing models and willingness to pay
- Validate product-market fit hypotheses

#### Product Development Phase  
- Build minimum viable product (MVP)
- Implement core features based on customer feedback
- Establish product development processes
- Create customer feedback loops

#### Business Model Validation
- Test and refine monetization strategies
- Validate unit economics and pricing
- Develop scalable revenue streams
- Establish financial tracking and metrics

#### Market Entry Phase
- Develop go-to-market strategy
- Build sales and marketing processes
- Establish customer acquisition channels
- Create brand and market positioning

#### Team Building Phase
- Recruit co-founders or key team members
- Build advisory board or mentorship network
- Develop organizational structure
- Address critical skill gaps

#### Funding & Resources Phase
- Prepare investor materials and pitch deck
- Apply to accelerators or funding programs
- Secure initial funding or investment
- Establish partnerships and strategic relationships

## JSON Output Structure

\`\`\`json
{
  "progressWeights": [
    {
      "area": "market_validation",
      "weight": 0.4,
      "description": "Customer interviews completed but limited revenue validation",
      "rationale": "Conducted 20 customer interviews with strong interest, but only 2 pilot customers committed and no actual revenue generated yet",
      "relevance": 1.0,
      "keyAchievements": [
        "Completed 20 customer discovery interviews",
        "Identified core customer pain points",
        "Secured 2 pilot customer commitments"
      ],
      "mainGaps": [
        "No paying customers acquired",
        "Pricing model not validated with real transactions",
        "Unit economics remain theoretical"
      ]
    },
    {
      "area": "vision_clarity", 
      "weight": 0.8,
      "description": "Clear problem definition and target customer identification",
      "rationale": "Well-articulated problem statement with specific target market (small restaurants), clear value proposition, but some product scope details need refinement",
      "relevance": 1.0,
      "keyAchievements": [
        "Defined specific problem for small restaurant inventory management",
        "Identified primary customer segment with clear characteristics",
        "Articulated clear value proposition"
      ],
      "mainGaps": [
        "Feature prioritization needs more customer input",
        "Success metrics could be more specific and measurable"
      ]
    },
    {
      "area": "founder_capacity",
      "weight": 0.6,
      "description": "Strong technical background but limited business experience and part-time availability",
      "rationale": "Founder has excellent software engineering skills and relevant food tech experience, but lacks sales/marketing experience and currently working part-time",
      "relevance": 1.0,
      "keyAchievements": [
        "8 years software engineering experience",
        "Previous food tech startup experience",
        "Strong technical capability for product development"
      ],
      "mainGaps": [
        "Limited sales and marketing experience",
        "Part-time availability constraint",
        "No co-founder or business partner identified"
      ]
    },
    {
      "area": "business_model",
      "weight": 0.5,
      "description": "Basic SaaS model defined but limited economic validation",
      "rationale": "Clear $50/month SaaS subscription model with customer interest, but unit economics unproven and customer acquisition strategy undefined",
      "relevance": 1.0,
      "keyAchievements": [
        "Defined SaaS subscription model",
        "Initial pricing validation ($50/month) with potential customers",
        "Identified scalable revenue model"
      ],
      "mainGaps": [
        "Unit economics (CAC, LTV) not calculated",
        "Customer acquisition strategy undefined",
        "No actual revenue generated"
      ]
    }
  ],
  "nextSteps": [
    {
      "phase": "Customer Validation Sprint",
      "priority": "critical",
      "timeframe": "4-6 weeks", 
      "prerequisites": [],
      "tasks": [
        {
          "description": "Convert 5 interviewed restaurant owners into paying pilot customers",
          "effort": "medium",
          "owner": "Founder",
          "dependencies": [],
          "outcome": "First paying customers and validated pricing with real transactions",
          "skillsRequired": ["Sales", "Customer Development"],
          "resources": ["Basic product/prototype", "Customer outreach tools"]
        },
        {
          "description": "Build basic MVP with core inventory tracking features",
          "effort": "large",
          "owner": "Founder",
          "dependencies": [],
          "outcome": "Functional product for pilot customers to use and provide feedback",
          "skillsRequired": ["Software Development", "Product Design"],
          "resources": ["Development tools", "Cloud hosting"]
        }
      ],
      "successCriteria": [
        "At least 3 paying pilot customers acquired",
        "$150+ monthly recurring revenue established",
        "Customer satisfaction score above 7/10"
      ],
      "riskMitigation": [
        "Start with simplest possible MVP to get customer feedback quickly",
        "Offer discounted pilot pricing to reduce customer risk",
        "Have backup customer prospects identified"
      ]
    },
    {
      "phase": "Business Model Validation",
      "priority": "high",
      "timeframe": "6-8 weeks",
      "prerequisites": ["Customer Validation Sprint"],
      "tasks": [
        {
          "description": "Calculate and validate unit economics with real customer data",
          "effort": "small", 
          "owner": "Founder",
          "dependencies": ["Paying customers acquired"],
          "outcome": "Proven unit economics showing path to profitability",
          "skillsRequired": ["Financial Analysis", "Business Modeling"],
          "resources": ["Customer data", "Financial tracking tools"]
        },
        {
          "description": "Develop customer acquisition strategy and test channels",
          "effort": "medium",
          "owner": "Founder",
          "dependencies": ["Proven product-market fit"],
          "outcome": "Scalable customer acquisition process with known costs",
          "skillsRequired": ["Marketing", "Sales"],
          "resources": ["Marketing budget", "Sales tools"]
        }
      ],
      "successCriteria": [
        "Positive unit economics (LTV > 3x CAC)",
        "Customer acquisition cost under $150",
        "Clear path to 50+ customers within 6 months"
      ],
      "riskMitigation": [
        "Test multiple acquisition channels to find most effective",
        "Monitor customer churn closely and address issues quickly",
        "Validate pricing with larger customer sample"
      ]
    }
  ],
  "overallReadiness": 0.55,
  "estimatedTimeToCompletion": "6-9 months to sustainable revenue and product-market fit",
  "criticalPath": [
    "Acquire first paying customers to validate demand",
    "Build functional MVP based on customer feedback",
    "Prove unit economics and scalable customer acquisition",
    "Address founder capacity constraints (co-founder or full-time transition)"
  ]
}
\`\`\`

## Quality Standards

### Assessment Accuracy
- Base all weights on concrete evidence from the markdown document
- Avoid speculation beyond what can be reasonably inferred
- Consider startup stage when setting expectations
- Focus on progress relative to venture maturity

### Next Steps Quality
- Ensure tasks are specific and actionable (not vague advice)
- Include realistic effort estimates based on founder capacity
- Sequence tasks logically with clear dependencies
- Focus on activities that directly impact startup success metrics

### Risk Considerations
- Address common startup failure modes in recommendations
- Consider resource constraints and founder limitations
- Include mitigation strategies for identified risks
- Balance ambition with realistic execution capability

### JSON Validation
- Ensure all numeric values are between 0-1 for weights and relevance
- Include all required fields in the output structure
- Validate that timeframes are realistic given effort estimates
- Confirm that critical path represents true bottlenecks and dependencies`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: "You are a startup advisor and business analyst. Analyze the provided interview data and generate a comprehensive startup roadmap assessment in JSON format. Ensure your response is valid JSON only, with no additional text or formatting."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 4000,
      response_format: { type: "json_object" }
    });

    const responseContent = completion.choices[0].message.content;
    if (!responseContent) {
      throw new Error('No response content from OpenAI');
    }

    const result = JSON.parse(responseContent) as RoadmapOutput;
    return result;
  } catch (error) {
    console.error('Error generating plan:', error);
    throw new Error(`Failed to generate plan: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}