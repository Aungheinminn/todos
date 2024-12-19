export type NotificationType = {
  _id?: string;
  type: string;
  to: {
    id: string;
    email: string;
    username: string;
  };
  status: string;
  from: {
    id: string;
    email: string;
    username: string;
  };
  content: any;
  last_seen: string;
};
