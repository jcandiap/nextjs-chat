export type LoginForm = {
  email: string;
  password: string;
}

export type AuthStore = {
  logout: () => void;
  login: (logingData:LoginForm) => void;
  authUser: any;
  isLoggingIn: boolean;
  signup: (data:any) => void,
  isSigningUp: boolean,
  isUpdatingProfile: boolean,
  updateProfile: (data:any) => void
};