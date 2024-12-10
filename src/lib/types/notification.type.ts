export type NotificationType = {
  _id?: string;
  type: string;
  to:{
    id: string;
    email: string;
    name: string;
  };
  status: string;
  from: {
    id: string;
    email: string;
    name: string;
  };
  content: any;
};
