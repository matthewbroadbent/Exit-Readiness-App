import { supabase } from '../lib/supabaseClient';

// Save user data to Supabase
export const saveUserData = async (userData) => {
  try {
    // Try to use Supabase
    try {
      const { data, error } = await supabase
        .from('users')
        .insert([
          { 
            name: userData.name,
            email: userData.email,
            phone: userData.phone,
            assessment_completed: true
          }
        ])
        .select();
        
      if (error) throw error;
      return data;
    } catch (error) {
      console.warn('Error saving to Supabase, falling back to local storage:', error);
      return saveUserDataLocally(userData);
    }
  } catch (error) {
    console.error('Error saving user data:', error);
    throw error;
  }
};

// Save assessment results to Supabase
export const saveAssessmentResults = async (userId, results) => {
  try {
    // Try to use Supabase
    try {
      const { data, error } = await supabase
        .from('assessment_results')
        .insert([
          {
            user_id: userId,
            overall_score: results.totalScore.score,
            category_scores: results.scores,
            readiness_level: results.readinessLevel.level,
            completed_at: new Date().toISOString()
          }
        ])
        .select();
        
      if (error) throw error;
      return data;
    } catch (error) {
      console.warn('Error saving results to Supabase, falling back to local storage:', error);
      return saveAssessmentResultsLocally(results);
    }
  } catch (error) {
    console.error('Error saving assessment results:', error);
    throw error;
  }
};

// Check if tables exist, otherwise use local storage fallback
export const checkSupabaseConnection = async () => {
  try {
    const { error } = await supabase.from('users').select('*').limit(1);
    
    // If there's a specific error about relation not existing, tables might not be set up
    if (error) {
      console.warn('Supabase tables not set up or connection issue, using local storage fallback');
      return false;
    }
    
    // For any other error or no error, assume connection is working
    return true;
  } catch (error) {
    console.error('Error checking Supabase connection:', error);
    return false;
  }
};

// Local storage fallback functions
export const saveUserDataLocally = (userData) => {
  try {
    // Generate a simple UUID-like identifier
    const userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    
    // Save user data
    const userWithId = { ...userData, id: userId, created_at: new Date().toISOString() };
    localStorage.setItem('userData', JSON.stringify(userWithId));
    
    return [userWithId]; // Return in array format to match Supabase response
  } catch (error) {
    console.error('Error saving user data locally:', error);
    throw error;
  }
};

export const saveAssessmentResultsLocally = (results) => {
  try {
    const resultsWithTimestamp = {
      ...results,
      completed_at: new Date().toISOString()
    };
    
    localStorage.setItem('assessmentResults', JSON.stringify(resultsWithTimestamp));
    
    return [resultsWithTimestamp]; // Return in array format to match Supabase response
  } catch (error) {
    console.error('Error saving assessment results locally:', error);
    throw error;
  }
};
