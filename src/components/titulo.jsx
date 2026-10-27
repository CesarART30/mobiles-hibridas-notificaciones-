import { colors } from '../theme';
import { StyleSheet, Text, View } from "react-native";

export default function Titulo({ texto, subtitulo }) {

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>
                {texto}
            </Text>

            {subtitulo && (

                <Text style={styles.subtitulo}>
                    {subtitulo}
                </Text>
            )}
        </View>
    )

}

const styles = StyleSheet.create({
    container: { marginBottom: 20 },
    titulo: { fontSize: 24, fontWeight: '600', color: colors.text, marginBottom: 6 },
    subtitulo: { fontSize: 14, color: colors.muted, lineHeight: 20 },
});
