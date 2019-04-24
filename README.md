# MageCart : Magento 2 React Native project
This project is inspired from [troublediehard/magento-react-native](https://github.com/troublediehard/magento-react-native). MageCart is an e-commerce app for Magento 2.1 onwards. It consumes [Magento 2 REST API](https://devdocs.magento.com/guides/v2.3/get-started/rest_front.html) to display catalog, products, add products to cart and let you place order. Checkout [getting started](#getting-started) section for installation.

## Screenshots
<div style="display:flex;" >
  <img  src="screenshots/1.png" width="19%" >
  <img style="margin-left:10px;" src="screenshots/2.png" width="19%" >
  <img style="margin-left:10px;" src="screenshots/3.png" width="19%" >
  <img style="margin-left:10px;" src="screenshots/4.png" width="19%" >
  <img style="margin-left:10px;" src="screenshots/5.png" width="19%" >
</div>

## Getting Started

_Follow these instructions to build and run the project_

###### Magento Admin
1. System > User Roles > Add New role
2. Enter role name (Ex. Mobile) in 'Role Info' tab
3. Select Resource Access to 'All' under 'Role Resource' tab
4. Save Role
5. System > All users > Add New User
6. Enter username, password and other details in 'User Info' tab
7. Select newely created user role(Ex. mobile) in 'User Role' tab
8. Save User

###### React Native Project setup
1. Clone this repository.
2. Run `npm install`
3. Set Magento base url to url param in `src/config/magento.js`
4. Replace username and password in `magento.js` with above created username and password
5. `react-native run-ios` (for iOS) and `react-native run-android` (for Android)

###### Home screen setup
1. Go to Magento Admin
2. Content > Blocks > Add New Block
3. Put your config inside `Content` section ([config sample](src/config/cms_block_config.json))
4. save your block and put it's `ID` in `src/config/magento.js` to `home_cms_block_id` param


### Prerequisites

Basic knowledge of [React Native](https://facebook.github.io/react-native/), [Redux](https://redux.js.org/), [React Navigation](https://reactnavigation.org/) along with [Redux-Sagas](https://redux-saga.js.org/).There is tons of functionality to implement, checkout [Roadmap section](#roadmap). We follow [Git flow](https://www.youtube.com/watch?v=aJnFGMclhU8) for branch management.

## Contributing

###### Code 
If you are a developer and you wish to contribute to the app please fork the project
and submit a pull request on the [develop branch](https://github.com/alexakasanjeev/magento_react_native/tree/develop).

###### Issues
You can trace the status of known issues [here](https://github.com/alexakasanjeev/magento_react_native/issues),
also feel free to file a new issue (helpful description, screenshots and logcat are appreciated)

###### Translations
If you are able to contribute with a new translation of a missing language or if you want to improve an existing one, we greatly appreciate any suggestion!

###### Suggestion/Ideas
If you have a feature request or idea which will enhance the user experience of app or have better UI design, you can send it via [mail](mailto:sanjeevy133@protonmail.com) or create an issue with heading SUGGESTION.

## Roadmap

- [x] FEATURE: Display categories and products
- [x] FEATURE: Add to cart for simple and configurable product
- [x] FEATURE: Login and Signup Screen
- [ ] FEATURE: Show Prices in featured list on Home Screen.
- [ ] ISSUE: Price not getting shown for end products in Category list
- [ ] FEATURE: Show and update price for configurable product in Product detail screen.
- [ ] FEATURE: Billing Address screen
- [ ] FEATURE: Payment screen and checkout process
- [ ] FEATURE: Display description and other details in Product detail screen.
- [ ] FEATURE: Show Review screen for a product
- [ ] FEATURE: Add New Review screen
- [ ] FEATURE: My orders screen
- [ ] FEATURE: Add to wishlist functionality and whislist screen
- [ ] FEATURE: Show applicable filter in Category List screen
- [ ] FEATURE: Forgot password screen
- [ ] FEATURE: Screen to show bundle products
- [ ] FEATURE: Add to cart option for downloadable/virtual and bundle products
- [ ] ISSUE: Navigation drawer rerendering multiple times, without any state change

## Thanks

- [troublediehard/magento-react-native](https://github.com/troublediehard/magento-react-native) created by [Dmytro Portenko](https://github.com/troublediehard)

## Contact Me

Born in 1995, completed my graduation in Computer Engineering in 2018 along with [Udacity Android Nanodegree](https://in.udacity.com/course/android-developer-nanodegree-by-google--nd801). Loving technology, programming, reading and art.

If you have any questions or want to make friends with me, please feel free to contact me : [mailto](mailto:sanjeevy133@protonmail.com "Welcome to contact me")

## License

This project is licensed under the GNU v3 Public License License - see the [LICENSE.MD](LICENSE.MD) file for details

