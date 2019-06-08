<hr>
<p align="center">
  <b>MAGECART IS CURRENTLY IN EARLY DEVELOPMENT, NOT READY TO BE USED!</b>
</p>
<hr>

# MageCart : Magento 2 React Native eCommerce App

[![Tweet](https://img.shields.io/twitter/url/https/shields.io.svg?style=social)](https://twitter.com/intent/tweet?url=https%3A%2F%2Fgithub.com%2Falexakasanjeev%2Fmagento_react_native&via=alexakasanjeev&text=MageCart%3A%20E-commerce%20app%20for%20Magento%202.x%20written%20in%20React%20Native) [![Slack](https://img.shields.io/badge/chat-on%20slack-informational.svg)](https://join.slack.com/t/magecart/shared_invite/enQtNjU5MTc5ODM4NjE0LTBjZThjMjg3Zjk0MzJlNGE1MDRkMDBlYThjNzA3NzRlMTViMGVhYzY1ZGUyOTIzZWQ1ZjAyMzk1OTIzZTFlMTM)

MageCart is an e-commerce app for Magento 2.1 onwards. It consumes [Magento 2 REST API](https://devdocs.magento.com/guides/v2.3/get-started/rest_front.html) to display catalog, products, add products to cart and let you place order.

## :camera: Screenshots

<div style="display:flex;" >
  <img  src="screenshots/1.png" width="19%" >
  <img style="margin-left:10px;" src="screenshots/2.png" width="19%" >
  <img style="margin-left:10px;" src="screenshots/3.png" width="19%" >
  <img style="margin-left:10px;" src="screenshots/4.png" width="19%" >
  <img style="margin-left:10px;" src="screenshots/5.png" width="19%" >
</div>

## :rocket: Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

**Create new user in Magento Admin to receive store data in API**

1. *goto* System > User Roles > Add New role
2. Enter role name (Ex. Mobile) in 'Role Info' tab
3. Select Resource Access to 'All' under 'Role Resource' tab
4. Save Role
5. *goto* System > All users > Add New User
6. Enter username, password and other details in 'User Info' tab
7. Select newly created user role(Ex. mobile) in 'User Role' tab
8. Save User

**Setup new CMS block in Magento Admin which will be used in MageCart HomePage**

1. *goto* Content > Blocks > Add New Block
2. Put your config inside `Content` section ([config sample](src/config/cms_block_config.json))
3. save your block and put this newely created cms `ID` in `src/config/magento.js` to `home_cms_block_id` parameter

### Installing

1. Get the code

    ```bash
    git clone https://github.com/alexakasanjeev/magento_react_native.git && cd magento_react_native
    ```

2. Install dependencies

    ```bash
    npm install
    ```

3. Change Magento base url to your magento website url in `src/config/magento.js`

4. Replace username and password in `magento.js` with above created username and password

5. Run the project

    ```bash
    # for iOS
    react-native run-ios
    ```

    ```bash
    # for android
    react-native run-android
    ```

## 🤝 Contributing [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com) 

Finding bugs, sending pull requests or improving docs - any contribution is welcome and highly appreciated. To get started, head over to our [contribution guidelines](CONTRIBUTING.md). Thanks!

## :man: Authors

* **Sanjeev Yadav** - *Initial work* - [alexakasanjeev](https://github.com/alexakasanjeev)

See also the list of [contributors](https://github.com/alexakasanjeev/magento_react_native/contributors) who participated in this project.

## :page_facing_up: License

This project is licensed under the GNU v3 Public License License - see the [LICENSE.md](LICENSE.md) file for details.

## :bulb: Acknowledgments

* [troublediehard/magento-react-native](https://github.com/troublediehard/magento-react-native) created by [Dmytro Portenko](https://github.com/troublediehard)
* [README-Template.md](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2) by [Billie Thompson](https://github.com/PurpleBooth)
