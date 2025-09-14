import { useState } from 'react';
import { StyleSheet, TextInput, Pressable, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

const interviewCurrentStatusQuestions = [
  "Where are you in your startup journey right now?",
  "What are some challenges you have hit so far?"
];

export default function InterviewCurrentStatus() {
  const { colors } = useTheme();
  const router = useRouter();
  const { openaiKey, idea, founderInfo, interviewGetIdeaQuestions, interviewWhoFounderQuestions } = useLocalSearchParams();
  const [currentStatus, setCurrentStatus] = useState('');

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Where are you in{'\n'}your journey?
      </ThemedText>

      <View style={styles.instructionsBlock}>
        <ThemedText style={styles.instructions}>It would be helpful to mention things like:</ThemedText>
        {interviewCurrentStatusQuestions.map((question, index) => (
          <ThemedText key={index} style={styles.bullet}>{index + 1}. {question}</ThemedText>
        ))}
      </View>

      <TextInput
        multiline
        value={currentStatus}
        onChangeText={setCurrentStatus}
        placeholder="Tell us where you are in your journey..."
        placeholderTextColor={colors.border}
        style={[
          styles.input,
          {
            borderColor: colors.border,
            color: colors.text,
            backgroundColor: colors.card,
          },
        ]}
      />

      <Pressable
        accessibilityRole="button"
        onPress={() => {
          // Now you have access to: openaiKey, idea, founderInfo, currentStatus, and all question arrays
          router.push('/modal');
        }}
        style={({ pressed }) => [
          styles.button,
          { 
            backgroundColor: '#B8E6B8',
            opacity: pressed ? 0.8 : 1 
          },
        ]}>
        <ThemedText style={styles.buttonLabel}>Next -></ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 20,
    justifyContent: 'flex-start',
  },
  title: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 28,
    fontWeight: '600',
    lineHeight: 34,
  },
  instructionsBlock: {
    gap: 8,
    marginTop: 20,
  },
  instructions: {
    fontSize: 18,
    opacity: 0.9,
    marginBottom: 4,
  },
  bullet: {
    fontSize: 16,
    lineHeight: 22,
  },
  input: {
    height: 200,
    borderWidth: 2,
    borderRadius: 24,
    padding: 16,
    textAlignVertical: 'top',
    fontSize: 16,
    flex: 1,
    maxHeight: 250,
  },
  button: {
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000',
    marginBottom: 20,
  },
  buttonLabel: {
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
  },
});
