import { colors } from '../theme';
import React from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable, Image, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";
import Titulo from "../components/titulo";

export default function ReporteScreen() {

    // productos del inventario que se pueden reportar
    const [productos] = React.useState([
        { id: 1, codigo: "PRD-001", nombre: "Monitor LED 24\"", bodega: "Bodega A" },
        { id: 2, codigo: "PRD-002", nombre: "Camiseta algodón", bodega: "Bodega B" },
        { id: 3, codigo: "PRD-003", nombre: "Caja de cereal", bodega: "Almacén C" },
        { id: 4, codigo: "PRD-004", nombre: "Resma de papel", bodega: "Oficina D" },
    ]);
    const tiposDefecto = ["Dañado", "Vencido", "Incompleto", "Otro"];

    const [productoSeleccionado, setProductoSeleccionado] = React.useState(null);
    const [tipoDefecto, setTipoDefecto] = React.useState("");
    const [descripcion, setDescripcion] = React.useState("");
    const [imagen, setImagen] = React.useState(null);
    const [reportes, setReportes] = React.useState([
        {
            id: 1,
            codigo: "REP-001",
            producto: "Monitor LED 24\"",
            tipo: "Dañado",
            descripcion: "Pantalla con rayones en la esquina inferior.",
            imagen: null,
            fecha: "Oct 1",
            estado: "Aprobado",
        },
        {
            id: 2,
            codigo: "REP-002",
            producto: "Caja de cereal",
            tipo: "Vencido",
            descripcion: "Lote con fecha de caducidad pasada.",
            imagen: null,
            fecha: "Oct 2",
            estado: "En revisión",
        },
    ]);

    const seleccionarImagen = async () => {
        try {
            // Solicitar permisos para acceder a la galería
            const permiso = await ImagePicker.requestMediaLibraryPermissionsAsync();
            // si el permiso es denegado, mostrar un mensaje y salir de la función
            if (!permiso.granted) {
                Alert.alert(
                    "Permiso denegado para acceder a la galería.",
                    "No se puede acceder a la galería de imágenes."
                );
                return;
            }
            // Abrir la galería para seleccionar una imagen
            const resultado = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ["images"],
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.8,
            });
            // si el usuario cancela la selección, salir de la función
            // guardar la URI de la imagen seleccionada en el estado
            if (!resultado.canceled) {
                setImagen(resultado.assets[0].uri);
            }
        } catch (error) {
            console.error("Error al seleccionar la imagen:", error);
            Alert.alert(
                "Error al seleccionar la imagen.",
                "Ocurrió un error al intentar seleccionar la imagen."
            );
        }
    };

    const tomarFoto = async () => {
        try {
            // solicitar permisos para acceder a la cámara
            const permiso = await ImagePicker.requestCameraPermissionsAsync();
            // si el permiso es denegado, mostrar un mensaje y salir de la función
            if (!permiso.granted) {
                Alert.alert(
                    "Permiso denegado para acceder a la cámara.",
                    "No se puede acceder a la cámara."
                );
                return;
            }
            // abrir la cámara para tomar una foto
            const resultado = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3],
                quality: 0.8,
            });
            // si el usuario cancela la toma de foto, salir de la función
            // guardar la URI de la foto tomada en el estado
            if (!resultado.canceled) {
                setImagen(resultado.assets[0].uri);
            }
        } catch (error) {
            console.error("Error al tomar la foto:", error);
            Alert.alert(
                "Error al tomar la foto.",
                "Ocurrió un error al intentar tomar la foto."
            );
        }
    };

    const enviarReporte = () => {
        // validar que el formulario esté completo
        if (!productoSeleccionado || !tipoDefecto || !descripcion.trim()) {
            Alert.alert(
                "Campos incompletos.",
                "Selecciona el producto, el tipo de defecto y escribe una descripción."
            );
            return;
        }
        // validar que exista una foto como evidencia
        if (!imagen) {
            Alert.alert(
                "Falta la evidencia.",
                "Toma o selecciona una foto del producto defectuoso."
            );
            return;
        }
        // crear el nuevo reporte con estado inicial "En revisión"
        const nuevoReporte = {
            id: Date.now(),
            codigo: `REP-${String(reportes.length + 1).padStart(3, "0")}`,
            producto: productoSeleccionado.nombre,
            tipo: tipoDefecto,
            descripcion: descripcion.trim(),
            imagen: imagen,
            fecha: new Date().toLocaleDateString(),
            estado: "En revisión",
        };
        // agregar el reporte al inicio de la lista
        setReportes([nuevoReporte, ...reportes]);
        // limpiar el formulario
        setProductoSeleccionado(null);
        setTipoDefecto("");
        setDescripcion("");
        setImagen(null);
        Alert.alert("Reporte enviado.", "El reporte quedó en revisión.");
    };

    // elegir el color del badge según el estado del reporte
    const estiloBadge = (estado) => {
        if (estado === "Aprobado") return styles.badgeAprobada;
        if (estado === "En revisión") return styles.badgeRevision;
        return styles.badgeDefault;
    };

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.lista}>
            <Titulo
                texto="Reportar defecto"
                subtitulo="Registra productos defectuosos con evidencia"
            />

            {/* SELECCIÓN DE PRODUCTO */}
            <Text style={styles.etiqueta}>Producto</Text>
            <View style={styles.chips}>
                {productos.map((producto) => (
                    <Pressable
                        key={producto.id}
                        style={[styles.chip, productoSeleccionado?.id === producto.id && styles.chipActivo]}
                        onPress={() => setProductoSeleccionado(producto)}
                    >
                        <Text style={[styles.chipTexto, productoSeleccionado?.id === producto.id && styles.chipTextoActivo]}>
                            {producto.nombre}
                        </Text>
                        <Text style={styles.codigo}>{producto.codigo} · {producto.bodega}</Text>
                    </Pressable>
                ))}
            </View>

            {/* TIPO DE DEFECTO */}
            <Text style={styles.etiqueta}>Tipo de defecto</Text>
            <View style={styles.chips}>
                {tiposDefecto.map((tipo) => (
                    <Pressable
                        key={tipo}
                        style={[styles.chip, tipoDefecto === tipo && styles.chipActivo]}
                        onPress={() => setTipoDefecto(tipo)}
                    >
                        <Text style={[styles.chipTexto, tipoDefecto === tipo && styles.chipTextoActivo]}>
                            {tipo}
                        </Text>
                    </Pressable>
                ))}
            </View>

            {/* CAMPO DE DESCRIPCIÓN */}
            <Text style={styles.etiqueta}>Descripción</Text>
            <TextInput
                placeholder="Describe el defecto encontrado"
                value={descripcion}
                onChangeText={setDescripcion}
                style={[styles.input, styles.areaDeTexto]}
                multiline
            />

            {/* EVIDENCIA FOTOGRÁFICA */}
            <Text style={styles.etiqueta}>Evidencia fotográfica</Text>
            <View style={styles.filaBotones}>
                <Pressable style={styles.botonSecundario} onPress={tomarFoto}>
                    <Text style={styles.botonSecundarioTexto}>📷 Tomar foto</Text>
                </Pressable>
                <Pressable style={styles.botonSecundario} onPress={seleccionarImagen}>
                    <Text style={styles.botonSecundarioTexto}>🖼️ Galería</Text>
                </Pressable>
            </View>
            {imagen && (
                <View style={styles.imagenContainer}>
                    <Text style={styles.imagenTexto}>Imagen seleccionada:</Text>
                    <Image source={{ uri: imagen }} style={styles.imagen} />
                    <Pressable onPress={() => setImagen(null)}>
                        <Text style={styles.quitarTexto}>✕ Quitar imagen</Text>
                    </Pressable>
                </View>
            )}

            {/* BOTÓN ENVIAR */}
            <Pressable style={styles.boton} onPress={enviarReporte}>
                <Text style={styles.botonTexto}>Enviar reporte</Text>
            </Pressable>

            {/* LISTA DE REPORTES */}
            <Text style={styles.seccion}>Reportes enviados</Text>
            {reportes.map((reporte) => (
                <View key={reporte.id} style={styles.card}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.codigo}>{reporte.codigo}</Text>
                        <View style={[styles.badge, estiloBadge(reporte.estado)]}>
                            <Text style={styles.badgeTexto}>{reporte.estado}</Text>
                        </View>
                    </View>
                    <Text style={styles.tipo}>{reporte.producto} · {reporte.tipo}</Text>
                    <Text style={styles.descripcionCard}>{reporte.descripcion}</Text>
                    {reporte.imagen && (
                        <Image source={{ uri: reporte.imagen }} style={styles.miniatura} />
                    )}
                    <Text style={styles.fecha}>{reporte.fecha}</Text>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background, paddingHorizontal: 20, paddingTop: 28 },
    lista: { paddingBottom: 28 },
    card: { backgroundColor: colors.surface, borderRadius: 4, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: colors.border },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
    codigo: { fontSize: 12, color: colors.muted, marginTop: 4 },
    tipo: { fontSize: 16, fontWeight: '600', color: colors.text, marginBottom: 6 },
    fecha: { fontSize: 13, color: colors.muted },
    badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
    badgeAprobada: { backgroundColor: colors.accentSoft },
    badgeRevision: { backgroundColor: colors.warningSoft },
    badgeDefault: { backgroundColor: colors.border },
    badgeTexto: { fontSize: 12, fontWeight: '500', color: colors.text },
    areaDeTexto: { height: 112, textAlignVertical: 'top' },
    input: { backgroundColor: colors.surface, borderRadius: 4, padding: 12, marginBottom: 16, fontSize: 15, color: colors.text, borderWidth: 1, borderColor: colors.border },
    boton: { backgroundColor: colors.accent, borderRadius: 4, paddingVertical: 14, alignItems: 'center', marginTop: 8, marginBottom: 28 },
    botonTexto: { color: colors.surface, fontSize: 15, fontWeight: '600' },
    etiqueta: { fontSize: 15, fontWeight: '600', color: colors.text, marginBottom: 8 },
    chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
    chip: { backgroundColor: colors.surface, borderRadius: 4, paddingHorizontal: 12, paddingVertical: 10, borderWidth: 1, borderColor: colors.border },
    chipActivo: { backgroundColor: colors.accentSoft, borderColor: colors.accent },
    chipTexto: { fontSize: 14, color: colors.text },
    chipTextoActivo: { color: colors.accent, fontWeight: '600' },
    filaBotones: { flexDirection: 'row', gap: 8, marginBottom: 16 },
    botonSecundario: { flex: 1, backgroundColor: colors.surface, borderRadius: 4, paddingVertical: 12, alignItems: 'center', borderWidth: 1, borderColor: colors.border },
    botonSecundarioTexto: { color: colors.accent, fontSize: 14, fontWeight: '500' },
    imagenContainer: { backgroundColor: colors.surface, borderRadius: 4, padding: 12, marginBottom: 16, borderWidth: 1, borderColor: colors.border },
    imagenTexto: { fontSize: 13, color: colors.muted, marginBottom: 8 },
    imagen: { width: '100%', aspectRatio: 4 / 3, borderRadius: 4, marginBottom: 8 },
    quitarTexto: { fontSize: 14, color: colors.danger, fontWeight: '500', textAlign: 'center', paddingVertical: 8 },
    seccion: { fontSize: 20, fontWeight: '600', color: colors.text, marginBottom: 16 },
    descripcionCard: { fontSize: 14, color: colors.text, lineHeight: 21, marginBottom: 8 },
    miniatura: { width: '100%', height: 140, borderRadius: 4, marginBottom: 8 },
});
