import { format, parseISO, isValid } from 'date-fns';
import { DATE_FORMATS } from './constants';

export const formatDate = (date, formatString = DATE_FORMATS.DISPLAY) => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) return 'Invalid Date';
    return format(dateObj, formatString);
  } catch (error) {
    console.error('Date formatting error:', error);
    return 'Invalid Date';
  }
};

export const formatAPIDate = (date) => {
  return formatDate(date, DATE_FORMATS.API);
};

// Format date for API standard (YYYY-MM-DD) - used by most APIs
export const formatAPIDateStandard = (date) => {
  return formatDate(date, DATE_FORMATS.API_STANDARD);
};

export const formatDisplayDate = (date) => {
  return formatDate(date, DATE_FORMATS.DISPLAY);
};

export const formatFullDate = (date) => {
  return formatDate(date, DATE_FORMATS.DISPLAY_FULL);
};

export const formatDateTime = (date) => {
  return formatDate(date, DATE_FORMATS.DATETIME);
};

export const getCurrentDate = () => {
  return new Date();
};

export const getDateDaysAgo = (days) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
};

export const getDateDaysFromNow = (days) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

// Parse hourly data timestamp (format: YYYYMMDDHH)
export const parseHourlyTimestamp = (timestamp) => {
  const str = timestamp.toString();
  const year = str.substring(0, 4);
  const month = str.substring(4, 6);
  const day = str.substring(6, 8);
  const hour = str.substring(8, 10);
  return new Date(`${year}-${month}-${day}T${hour}:00:00`);
};

// Get current hour in format YYYYMMDDHH
export const getCurrentHourTimestamp = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hour = String(now.getHours()).padStart(2, '0');
  return `${year}${month}${day}${hour}`;
};
