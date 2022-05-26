import React, { useState } from 'react';
import { BottomNavigation } from 'react-native-paper';
import Scanner from './scanner';
import Search from './search';

const Navigation = (props) => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'scan', title: 'Quét Mã', icon: 'barcode-scan' },
    { key: 'search', title: 'Tìm Kiếm', icon: 'text-box-search-outline' }
  ]);

  const SearchRoute = () => <Search />;
  const ScanRoute = ({ route, jumpTo }) => <Scanner route={route} />;
  const renderScene = BottomNavigation.SceneMap({
    search: SearchRoute,
    scan: ScanRoute
  });

  const tabChange = (data) => {
    setIndex(data);
  };

  return <BottomNavigation navigationState={{ index, routes }} onIndexChange={tabChange} renderScene={renderScene} />;
};

export default Navigation;
