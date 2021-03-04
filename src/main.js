import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useState } from 'react';
import 'react-native-gesture-handler';
import { Appbar, List, Provider as PaperProvider } from 'react-native-paper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FilePicker from './components/file-picker';
import Scanner from './components/scanner';
import Search from './components/search';
import ThemeSwitcher from './components/theme-switcher';
import storage from './storage/storage';
import { setProducts, setTheme } from './stores/actions';
import { themes } from './theme';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const Main: () => React$Node = (props) => {
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  storage
    .load({
      key: 'products',
      autoSync: true,
      defaultExpires: 1000
    })
    .then((data) => props.setProducts(data))
    .catch(async (error) => {
      // const filename = `${RNF.DocumentDirectoryPath}/test.xls`;
      // RNF.downloadFile({
      //   fromUrl: 'https://raw.githubusercontent.com/phongca22/tam-store/main/NhapTuExcel-Copy.xls',
      //   toFile: filename
      // })
      //   .promise.then((r) => {
      //     RNF.readFile(filename, 'ascii').then((file) => {
      //       const workbook = XLSX.read(file, { type: 'binary' });
      //       var first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
      //       var result = XLSX.utils.sheet_to_json(first_worksheet, {
      //         header: 1
      //       });
      //     });
      //   })
      //   .catch((e) => console.log(e));
    });

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
    .catch(() => {});

  const CustomNavigationBar = ({ route, navigation }) => (
    <Appbar.Header>
      {route.name === 'search' ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
      {route.name === 'scan' ? (
        <Appbar.Action icon="menu" onPress={() => navigation.openDrawer()} color="white" />
      ) : null}
      <Appbar.Content title="Tạp Hóa Nhung" />
      {route.name === 'scan' ? <Appbar.Action icon="magnify" onPress={() => navigation.navigate('search')} /> : null}
    </Appbar.Header>
  );

  const goToSearch = () => {};
  const searchWrapper = (props) => (
    <>
      <CustomNavigationBar {...props} />
      <Search />
    </>
  );
  const scanWrapper = (props) => (
    <>
      <CustomNavigationBar {...props} />
      <Scanner />
    </>
  );

  const CustomDrawerContent = (props) => {
    return (
      <DrawerContentScrollView {...props} style={{ marginTop: 32 }}>
        <List.Item
          title="Quét mã"
          onPress={() => props.navigation.navigate('scan')}
          left={() => <List.Icon icon="barcode-scan" />}
        />
        <List.Item
          title="Tìm kiếm"
          onPress={() => props.navigation.navigate('search')}
          left={() => <List.Icon icon="magnify" />}
        />
        <FilePicker {...props} />
        <ThemeSwitcher {...props} />
      </DrawerContentScrollView>
    );
  };

  return (
    <PaperProvider theme={props.theme}>
      <NavigationContainer theme={props.theme.navigation}>
        <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />} edgeWidth={0}>
          <Drawer.Screen name="scan" component={scanWrapper} />
          <Drawer.Screen name="search" title="Tìm kiếm" component={searchWrapper} />
        </Drawer.Navigator>
      </NavigationContainer>
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
