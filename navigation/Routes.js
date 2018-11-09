import React from 'react';
import { View } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import FrontScreen from '../screens/FrontScreen';
import CommentList from '../components/CommentList';
import ShowScreen from '../screens/ShowScreen';
import AskScreen from '../screens/AskScreen';
import JobsScreen from '../screens/JobsScreen';
import Color from '../constants/Colors';

const Front = createStackNavigator({
  Front: {
    screen: FrontScreen,
    navigationOptions: {
      headerLeft: null,
      headerTitle: 'Front Page',
      headerStyle: {
        backgroundColor: Color.headerBackground,
      },
    },
  },
  CommentList: {
    screen: CommentList,
    navigationOptions: {
      headerTitle: 'Comments',
      headerStyle: {
        backgroundColor: Color.headerBackground,
      },
    },
  },
});

const Show = createStackNavigator({
  Show: {
    screen: ShowScreen,
    navigationOptions: {
      headerLeft: null,
      headerTitle: 'Show Page',
      headerStyle: {
        backgroundColor: Color.headerBackground,
      },
    },
  },
  CommentList: {
    screen: CommentList,
    navigationOptions: {
      headerTitle: 'Comments',
      headerStyle: {
        backgroundColor: Color.headerBackground,
      },
    },
  },
});

const Ask = createStackNavigator({
  Ask: {
    screen: AskScreen,
    navigationOptions: {
      headerLeft: null,
      headerTitle: 'Ask HN',
      headerStyle: {
        backgroundColor: Color.headerBackground,
      },
    },
  },
  CommentList: {
    screen: CommentList,
    navigationOptions: {
      headerTitle: 'Comments',
      headerStyle: {
        backgroundColor: Color.headerBackground,
      },
    },
  },
});

const Jobs = createStackNavigator({
  Jobs: {
    screen: JobsScreen,
    navigationOptions: {
      headerLeft: null,
      headerTitle: 'Ask HN',
      headerStyle: {
        backgroundColor: Color.headerBackground,
      },
    },
  },
});

// Creates the Bottom tabs
const DashboardTabRoutes = createBottomTabNavigator(
  {
    Front,
    Show,
    Ask,
    Jobs,
  },
  {
    initialRouteName: 'Front',
    navigationOptions: ({ navigation }) => {
      const { routeName, routes } = navigation.state;
      const params = routes && routes[1] && routes[1].params;
      return {
        tabBarIcon: ({ focused, tintColor }) => {
          const { routeName } = navigation.state;
          let iconName;
          if (routeName === 'Front') {
            iconName = `ios-information-circle${focused ? '' : '-outline'}`;
          } else if (routeName === 'Show') {
            iconName = `ios-options${focused ? '' : '-outline'}`;
          } else if (routeName === 'Ask') {
            iconName = `ios-options${focused ? '' : '-outline'}`;
          } else if (routeName === 'Jobs') {
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
      activeTintColor: Color.tabIconSelected,
      inactiveTintColor: Color.tabIconDefault,
      style: {
        height: 60,
        paddingVertical: 5,
        backgroundColor: Color.tabBar,
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
