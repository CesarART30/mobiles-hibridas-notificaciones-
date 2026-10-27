import { colors } from '../theme';
import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, TextInput } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ProfileScreen() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [nombre, setNombre] = useState('');
  const [descripcionPersonal, setDescripcionPersonal] = useState('');
  const [imagenes, setImagenes] = useState([]);


    const tomarFoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            alert('Se necesita permiso para acceder a la cámara');
            return;
        }
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });
        if (!result.cancelled) {
            setSelectedImage(result.uri);
        }
    };
    const seleccionarImagen = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Se necesita permiso para acceder a la biblioteca de imágenes');
            return;
        }
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        });
        if (!result.cancelled) {
            setSelectedImage(result.uri);
        }
    };
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.titulo}>Crea tu perfil</Text>
        <Text style={styles.subtitulo}>Gestiona tu perfil personal, cuentanos de ti</Text>
      </View>
        <View style={styles.form}>
            <TextInput
                style={styles.input}
                value={nombre}
                onChangeText={setNombre}
                placeholder="Ingresa tu nombre"
                keyboardType="default"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                value={descripcionPersonal}
                onChangeText={setDescripcionPersonal}
                placeholder="Describe tu perfil"
                multiline
                numberOfLines={4}
            />
            <Pressable style={styles.boton} onPress={tomarFoto}>
                <Text style={styles.textBoton}>Tomar Foto</Text>
            </Pressable>
            <Pressable style={styles.boton} onPress={seleccionarImagen}>
                <Text style={styles.textBoton}>Seleccionar desde Galeria</Text>
            </Pressable>
        </View>
    </ScrollView>
  );
}



const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background, paddingHorizontal: 20, paddingTop: 28 },
    header: { marginBottom: 20 },
    titulo: { fontSize: 24, fontWeight: '600', color: colors.text, marginBottom: 6 },
    subtitulo: { fontSize: 14, color: colors.muted, lineHeight: 20 },
    form: { paddingBottom: 28 },
    input: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: 4, padding: 12, marginBottom: 16, fontSize: 15, color: colors.text },
    boton: { backgroundColor: colors.accent, paddingVertical: 14, borderRadius: 4, alignItems: 'center', marginBottom: 12 },
    textBoton: { color: colors.surface, fontSize: 15, fontWeight: '600' },
});
