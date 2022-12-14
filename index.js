/**
 * @format
 */

import {AppRegistry} from 'react-native';
import { Provider } from 'react-redux';
import App from './src/App';
import {name as appName} from './app.json';
import store from './src/redux/store';

const CardFlipApp = ()=>{
  return(
    <Provider store={store}>
      <App />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => CardFlipApp);
