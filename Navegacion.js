import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Home from './Screens/Home';
import Formulario from './Componentes/Formulario';
import Lista from './Screens/Lista';


function Navegacion() {
    return (
        <NavigationContainer>

            <StackDetalles>

            </StackDetalles>

        </NavigationContainer>
    );
}
const Stack = createStackNavigator();

function StackDetalles() {
    return (
        <Stack.Navigator initialRouteName="Lista">
            <Stack.Screen name="Home" component={Lista} />
            <Stack.Screen name="Lista" component={Lista} />
            <Stack.Screen name="Formulario" component={Formulario} />
        </Stack.Navigator>
    )
}


export default Navegacion;
