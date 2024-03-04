export type AuthObjectType = {
  user: UserType | null;
  signUp: (email: string, password: string, username: string) => void;
  signIn: (username: string, password: string) => void;
  signOut: () => void;
  triggerResetEmail: (email: string) => void;
};
export type UserType = {
  email: string;
  id: number;
  roles: string[];
  username: string;
};
