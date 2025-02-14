export const getThisMonth = () => {
   const date = new Date();
   const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
   const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
   console.log(startOfMonth, endOfMonth);
   return {
      startOfMonth,
      endOfMonth,
   };
};
