import ImageColor from 'react-native-image-colors';

interface AndroidImageColors {
  dominant?: string;
  average?: string;
  vibrant?: string;
  darkVibrant?: string;
  lightVibrant?: string;
  darkMuted?: string;
  lightMuted?: string;
  muted?: string;
  platform: 'android';
}

interface IOSImageColors {
  background: string;
  primary: string;
  secondary: string;
  detail: string;
  platform: 'ios';
}

const getImageColors = async (url: string) => {
  const res = await ImageColor.getColors(url, {cache: true});
  const platform = res.platform;
};
