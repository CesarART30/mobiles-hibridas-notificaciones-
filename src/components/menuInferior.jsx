import { colors } from '../theme';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function MenuInferior({ pantallaActual, cambiarPantalla }) {
    return (
        <View style={styles.menu}>
            <Pressable
                style={[styles.boton, pantallaActual === 'inicio' && styles.botonActivo]}
                onPress={() => cambiarPantalla('inicio')}
                accessibilityRole="button"
                accessibilityLabel="Inicio"
                accessibilityState={{ selected: pantallaActual === 'inicio' }}
            >
                <View style={styles.contenidoBoton}>
                    <Text style={styles.icono}>🏠</Text>
                    <Text style={[styles.texto, pantallaActual === 'inicio' && styles.textoActivo]}>Inicio</Text>
                </View>
            </Pressable>

            <Pressable
                style={[styles.boton, pantallaActual === 'inventario' && styles.botonActivo]}
                onPress={() => cambiarPantalla('inventario')}
                accessibilityRole="button"
                accessibilityLabel="Inventario"
                accessibilityState={{ selected: pantallaActual === 'inventario' }}
            >
                <View style={styles.contenidoBoton}>
                    <Text style={styles.icono}>📋</Text>
                    <Text style={[styles.texto, pantallaActual === 'inventario' && styles.textoActivo]}>Inventario</Text>
                </View>
            </Pressable>

            <Pressable
                style={[styles.boton, pantallaActual === 'reporte' && styles.botonActivo]}
                onPress={() => cambiarPantalla('reporte')}
                accessibilityRole="button"
                accessibilityLabel="Reporte"
                accessibilityState={{ selected: pantallaActual === 'reporte' }}
            >
                <View style={styles.contenidoBoton}>
                    <Text style={styles.icono}>⚠️</Text>
                    <Text style={[styles.texto, pantallaActual === 'reporte' && styles.textoActivo]}>Reporte</Text>
                </View>
            </Pressable>

            <Pressable
                style={[styles.boton, pantallaActual === 'gestion' && styles.botonActivo]}
                onPress={() => cambiarPantalla('gestion')}
                accessibilityRole="button"
                accessibilityLabel="Gestión"
                accessibilityState={{ selected: pantallaActual === 'gestion' }}
            >
                <View style={styles.contenidoBoton}>
                    <Text style={styles.icono}>👤</Text>
                    <Text style={[styles.texto, pantallaActual === 'gestion' && styles.textoActivo]}>Gestión</Text>
                </View>
            </Pressable>

            <Pressable
                style={[styles.boton, pantallaActual === 'sensores' && styles.botonActivo]}
                onPress={() => cambiarPantalla('sensores')}
                accessibilityRole="button"
                accessibilityLabel="Sensores"
                accessibilityState={{ selected: pantallaActual === 'sensores' }}
            >
                <View style={styles.contenidoBoton}>
                    <Text style={styles.icono}>📡</Text>
                    <Text style={[styles.texto, pantallaActual === 'sensores' && styles.textoActivo]}>Sensores</Text>
                </View>
            </Pressable>

            <Pressable
                style={[styles.boton, pantallaActual === 'notificaciones' && styles.botonActivo]}
                onPress={() => cambiarPantalla('notificaciones')}
                accessibilityRole="button"
                accessibilityLabel="Avisos"
                accessibilityState={{ selected: pantallaActual === 'notificaciones' }}
            >
                <View style={styles.contenidoBoton}>
                    <Text style={styles.icono}>🔔</Text>
                    <Text style={[styles.texto, pantallaActual === 'notificaciones' && styles.textoActivo]}>Avisos</Text>
                </View>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    menu: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 8, backgroundColor: colors.surface, borderTopWidth: 1, borderTopColor: colors.border },
    boton: { flex: 1, alignItems: 'center', paddingVertical: 8, paddingHorizontal: 2, borderRadius: 4, minHeight: 56 },
    contenidoBoton: { flexDirection: 'column', alignItems: 'center', gap: 4 },
    botonActivo: { backgroundColor: colors.accentSoft },
    icono: { fontSize: 22 },
    texto: { fontSize: 12, color: colors.muted, textAlign: 'center' },
    textoActivo: { color: colors.accent, fontWeight: '600' },
});
