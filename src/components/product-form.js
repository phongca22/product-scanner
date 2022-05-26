import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Card, Modal, Portal, Subheading, TextInput } from 'react-native-paper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import storage from '../storage/storage';
import { setProducts, showMessage } from '../stores/actions';

const ProductForm = (props) => {
  const [visible, setVisible] = React.useState(false);
  const [price, setPrice] = React.useState();
  const [cost, setCost] = React.useState();
  const [code, setCode] = React.useState();
  const [name, setName] = React.useState();
  const [error, setError] = React.useState('');
  const hideModal = () => {
    setVisible(false);
    setError('');
    if (props.update) {
      props.update(new Date());
    }
  };

  const create = () => {
    const existed = props.products.find((p) => p.code === code);
    if (existed) {
      setError('Mã sản phẩm đã tồn tại');
      return;
    }

    props.products.push({
      code: code,
      name: name,
      price: price,
      historicalCost: cost
    });
    setProducts(props.products);
    storage.save({
      key: 'products',
      data: props.products
    });
    hideModal();
    props.showMessage('Đã thêm mới');
  };

  const update = () => {
    const existed = props.products.find((p) => p.code === code && p.id !== props.data.id);
    if (existed) {
      setError('Mã sản phẩm đã tồn tại');
      return;
    }

    const result = props.products.find((p) => p.code === props.data.code);
    result.name = name;
    result.code = code;
    result.price = price;
    result.historicalCost = cost;
    setProducts(props.products);
    storage.save({
      key: 'products',
      data: props.products
    });
    hideModal();
    props.showMessage('Đã cập nhật');
  };

  React.useEffect(() => {
    setVisible(props.visible);
    setName(props.data ? props.data.name : '');
    setCode(props.data ? props.data.code.toString() : props.code);
    setPrice(props.data ? props.data.price.toString() : '');
    setCost(props.data ? props.data.historicalCost.toString() : '');
  }, [props.visible, props.code, props.data]);

  return (
    <>
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
          <Card>
            <Card.Content>
              <Subheading style={{ color: 'red' }}>{error}</Subheading>
              <TextInput
                label="Tên sản phẩm"
                value={name}
                mode="outlined"
                onChangeText={(a) => setName(a)}
                style={{ marginBottom: 8 }}
              />
              <TextInput
                label="Mã"
                value={code}
                mode="outlined"
                onChangeText={(a) => setCode(a)}
                style={{ marginBottom: 8 }}
              />
              <TextInput
                label="Giá bán"
                value={price}
                mode="outlined"
                onChangeText={(a) => setPrice(a)}
                style={{ marginBottom: 8 }}
              />
              <TextInput
                label="Giá gốc"
                value={cost}
                mode="outlined"
                onChangeText={(a) => setCost(a)}
                style={{ marginBottom: 8 }}
              />
            </Card.Content>
            <Card.Actions style={styles.action}>
              <Button color="" onPress={hideModal}>
                Đóng
              </Button>
              <Button mode="contained" style={{ marginLeft: 16 }} onPress={() => (props.data ? update() : create())}>
                {props.data ? 'Cập nhật' : 'Thêm mới'}
              </Button>
            </Card.Actions>
          </Card>
        </Modal>
      </Portal>
    </>
  );
};

const styles = StyleSheet.create({
  action: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
    marginRight: 8,
    marginBottom: 16
  }
});

const mapStateToProps = (state) => {
  return {
    products: state.products
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setProducts: setProducts,
      showMessage: showMessage
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ProductForm);
