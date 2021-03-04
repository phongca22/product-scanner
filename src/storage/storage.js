import AsyncStorage from '@react-native-community/async-storage';
import Storage from 'react-native-storage';

const storage = new Storage({
  size: 1,
  storageBackend: AsyncStorage,
  enableCache: true
});

export default storage;
