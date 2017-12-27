/**
 * Metrics and calculations
 * @flow
 */
import { Dimensions, Platform, StatusBar } from 'react-native';
import ExtraDimensions from 'react-native-extra-dimensions-android';

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 667;
const { width, height } = Dimensions.get('window');
const statusBar = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;
const header = Platform.OS === 'ios' ? 44 : 56;
const profileTabHeight = 44;
const softMenu =
  Platform.OS === 'android' ? ExtraDimensions.get('SOFT_MENU_BAR_HEIGHT') : 0;
const tabHeight = Platform.OS === 'android' ? 40 : 30;
const subMenuHeight = 50;

// Horizontal scaling of application
export const hs = size => width / guidelineBaseWidth * size;
// Vertical scaling of application
export const vs = size => height / guidelineBaseHeight * size;

export default {
  statusBar,
  header,
  subMenuHeight,
  navBarHeight: statusBar + header,
  screenWidth: width,
  screenHeight: height,
  softMenu,
  tabHeight,
  profileTabHeight,
};
