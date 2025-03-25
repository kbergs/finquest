import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { differenceInYears, parse } from 'date-fns';

interface QuestionnaireParams {
  birthday: string;
  startDate: string;
  retirementAge: string;
  lastYearSalary: string;
  [key: string]: string | string[]; // Required for Expo Router params
}

export default function AvatarResults() {
  const params = useLocalSearchParams<QuestionnaireParams>();
  
  const calculateProjections = () => {
    const birthDate = parse(params.birthday as string, 'MM/dd/yyyy', new Date());
    const startDate = parse(params.startDate as string, 'MM/dd/yyyy', new Date());
    const retirementAge = parseInt(params.retirementAge as string, 10);
    const currentSalary = parseFloat((params.lastYearSalary as string).replace(/[^0-9.]/g, ''));
    
    const currentAge = differenceInYears(new Date(), birthDate);
    const yearsUntilRetirement = retirementAge - currentAge;
    const yearsOfService = differenceInYears(new Date(), startDate) + yearsUntilRetirement;
    
    // Basic CalSTRs pension calculation (simplified version)
    // Actual calculation would be more complex and consider various factors
    const benefitFactor = 0.02; // 2% per year of service
    const finalCompensation = currentSalary * Math.pow(1.03, yearsUntilRetirement); // Assuming 3% annual salary increase
    const monthlyPension = (yearsOfService * benefitFactor * finalCompensation) / 12;

    return {
      yearsUntilRetirement,
      monthlyPension: monthlyPension.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      }),
    };
  };

  const projections = calculateProjections();

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
          <Text style={styles.statValue}>{projections.monthlyPension} per month</Text>
          <Text style={styles.statDescription}>
            Based on your years of service and salary history
          </Text>
        </View>

        <View style={styles.statCard}>
          <Text style={styles.statLabel}>Years Until Retirement</Text>
          <Text style={styles.statValue}>{projections.yearsUntilRetirement} Years</Text>
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