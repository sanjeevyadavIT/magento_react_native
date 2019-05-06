import { NavigationActions } from 'react-navigation';

let navigator;

function setTopLevelNavigator(navigatorRef) {
  navigator = navigatorRef;
}

function navigate(routeName, params) {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  );
}

function popToTop() {
  navigator._navigation.popToTop();
}

// add other navigation functions that you need and export them

export default {
  navigate,
  popToTop,
  setTopLevelNavigator,
};
