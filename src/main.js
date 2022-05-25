import React from 'react';
import { Appbar, Provider as PaperProvider } from 'react-native-paper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FileExport from './components/file-export';
import FilePicker from './components/file-picker';
import Message from './components/message';
import Navigation from './components/navigation';
import ProductAdd from './components/product-add';
import ThemeSwitcher from './components/theme-switcher';
import storage from './storage/storage';
import { setProducts, setTheme } from './stores/actions';
import { themes } from './theme';

const Main: () => React$Node = (props) => {
  storage
    .load({
      key: 'products',
      autoSync: false
    })
    .then((data) => {
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
    .catch((e) => console.error(e));

  return (
    <PaperProvider theme={props.theme}>
      <Appbar.Header>
        <Appbar.Content title="Tạp Hóa Nhung" />
        <ProductAdd />
        <FilePicker />
        <FileExport />
        <ThemeSwitcher />
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
