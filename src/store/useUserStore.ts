import createPersistentStore from './createPersistentStore';

interface UserStore {
  userToken: string | undefined;
  login: (token: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
}

const useUserStore = createPersistentStore<UserStore>({
  storeInitializer: (set, get) => ({
    userToken: undefined,
    login: (token: string) => set({userToken: token}),
    logout: () => set({userToken: undefined}),
    isLoggedIn: () => !!get().userToken,
  }),
  persistStoreName: 'user-store',
});

export default useUserStore;
