import React, { useState, useMemo } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Info, Clock, AlertTriangle, CheckCircle } from 'lucide-react';

const StartupReadinessSpider = () => {
  const [selectedArea, setSelectedArea] = useState(null);
  
  // Sample data structure - replace with your actual JSON data
  const data = {
    "progressWeights": [
      {
        "area": "market_validation",
        "weight": 0.1,
        "description": "Minimal market validation with no customer contact or revenue evidence",
        "rationale": "No customer interviews, surveys, or market research conducted. Only evidence is a prototype from Lovable platform and general statement that 'pet parents are obsessed' without specific validation",
        "relevance": 1.0,
        "keyAchievements": [
          "Prototype exists from Lovable platform",
          "General market interest indicated ('pet parents are obsessed')"
        ],
        "mainGaps": [
          "No customer discovery or market research conducted",
          "No revenue validation or paying customers",
          "No customer feedback or testimonials",
          "No market testing or validation experiments"
        ]
      },
      {
        "area": "vision_clarity",
        "weight": 0.6,
        "description": "Clear problem and solution definition but lacks specific success metrics",
        "rationale": "Well-defined problem (dogs have difficulty dating) and solution (Tinder for dogs with location-based matching), but no measurable success criteria or specific target customer segmentation",
        "relevance": 1.0,
        "keyAchievements": [
          "Clear problem statement: dogs have difficulty dating",
          "Defined solution approach: location-based dog dating platform",
          "Identified target customers: pet parents and dogs",
          "Clear value proposition: finds 'hot dogs' in the area"
        ],
        "mainGaps": [
          "No specific success metrics defined",
          "Vague target customer segmentation",
          "No product scope boundaries clearly defined"
        ]
      },
      {
        "area": "founder_capacity",
        "weight": 0.3,
        "description": "Limited relevant experience with significant skill gaps and resource constraints",
        "rationale": "Founder has personal dog ownership experience and furry community knowledge, but lacks business skills, technical capabilities are unclear, and needs significant funding for marketing",
        "relevance": 1.0,
        "keyAchievements": [
          "Personal experience as dog owner (direct problem understanding)",
          "Furry community insider knowledge",
          "Working prototype from Lovable platform"
        ],
        "mainGaps": [
          "No business skills specified",
          "No technical capabilities detailed",
          "No time commitment information",
          "Major skill gaps in marketing and funding acquisition",
          "No co-founder or team composition details"
        ]
      },
      {
        "area": "business_model",
        "weight": 0.0,
        "description": "No business model defined or validated",
        "rationale": "No revenue model, pricing strategy, unit economics, or monetization approach specified. No evidence of customer willingness to pay",
        "relevance": 1.0,
        "keyAchievements": [],
        "mainGaps": [
          "No revenue model defined",
          "No pricing strategy",
          "No unit economics (CAC, LTV, margins unknown)",
          "No revenue streams identified",
          "No monetization validation"
        ]
      },
      {
        "area": "market_opportunity",
        "weight": 0.4,
        "description": "General market interest indicated but no market research or sizing conducted",
        "rationale": "Pet parent obsession suggests market potential, but no market size data, trends analysis, or customer segment research provided",
        "relevance": 1.0,
        "keyAchievements": [
          "General market interest indicated ('all pet parents are obsessed')",
          "Growing pet industry trend mentioned"
        ],
        "mainGaps": [
          "No market size data (TAM, SAM unknown)",
          "No market research conducted",
          "No customer segment analysis",
          "No market timing analysis"
        ]
      },
      {
        "area": "competitive_position",
        "weight": 0.3,
        "description": "Basic differentiation but limited competitive analysis",
        "rationale": "Specialized focus on dog dating provides some differentiation, but no direct competitor analysis, limited competitive advantages, and no defensible moats identified",
        "relevance": 1.0,
        "keyAchievements": [
          "Specialized focus on dog dating (vs general pet services)",
          "Location-based matching system",
          "Furry community insider knowledge"
        ],
        "mainGaps": [
          "No direct competitor analysis",
          "No competitive advantages detailed",
          "No barriers to entry identified",
          "No market positioning strategy"
        ]
      }
    ],
    "nextSteps": [
      {
        "phase": "Market Validation Sprint",
        "priority": "critical",
        "timeframe": "6-8 weeks",
        "prerequisites": [],
        "tasks": [
          {
            "description": "Conduct customer discovery interviews with 20+ pet parents",
            "effort": "medium",
            "owner": "Founder",
            "dependencies": [],
            "outcome": "Validated problem understanding and customer needs",
            "skillsRequired": ["Customer Development", "Interviewing"],
            "resources": ["Customer outreach tools", "Interview guides"]
          },
          {
            "description": "Test willingness to pay with potential customers",
            "effort": "small",
            "owner": "Founder",
            "dependencies": ["Customer interviews completed"],
            "outcome": "Validated pricing model and revenue potential",
            "skillsRequired": ["Sales", "Market Research"],
            "resources": ["Pricing survey tools", "Customer database"]
          }
        ],
        "successCriteria": [
          "20+ customer interviews completed",
          "Clear willingness to pay validated",
          "Specific customer pain points identified",
          "Pricing model validated with target customers"
        ],
        "riskMitigation": [
          "Start with existing network of dog owners",
          "Offer free trials to reduce customer risk",
          "Focus on early adopters who are most likely to engage"
        ]
      }
    ],
    "overallReadiness": 0.25,
    "estimatedTimeToCompletion": "12-18 months to sustainable revenue and product-market fit"
  };

  const radarData = useMemo(() => {
    return data.progressWeights.map(item => ({
      area: item.area.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      weight: item.weight * 100,
      fullWeight: item.weight,
      ...item
    }));
  }, []);

  const formatAreaName = (name) => {
    return name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const getStatusColor = (weight) => {
    if (weight >= 0.7) return 'text-green-600';
    if (weight >= 0.4) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusIcon = (weight) => {
    if (weight >= 0.7) return <CheckCircle className="w-4 h-4 text-green-600" />;
    if (weight >= 0.4) return <Clock className="w-4 h-4 text-yellow-600" />;
    return <AlertTriangle className="w-4 h-4 text-red-600" />;
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 border rounded-lg shadow-lg max-w-xs">
          <h3 className="font-semibold mb-2">{label}</h3>
          <p className="text-sm text-gray-600 mb-2">{data.description}</p>
          <p className="text-lg font-bold text-blue-600">{data.fullWeight.toFixed(1)}/1.0</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Startup Readiness Assessment</h1>
        <div className="flex items-center gap-4 text-lg">
          <span className="text-gray-600">Overall Readiness:</span>
          <span className="font-bold text-2xl text-blue-600">
            {(data.overallReadiness * 100).toFixed(0)}%
          </span>
          <span className="text-gray-500">({data.estimatedTimeToCompletion})</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Spider Chart */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-center">Progress Radar</h2>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={radarData}>
              <PolarGrid />
              <PolarAngleAxis 
                dataKey="area" 
                tick={{ fontSize: 12, fill: '#374151' }}
                className="text-xs"
              />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 100]} 
                tick={{ fontSize: 10, fill: '#6B7280' }}
              />
              <Radar
                name="Progress"
                dataKey="weight"
                stroke="#3B82F6"
                fill="#3B82F6"
                fillOpacity={0.3}
                strokeWidth={2}
                dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
              />
              <Tooltip content={<CustomTooltip />} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Area Details */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold mb-4">Area Breakdown</h2>
          {data.progressWeights.map((area, index) => (
            <div 
              key={area.area}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                selectedArea === area.area ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => setSelectedArea(selectedArea === area.area ? null : area.area)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getStatusIcon(area.weight)}
                  <h3 className="font-semibold">{formatAreaName(area.area)}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`font-bold ${getStatusColor(area.weight)}`}>
                    {(area.weight * 100).toFixed(0)}%
                  </span>
                  <Info className="w-4 h-4 text-gray-400" />
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-2">{area.description}</p>
              
              {selectedArea === area.area && (
                <div className="mt-4 space-y-3 border-t pt-4">
                  <div>
                    <h4 className="font-medium text-green-700 mb-1">Key Achievements:</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {area.keyAchievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-3 h-3 text-green-500 mt-1 flex-shrink-0" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {area.mainGaps.length > 0 && (
                    <div>
                      <h4 className="font-medium text-red-700 mb-1">Main Gaps:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {area.mainGaps.map((gap, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <AlertTriangle className="w-3 h-3 text-red-500 mt-1 flex-shrink-0" />
                            {gap}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Next Steps Section */}
      {data.nextSteps && data.nextSteps.length > 0 && (
        <div className="mt-8 p-6 bg-blue-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4 text-blue-900">Recommended Next Steps</h2>
          {data.nextSteps.map((step, index) => (
            <div key={index} className="mb-6 last:mb-0">
              <div className="flex items-center gap-3 mb-2">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  step.priority === 'critical' ? 'bg-red-100 text-red-800' :
                  step.priority === 'high' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {step.priority.toUpperCase()}
                </span>
                <h3 className="font-semibold text-blue-900">{step.phase}</h3>
                <span className="text-sm text-gray-600">({step.timeframe})</span>
              </div>
              
              <div className="ml-4 space-y-2">
                <h4 className="font-medium text-sm">Success Criteria:</h4>
                <ul className="text-sm text-gray-700">
                  {step.successCriteria.map((criteria, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      {criteria}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StartupReadinessSpider;