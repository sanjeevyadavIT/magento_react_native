import {create, StateCreator} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer'
import AsyncStorage from '@react-native-async-storage/async-storage';

interface GetStoreCreatorTypes<T> {
  storeInitializer: StateCreator<T, [["zustand/persist", unknown], ["zustand/immer", never]]>;
  persistStoreName: string;
}

const createPersistentStore = <T>({
  storeInitializer,
  persistStoreName,
}: GetStoreCreatorTypes<T>) => {
  let createdStore = create<T>()(
    persist(immer(storeInitializer), {
      name: persistStoreName,
      storage: createJSONStorage(() => AsyncStorage),
    }),
  );

  return createdStore;
};

export default createPersistentStore;
