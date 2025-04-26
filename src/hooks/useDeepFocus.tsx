import { useState, useEffect } from 'react';

// Custom hook to manage deepFocus state
export const useDeepFocus = () => {
  const [deepFocus, setDeepFocus] = useState(() => {
    return localStorage.getItem('deepFocus') === 'true';
  });

  useEffect(() => {
    // Function to handle both local changes and storage events
    const handleDeepFocusChange = () => {
      const currentValue = localStorage.getItem('deepFocus') === 'true';
      setDeepFocus(currentValue);
    };

    // Listen for storage events (for cross-component communication)
    window.addEventListener('storage', handleDeepFocusChange);
    
    // Listen for a custom event for same-window updates
    window.addEventListener('deepFocusChanged', handleDeepFocusChange);

    return () => {
      window.removeEventListener('storage', handleDeepFocusChange);
      window.removeEventListener('deepFocusChanged', handleDeepFocusChange);
    };
  }, []);

  // Function to toggle the deep focus state
  const toggleDeepFocus = () => {
    const newValue = !deepFocus;
    localStorage.setItem('deepFocus', newValue.toString());
    setDeepFocus(newValue);
    
    // Dispatch a custom event to notify other components
    window.dispatchEvent(new Event('deepFocusChanged'));
  };

  return { deepFocus, toggleDeepFocus };
}; 