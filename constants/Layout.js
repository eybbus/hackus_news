import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
  dropDownOptions: ['New', 'Day', 'Week', 'Month', 'Year', 'All time'],
};
