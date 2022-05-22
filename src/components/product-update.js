/* eslint-disable react/jsx-no-undef */
import React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar, Button, Card, Modal, Portal, TextInput } from 'react-native-paper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import storage from '../storage/storage';
import { setProducts } from '../stores/actions';

const ProductUpdate: () => React$Node = (props) => {
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [price, setPrice] = React.useState('');
  const [cost, setCost] = React.useState('');
  const [code, setCode] = React.useState('');
  const [name, setName] = React.useState('');
  const update = () => {
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
  };

  return (
    <>
      <Appbar.Action icon="plus" onPress={showModal} color="#fff" />
      <Portal>
        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
          <Card>
            <Card.Content>
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
                Hủy
              </Button>
              <Button style={{ marginLeft: 8 }} onPress={update}>
                Thêm mới
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
    marginTop: 8
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
      setProducts: setProducts
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ProductUpdate);
