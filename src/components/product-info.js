import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Button,
  Card,
  Divider,
  Modal,
  Portal,
  Subheading,
  Surface,
  TextInput,
  Title,
  withTheme
} from 'react-native-paper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import storage from '../storage/storage';
import { setProducts } from '../stores/actions';

const ProductInfo: () => React$Node = (props) => {
  const format = (data) => {
    return data ? data.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') : '';
  };

  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [price, setPrice] = React.useState(props.data.price + '');
  const [cost, setCost] = React.useState(props.data.historicalCost + '');
  const [code, setCode] = React.useState(props.data.code);
  const [name, setName] = React.useState(props.data.name);

  const update = () => {
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
  };

  return (
    <Surface style={styles.surface}>
      <Title style={styles.productName} onPress={showModal}>{props.data.name}</Title>
      <Divider style={{ marginTop: 32, marginBottom: 32 }}></Divider>
      <Title style={styles.productPrice} onPress={showModal}>
        {format(props.data.price)}
      </Title>
      <Subheading style={styles.historicalCost} onPress={showModal}>{format(props.data.historicalCost)}</Subheading>
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
                Cập nhật
              </Button>
            </Card.Actions>
          </Card>
        </Modal>
      </Portal>
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
