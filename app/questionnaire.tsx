import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { router } from 'expo-router';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { format } from 'date-fns';
import {
  validateBirthday,
  validateStartDate,
  validateRetirementAge,
  validateSalary,
  ValidationResult
} from './utils/dateValidation';

interface QuestionnaireData {
  birthday: string;
  startDate: string;
  retirementAge: string;
  lastYearSalary: string;
  [key: string]: string; // Add index signature for router params
}

interface ValidationErrors {
  birthday?: string;
  startDate?: string;
  retirementAge?: string;
  lastYearSalary?: string;
}

export default function Questionnaire() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<QuestionnaireData>({
    birthday: '',
    startDate: '',
    retirementAge: '',
    lastYearSalary: '',
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [formattedData, setFormattedData] = useState<QuestionnaireData>({
    birthday: '',
    startDate: '',
    retirementAge: '',
    lastYearSalary: '',
  });
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [isStartDatePickerVisible, setStartDatePickerVisible] = useState(false);

  const validateCurrentStep = (): boolean => {
    let result: ValidationResult;
    let currentError: ValidationErrors = {};

    switch (step) {
      case 1:
        result = validateBirthday(data.birthday);
        if (!result.isValid) {
          currentError.birthday = result.error;
        } else if (result.formattedDate) {
          setFormattedData(prev => ({
            ...prev,
            birthday: result.formattedDate || prev.birthday
          }));
        }
        break;

      case 2:
        result = validateStartDate(data.startDate, formattedData.birthday);
        if (!result.isValid) {
          currentError.startDate = result.error;
        } else if (result.formattedDate) {
          setFormattedData(prev => ({
            ...prev,
            startDate: result.formattedDate || prev.startDate
          }));
        }
        break;

      case 3:
        result = validateRetirementAge(data.retirementAge, formattedData.birthday);
        if (!result.isValid) {
          currentError.retirementAge = result.error;
        } else if (result.formattedDate) {
          setFormattedData(prev => ({
            ...prev,
            retirementAge: result.formattedDate || prev.retirementAge
          }));
        }
        break;

      case 4:
        result = validateSalary(data.lastYearSalary);
        if (!result.isValid) {
          currentError.lastYearSalary = result.error;
        } else if (result.formattedDate) {
          setFormattedData(prev => ({
            ...prev,
            lastYearSalary: result.formattedDate || prev.lastYearSalary
          }));
        }
        break;
    }

    setErrors(currentError);
    return Object.keys(currentError).length === 0;
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      if (step < 4) {
        setStep(step + 1);
      } else {
        // Navigate to results with the formatted data
        router.push({
          pathname: '/avatar-results',
          params: formattedData
        });
      }
    }
  };

  const handleConfirmDate = (date: Date) => {
    const formattedDate = format(date, 'MM/dd/yyyy');
    setData({ ...data, birthday: formattedDate });
    setDatePickerVisible(false);
  };

  const handleConfirmStartDate = (date: Date) => {
    const formattedDate = format(date, 'MM/dd/yyyy');
    setData({ ...data, startDate: formattedDate });
    setStartDatePickerVisible(false);
  };

  const renderError = (error?: string) => {
    if (!error) return null;
    return <Text style={styles.error}>{error}</Text>;
  };

  const renderQuestion = () => {
    switch (step) {
      case 1:
        return (
          <View style={styles.questionContainer}>
            <Text style={styles.question}>What is your birthday?</Text>
            <TouchableOpacity
              style={[styles.dateInput, errors.birthday && styles.inputError]}
              onPress={() => setDatePickerVisible(true)}
            >
              <Text style={[styles.dateInputText, !data.birthday && styles.placeholder]}>
                {data.birthday || 'Select your birthday'}
              </Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirmDate}
              onCancel={() => setDatePickerVisible(false)}
              maximumDate={new Date()}
              minimumDate={new Date(1923, 0, 1)} // 100 years ago
            />
            {renderError(errors.birthday)}
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
            <TouchableOpacity
              style={[styles.dateInput, errors.startDate && styles.inputError]}
              onPress={() => {
                if (!data.birthday) {
                  setErrors({ ...errors, startDate: 'Please enter your birthday first' });
                } else {
                  setStartDatePickerVisible(true);
                }
              }}
            >
              <Text style={[styles.dateInputText, !data.startDate && styles.placeholder]}>
                {data.startDate || 'Select your start date'}
              </Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={isStartDatePickerVisible}
              mode="date"
              onConfirm={handleConfirmStartDate}
              onCancel={() => setStartDatePickerVisible(false)}
              maximumDate={new Date()}
              minimumDate={(() => {
                if (!data.birthday) return undefined;
                const birthDate = new Date(data.birthday);
                return new Date(
                  birthDate.getFullYear() + 15,
                  birthDate.getMonth(),
                  birthDate.getDate()
                );
              })()}
            />
            {renderError(errors.startDate)}
            <Text style={styles.hint}>
              Your start date affects your years of service and pension calculations.
              Must be at least 15 years after your birth date.
            </Text>
          </View>
        );
      case 3:
        return (
          <View style={styles.questionContainer}>
            <Text style={styles.question}>At what age do you plan on retiring?</Text>
            <TextInput
              style={[styles.input, errors.retirementAge && styles.inputError]}
              placeholder="Enter age (e.g., 65)"
              keyboardType="numeric"
              value={data.retirementAge}
              onChangeText={(text) => {
                setData({ ...data, retirementAge: text });
                setErrors({ ...errors, retirementAge: undefined });
              }}
            />
            {renderError(errors.retirementAge)}
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
              style={[styles.input, errors.lastYearSalary && styles.inputError]}
              placeholder="Enter amount"
              keyboardType="numeric"
              value={data.lastYearSalary}
              onChangeText={(text) => {
                setData({ ...data, lastYearSalary: text });
                setErrors({ ...errors, lastYearSalary: undefined });
              }}
            />
            {renderError(errors.lastYearSalary)}
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
  dateInput: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  dateInputText: {
    fontSize: 16,
    color: '#333',
  },
  placeholder: {
    color: '#999',
  },
  inputError: {
    borderColor: '#FF5252',
    borderWidth: 2,
  },
  error: {
    color: '#FF5252',
    fontSize: 14,
    marginBottom: 10,
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