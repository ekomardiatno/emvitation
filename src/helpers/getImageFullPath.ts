import { APP_API_URL } from '../config';

export default function getImageFullPath(imagePath: string): string {
  return `${APP_API_URL}/file?filePath=${imagePath}`;
}
