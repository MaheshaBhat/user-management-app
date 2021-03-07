import {
  DefaultTheme,
  DarkTheme,
  Theme
} from '@react-navigation/native';

const tintColorLight = '#ff7d7b';
const tintColorDark = '#ff65a4';


const light = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: '#000',
    background: '#fff',
    primaryColor: '#ff7d7b',
    secondaryColor: "#ff65a4",
    tint: tintColorLight,
    border: '#edebec',
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  }
};
const dark = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    text: '#fff',
    background: '#000',
    primaryColor: '#ff7d7b',
    secondaryColor: "#ff65a4",
    border: '#edebec',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  }
};

export type colorType = typeof light | typeof dark;

export default {
  light, dark
};
