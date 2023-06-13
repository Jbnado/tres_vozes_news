type UserModel = {
  id: string;
  name: string;
  birth_date: string;
  email: string;
  cpf: string;
  password: string;
  admin: boolean;
  created_at: string;
  updated_at: string;
};

type UserCreateModel = {
  name: string;
  birth_date: string;
  email: string;
  cpf: string;
  password: string;
  admin: boolean;
};

export { type UserModel, type UserCreateModel }