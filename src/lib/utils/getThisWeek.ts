export const getThisWeek = () => {
   const date = new Date();

   const startOfWeek = new Date(date.getFullYear(), date.getMonth(), (date.getDate() - date.getDay()) +1 );
   const endOfWeek = new Date(date.getFullYear(), date.getMonth(), (date.getDate() - date.getDay()) + 7);

  return {
    startOfWeek,
    endOfWeek,
  };
};

