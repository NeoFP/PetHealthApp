// Utility functions for managing shared pet form data across nutrition and activity planners

export interface SharedPetData {
  petName?: string;
  breed?: string;
  ageMonths?: string;
  weight?: string;
  disease?: string;
}

const STORAGE_KEY = 'petHealthApp_sharedPetData';

/**
 * Save shared pet data to localStorage
 */
export const saveSharedPetData = (data: SharedPetData): void => {
  try {
    const existingData = getSharedPetData();
    const updatedData = { ...existingData, ...data };
    
    // Only save non-empty values
    const filteredData: SharedPetData = {};
    Object.entries(updatedData).forEach(([key, value]) => {
      if (value && value.trim() !== '') {
        filteredData[key as keyof SharedPetData] = value;
      }
    });
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredData));
  } catch (error) {
    console.error('Error saving shared pet data:', error);
  }
};

/**
 * Get shared pet data from localStorage
 */
export const getSharedPetData = (): SharedPetData => {
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : {};
  } catch (error) {
    console.error('Error getting shared pet data:', error);
    return {};
  }
};

/**
 * Clear shared pet data from localStorage
 */
export const clearSharedPetData = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing shared pet data:', error);
  }
};

/**
 * Merge form data with stored data, prioritizing form data
 */
export const mergeWithStoredData = (formData: Partial<SharedPetData>): SharedPetData => {
  const storedData = getSharedPetData();
  return { ...storedData, ...formData };
};
