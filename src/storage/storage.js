import AsyncStorage from '@react-native-community/async-storage';
import Storage from 'react-native-storage';

const storage = new Storage({
  size: 2,
  storageBackend: AsyncStorage,
  enableCache: true,
  sync: {
    async getProducts() {
      const response = await fetch('https://raw.githubusercontent.com/phongca22/tam-store/main/NhapTuExcel-Copy.xls');
      return response.arrayBuffer();
    }
  }
});



export default storage;
