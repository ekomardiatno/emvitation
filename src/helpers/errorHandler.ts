import { ApiError } from '../services/common';

export default function errorHandler(
  error: any,
  setErrorState:
    | React.Dispatch<React.SetStateAction<string | null>>
    | ((errorMsg: string) => void),
) {
  if (
    (error instanceof Error && error.message !== 'canceled') ||
    (error as ApiError).message
  ) {
    setErrorState((error as Error | ApiError).message || 'Unknown error.');
  }
}
