import { colors } from '../theme';
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, FlatList } from 'react-native';

export default function GestionScreen() {
  const [inventariosGestionados] = useState([
    {
      id: 1,
      nombre: 'Bodega A - Inventario Oct 2',
      bodega: 'Bodega A',
      estado: 'Revisado',
      observaciones: 'Discrepancia detectada en sección electrónica. Revisar códigos de barras.',
      fecha: 'Oct 2, 2026',
      jefeBodega: 'Carlos López',
    },
    {
      id: 2,
      nombre: 'Bodega B - Inventario Oct 1',
      bodega: 'Bodega B',
      estado: 'Pendiente',
      observaciones: 'Conteo en progreso. Falta revisar sección textil.',
      fecha: 'Oct 1, 2026',
      jefeBodega: 'María García',
    },
    {
      id: 3,
      nombre: 'Almacén C - Inventario Sep 30',
      bodega: 'Almacén C',
      estado: 'Revisado',
      observaciones: 'Todo conforme. Stock coincide con sistema.',
      fecha: 'Sep 30, 2026',
      jefeBodega: 'Juan Pérez',
    },
    {
      id: 4,
      nombre: 'Oficina D - Inventario Sep 28',
      bodega: 'Oficina D',
      estado: 'Revisado',
      observaciones: 'Falta un equipo de cómputo. Reportar a sistemas.',
      fecha: 'Sep 28, 2026',
      jefeBodega: 'Ana Martínez',
    },
  ]);

  const getEstadoColor = (estado) => {
    return estado === 'Revisado' ? colors.accent : colors.warning;
  };

  const renderCard = ({ item }) => (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.cardHeader}>
        <View style={styles.headerLeft}>
          <Text style={styles.cardNombre}>{item.nombre}</Text>
          <Text style={styles.cardFecha}>{item.fecha}</Text>
        </View>
        <View
          style={[
            styles.estadoBadge,
            { backgroundColor: getEstadoColor(item.estado) },
          ]}
        >
          <Text style={styles.estadoText}>{item.estado}</Text>
        </View>
      </View>

      {/* Jefe Bodega */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Jefe de Bodega</Text>
        <Text style={styles.sectionValue}>{item.jefeBodega}</Text>
      </View>

      {/* Observaciones */}
      <View style={styles.section}>
        <Text style={styles.sectionLabel}>Observaciones</Text>
        <Text style={styles.observaciones}>{item.observaciones}</Text>
      </View>

      {/* Ver Mapa Button */}
      <Pressable style={styles.mapBtn}>
        <Text style={styles.mapBtnText}>📍 Ver Ubicación en Mapa</Text>
      </Pressable>
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.titulo}>Gestión</Text>
        <Text style={styles.subtitulo}>Monitorea revisiones de bodegas</Text>
      </View>

      {/* Botón Ver Todas Bodegas */}
      <Pressable style={styles.allBodegasBtn}>
        <Text style={styles.allBodegasBtnText}>🏭 Ver Todas las Bodegas</Text>
      </Pressable>

      {/* Lista de Inventarios */}
      <FlatList
        data={inventariosGestionados}
        renderItem={renderCard}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={false}
        style={styles.listContainer}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background, paddingHorizontal: 20, paddingTop: 28 },
    header: { marginBottom: 20 },
    titulo: { fontSize: 24, fontWeight: '600', color: colors.text, marginBottom: 6 },
    subtitulo: { fontSize: 14, color: colors.muted, lineHeight: 20 },
    allBodegasBtn: { backgroundColor: colors.accent, paddingVertical: 14, borderRadius: 4, alignItems: 'center', marginBottom: 20 },
    allBodegasBtnText: { color: colors.surface, fontSize: 15, fontWeight: '600' },
    listContainer: { marginBottom: 30 },
    card: { backgroundColor: colors.surface, borderRadius: 4, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: colors.border },
    cardHeader: { alignItems: 'flex-start', gap: 8, marginBottom: 16 },
    headerLeft: { width: '100%' },
    cardNombre: { fontSize: 17, fontWeight: '600', color: colors.text, marginBottom: 4 },
    cardFecha: { fontSize: 13, color: colors.muted },
    estadoBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
    estadoText: { fontSize: 12, fontWeight: '600', color: colors.surface },
    section: { marginBottom: 12, paddingBottom: 12, borderBottomWidth: 1, borderBottomColor: colors.border },
    sectionLabel: { fontSize: 13, color: colors.muted, marginBottom: 4 },
    sectionValue: { fontSize: 15, color: colors.text, fontWeight: '500' },
    observaciones: { fontSize: 14, color: colors.text, lineHeight: 21 },
    mapBtn: { backgroundColor: colors.accentSoft, paddingVertical: 12, borderRadius: 4, alignItems: 'center' },
    mapBtnText: { color: colors.accent, fontSize: 14, fontWeight: '600' },
});
