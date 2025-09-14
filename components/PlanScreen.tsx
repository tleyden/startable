import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useLocalSearchParams } from 'expo-router';
import { StyleSheet } from 'react-native';

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

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Here is your plan
      </ThemedText>
      
      <ThemedText style={styles.placeholder}>
        Plan generation coming soon...
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 20,
  },
  placeholder: {
    fontSize: 18,
    opacity: 0.7,
    textAlign: 'center',
  },
});
