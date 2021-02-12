export interface User {
  _id?: string;
  name: string;
  surname: string;
  email: string;
  password?: string;
  age?: string;
  location?: string;
  phoneNumber?: string;
  video?: string;
  image?: string;
  skills?: Array<{ _id: string, name: string }>;
  
}
