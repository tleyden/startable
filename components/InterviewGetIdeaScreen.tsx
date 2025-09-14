import { useState } from 'react';
import { StyleSheet, TextInput, Pressable, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function InterviewGetIdeaScreen() {
  const { colors } = useTheme();
  const router = useRouter();
  const { openaiKey } = useLocalSearchParams();
  const [idea, setIdea] = useState('');

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        What's your idea?
      </ThemedText>

      <View style={styles.instructionsBlock}>
        <ThemedText style={styles.instructions}>It would be helpful to mention things like:</ThemedText>
        <ThemedText style={styles.bullet}>1. What is the core problem you are trying to solve?</ThemedText>
        <ThemedText style={styles.bullet}>2. Who is your target customer?</ThemedText>
        <ThemedText style={styles.bullet}>3. How will you solve this problem for this customer?</ThemedText>
        <ThemedText style={styles.bullet}>4. How will it make money?</ThemedText>
      </View>

      <TextInput
        multiline
        value={idea}
        onChangeText={setIdea}
        placeholder="Describe your idea here..."
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
        onPress={() => router.push({
          pathname: '/interview-who-founder',
          params: { openaiKey, idea }
        })}
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
