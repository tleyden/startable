import React, { useState, useRef, useEffect } from 'react';

const StartupReadinessSpiderChart = () => {
  // Assessment structure based on your prompts
  const assessmentDimensions = [
    {
      key: 'marketValidation',
      label: 'Market Validation',
      description: 'Evidence of real demand for your solution',
      prompts: ['Customer interviews completed', 'Market research depth', 'Validation signals received'],
      weight: 1.2 // Higher weight for critical factors
    },
    {
      key: 'productDevelopment', 
      label: 'Product Development',
      description: 'Progress on building your solution',
      prompts: ['MVP completion', 'Feature development', 'Technical feasibility'],
      weight: 1.1
    },
    {
      key: 'founderCapability',
      label: 'Founder Capability', 
      description: 'Skills and experience to execute',
      prompts: ['Relevant background', 'Domain expertise', 'Team completeness'],
      weight: 1.0
    },
    {
      key: 'businessModel',
      label: 'Business Model',
      description: 'Clear path to profitability',
      prompts: ['Revenue model clarity', 'Pricing validation', 'Unit economics'],
      weight: 1.2
    },
    {
      key: 'marketOpportunity',
      label: 'Market Opportunity',
      description: 'Size and accessibility of target market',
      prompts: ['Market size', 'Growth trends', 'Customer accessibility'],
      weight: 1.0
    },
    {
      key: 'competitivePosition',
      label: 'Competitive Position',
      description: 'Differentiation and defensibility',
      prompts: ['Unique value proposition', 'Competitive advantages', 'Market positioning'],
      weight: 0.9
    },
    {
      key: 'resourceAvailability',
      label: 'Resource Availability',
      description: 'Access to funding, time, and resources',
      prompts: ['Financial runway', 'Time commitment', 'Network access'],
      weight: 1.1
    },
    {
      key: 'executionMomentum',
      label: 'Execution Momentum',
      description: 'Current progress velocity',
      prompts: ['Milestone achievement', 'Learning velocity', 'Decision speed'],
      weight: 1.0
    }
  ];

  // Initial scores based on moderate readiness
  const [scores, setScores] = useState({
    marketValidation: 6,
    productDevelopment: 7,
    founderCapability: 5,
    businessModel: 4,
    marketOpportunity: 8,
    competitivePosition: 5,
    resourceAvailability: 6,
    executionMomentum: 7
  });

  const [selectedDimension, setSelectedDimension] = useState(null);
  const svgRef = useRef(null);

  // Calculate weighted total and readiness level
  const calculateReadiness = () => {
    const totalWeighted = assessmentDimensions.reduce((sum, dim) => {
      return sum + (scores[dim.key] * dim.weight);
    }, 0);
    
    const maxWeighted = assessmentDimensions.reduce((sum, dim) => sum + (10 * dim.weight), 0);
    const normalizedScore = (totalWeighted / maxWeighted) * 80; // Scale to 80 points
    
    let level, className, recommendations, priorities;
    
    if (normalizedScore >= 64) {
      level = 'High Readiness';
      className = 'high';
      recommendations = 'Focus on scaling and optimization. You\'re ready to accelerate growth.';
      priorities = ['Scale operations', 'Optimize conversion', 'Expand market reach'];
    } else if (normalizedScore >= 48) {
      level = 'Moderate Readiness';
      className = 'moderate'; 
      recommendations = 'Address your 2-3 weakest areas. You\'re on the right track.';
      priorities = getTopPriorities(3);
    } else if (normalizedScore >= 32) {
      level = 'Early Stage';
      className = 'early';
      recommendations = 'Significant development needed. Focus on fundamentals first.';
      priorities = getTopPriorities(2);
    } else {
      level = 'Concept Stage';
      className = 'concept';
      recommendations = 'Fundamental work required. Start with market validation.';
      priorities = ['Market validation', 'Customer discovery', 'Problem-solution fit'];
    }
    
    return { 
      score: Math.round(normalizedScore), 
      level, 
      className, 
      recommendations, 
      priorities 
    };
  };

  const getTopPriorities = (count) => {
    return assessmentDimensions
      .sort((a, b) => scores[a.key] - scores[b.key])
      .slice(0, count)
      .map(dim => dim.label);
  };

  const readiness = calculateReadiness();

  // Create SVG spider chart
  const createSpiderChart = () => {
    const size = 320;
    const center = size / 2;
    const maxRadius = size * 0.35;
    const levels = 5;
    
    // Calculate points for current scores and target
    const getPoint = (index, value, radius = maxRadius) => {
      const angle = (index * 2 * Math.PI) / assessmentDimensions.length - Math.PI / 2;
      const r = (value / 10) * radius;
      return {
        x: center + r * Math.cos(angle),
        y: center + r * Math.sin(angle)
      };
    };

    const getLabelPoint = (index, radius = maxRadius + 30) => {
      const angle = (index * 2 * Math.PI) / assessmentDimensions.length - Math.PI / 2;
      return {
        x: center + radius * Math.cos(angle),
        y: center + radius * Math.sin(angle)
      };
    };

    // Create grid lines
    const gridLines = [];
    for (let level = 1; level <= levels; level++) {
      const radius = (level / levels) * maxRadius;
      const points = assessmentDimensions.map((_, index) => getPoint(index, 10, radius));
      const pathData = points.map((point, index) => 
        `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
      ).join(' ') + ' Z';
      
      gridLines.push(
        <path
          key={`grid-${level}`}
          d={pathData}
          fill="none"
          stroke="rgba(0,0,0,0.1)"
          strokeWidth="1"
        />
      );
    }

    // Create axis lines
    const axisLines = assessmentDimensions.map((_, index) => {
      const endPoint = getPoint(index, 10);
      return (
        <line
          key={`axis-${index}`}
          x1={center}
          y1={center}
          x2={endPoint.x}
          y2={endPoint.y}
          stroke="rgba(0,0,0,0.1)"
          strokeWidth="1"
        />
      );
    });

    // Create current scores polygon
    const currentPoints = assessmentDimensions.map((dim, index) => 
      getPoint(index, scores[dim.key])
    );
    const currentPath = currentPoints.map((point, index) => 
      `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
    ).join(' ') + ' Z';

    // Create target polygon
    const targetPoints = assessmentDimensions.map((_, index) => getPoint(index, 8));
    const targetPath = targetPoints.map((point, index) => 
      `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
    ).join(' ') + ' Z';

    // Create labels
    const labels = assessmentDimensions.map((dim, index) => {
      const point = getLabelPoint(index);
      return (
        <g key={`label-${index}`}>
          <text
            x={point.x}
            y={point.y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-xs font-medium fill-gray-700 cursor-pointer hover:fill-blue-600"
            onClick={() => setSelectedDimension(dim)}
          >
            <tspan x={point.x} dy="-0.5em">{dim.label.split(' ')[0]}</tspan>
            <tspan x={point.x} dy="1.2em">{dim.label.split(' ').slice(1).join(' ')}</tspan>
          </text>
        </g>
      );
    });

    // Create score dots
    const scoreDots = currentPoints.map((point, index) => (
      <circle
        key={`dot-${index}`}
        cx={point.x}
        cy={point.y}
        r="4"
        fill="rgb(102, 126, 234)"
        stroke="white"
        strokeWidth="2"
        className="cursor-pointer hover:r-6"
        onClick={() => setSelectedDimension(assessmentDimensions[index])}
      />
    ));

    return (
      <svg
        ref={svgRef}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="mx-auto"
      >
        {gridLines}
        {axisLines}
        
        {/* Target polygon */}
        <path
          d={targetPath}
          fill="rgba(118, 75, 162, 0.1)"
          stroke="rgba(118, 75, 162, 0.6)"
          strokeWidth="2"
          strokeDasharray="5,5"
        />
        
        {/* Current scores polygon */}
        <path
          d={currentPath}
          fill="rgba(102, 126, 234, 0.2)"
          stroke="rgba(102, 126, 234, 1)"
          strokeWidth="3"
        />
        
        {labels}
        {scoreDots}
        
        {/* Center dot */}
        <circle
          cx={center}
          cy={center}
          r="3"
          fill="rgba(0,0,0,0.3)"
        />
        
        {/* Score labels on grid */}
        {[2, 4, 6, 8, 10].map(value => {
          const point = getPoint(0, value);
          return (
            <text
              key={`score-${value}`}
              x={point.x + 5}
              y={point.y}
              className="text-xs fill-gray-400"
              dominantBaseline="middle"
            >
              {value}
            </text>
          );
        })}
      </svg>
    );
  };

  const updateScore = (dimensionKey, newValue) => {
    setScores(prev => ({
      ...prev,
      [dimensionKey]: parseInt(newValue)
    }));
  };

  const loadPreset = (type) => {
    const presets = {
      concept: {
        marketValidation: 2, productDevelopment: 3, founderCapability: 4, businessModel: 2,
        marketOpportunity: 5, competitivePosition: 3, resourceAvailability: 3, executionMomentum: 2
      },
      early: {
        marketValidation: 4, productDevelopment: 5, founderCapability: 6, businessModel: 4,
        marketOpportunity: 7, competitivePosition: 4, resourceAvailability: 5, executionMomentum: 4
      },
      moderate: {
        marketValidation: 6, productDevelopment: 7, founderCapability: 6, businessModel: 5,
        marketOpportunity: 7, competitivePosition: 5, resourceAvailability: 6, executionMomentum: 6
      },
      advanced: {
        marketValidation: 8, productDevelopment: 8, founderCapability: 7, businessModel: 7,
        marketOpportunity: 8, competitivePosition: 7, resourceAvailability: 8, executionMomentum: 9
      }
    };
    
    setScores(presets[type]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 p-6">
      <div className="max-w-7xl mx-auto bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-8 text-center">
          <h1 className="text-4xl font-bold mb-3">🚀 Startup Readiness Assessment</h1>
          <p className="text-xl opacity-90">
            Comprehensive evaluation across 8 critical startup dimensions
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 p-8">
          {/* Chart Section */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg">
            <div className="mb-6 bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                Interactive Spider Chart
              </h3>
              {createSpiderChart()}
              
              {/* Legend */}
              <div className="flex justify-center gap-6 mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500/20 border-2 border-blue-500 rounded"></div>
                  <span>Current Assessment</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-purple-500 border-dashed rounded bg-purple-500/10"></div>
                  <span>Target (High Readiness)</span>
                </div>
              </div>
            </div>
            
            {/* Quick Presets */}
            <div className="flex gap-3 mb-4 flex-wrap">
              <button
                onClick={() => loadPreset('concept')}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-medium"
              >
                Concept Stage
              </button>
              <button
                onClick={() => loadPreset('early')}
                className="px-4 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors font-medium"
              >
                Early Stage
              </button>
              <button
                onClick={() => loadPreset('moderate')}
                className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors font-medium"
              >
                Growing
              </button>
              <button
                onClick={() => loadPreset('advanced')}
                className="px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors font-medium"
              >
                Advanced
              </button>
            </div>
            
            {selectedDimension && (
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">{selectedDimension.label}</h4>
                <p className="text-sm text-blue-600 mb-3">{selectedDimension.description}</p>
                <div className="text-xs text-blue-500">
                  <strong>Key areas:</strong> {selectedDimension.prompts.join(' • ')}
                </div>
                <div className="mt-2 text-xs text-blue-500">
                  <strong>Weight:</strong> {selectedDimension.weight}x importance
                </div>
              </div>
            )}
          </div>

          {/* Controls Section */}
          <div className="space-y-6">
            {/* Score Controls */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                📊 Adjust Scores
              </h3>
              
              <div className="space-y-5">
                {assessmentDimensions.map((dimension) => (
                  <div key={dimension.key} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="font-medium text-gray-700 text-sm">
                        {dimension.label}
                      </label>
                      <div className="flex items-center gap-2">
                        {dimension.weight !== 1.0 && (
                          <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                            {dimension.weight}x
                          </span>
                        )}
                        <span className="bg-blue-500 text-white px-3 py-1 rounded-lg font-semibold min-w-[40px] text-center">
                          {scores[dimension.key]}
                        </span>
                      </div>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={scores[dimension.key]}
                      onChange={(e) => updateScore(dimension.key, e.target.value)}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      style={{
                        background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${(scores[dimension.key] - 1) * 100 / 9}%, #e5e7eb ${(scores[dimension.key] - 1) * 100 / 9}%, #e5e7eb 100%)`
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                📈 Assessment Summary
              </h4>
              
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-800 mb-2">
                    {readiness.score}/80
                  </div>
                  <div className={`inline-block px-4 py-2 rounded-full font-semibold ${
                    readiness.className === 'high' ? 'bg-green-100 text-green-800' :
                    readiness.className === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                    readiness.className === 'early' ? 'bg-orange-100 text-orange-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {readiness.level}
                  </div>
                </div>
                
                <div className="text-sm text-gray-600">
                  {readiness.recommendations}
                </div>
                
                <div className="border-t pt-4">
                  <h5 className="font-semibold text-gray-700 mb-2">🎯 Next 3-Month Priorities:</h5>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {readiness.priorities.map((priority, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        {priority}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartupReadinessSpiderChart;