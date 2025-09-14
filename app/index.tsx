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

      <ThemedView style={styles.descriptionContainer}>
        <ThemedText style={styles.descriptionEmoji}>🚀</ThemedText>
        <ThemedText style={styles.descriptionMain}>
          We will generate a
        </ThemedText>
        <ThemedText style={styles.descriptionHighlight}>
          ✨ 3 MONTH ROADMAP ✨
        </ThemedText>
        <ThemedText style={styles.descriptionMain}>
          to guide you in
        </ThemedText>
        <ThemedText style={styles.descriptionBold}>
          🏗️ building your startup 💡
        </ThemedText>
      </ThemedView>

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
    padding: 30,
    justifyContent: 'space-between',
  },
  title: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 26,
    fontWeight: '600',
  },
  stepsContainer: {
    gap: 12,
    marginTop: -80,
  },
  step: {
    fontSize: 18,
    fontWeight: '500',
  },
  descriptionContainer: {
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  descriptionEmoji: {
    fontSize: 40,
    marginBottom: 12,
  },
  descriptionMain: {
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 6,
    fontWeight: '400',
  },
  descriptionHighlight: {
    fontSize: 24,
    textAlign: 'center',
    lineHeight: 30,
    marginVertical: 10,
    fontWeight: '800',
    letterSpacing: 1,
  },
  descriptionBold: {
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 26,
    fontWeight: '700',
    marginTop: 6,
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