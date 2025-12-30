import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import updateLocale from 'dayjs/plugin/updateLocale';
import localizedFormat from 'dayjs/plugin/localizedFormat';

// Extend dayjs with plugins
dayjs.extend(relativeTime);
dayjs.extend(updateLocale);
dayjs.extend(localizedFormat);

// Format relative time (e.g., "3 hours ago")
export const formatRelativeTime = (date) => {
    if (!date) return '';
    return dayjs(date).fromNow();
};

// Format full date (e.g., "December 31, 2024")
export const formatFullDate = (date) => {
    if (!date) return '';
    return dayjs(date).format('MMMM D, YYYY');
};

// Format date time (e.g., "Dec 31, 2024 at 3:45 PM")
export const formatDateTime = (date) => {
    if (!date) return '';
    return dayjs(date).format('MMM D, YYYY [at] h:mm A');
};

// Format short date (e.g., "Dec 31")
export const formatShortDate = (date) => {
    if (!date) return '';
    return dayjs(date).format('MMM D');
};

// Format time only (e.g., "3:45 PM")
export const formatTime = (date) => {
    if (!date) return '';
    return dayjs(date).format('h:mm A');
};

// Format ISO date for APIs
export const formatAPIDate = (date) => {
    if (!date) return '';
    return dayjs(date).format('YYYY-MM-DD');
};

// Check if date is today
export const isToday = (date) => {
    return dayjs(date).isSame(dayjs(), 'day');
};

// Check if date is yesterday
export const isYesterday = (date) => {
    return dayjs(date).isSame(dayjs().subtract(1, 'day'), 'day');
};

// Smart date format (Today, Yesterday, or full date)
export const formatSmartDate = (date) => {
    if (!date) return '';
    const d = dayjs(date);
    if (isToday(d)) return 'Today';
    if (isYesterday(d)) return 'Yesterday';
    return d.format('MMMM D, YYYY');
};

// Export dayjs instance for custom usage
export { dayjs };
