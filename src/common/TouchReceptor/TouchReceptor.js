import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
} from 'react-native';

const TouchReceptor =
  Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

export default TouchReceptor;
