export type UserInfo = {
  email: string;
  userName: string;
};

export type Login = {
  email: string;
  password: string;
};

export type Register = {
  email: string;
  password: string;
};

export type Address = {
  name: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};
