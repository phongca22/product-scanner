import React from 'react';
import { View, VirtualizedList } from 'react-native';
import ProductInfo from './product-info';

const ProductList: () => React$Node = (props) => {
  const getItem = (data, index) => props.data[index];
  const getItemCount = (data) => props.data.length;

  renderItem = ({ item }) => {
    return (
      <View style={{ paddingLeft: 16, paddingRight: 16, paddingBottom: 16, }}>
        <ProductInfo data={item} />
      </View>
    );
  };

  return (
    <View style={{ flex: 1, paddingBottom: 8 }}>
      <VirtualizedList
        style={{ paddingTop: 8 }}
        data={props.data}
        initialNumToRender={3}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        getItemCount={getItemCount}
        getItem={getItem}
      />
    </View>
  );
};

export default ProductList;
