import { useState, useEffect } from "react";

/**
 * React hook to debounce a changing value on a given delay.
 * @param value - value to debounce
 * @param delay - debounce delay in ms
 * @returns {[any, number]} returns the current value of the input
 * value at the current interval and the timestamp when the update was done.
 */
export default function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const [lastChangeTime, setLastChangeTime] = useState(Date.now());

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
      setLastChangeTime(Date.now());
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value]);

  return [debouncedValue, lastChangeTime];
}
