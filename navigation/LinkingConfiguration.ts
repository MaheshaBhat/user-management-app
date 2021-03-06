import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Contact: {
            screens: {
              ContactScreen: 'Contact',
            },
          },
          Home: {
            screens: {
              HomeScreen: 'Home',
            },
          },
          Setting: {
            screens: {
              SettingScreen: 'Setting',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
