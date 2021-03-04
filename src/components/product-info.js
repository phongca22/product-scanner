import React from 'react';
import { StyleSheet } from 'react-native';
import { Divider, Surface, Title, withTheme } from 'react-native-paper';

const ProductInfo: () => React$Node = (props) => {
  const format = (data) => {
    return data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  };

  return (
    <Surface style={styles.surface}>
      <Title style={styles.productName}>{props.data.name}</Title>
      <Divider style={{ marginTop: 32, marginBottom: 32 }}></Divider>
      <Title style={styles.productPrice}>{format(props.data.price)}</Title>
    </Surface>
  );
};

const styles = StyleSheet.create({
  surface: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 32,
    paddingBottom: 32,
    elevation: 4
  },
  productName: {
    fontSize: 30,
    lineHeight: 30,
    textAlign: 'center'
  },
  productPrice: {
    color: '#2196f3',
    fontSize: 46,
    lineHeight: 46,
    textAlign: 'center'
  }
});

export default withTheme(ProductInfo);
