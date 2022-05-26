import React from 'react';
import { Menu } from 'react-native-paper';
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

    props.close();
  };
  return (
    <Menu.Item
      icon={props.theme.isDark ? 'white-balance-sunny' : 'moon-waning-crescent'}
      onPress={toggle}
      title={props.theme.isDark ? 'Chế độ sáng' : 'Chế độ tối'}
    />
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
