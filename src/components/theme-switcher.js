import React from 'react';
import { Appbar } from 'react-native-paper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import storage from '../storage/storage';
import { setTheme } from '../stores/actions';
import { themes } from '../theme';

const ThemeSwitcher: () => React$Node = (props) => {
  const toggle = () => {
    if (props.theme.isDark) {
      props.setTheme(themes.light);
    } else {
      props.setTheme(themes.dark);
    }

    storage.save({
      key: 'dark',
      data: !props.theme.isDark
    });
  };
  return (
    <>
      <Appbar.Action
        icon={props.theme.isDark ? 'moon-waning-crescent' : 'white-balance-sunny'}
        onPress={toggle}
        color="#fff"
      />
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

export default connect(mapStateToProps, mapDispatchToProps)(ThemeSwitcher);
