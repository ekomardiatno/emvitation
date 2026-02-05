import { PermissionsAndroid, Platform } from "react-native"

/// grant permission in android
export const getDownloadPermissionAndroid = async (): Promise<boolean> => {
  if(Platform.OS !== 'android') return true
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'File Download Permission',
        message: 'Your permission is required to save Files to your device',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) return true;
    return false
  } catch (err) {
    console.log('err', err);
    return false
  }
};