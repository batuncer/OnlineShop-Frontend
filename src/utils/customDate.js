// Utility function to format ISO date strings to "Month Year" format
export const formatMonthYear = (isoString) => {
  const date = new Date(isoString);
  const options = { year: 'numeric', month: 'long' };
  return date.toLocaleDateString('en-GB', options); // e.g., "October 2025"
};
export default formatMonthYear;