export const formatToTwoDecimalPlace = (num) => {
  if (typeof num === 'number') {
    return num.toFixed(2);
  }
  return 'N/A';
};
