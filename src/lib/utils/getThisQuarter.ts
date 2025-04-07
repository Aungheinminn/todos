export const getThisQuarter = () => {
   const date = new Date();
   const startOfQuarter = new Date(date.getFullYear(), date.getMonth(), 1);
   const endOfQuarter = new Date(date.getFullYear(), date.getMonth() + 3, 0);

   return {
      startOfQuarter,
      endOfQuarter,
   }
};
