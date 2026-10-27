import { colors } from '../theme';
import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';

export default function LoginScreen({ onLogin }) {
    const [correo, setCorreo] = useState('');
    const [clave, setClave] = useState('');

    // Credenciales de prueba
    const correoCorrecto = 'estudiante@uleam.edu.ec';
    const claveCorrecta = '123456';

    const iniciarSesion = () => {
        if (!correo.trim() || !clave.trim()) {
            alert('Datos incompletos', 'Por favor ingresa correo y contraseña.');
            return;
        }

        if (correo === correoCorrecto && clave === claveCorrecta) {
            onLogin();
        } else {
            alert('Credenciales incorrectas', 'El correo o la contraseña son incorrectos.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.logo}>Inventrex Básica</Text>
                <Text style={styles.titulo}>Gestiona tu inventario <Text style={styles.enfasis}>de forma eficiente</Text></Text>
            </View>

            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    value={correo}
                    onChangeText={setCorreo}
                    placeholder="Correo Electrónico"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    value={clave}
                    onChangeText={setClave}
                    placeholder="Contraseña"
                    secureTextEntry
                />

                <Pressable style={styles.boton} onPress={iniciarSesion}>
                    <Text style={styles.textBoton}>Iniciar Sesión</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24, backgroundColor: colors.background },
    header: { width: '100%', maxWidth: 360, marginBottom: 28 },
    logo: { fontSize: 30, fontWeight: '600', color: colors.accent, marginBottom: 12 },
    titulo: { fontSize: 18, fontWeight: '400', color: colors.text, lineHeight: 26 },
    enfasis: { fontWeight: '600' },
    form: { width: '100%', maxWidth: 360 },
    input: { borderWidth: 1, borderColor: colors.border, borderRadius: 4, padding: 14, marginBottom: 14, backgroundColor: colors.surface, color: colors.text, fontSize: 16 },
    boton: { backgroundColor: colors.accent, paddingVertical: 14, borderRadius: 4, alignItems: 'center', marginTop: 4 },
    textBoton: { color: colors.surface, fontSize: 16, fontWeight: '600' },
});
