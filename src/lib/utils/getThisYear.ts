export const getThisYear = () => {
  const date = new Date();
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const endOfYear = new Date(date.getFullYear() + 1, 12, 0);
  console.log(startOfYear, endOfYear);
  return {
    startOfYear,
    endOfYear,
  };
};
