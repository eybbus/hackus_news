import { Dimensions, Platform } from 'react-native';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');
const { OS } = Platform;

export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
  dropDownOptions: ['New', 'Day', 'Week', 'Month', 'Year', 'All time'],
  dropDownMarginTop: OS === 'ios' ? 0 : -25,
};
