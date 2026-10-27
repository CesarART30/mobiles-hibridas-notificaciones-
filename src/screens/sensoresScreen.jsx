import { colors } from '../theme';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import * as Location from 'expo-location';
import { Accelerometer } from 'expo-sensors';
import Titulo from '../components/titulo';

export default function SensoresScreen() {
  const [activo, setActivo] = useState(false);
  const [ubicacion, setUbicacion] = useState(null);
  const [acel, setAcel] = useState({ x: 0, y: 0, z: 0 });
  const [error, setError] = useState('');

  // Guardamos las suscripciones para poder cortarlas al apagar o salir
  const subGps = useRef(null);
  const subAcel = useRef(null);

  async function activar() {
    setError('');
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setError('Permiso de ubicación denegado');
      return;
    }

    subGps.current = await Location.watchPositionAsync(
      { accuracy: Location.Accuracy.High, timeInterval: 2000, distanceInterval: 1 },
      (pos) => setUbicacion(pos.coords)
    );

    Accelerometer.setUpdateInterval(500);
    subAcel.current = Accelerometer.addListener(setAcel);

    setActivo(true);
  }

  function desactivar() {
    subGps.current?.remove();
    subAcel.current?.remove();
    subGps.current = null;
    subAcel.current = null;
    setActivo(false);
  }

  // Limpieza al desmontar la pantalla
  useEffect(() => desactivar, []);

  return (
    <ScrollView style={styles.container}>
      <Titulo texto="Sensores" subtitulo="GPS y acelerómetro del dispositivo" />

      <Pressable
        style={[styles.boton, activo && styles.botonApagar]}
        onPress={activo ? desactivar : activar}
        accessibilityRole="button"
      >
        <Text style={styles.botonTexto}>{activo ? 'Desactivar sensores' : 'Activar sensores'}</Text>
      </Pressable>

      {error ? <Text style={styles.error}>{error}</Text> : null}

      <View style={styles.card}>
        <Text style={styles.cardTitulo}>📍 Ubicación</Text>
        {ubicacion ? (
          <>
            <Text style={styles.dato}>Latitud: {ubicacion.latitude.toFixed(6)}</Text>
            <Text style={styles.dato}>Longitud: {ubicacion.longitude.toFixed(6)}</Text>
            <Text style={styles.dato}>Precisión: ±{Math.round(ubicacion.accuracy)} m</Text>
          </>
        ) : (
          <Text style={styles.vacio}>{activo ? 'Buscando señal GPS...' : 'Sin datos'}</Text>
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitulo}>📈 Acelerómetro (g)</Text>
        <Text style={styles.dato}>X: {acel.x.toFixed(3)}</Text>
        <Text style={styles.dato}>Y: {acel.y.toFixed(3)}</Text>
        <Text style={styles.dato}>Z: {acel.z.toFixed(3)}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, paddingHorizontal: 20, paddingTop: 28 },
  boton: { backgroundColor: colors.accent, paddingVertical: 14, borderRadius: 4, alignItems: 'center', marginBottom: 16 },
  botonApagar: { backgroundColor: colors.danger },
  botonTexto: { color: colors.surface, fontSize: 15, fontWeight: '600' },
  error: { color: colors.danger, marginBottom: 12 },
  card: { backgroundColor: colors.surface, borderRadius: 4, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: colors.border },
  cardTitulo: { fontSize: 17, fontWeight: '600', color: colors.text, marginBottom: 8 },
  dato: { fontSize: 15, color: colors.text, marginBottom: 4 },
  vacio: { fontSize: 14, color: colors.muted },
});
