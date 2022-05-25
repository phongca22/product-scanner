import React from 'react';
import { StyleSheet } from 'react-native';
import { Divider, Subheading, Surface, Title, withTheme } from 'react-native-paper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setProducts } from '../stores/actions';
import ProductForm from './product-form';

const ProductInfo: () => React$Node = (props) => {
  const format = (data) => {
    return data ? data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : '';
  };

  const [visible, setVisible] = React.useState(false);
  const [closed, setClosed] = React.useState(false);
  const showModal = () => setVisible(true);

  React.useEffect(() => {
    setVisible(false);
  }, [closed]);

  return (
    <Surface style={styles.surface}>
      <Title style={styles.productName} onPress={showModal}>
        {props.data.name}
      </Title>
      <Divider style={{ marginTop: 32, marginBottom: 32 }} />
      <Title style={styles.productPrice} onPress={showModal}>
        {format(props.data.price)}
      </Title>
      <Subheading style={styles.historicalCost} onPress={showModal}>
        {format(props.data.historicalCost)}
      </Subheading>
      <ProductForm data={props.data} visible={visible} update={setClosed} />
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
  },
  historicalCost: {
    textAlign: 'right',
    fontSize: 25,
    lineHeight: 25
  },
  action: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8
  }
});

const mapStateToProps = (state) => {
  return {
    theme: state.theme,
    products: state.products
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setProducts: setProducts
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(ProductInfo));
