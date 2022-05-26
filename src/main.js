import React from 'react';
import { Appbar, Provider as PaperProvider } from 'react-native-paper';
import { PERMISSIONS, request } from 'react-native-permissions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import HeaderAction from './components/header-action';
import Message from './components/message';
import Navigation from './components/navigation';
import storage from './storage/storage';
import { setProducts, setTheme } from './stores/actions';
import { themes } from './theme';

const Main: () => React$Node = (props) => {
  request(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE);

  storage
    .load({
      key: 'products',
      autoSync: false
    })
    .then((data) => {
      ``;
      props.setProducts(data);
    })
    .catch((e) => console.error(e.message));

  storage
    .load({
      key: 'dark',
      autoSync: false
    })
    .then((b) => {
      if (b) {
        props.setTheme(themes.dark);
      } else {
        props.setTheme(themes.light);
      }
    })
    .catch((e) => props.setTheme(themes.light));

  return (
    <PaperProvider theme={props.theme}>
      <Appbar.Header>
        <Appbar.Content title="Tạp Hóa Nhung" />
        <HeaderAction />
      </Appbar.Header>
      <Navigation />
      <Message />
    </PaperProvider>
  );
};

const mapStateToProps = (state) => {
  return {
    theme: state.theme
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setProducts: setProducts,
      setTheme: setTheme
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Main);
