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
import { RoadmapOutput } from '../llm';

const { width } = Dimensions.get('window');

interface StartupReadinessSpiderProps {
  plan: RoadmapOutput;
}

const StartupReadinessSpider = ({ plan }: StartupReadinessSpiderProps) => {
  const [selectedArea, setSelectedArea] = useState(null);

  // Transform data for the spider/radar chart using PieChart with custom rendering
  const chartData = useMemo(() => {
    const colors = ['#EF4444', '#F59E0B', '#10B981', '#3B82F6', '#8B5CF6', '#EC4899'];
    return plan.progressWeights.map((item, index) => ({
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
        {plan.progressWeights.map((area, index) => (
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
    if (!plan.nextSteps || plan.nextSteps.length === 0) return null;

    return (
      <View style={styles.nextStepsContainer}>
        <Text style={styles.sectionTitle}>Recommended Next Steps</Text>
        {plan.nextSteps.map((step, index) => (
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
            {(plan.overallReadiness * 100).toFixed(0)}%
          </Text>
        </View>
        <Text style={styles.timeEstimate}>{plan.estimatedTimeToCompletion}</Text>
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
                  {(plan.overallReadiness * 100).toFixed(0)}%
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