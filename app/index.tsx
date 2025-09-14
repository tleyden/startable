import { StyleSheet, Pressable } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.title}>
        Welcome to startable!
      </ThemedText>

      <ThemedView style={styles.stepsContainer}>
        <ThemedText style={styles.step}>1. Tell us your idea</ThemedText>
        <ThemedText style={styles.step}>2. Tell us about yourself</ThemedText>
        <ThemedText style={styles.step}>3. Tell us where you're at</ThemedText>
      </ThemedView>

      <ThemedText style={styles.description}>
        We will generate a{'\n'}
        3 month roadmap{'\n'}
        to guide you in{'\n'}
        building your startup
      </ThemedText>

      <Pressable
        accessibilityRole="button"
        onPress={() => router.push('/modal')}
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
    padding: 40,
    justifyContent: 'space-between',
  },
  title: {
    textAlign: 'center',
    marginTop: 60,
    fontSize: 28,
    fontWeight: '600',
  },
  stepsContainer: {
    gap: 12,
    marginTop: -100,
  },
  step: {
    fontSize: 20,
    fontWeight: '500',
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  button: {
    paddingVertical: 18,
    borderRadius: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000',
  },
  buttonLabel: {
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
  },
});