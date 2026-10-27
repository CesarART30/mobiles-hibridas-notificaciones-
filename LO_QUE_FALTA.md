# Punto guardado — 26 oct 2026, 13:28

Seguir desde aquí. La app ya está instalada en el Android y el servidor de desarrollo puede volver a levantarse.

## Ya quedó hecho

- Cuenta Expo: `cesar3x0d` (`cesarjunior30xd@gmail.com`).
- Proyecto vinculado: https://expo.dev/accounts/cesar3x0d/projects/primera-app-movil-basica
- `extra.eas.projectId` en `app.json`: `f70e6a05-fc70-422f-8a4e-6899f90d133e`
- `eas build:configure` respondido para Android.
- Firma Android guardada en EAS (keystore `Xm1fRACFfl`).
- APK de desarrollo compilada e instalada: https://expo.dev/accounts/cesar3x0d/projects/primera-app-movil-basica/builds/a33f58fd-1b22-402a-964d-0ee1295b28f8
- Pantalla **Avisos**, permiso y botón de notificación local en el código.
- Login de la app: `estudiante@uleam.edu.ec` / `123456`.
- Firebase: proyecto `inventrex-basica`. `google-services.json` está en la raíz y el package coincide (`com.inventrex.basica`). `app.json` ya tiene `android.googleServicesFile`.

## Actualización 26 oct, 19:09

La clave FCM V1 ya estaba en Expo para `inventrex-basica`. No hizo falta subir otra. La clave extra generada en Firebase se borró de Google Cloud y no quedó en el disco.

La APK nueva, que sí incluye `google-services.json`, se está compilando:

https://expo.dev/accounts/cesar3x0d/projects/primera-app-movil-basica/builds/3ad59ded-fd44-4945-9d3f-ffd4de2c4194

Cuando termine: instalar esa APK (no la anterior), abrir **Avisos** y pulsar **Solicitar permisos y obtener token**. El token se pega en https://expo.dev/notifications.

## Dónde se cortó

En el teléfono, **Solicitar permisos y obtener token** muestra:

`Unable to get Firebase Messaging instance... Default FirebaseApp is not initialized... com.inventrex.basica`

Esa APK se compiló antes de existir `google-services.json`. No hay Expo Push Token todavía, así que en https://expo.dev/notifications no hay nada que pegar.

La notificación local (**Probar notificación local**) no necesita token ni Firebase.

## Al volver, en este orden

1. Subir la clave FCM V1 (archivo distinto de `google-services.json`):
   - Firebase → Configuración del proyecto → Cuentas de servicio → Generar nueva clave privada.
   - `eas credentials` → Android → development → Push Notifications (FCM V1) → subir ese JSON.
   - No dejar esa clave en el proyecto, no subirla a Git y no pegarla en el chat.
2. Volver a compilar, porque el JSON de Firebase tiene que entrar en la APK:
   ```powershell
   $env:EAS_NO_VCS = "1"
   eas build --platform android --profile development --non-interactive
   ```
   El Git de la PC apunta a la carpeta del usuario. Por eso la compilación anterior usó `EAS_NO_VCS=1` y un `.git` solo dentro de este proyecto. No borrar ese `.git` antes de compilar.
3. Instalar la APK nueva. Abrir esa app, no Expo Go.
4. Misma Wi-Fi. Servidor: `npx expo start --dev-client --port 8081`. URL que usó el teléfono: `exp://192.168.1.6:8081` (confirmar la IP si cambió).
5. **Avisos** → **Solicitar permisos y obtener token**. El token empieza por `ExponentPushToken[`.
6. Pegarlo en https://expo.dev/notifications. Título: `Solicitud aprobada`. Cuerpo: `Tu solicitud fue revisada`. Probar con la app abierta y en segundo plano.

## Pendiente de la guía, fuera de Firebase

- El guardado de inventario en `src/screens/solicitudScreen.jsx` sigue simulado con `setTimeout`. El aviso local sí espera un status 2xx.
- Faltan las capturas de la entrega: permiso, notificación local, token parcialmente oculto, push recibido y un error real con causa y solución. El error de Firebase de la captura del teléfono sirve para ese registro.
