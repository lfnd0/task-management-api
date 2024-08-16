export type CreateUserDTO = {
  name: string;
  username: string;
  email: string;
  password: string;
};

export type UserCreatedDTO = Omit<CreateUserDTO, 'password'> & {
  id: string;
  created_at: Date;
  updated_at: Date | null;
  password_hash: string;
};
