import { colors } from '../theme';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';

export default function InicioScreen() {
    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {/* Header con Botón de Perfil */}
            <View style={styles.headerWrapper}>
                <View style={styles.header}>
                    <Text style={styles.titulo}>Pantalla de Inicio</Text>
                    <Text style={styles.subtitulo}>Bienvenido al sistema de solicitudes</Text>
                </View>
                <Pressable style={styles.botonPerfil}>
                    <Text style={styles.iconoPerfil}>👤</Text>
                </Pressable>
            </View>

            {/* Grid de Tarjetas */}
            <View style={styles.gridSection}>
                <View style={styles.grid}>
                    <View style={styles.tarjeta}>
                        <Text style={styles.numero}>2</Text>
                        <Text style={styles.texto}>Inventarios seguidos</Text>
                    </View>
                    <View style={styles.tarjeta}>
                        <Text style={styles.numero}>3</Text>
                        <Text style={styles.texto}>Inventarios normales</Text>
                    </View>
                    <View style={styles.tarjeta}>
                        <Text style={styles.numero}>4</Text>
                        <Text style={styles.texto}>Inventarios concretados</Text>
                    </View>
                    <Pressable style={styles.tarjetaBoton}>
                        <Text style={styles.icono}>+</Text>
                        <Text style={styles.textoBoton}>Más información</Text>
                    </Pressable>
                </View>
            </View>

            {/* Sección de Asistencia */}
            <View style={styles.contentSection}>
                <Text style={styles.sectionTitle}>Información Hoy</Text>
                <View style={styles.lastAsistent}>
                    <Text style={styles.asistentName}>Pacheco Chalen Jose David</Text>
                    <Text style={styles.asistentLabel}>a cargo hoy</Text>
                </View>
                <View style={styles.lastAsistent}>
                    <Text style={styles.asistentName}>8:00 AM - 2:00 PM</Text>
                    <Text style={styles.asistentLabel}>Ventana Horaria</Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    headerWrapper: { flexDirection: 'row', alignItems: 'flex-start', paddingHorizontal: 20, paddingTop: 28, paddingBottom: 20 },
    header: { flex: 1 },
    titulo: { fontSize: 24, fontWeight: '600', color: colors.text, marginBottom: 6 },
    subtitulo: { fontSize: 14, color: colors.muted, lineHeight: 20 },
    botonPerfil: { width: 44, height: 44, borderRadius: 4, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, justifyContent: 'center', alignItems: 'center', marginLeft: 12 },
    iconoPerfil: { fontSize: 22 },
    gridSection: { paddingHorizontal: 20, paddingBottom: 20 },
    grid: { gap: 10 },
    tarjeta: { width: '100%', backgroundColor: colors.surface, borderRadius: 4, borderWidth: 1, borderColor: colors.border, padding: 16 },
    tarjetaBoton: { width: '100%', backgroundColor: colors.accentSoft, borderRadius: 4, padding: 14, alignItems: 'center', justifyContent: 'center' },
    numero: { fontSize: 28, fontWeight: '600', color: colors.text, marginBottom: 4 },
    icono: { fontSize: 28, color: colors.accent, marginBottom: 4 },
    texto: { fontSize: 14, color: colors.muted, lineHeight: 20 },
    textoBoton: { fontSize: 14, color: colors.accent, fontWeight: '600', textAlign: 'center' },
    contentSection: { paddingHorizontal: 20, paddingBottom: 28 },
    sectionTitle: { fontSize: 18, fontWeight: '600', color: colors.text, marginBottom: 12 },
    lastAsistent: { width: '100%', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: colors.border },
    asistentName: { fontSize: 15, fontWeight: '500', color: colors.text, marginBottom: 4 },
    asistentLabel: { fontSize: 14, color: colors.muted },
});
