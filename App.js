import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import LoginScreen from './src/screens/loginScreen';
import InventarioScreen from './src/screens/solicitudScreen';
import GestionScreen from './src/screens/perfilScreen';
import InicioScreen from './src/screens/inicioScreen';
import ReporteScreen from './src/screens/reporteScreen';
import SensoresScreen from './src/screens/sensoresScreen';
import NotificacionesPush from './src/screens/NotificacionesPush';
import MenuInferior from './src/components/menuInferior';

export default function App() {
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(false);
  const [pantallaActual, setPantallaActual] = useState('inicio');
  
  if (!usuarioAutenticado){
    return(
      <LoginScreen onLogin={() => setUsuarioAutenticado(true)}/>
    )
  }

  let pantalla;
  if (pantallaActual === 'inventario'){
    pantalla = <InventarioScreen/>
  } else if (pantallaActual === 'gestion'){
    pantalla = <GestionScreen/>
  } else if (pantallaActual === 'reporte'){
    pantalla = <ReporteScreen/>
  } else if (pantallaActual === 'sensores'){
    pantalla = <SensoresScreen/>
  } else if (pantallaActual === 'notificaciones'){
    pantalla = <NotificacionesPush/>
  } else{
    pantalla = <InicioScreen/>
  }

  return(
    <View style={styles.contenedor}>
      {pantalla}
      <MenuInferior
        cambiarPantalla={setPantallaActual}
        pantallaActual={pantallaActual}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, flexDirection: 'column' },
});
