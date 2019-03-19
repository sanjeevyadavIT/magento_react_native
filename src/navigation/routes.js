import { createStackNavigator, createAppContainer } from 'react-navigation';
import DashboardScreen from '../containers/Dashboard';
import CategoryTree from '../components/catalog/CategoryTree';
import CategoryList from '../components/catalog/CategoryList';
import Product from '../components/catalog/Product';


const HomeStack = createStackNavigator(
  {
    DashboardScreen,
    CategoryTree,
    category: CategoryList,
    product: Product
  }
)

const Navigator = createAppContainer(HomeStack)

export default Navigator;
