import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

export default function AvatarResults() {
  // In a full implementation, this would receive the questionnaire data as props or from a state management solution
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Financial Quest Journey</Text>
        <Text style={styles.subtitle}>Here's how your future looks based on your choices</Text>
      </View>

      <View style={styles.avatarContainer}>
        {/* This would be replaced with the actual avatar component */}
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarText}>Your Avatar</Text>
        </View>
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>Retirement Projections</Text>
        
        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Estimated Pension at Retirement</Text>
          <Text style={styles.statValue}>$XX,XXX per month</Text>
          <Text style={styles.statDescription}>
            Based on your years of service and salary history
          </Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Years Until Retirement</Text>
          <Text style={styles.statValue}>XX Years</Text>
          <Text style={styles.statDescription}>
            Make the most of your teaching career
          </Text>
        </View>

        <View style={styles.upgradeCard}>
          <Text style={styles.upgradeTitle}>Want More Detailed Projections?</Text>
          <Text style={styles.upgradeDescription}>
            Upgrade to Premium to unlock:
            {'\n'}- Detailed monthly budget planning
            {'\n'}- Investment strategy recommendations
            {'\n'}- Custom retirement scenarios
            {'\n'}- Personal financial advisor access
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    backgroundColor: '#4CAF50',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: -50,
    marginBottom: 20,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fff',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#666',
  },
  statsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  statCard: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
  },
  statLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 8,
  },
  statDescription: {
    fontSize: 14,
    color: '#666',
  },
  upgradeCard: {
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
  },
  upgradeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 12,
  },
  upgradeDescription: {
    fontSize: 16,
    color: '#1B5E20',
    lineHeight: 24,
  },
}); 