export type ProfileType = {
  data: {
    name: string | null;
    email: string | null;
  };
  isLoading: boolean;
  error: string | null;
};
