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

const RootApp = () => (
  <StoreProvider store={store}>
    <Themeprovider>
      <App />
    </Themeprovider>
  </StoreProvider>
);

AppRegistry.registerComponent(appName, () => RootApp);
