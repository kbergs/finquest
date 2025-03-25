import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Link } from 'expo-router';

export default function Home() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>FinQuest</Text>
        <Text style={styles.subtitle}>Your Financial Adventure Awaits</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.imageContainer}>
          {/* Replace with your app logo/mascot */}
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderText}>🎮</Text>
          </View>
        </View>

        <Text style={styles.description}>
          Embark on a journey to secure your financial future as a California teacher.
          Create your avatar and make choices that will shape your retirement story.
        </Text>

        <View style={styles.features}>
          <Text style={styles.featuresTitle}>Discover:</Text>
          <Text style={styles.featureItem}>• Personalized CalSTRs retirement projections</Text>
          <Text style={styles.featureItem}>• Interactive financial planning</Text>
          <Text style={styles.featureItem}>• Visual progress tracking</Text>
          <Text style={styles.featureItem}>• Expert retirement insights</Text>
        </View>

        <Link href="/questionnaire" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Start Your Quest</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#4CAF50',
    padding: 20,
    paddingTop: 60,
    alignItems: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    opacity: 0.9,
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  imageContainer: {
    marginVertical: 30,
  },
  imagePlaceholder: {
    width: 150,
    height: 150,
    backgroundColor: '#E8F5E9',
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    fontSize: 50,
  },
  description: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  features: {
    alignSelf: 'stretch',
    marginBottom: 30,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  featureItem: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 