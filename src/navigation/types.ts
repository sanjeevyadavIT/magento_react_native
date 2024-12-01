export type BottomTabParamList = {
	Home: undefined;
	Categories: undefined;
	Cart: undefined;
};

export type RootStackParamList = {
	BottomTab?: {
		screen: keyof BottomTabParamList;
	};
	Profile: undefined;
	Login: undefined;
	Signup: undefined;
};