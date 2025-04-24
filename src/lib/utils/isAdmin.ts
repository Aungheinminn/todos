export const isAdmin = (
  currentUserId: string,
  transactionUserId: string,
  walletUserId: string,
) => {
  if (walletUserId === currentUserId) return true;
  if (transactionUserId === currentUserId) return true;
  return false;
};
