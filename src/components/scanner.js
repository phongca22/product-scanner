import React, { useState } from 'react';
import { View } from 'react-native';
import { Dialog, Portal, Title } from 'react-native-paper';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { connect } from 'react-redux';
import ProductInfo from './product-info';

const Scanner: () => React$Node = (props) => {
  const [visible, setVisible] = useState(false);
  const [product, setProduct] = useState(null);
  const [enable, setEnable] = useState(false);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);

  onSuccess = (e) => {
    find(e.data);
  };

  find = (code) => {
    const result = props.products.find((p) => p.code === code);
    setProduct(result);
    setVisible(true);
  };

  return (
    <View style={{ flex: 1, flexDirection: 'column' }}>
      {props.route.key === 'scan' && !visible ? <QRCodeScanner onRead={onSuccess} showMarker={true} /> : <></>}
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Content>
            {props.products.length === 0 ? <Title>Vui lòng nhập dữ liệu và thử lại</Title> : <></>}
            {props.products.length > 0 && product ? <ProductInfo data={product} /> : <></>}
          </Dialog.Content>
        </Dialog>
      </Portal>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    products: state.products
  };
};

export default connect(mapStateToProps)(Scanner);
