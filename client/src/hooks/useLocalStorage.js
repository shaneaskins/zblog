import { useState } from "react";

export const useLocalStorage = (keyName, defaultValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const value = window.localStorage.getItem(keyName);
      if (value) {
        //console.log(value)
        //console.log(JSON.parse(value))
        //return JSON.parse(value);
        return value;
      } else {
        window.localStorage.setItem(keyName, JSON.stringify(defaultValue).replaceAll('"', ''));
        return defaultValue;
      }
    } catch (err) {
      return defaultValue;
    }
  });
  const setValue = (newValue) => {
    try {
      window.localStorage.setItem(keyName, JSON.stringify(newValue).replaceAll('"', ''));
    } catch (err) {}
    setStoredValue(newValue);
  };
  return [storedValue, setValue];
};