import React, { useState } from 'react';
import { Appbar, BottomNavigation, Provider as PaperProvider } from 'react-native-paper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FileExport from './components/file-export';
import FilePicker from './components/file-picker';
import ProductUpdate from './components/product-update';
import Scanner from './components/scanner';
import Search from './components/search';
import ThemeSwitcher from './components/theme-switcher';
import storage from './storage/storage';
import { setProducts, setTheme } from './stores/actions';
import { themes } from './theme';

const Main: () => React$Node = (props) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'scan', title: 'Quét Mã', icon: 'barcode-scan' },
    { key: 'search', title: 'Tìm Kiếm', icon: 'text-box-search-outline' }
  ]);

  const SearchRoute = () => <Search></Search>;
  const ScanRoute = ({ route, jumpTo }) => <Scanner route={route} />;
  const renderScene = BottomNavigation.SceneMap({
    search: SearchRoute,
    scan: ScanRoute
  });

  const tabChange = (index) => {
    setIndex(index);
  };

  storage
    .load({
      key: 'products',
      autoSync: false
    })
    .then((data) => props.setProducts(data))
    .catch((error) => console.error(error.message));

  storage
    .load({
      key: 'dark',
      autoSync: false
    })
    .then((data) => {
      if (data) {
        props.setTheme(themes.dark);
      } else {
        props.setTheme(themes.light);
      }
    })
    .catch((error) => console.error(error));

  return (
    <PaperProvider theme={props.theme}>
      <Appbar.Header>
        <Appbar.Content title="Tạp Hóa Nhung" />
        <ProductUpdate />
        <FilePicker />
        <FileExport />
        <ThemeSwitcher />
      </Appbar.Header>
      <BottomNavigation navigationState={{ index, routes }} onIndexChange={tabChange} renderScene={renderScene} />
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
