import {
  FlexStyle,
  TextStyle,
  ViewStyle,
  ImageStyle,
  StyleSheet,
  StyleProp,
} from 'react-native';
export const isDev = process.env.NODE_ENV === 'development';

type AllStyle = StyleProp<TextStyle | FlexStyle | ViewStyle | ImageStyle>;
export const flattenStyles = (...styles: AllStyle[] | AllStyle[][]) => {
  return StyleSheet.flatten(
    styles.map(s => (Array.isArray(s) ? StyleSheet.flatten(s) : s)),
  );
};
