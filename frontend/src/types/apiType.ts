export type SignUpResponseT = {
  message: string;
};

export type SignUpVerifyResponseT = {
  token: string;
  user: {
    id: string;
    email: string;
    name: string | null;
    dob: string;
    createdAt: string;
    updatedAt: string;
  };
};

export type LoginResponseT = SignUpResponseT;
export type LoginVerifyResponseT = SignUpVerifyResponseT;

export type UserT = {
  id: string;
  email: string;
  name: string | null;
  dob: string;
  createdAt: string;
  updatedAt: string;
};

export type Note = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  content: string | null;
  userId: string;
};
