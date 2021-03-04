import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import Main from './src/main';
import store from './src/stores';

const App: () => React$Node = (props) => {
  return (
    <ReduxProvider store={store}>
      <Main />
    </ReduxProvider>
  );
};

export default App;
