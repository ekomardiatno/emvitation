export type ProfileType = {
  data: {
    name: string | null;
    phone: string | null;
  };
  isLoading: boolean;
  error: string | null;
};
