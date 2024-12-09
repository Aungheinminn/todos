export type NotificationType = {
  _id?: string;
  type: string;
  user_id: string;
  status: string;
  from: {
    email: string;
    name: string;
  };
  content: any;
};
