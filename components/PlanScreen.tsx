import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { generatePlan, type RoadmapOutput } from '@/llm';
import { FAKE_PLAN_JSON } from '@/constants';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, View } from 'react-native';

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
  const [expandedPhase, setExpandedPhase] = useState<number | null>(null);

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
        
        console.log('Generated Plan JSON:', JSON.stringify(result, null, 2));
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

  const togglePhase = (index: number) => {
    setExpandedPhase(expandedPhase === index ? null : index);
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Here is your plan
      </ThemedText>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {plan?.nextSteps.map((step, index) => (
          <Pressable
            key={index}
            onPress={() => togglePhase(index)}
            style={styles.phaseCard}
          >
            <View style={styles.phaseHeader}>
              <View style={styles.phaseContent}>
                <ThemedText style={styles.phaseTitle}>
                  Phase {index + 1}
                </ThemedText>
                <ThemedText style={styles.phaseSubtitle}>
                  {step.phase}
                </ThemedText>
              </View>
              <ThemedText style={styles.phaseArrow}>
                {expandedPhase === index ? '✓' : '>'}
              </ThemedText>
            </View>
            
            {expandedPhase === index && (
              <View style={styles.phaseDetails}>
                <View style={styles.detailRow}>
                  <ThemedText style={styles.detailIcon}>📅</ThemedText>
                  <ThemedText style={styles.detailText}>
                    Timeline: {step.timeframe}
                  </ThemedText>
                </View>
                
                {step.tasks.map((task, taskIndex) => (
                  <View key={taskIndex} style={styles.detailRow}>
                    <ThemedText style={styles.detailIcon}>⚙️</ThemedText>
                    <ThemedText style={styles.detailText}>
                      Task: {task.description}
                    </ThemedText>
                  </View>
                ))}
                
                <View style={styles.detailRow}>
                  <ThemedText style={styles.detailIcon}>🎯</ThemedText>
                  <ThemedText style={styles.detailText}>
                    Outcome: {step.tasks[0]?.outcome || 'Complete phase objectives'}
                  </ThemedText>
                </View>
                
                <View style={styles.detailRow}>
                  <ThemedText style={styles.detailIcon}>💪</ThemedText>
                  <ThemedText style={styles.detailText}>
                    Skills Required: {step.tasks[0]?.skillsRequired.join(', ') || 'Various'}
                  </ThemedText>
                </View>
              </View>
            )}
          </Pressable>
        ))}
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
    marginBottom: 30,
    marginTop: 40,
  },
  scrollView: {
    flex: 1,
  },
  phaseCard: {
    backgroundColor: 'rgba(184, 230, 184, 0.1)',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#000',
    marginBottom: 16,
    overflow: 'hidden',
  },
  phaseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  phaseContent: {
    flex: 1,
  },
  phaseTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  phaseSubtitle: {
    fontSize: 16,
    opacity: 0.8,
  },
  phaseArrow: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  phaseDetails: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 12,
  },
  detailIcon: {
    fontSize: 16,
    marginRight: 8,
    marginTop: 2,
  },
  detailText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
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
});