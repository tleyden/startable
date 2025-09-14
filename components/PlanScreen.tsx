import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';
import { generatePlan, type RoadmapOutput } from '@/llm';

export default function PlanScreen() {
  const { 
    openaiKey, 
    idea, 
    founderInfo, 
    currentStatus,
    interviewGetIdeaQuestions,
    interviewWhoFounderQuestions,
    interviewCurrentStatusQuestions
  } = useLocalSearchParams();
  
  const [plan, setPlan] = useState<RoadmapOutput | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generateRoadmap = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Parse the questions arrays from JSON strings
        const ideaQuestions = interviewGetIdeaQuestions ? JSON.parse(interviewGetIdeaQuestions as string) : [];
        const founderQuestions = interviewWhoFounderQuestions ? JSON.parse(interviewWhoFounderQuestions as string) : [];
        const statusQuestions = interviewCurrentStatusQuestions ? JSON.parse(interviewCurrentStatusQuestions as string) : [];
        
        // Combine all questions
        const allQuestions = [...ideaQuestions, ...founderQuestions, ...statusQuestions];
        
        // Combine all answers
        const allAnswers = [
          idea as string || '',
          founderInfo as string || '',
          currentStatus as string || ''
        ].filter(answer => answer.trim() !== '');
        
        const result = await generatePlan(
          openaiKey as string,
          allQuestions,
          allAnswers
        );
        
        setPlan(result);
      } catch (err) {
        console.error('Error generating plan:', err);
        setError(err instanceof Error ? err.message : 'Failed to generate plan');
      } finally {
        setLoading(false);
      }
    };

    if (openaiKey) {
      generateRoadmap();
    } else {
      setError('OpenAI API key is required');
      setLoading(false);
    }
  }, [openaiKey, idea, founderInfo, currentStatus, interviewGetIdeaQuestions, interviewWhoFounderQuestions, interviewCurrentStatusQuestions]);

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.title}>
          Generating Your Plan
        </ThemedText>
        <ActivityIndicator size="large" color="#B8E6B8" style={styles.spinner} />
        <ThemedText style={styles.loadingText}>
          Analyzing your responses and creating a personalized roadmap...
        </ThemedText>
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView style={styles.container}>
        <ThemedText type="title" style={styles.title}>
          Error
        </ThemedText>
        <ThemedText style={styles.errorText}>
          {error}
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Your Startup Roadmap
      </ThemedText>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={true}>
        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Overall Readiness: {Math.round((plan?.overallReadiness || 0) * 100)}%</ThemedText>
          <ThemedText style={styles.sectionText}>
            Estimated Time to Completion: {plan?.estimatedTimeToCompletion}
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Progress Weights ({plan?.progressWeights.length || 0} areas)</ThemedText>
          {plan?.progressWeights.map((weight, index) => (
            <ThemedView key={index} style={styles.progressItem}>
              <ThemedText style={styles.progressArea}>
                {weight.area.replace('_', ' ').toUpperCase()}: {Math.round(weight.weight * 100)}%
              </ThemedText>
              <ThemedText style={styles.progressDescription}>{weight.description}</ThemedText>
              <ThemedText style={styles.progressAchievements}>
                Key Achievements: {weight.keyAchievements.length} items
              </ThemedText>
              <ThemedText style={styles.progressGaps}>
                Main Gaps: {weight.mainGaps.length} items
              </ThemedText>
            </ThemedView>
          ))}
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Next Steps ({plan?.nextSteps.length || 0} phases)</ThemedText>
          {plan?.nextSteps.map((step, index) => (
            <ThemedView key={index} style={styles.nextStepItem}>
              <ThemedText style={styles.nextStepPhase}>
                {step.phase} - {step.priority.toUpperCase()}
              </ThemedText>
              <ThemedText style={styles.nextStepTimeframe}>
                Timeframe: {step.timeframe}
              </ThemedText>
              <ThemedText style={styles.nextStepTasks}>
                Tasks: {step.tasks.length} items
              </ThemedText>
              <ThemedText style={styles.nextStepCriteria}>
                Success Criteria: {step.successCriteria.length} items
              </ThemedText>
            </ThemedView>
          ))}
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Critical Path ({plan?.criticalPath.length || 0} items)</ThemedText>
          {plan?.criticalPath.map((item, index) => (
            <ThemedText key={index} style={styles.criticalPathItem}>
              {index + 1}. {item}
            </ThemedText>
          ))}
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText style={styles.sectionTitle}>Raw JSON (for debugging)</ThemedText>
          <ThemedText style={styles.jsonOutput}>
            {JSON.stringify(plan, null, 2)}
          </ThemedText>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 20,
    marginTop: 40,
  },
  scrollView: {
    flex: 1,
    marginTop: 20,
  },
  jsonOutput: {
    fontSize: 12,
    fontFamily: 'monospace',
    lineHeight: 16,
    paddingBottom: 40,
  },
  spinner: {
    marginVertical: 30,
  },
  loadingText: {
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.7,
    marginTop: 20,
    paddingHorizontal: 40,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'red',
    marginTop: 20,
  },
  section: {
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(128, 128, 128, 0.2)',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 16,
    lineHeight: 22,
    opacity: 0.8,
  },
  progressItem: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: 'rgba(184, 230, 184, 0.1)',
    borderRadius: 8,
  },
  progressArea: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  progressDescription: {
    fontSize: 14,
    lineHeight: 18,
    marginBottom: 6,
    opacity: 0.9,
  },
  progressAchievements: {
    fontSize: 13,
    color: 'green',
    marginBottom: 2,
  },
  progressGaps: {
    fontSize: 13,
    color: 'orange',
  },
  nextStepItem: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: 'rgba(184, 230, 184, 0.15)',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#B8E6B8',
  },
  nextStepPhase: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  nextStepTimeframe: {
    fontSize: 14,
    marginBottom: 4,
    opacity: 0.8,
  },
  nextStepTasks: {
    fontSize: 13,
    color: 'blue',
    marginBottom: 2,
  },
  nextStepCriteria: {
    fontSize: 13,
    color: 'purple',
  },
  criticalPathItem: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 6,
    paddingLeft: 8,
  },
});
