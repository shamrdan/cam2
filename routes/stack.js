import  {createStackNavigator}  from 'react-navigation-stack'
import {createAppContainer} from 'react-navigation'
import SearchScreen from  '../screens/search'
import PhotoScreen  from '../screens/photo'
const screens = {

    Search:{
        screen:SearchScreen
    },
    Photo:{
        screen:PhotoScreen
    }

}

const Stack  =  createStackNavigator(screens);

export default createAppContainer(Stack);