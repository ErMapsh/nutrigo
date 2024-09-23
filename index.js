/**
 * @format
 */

import {AppRegistry, SafeAreaView, Text} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {PaperProvider} from 'react-native-paper';
import StoreProvider from './src/utils/StoreProvider';
import store from './src/redux/store';
import Themeprovider from './src/utils/Themeprovider';
import { AlertNotificationRoot } from 'react-native-alert-notification';

const RootApp = () => (
  <StoreProvider store={store}>
    <AlertNotificationRoot>
      <Themeprovider>
        <App />
      </Themeprovider>
    </AlertNotificationRoot>
  </StoreProvider>
);

AppRegistry.registerComponent(appName, () => RootApp);
