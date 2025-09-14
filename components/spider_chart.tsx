import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { PieChart } from 'react-native-gifted-charts';

const { width } = Dimensions.get('window');

const StartupReadinessSpider = () => {
  const [selectedArea, setSelectedArea] = useState(null);

  // Your JSON data
  const data = {
    progressWeights: [
      {
        area: "market_validation",
        weight: 0.1,
        description: "Minimal market validation with no customer contact or revenue evidence",
        rationale: "No customer interviews, surveys, or market research conducted. Only evidence is a prototype from Lovable platform and general statement that 'pet parents are obsessed' without specific validation",
        relevance: 1.0,
        keyAchievements: [
          "Prototype exists from Lovable platform",
          "General market interest indicated ('pet parents are obsessed')"
        ],
        mainGaps: [
          "No customer discovery or market research conducted",
          "No revenue validation or paying customers",
          "No customer feedback or testimonials",
          "No market testing or validation experiments"
        ]
      },
      {
        area: "vision_clarity",
        weight: 0.6,
        description: "Clear problem and solution definition but lacks specific success metrics",
        rationale: "Well-defined problem (dogs have difficulty dating) and solution (Tinder for dogs with location-based matching), but no measurable success criteria or specific target customer segmentation",
        relevance: 1.0,
        keyAchievements: [
          "Clear problem statement: dogs have difficulty dating",
          "Defined solution approach: location-based dog dating platform",
          "Identified target customers: pet parents and dogs",
          "Clear value proposition: finds 'hot dogs' in the area"
        ],
        mainGaps: [
          "No specific success metrics defined",
          "Vague target customer segmentation",
          "No product scope boundaries clearly defined"
        ]
      },
      {
        area: "founder_capacity",
        weight: 0.3,
        description: "Limited relevant experience with significant skill gaps and resource constraints",
        rationale: "Founder has personal dog ownership experience and furry community knowledge, but lacks business skills, technical capabilities are unclear, and needs significant funding for marketing",
        relevance: 1.0,
        keyAchievements: [
          "Personal experience as dog owner (direct problem understanding)",
          "Furry community insider knowledge",
          "Working prototype from Lovable platform"
        ],
        mainGaps: [
          "No business skills specified",
          "No technical capabilities detailed",
          "No time commitment information",
          "Major skill gaps in marketing and funding acquisition",
          "No co-founder or team composition details"
        ]
      },
      {
        area: "business_model",
        weight: 0.0,
        description: "No business model defined or validated",
        rationale: "No revenue model, pricing strategy, unit economics, or monetization approach specified. No evidence of customer willingness to pay",
        relevance: 1.0,
        keyAchievements: [],
        mainGaps: [
          "No revenue model defined",
          "No pricing strategy",
          "No unit economics (CAC, LTV, margins unknown)",
          "No revenue streams identified",
          "No monetization validation"
        ]
      },
      {
        area: "market_opportunity",
        weight: 0.4,
        description: "General market interest indicated but no market research or sizing conducted",
        rationale: "Pet parent obsession suggests market potential, but no market size data, trends analysis, or customer segment research provided",
        relevance: 1.0,
        keyAchievements: [
          "General market interest indicated ('all pet parents are obsessed')",
          "Growing pet industry trend mentioned"
        ],
        mainGaps: [
          "No market size data (TAM, SAM unknown)",
          "No market research conducted",
          "No customer segment analysis",
          "No market timing analysis"
        ]
      },
      {
        area: "competitive_position",
        weight: 0.3,
        description: "Basic differentiation but limited competitive analysis",
        rationale: "Specialized focus on dog dating provides some differentiation, but no direct competitor analysis, limited competitive advantages, and no defensible moats identified",
        relevance: 1.0,
        keyAchievements: [
          "Specialized focus on dog dating (vs general pet services)",
          "Location-based matching system",
          "Furry community insider knowledge"
        ],
        mainGaps: [
          "No direct competitor analysis",
          "No competitive advantages detailed",
          "No barriers to entry identified",
          "No market positioning strategy"
        ]
      }
    ],
    nextSteps: [
      {
        phase: "Market Validation Sprint",
        priority: "critical",
        timeframe: "6-8 weeks",
        successCriteria: [
          "20+ customer interviews completed",
          "Clear willingness to pay validated",
          "Specific customer pain points identified",
          "Pricing model validated with target customers"
        ]
      }
    ],
    overallReadiness: 0.25,
    estimatedTimeToCompletion: "12-18 months to sustainable revenue and product-market fit"
  };

  // Transform data for the spider/radar chart using PieChart with custom rendering
  const chartData = useMemo(() => {
    const colors = ['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899'];
    return data.progressWeights.map((item, index) => ({
      value: Math.max(item.weight * 100, 5), // Minimum 5 for visibility
      color: colors[index % colors.length],
      label: formatAreaName(item.area),
      originalWeight: item.weight,
      ...item
    }));
  }, []);

  const formatAreaName = (name) => {
    return name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const getStatusColor = (weight) => {
    if (weight >= 0.7) return '#10B981'; // green
    if (weight >= 0.4) return '#F59E0B'; // yellow
    return '#EF4444'; // red
  };

  const getStatusText = (weight) => {
    if (weight >= 0.7) return 'Strong';
    if (weight >= 0.4) return 'Moderate';
    return 'Needs Attention';
  };

  const renderLegend = () => {
    return (
      <View style={styles.legendContainer}>
        {chartData.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: item.color }]} />
            <Text style={styles.legendText} numberOfLines={2}>
              {item.label} ({item.originalWeight.toFixed(1)})
            </Text>
          </View>
        ))}
      </View>
    );
  };

  const renderAreaDetails = () => {
    return (
      <View style={styles.areasContainer}>
        <Text style={styles.sectionTitle}>Area Breakdown</Text>
        {data.progressWeights.map((area, index) => (
          <TouchableOpacity
            key={area.area}
            style={[
              styles.areaCard,
              selectedArea === area.area && styles.selectedAreaCard
            ]}
            onPress={() => setSelectedArea(selectedArea === area.area ? null : area.area)}
          >
            <View style={styles.areaHeader}>
              <View style={styles.areaInfo}>
                <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(area.weight) }]} />
                <Text style={styles.areaTitle}>{formatAreaName(area.area)}</Text>
              </View>
              <View style={styles.areaScore}>
                <Text style={[styles.scoreText, { color: getStatusColor(area.weight) }]}>
                  {(area.weight * 100).toFixed(0)}%
                </Text>
                <Text style={styles.statusText}>{getStatusText(area.weight)}</Text>
              </View>
            </View>

            <Text style={styles.areaDescription}>{area.description}</Text>

            {selectedArea === area.area && (
              <View style={styles.expandedContent}>
                {area.keyAchievements.length > 0 && (
                  <View style={styles.section}>
                    <Text style={styles.sectionHeader}>✓ Key Achievements:</Text>
                    {area.keyAchievements.map((achievement, idx) => (
                      <Text key={idx} style={styles.listItem}>
                        • {achievement}
                      </Text>
                    ))}
                  </View>
                )}

                {area.mainGaps.length > 0 && (
                  <View style={styles.section}>
                    <Text style={styles.sectionHeader}>⚠ Main Gaps:</Text>
                    {area.mainGaps.map((gap, idx) => (
                      <Text key={idx} style={styles.listItem}>
                        • {gap}
                      </Text>
                    ))}
                  </View>
                )}
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderNextSteps = () => {
    if (!data.nextSteps || data.nextSteps.length === 0) return null;

    return (
      <View style={styles.nextStepsContainer}>
        <Text style={styles.sectionTitle}>Recommended Next Steps</Text>
        {data.nextSteps.map((step, index) => (
          <View key={index} style={styles.stepCard}>
            <View style={styles.stepHeader}>
              <View style={[
                styles.priorityBadge,
                step.priority === 'critical' && styles.criticalPriority,
                step.priority === 'high' && styles.highPriority,
              ]}>
                <Text style={styles.priorityText}>{step.priority.toUpperCase()}</Text>
              </View>
              <Text style={styles.stepTitle}>{step.phase}</Text>
            </View>
            <Text style={styles.timeframe}>Timeframe: {step.timeframe}</Text>

            <Text style={styles.sectionHeader}>Success Criteria:</Text>
            {step.successCriteria.map((criteria, idx) => (
              <Text key={idx} style={styles.listItem}>
                • {criteria}
              </Text>
            ))}
          </View>
        ))}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Startup Readiness Assessment</Text>
        <View style={styles.overallScore}>
          <Text style={styles.scoreLabel}>Overall Readiness:</Text>
          <Text style={styles.overallScoreText}>
            {(data.overallReadiness * 100).toFixed(0)}%
          </Text>
        </View>
        <Text style={styles.timeEstimate}>{data.estimatedTimeToCompletion}</Text>
      </View>

      {/* Chart Section */}
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Progress Overview</Text>
        <View style={styles.chartWrapper}>
          <PieChart
            data={chartData}
            radius={width * 0.25}
            innerRadius={50}
            centerLabelComponent={() => (
              <View style={styles.centerLabel}>
                <Text style={styles.centerLabelText}>Overall</Text>
                <Text style={styles.centerLabelScore}>
                  {(data.overallReadiness * 100).toFixed(0)}%
                </Text>
              </View>
            )}
          />
        </View>
        {renderLegend()}
      </View>

      {/* Area Details */}
      {renderAreaDetails()}

      {/* Next Steps */}
      {renderNextSteps()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 12,
  },
  overallScore: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  scoreLabel: {
    fontSize: 16,
    color: '#6B7280',
    marginRight: 12,
  },
  overallScoreText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3B82F6',
  },
  timeEstimate: {
    fontSize: 14,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  chartContainer: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 20,
  },
  chartWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },
  centerLabel: {
    alignItems: 'center',
  },
  centerLabelText: {
    fontSize: 14,
    color: '#6B7280',
  },
  centerLabelScore: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3B82F6',
  },
  legendContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    maxWidth: width * 0.4,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: '#374151',
    flex: 1,
  },
  areasContainer: {
    margin: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 16,
  },
  areaCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  selectedAreaCard: {
    borderColor: '#3B82F6',
    borderWidth: 2,
    backgroundColor: '#EFF6FF',
  },
  areaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  areaInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  areaTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },
  areaScore: {
    alignItems: 'flex-end',
  },
  scoreText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusText: {
    fontSize: 12,
    color: '#6B7280',
  },
  areaDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  expandedContent: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  section: {
    marginBottom: 12,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  listItem: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
    marginBottom: 2,
    marginLeft: 8,
  },
  nextStepsContainer: {
    margin: 16,
    backgroundColor: '#EFF6FF',
    padding: 20,
    borderRadius: 12,
  },
  stepCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 12,
  },
  criticalPriority: {
    backgroundColor: '#FEE2E2',
  },
  highPriority: {
    backgroundColor: '#FEF3C7',
  },
  priorityText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#374151',
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E40AF',
    flex: 1,
  },
  timeframe: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 12,
  },
});

export default StartupReadinessSpider;