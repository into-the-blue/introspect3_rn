/**
 * @format
 */
import {Navigation} from 'react-native-navigation';
// import {AppRegistry} from 'react-native';
import './App';
// import {name as appName} from './app.json';
// Navigation.registerComponent('com.myApp.WelcomeScreen', () => App);
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'TaskList',
            },
          },
        ],
      },
    },
  });
});
