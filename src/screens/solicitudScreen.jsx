import { colors } from '../theme';
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Notifications from 'expo-notifications';

export default function InventarioScreen() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [descripcion, setDescripcion] = useState('');
  const [imagenes, setImagenes] = useState([]);

  const [inventarios] = useState([
    {
      id: 1,
      nombre: 'Bodega A',
      discrepancias: 15,
      productosContados: 245,
      categoria: 'Electrónica',
      fecha: 'Oct 2',
    },
    {
      id: 2,
      nombre: 'Bodega B',
      discrepancias: 8,
      productosContados: 187,
      categoria: 'Textil',
      fecha: 'Oct 1',
    },
    {
      id: 3,
      nombre: 'Almacén C',
      discrepancias: 22,
      productosContados: 512,
      categoria: 'Alimentos',
      fecha: 'Sep 30',
    },
    {
      id: 4,
      nombre: 'Oficina D',
      discrepancias: 5,
      productosContados: 89,
      categoria: 'Suministros',
      fecha: 'Sep 28',
    },
  ]);

  // Simula el guardado; reemplazar por la llamada real a la API
  async function guardarInventario() {
    try {
      const respuesta = await new Promise((resolve) => setTimeout(() => resolve({ status: 201 }), 500));
      // La notificación se dispara SOLO si el guardado fue exitoso
      if (respuesta.status >= 200 && respuesta.status < 300) {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Solicitud registrada',
            body: 'Tu solicitud se guardó correctamente.',
            data: { tipo: 'solicitud_creada' },
          },
          trigger: null,
        });
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo registrar la solicitud');
    }
  }

  const getDiscrepancyColor = (value) => {
    if (value < 10) return colors.accent;
    if (value < 20) return colors.warning;
    return colors.danger;
  };

  const tiempoRestante = {
    horas: 2,
    minutos: 15,
  };

  const porcentajeTiempo = (tiempoRestante.horas * 60 + tiempoRestante.minutos) / (8 * 60) * 100;

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.titulo}>Inventarios</Text>
        <Text style={styles.subtitulo}>Gestiona y monitorea tus procesos</Text>
      </View>

      {/* Timer Compacto */}
      <View style={styles.timerCard}>
        <View style={styles.timerContent}>
          <Text style={styles.timerLabel}>Tiempo disponible</Text>
          <Text style={styles.timerValue}>
            {tiempoRestante.horas}h {tiempoRestante.minutos}m
          </Text>
        </View>
        <View style={styles.timerBar}>
          <View
            style={[
              styles.timerProgress,
              { width: `${porcentajeTiempo}%` },
            ]}
          />
        </View>
      </View>

      {/* Botón Crear */}
      <Pressable style={styles.crearBtn} onPress={guardarInventario}>
        <Text style={styles.crearBtnText}>+ Crear Inventario</Text>
      </Pressable>

      {/* Grid 2 Columnas */}
      <View style={styles.gridContainer}>
        {inventarios.map((inv) => (
          <View key={inv.id} style={styles.card}>
            {/* Header Card */}
            <View style={styles.cardHeader}>
              <Text style={styles.cardNombre}>{inv.nombre}</Text>
              <Text style={styles.cardFecha}>{inv.fecha}</Text>
            </View>

            {/* Discrepancias */}
            <View style={styles.discrepancySection}>
              <Text style={styles.discrepancyValue}>{inv.discrepancias}%</Text>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${inv.discrepancias}%`, backgroundColor: getDiscrepancyColor(inv.discrepancias) },
                  ]}
                />
              </View>
            </View>

            {/* Stats */}
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{inv.productosContados}</Text>
                <Text style={styles.statLabel}>Productos</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.statItem}>
                <Text style={styles.statLabel}>{inv.categoria}</Text>
              </View>
            </View>

            {/* Footer */}
            <Pressable style={styles.cardFooter}>
              <Text style={styles.cardFooterText}>Ver detalles →</Text>
            </Pressable>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background, paddingHorizontal: 20, paddingTop: 28 },
    header: { marginBottom: 20 },
    titulo: { fontSize: 24, fontWeight: '600', color: colors.text, marginBottom: 6 },
    subtitulo: { fontSize: 14, color: colors.muted, lineHeight: 20 },
    timerCard: { backgroundColor: colors.accentSoft, borderRadius: 4, padding: 16, marginBottom: 16 },
    timerContent: { marginBottom: 10 },
    timerLabel: { fontSize: 14, color: colors.muted, marginBottom: 4 },
    timerValue: { fontSize: 22, fontWeight: '600', color: colors.accent },
    timerBar: { height: 4, backgroundColor: colors.border, overflow: 'hidden' },
    timerProgress: { height: '100%', backgroundColor: colors.accent },
    crearBtn: { backgroundColor: colors.accent, paddingVertical: 14, borderRadius: 4, alignItems: 'center', marginBottom: 20 },
    crearBtnText: { color: colors.surface, fontSize: 15, fontWeight: '600' },
    gridContainer: { marginBottom: 30 },
    card: { width: '100%', backgroundColor: colors.surface, borderRadius: 4, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: colors.border },
    cardHeader: { marginBottom: 12 },
    cardNombre: { fontSize: 17, fontWeight: '600', color: colors.text, marginBottom: 4 },
    cardFecha: { fontSize: 13, color: colors.muted },
    discrepancySection: { marginBottom: 12 },
    discrepancyValue: { fontSize: 20, fontWeight: '500', color: colors.text, marginBottom: 6 },
    progressBar: { height: 4, backgroundColor: colors.border, overflow: 'hidden' },
    progressFill: { height: '100%' },
    statsContainer: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderTopWidth: 1, borderBottomWidth: 1, borderColor: colors.border, marginBottom: 8 },
    statItem: { flex: 1, alignItems: 'center' },
    statValue: { fontSize: 17, fontWeight: '600', color: colors.text, marginBottom: 4 },
    statLabel: { fontSize: 14, color: colors.muted },
    divider: { width: 1, height: 28, backgroundColor: colors.border },
    cardFooter: { paddingVertical: 10, alignItems: 'center' },
    cardFooterText: { fontSize: 14, color: colors.accent, fontWeight: '600' },
});
