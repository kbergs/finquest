import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { router } from 'expo-router';

interface QuestionnaireData {
  birthday: string;
  startDate: string;
  retirementAge: string;
  lastYearSalary: string;
}

export default function Questionnaire() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<QuestionnaireData>({
    birthday: '',
    startDate: '',
    retirementAge: '',
    lastYearSalary: '',
  });

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Navigate to results or avatar customization
      router.push('/avatar-results');
    }
  };

  const renderQuestion = () => {
    switch (step) {
      case 1:
        return (
          <View style={styles.questionContainer}>
            <Text style={styles.question}>What is your birthday?</Text>
            <TextInput
              style={styles.input}
              placeholder="MM/DD/YYYY"
              value={data.birthday}
              onChangeText={(text) => setData({ ...data, birthday: text })}
            />
            <Text style={styles.hint}>
              Your age will help us calculate your retirement timeline and benefits.
            </Text>
          </View>
        );
      case 2:
        return (
          <View style={styles.questionContainer}>
            <Text style={styles.question}>
              What day and year did you start working as a teacher paying into the CalSTRs retirement plan?
            </Text>
            <TextInput
              style={styles.input}
              placeholder="MM/DD/YYYY"
              value={data.startDate}
              onChangeText={(text) => setData({ ...data, startDate: text })}
            />
            <Text style={styles.hint}>
              Your start date affects your years of service and pension calculations.
            </Text>
          </View>
        );
      case 3:
        return (
          <View style={styles.questionContainer}>
            <Text style={styles.question}>At what age do you plan on retiring?</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter age (e.g., 65)"
              value={data.retirementAge}
              onChangeText={(text) => setData({ ...data, retirementAge: text })}
            />
            <Text style={styles.hint}>
              Your retirement age impacts your pension benefits and lifestyle planning.
            </Text>
          </View>
        );
      case 4:
        return (
          <View style={styles.questionContainer}>
            <Text style={styles.question}>What was your salary last year?</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter amount"
              keyboardType="numeric"
              value={data.lastYearSalary}
              onChangeText={(text) => setData({ ...data, lastYearSalary: text })}
            />
            <Text style={styles.hint}>
              Your salary helps us project your future pension benefits.
            </Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>Step {step} of 4</Text>
        <View style={styles.progressBar}>
          <View style={[styles.progress, { width: `${(step / 4) * 100}%` }]} />
        </View>
      </View>
      
      {renderQuestion()}
      
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>
          {step === 4 ? 'Create My Avatar' : 'Next'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  progressContainer: {
    marginBottom: 30,
  },
  progressText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#666',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
  },
  progress: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  questionContainer: {
    marginBottom: 30,
  },
  question: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    marginBottom: 15,
  },
  hint: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 