import React from 'react';
import { View } from 'react-native';
import { Button, Dialog, Portal, Subheading, Title } from 'react-native-paper';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { connect } from 'react-redux';
import ProductForm from './product-form';
import ProductInfo from './product-info';

const Scanner = (props) => {
  const [visible, setVisible] = React.useState(false);
  const [visibleX, setVisibleX] = React.useState(false);
  const [product, setProduct] = React.useState(null);
  const [code, setCode] = React.useState('');
  const hideDialog = () => setVisible(false);
  const [closed, setClosed] = React.useState(null);

  onSuccess = (e) => {
    find(e.data);
    setCode(e.data);
  };

  find = (data) => {
    const result = props.products.find((p) => p.code === data);
    setProduct(result);
    setVisible(true);
  };

  showProductForm = () => {
    setVisible(false);
    setVisibleX(true);
  };

  React.useEffect(() => {
    setVisibleX(false);
  }, [closed]);

  return (
    <View style={{ flex: 1, flexDirection: 'column' }}>
      {props.route.key === 'scan' && !visible && !visibleX ? (
        <QRCodeScanner onRead={onSuccess} showMarker={true} />
      ) : (
        <></>
      )}
      <ProductForm visible={visibleX} code={code} update={setClosed} />
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Content>
            {props.products.length === 0 ? <Title>Chưa nhập dữ liệu</Title> : <></>}
            {props.products.length > 0 && product ? <ProductInfo data={product} /> : <></>}
            {props.products.length > 0 && !product ? (
              <View>
                <Subheading style={{ textAlign: 'center' }}>Không tìm thấy sản phẩm</Subheading>
                <Title style={{ textAlign: 'center' }}>{code}</Title>
                <Button mode="contained" onPress={showProductForm} style={{ marginTop: 8 }}>
                  Thêm mới
                </Button>
              </View>
            ) : (
              <></>
            )}
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
