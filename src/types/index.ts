export type TUser = {
    name: string;
    email: string;
    phone: string;
    role: string;
    password: string;
    address: string;
    image: string;
  };
  
  export type TAutState = {
    user: null | object;
    token: null | string;
  };