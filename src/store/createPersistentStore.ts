import {create, StateCreator} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface GetStoreCreatorTypes<T> {
  storeInitializer: StateCreator<T>;
  persistStoreName: string;
}

const createPersistentStore = <T>({
  storeInitializer,
  persistStoreName,
}: GetStoreCreatorTypes<T>) => {
  let createdStore = create(
    persist(storeInitializer, {
      name: persistStoreName,
      storage: createJSONStorage(() => AsyncStorage),
    }),
  );

  return createdStore;
};

export default createPersistentStore;
