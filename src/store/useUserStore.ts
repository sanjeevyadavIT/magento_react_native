import createPersistentStore from './createPersistentStore';

type UserState = {
  userToken: string | undefined;
}

type UserAction = {
  login: (token: string) => void;
  logout: () => void;
}

const useUserStore = createPersistentStore<UserState & UserAction>({
  storeInitializer: (set, get) => ({
    userToken: undefined,
    login: (token: string) => set({userToken: token}),
    logout: () => set({userToken: undefined}),
  }),
  persistStoreName: 'user-store',
});

export default useUserStore;
