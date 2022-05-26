import React from 'react';
import { Menu, withTheme } from 'react-native-paper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setProducts } from '../stores/actions';
import ProductForm from './product-form';

const ProductAdd = (props) => {
  const [visible, setVisible] = React.useState(false);
  const [closed, setClosed] = React.useState(false);

  React.useEffect(() => {
    setVisible(false);
  }, [closed]);

  const close = () => {
    setClosed(true);
    props.close();
  };

  return (
    <>
      <Menu.Item
        icon="plus"
        onPress={() => {
          setVisible(true);
        }}
        title="Thêm sản phẩm"
      />
      <ProductForm visible={visible} update={close} />
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
