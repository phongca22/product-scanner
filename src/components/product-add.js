import React from 'react';
import { Appbar, withTheme } from 'react-native-paper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setProducts } from '../stores/actions';
import ProductForm from './product-form';

const ProductAdd = (props) => {
  const [visible, setVisible] = React.useState(false);
  const [closed, setClosed] = React.useState(false);
  const showModal = () => setVisible(true);

  React.useEffect(() => {
    setVisible(false);
  }, [closed]);

  return (
    <>
      <Appbar.Action icon="plus" onPress={showModal} color="#fff" />
      <ProductForm visible={visible} update={setClosed} />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
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

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(ProductAdd));
