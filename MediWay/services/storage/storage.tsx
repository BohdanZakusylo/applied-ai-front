import { MMKV, Mode } from 'react-native-mmkv';
import { ENCRYPTION_DB_KEY } from '@env';

export const secureStorage = new MMKV({
    id: 'jwt-storage',
    encryptionKey: ENCRYPTION_DB_KEY,
    mode: Mode.MULTI_PROCESS,
});
