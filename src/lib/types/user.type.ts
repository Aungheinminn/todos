export type UserType = {
  _id?: string;
  refId?: string;
  username: string;
  email: string;
  icon: string | null;
};

export type UserMinimalDetails = Omit< UserType, "refId">
