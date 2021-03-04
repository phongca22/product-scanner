import React from 'react';
import DocumentPicker from 'react-native-document-picker';
import RNF from 'react-native-fs';
import { Appbar } from 'react-native-paper';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import XLSX from 'xlsx';
import storage from '../storage/storage';
import { setProducts } from '../stores/actions';

const FilePicker: () => React$Node = (props) => {
  openPicker = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.xls]
      });
      const file = await RNF.readFile(res.uri, 'base64');
      const workbook = XLSX.read(file, { type: 'base64' });
      var first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
      var result = XLSX.utils.sheet_to_json(first_worksheet, {
        header: 1
      });
      result.shift();
      const products = result.map((data) => ({
        id: data[0],
        code: data[1],
        name: data[2],
        price: data[3]
      }));
      props.setProducts(products);
      save(products);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  save = (data) => {
    storage.save({
      key: 'products',
      data: data
    });
  };

  return (
    <>
      <Appbar.Action icon="database-plus" onPress={openPicker} color="#fff" />
    </>
  );
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setProducts: setProducts
    },
    dispatch
  );

export default connect(null, mapDispatchToProps)(FilePicker);
