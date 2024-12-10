export type LinkedUserType = {
  _id: string;
  primary_user: {
    id: string;
    email: string;
    username: string;
  };
  linked_user: {
    id: string;
    email: string;
    username: string;
  };
  status: string;
  created_at: string;
};
