import React from 'react';
import { View } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import FrontScreen from '../screens/FrontScreen';
import CommentList from '../components/CommentList';
import ShowScreen from '../screens/ShowScreen';

// import Tab1Details from './Tabs/Tab1Details';
// import Tab2Screen from './Tabs/Tab2Screen';
// import CustomHeader from '../../components/CustomHeader';
// import HeaderStyles from '../../headerStyles';

const Tab1 = createStackNavigator({
  Tab1: {
    screen: FrontScreen,
    navigationOptions: {
      headerLeft: null,
      headerTitle: 'Front Page',
    },
  },
  CommentList: {
    screen: CommentList,
    navigationOptions: {
      headerTitle: 'Comments',
    },
  },
});

const Tab2 = createStackNavigator({
  Tab2: {
    screen: ShowScreen,
    navigationOptions: {
      headerLeft: null,
      headerTitle: 'Show Page',
    },
  },
  CommentList: {
    screen: CommentList,
    navigationOptions: {
      headerTitle: 'Comments',
    },
  },
});

const DashboardTabRoutes = createBottomTabNavigator(
  {
    Tab1,
    Tab2,
  },
  {
    initialRouteName: 'Tab1',
    navigationOptions: ({ navigation }) => {
      const { routeName, routes } = navigation.state;
      const params = routes && routes[1] && routes[1].params;
      return {
        tabBarIcon: ({ focused, tintColor }) => {
          const { routeName } = navigation.state;
          let iconName;
          if (routeName === 'Tab1') {
            iconName = `ios-information-circle${focused ? '' : '-outline'}`;
          } else if (routeName === 'Tab2') {
            iconName = `ios-options${focused ? '' : '-outline'}`;
          }

          // You can return any component that you like here! For demo we use an
          // icon component from react-native-vector-icons
          return <Ionicons name={iconName} size={25} color={tintColor} />;
        },
        tabBarVisible: params && params.hideTabBar != null ? !params.hideTabBar : true,
        swipeEnabled: params && params.hideTabBar != null ? !params.hideTabBar : true,
      };
    },
    tabBarOptions: {
      activeTintColor: '#6200EE',
      inactiveTintColor: '#858585',
      style: {
        height: 60,
        paddingVertical: 5,
        backgroundColor: '#fff',
      },
      labelStyle: {
        fontSize: 12,
        lineHeight: 20,
      },
    },
    tabBarPosition: 'bottom',
  },
);

export default DashboardTabRoutes;
