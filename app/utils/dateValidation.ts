import { format, isValid, parse, isFuture, isPast, differenceInYears } from 'date-fns';

export interface ValidationResult {
  isValid: boolean;
  error?: string;
  formattedDate?: string;
}

export const validateBirthday = (dateString: string): ValidationResult => {
  const parsedDate = parse(dateString, 'MM/dd/yyyy', new Date());
  
  if (!isValid(parsedDate)) {
    return {
      isValid: false,
      error: 'Please enter a valid date in MM/DD/YYYY format',
    };
  }

  if (isFuture(parsedDate)) {
    return {
      isValid: false,
      error: 'Birthday cannot be in the future',
    };
  }

  const age = differenceInYears(new Date(), parsedDate);
  if (age < 18) {
    return {
      isValid: false,
      error: 'You must be at least 18 years old',
    };
  }

  if (age > 100) {
    return {
      isValid: false,
      error: 'Please check your birth date',
    };
  }

  return {
    isValid: true,
    formattedDate: format(parsedDate, 'MM/dd/yyyy'),
  };
};

export const validateStartDate = (dateString: string, birthday: string): ValidationResult => {
  const parsedDate = parse(dateString, 'MM/dd/yyyy', new Date());
  const parsedBirthday = parse(birthday, 'MM/dd/yyyy', new Date());
  
  if (!isValid(parsedDate)) {
    return {
      isValid: false,
      error: 'Please enter a valid date in MM/DD/YYYY format',
    };
  }

  if (isFuture(parsedDate)) {
    return {
      isValid: false,
      error: 'Start date cannot be in the future',
    };
  }

  const ageAtStart = differenceInYears(parsedDate, parsedBirthday);
  if (ageAtStart < 20) {
    return {
      isValid: false,
      error: 'Start date suggests you were younger than 20 when you began teaching',
    };
  }

  if (ageAtStart > 70) {
    return {
      isValid: false,
      error: 'Please check your start date',
    };
  }

  return {
    isValid: true,
    formattedDate: format(parsedDate, 'MM/dd/yyyy'),
  };
};

export const validateRetirementAge = (age: string, birthday: string): ValidationResult => {
  const numAge = parseInt(age, 10);
  const parsedBirthday = parse(birthday, 'MM/dd/yyyy', new Date());
  const currentAge = differenceInYears(new Date(), parsedBirthday);

  if (isNaN(numAge) || numAge < 50 || numAge > 80) {
    return {
      isValid: false,
      error: 'Please enter a retirement age between 50 and 80',
    };
  }

  if (numAge <= currentAge) {
    return {
      isValid: false,
      error: 'Retirement age must be in the future',
    };
  }

  return {
    isValid: true,
    formattedDate: age,
  };
};

export const validateSalary = (salary: string): ValidationResult => {
  const numSalary = parseFloat(salary.replace(/[^0-9.]/g, ''));
  
  if (isNaN(numSalary) || numSalary < 30000) {
    return {
      isValid: false,
      error: 'Please enter a valid salary (minimum $30,000)',
    };
  }

  if (numSalary > 500000) {
    return {
      isValid: false,
      error: 'Please check your salary amount',
    };
  }

  return {
    isValid: true,
    formattedDate: numSalary.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    }),
  };
}; 