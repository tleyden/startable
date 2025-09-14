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
        <ThemedText style={styles.jsonOutput}>
          {JSON.stringify(plan, null, 2)}
        </ThemedText>
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
});
