import React, { useState } from 'react';
import { Appbar, Divider, Menu } from 'react-native-paper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setTheme } from '../stores/actions';
import FileExport from './file-export';
import FileImport from './file-import';
import ProductAdd from './product-add';
import ThemeSwitcher from './theme-switcher';

const HeaderAction = (props) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const close = () => {
    setMenuVisible(false);
  };

  return (
    <>
      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={<Appbar.Action icon="dots-vertical" onPress={() => setMenuVisible(true)} color="#fff" />}
      >
        <ProductAdd close={close} />
        <Divider />
        <FileImport close={close} />
        <FileExport close={close} />
        <Divider />
        <ThemeSwitcher close={close} />
      </Menu>
    </>
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
      setTheme: setTheme
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(HeaderAction);
