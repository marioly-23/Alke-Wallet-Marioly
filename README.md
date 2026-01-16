# Alke Wallet

Alke Wallet es una billetera digital sencilla pensada como ejercicio práctico para aprender a manejar saldo, depósitos, retiros y registro de movimientos usando tecnologías web básicas.
La idea es simular una cuenta donde puedes:

- Ver tu saldo disponible.
- Depositar dinero.
- Enviar/retirar dinero.
- Revisar el historial completo de transacciones.
- Ver un resumen con los últimos movimientos desde el menú principal.
- Iniciar y cerrar sesión con un usuario de prueba.

**Credenciales de prueba:**
- Usuario: `admin@billetera.com`
- Contraseña: `admin123`

**link GitHub https://github.com/marioly-23/Alke-Wallet-Marioly**

---


## Tecnologías utilizadas

- **HTML5**  
  Estructura de todas las páginas: login, menú, depósitos, transferencias, historial, etc.

- **CSS / Bootstrap 4–5**  
  - Estilos base con Bootstrap desde CDN.  
  - Clases de Bootstrap para:
    - Layout responsivo (container, row, col-*, etc.).
    - Componentes como cards, navbar, tablas, alerts, badges.
    - Estilos de botones (`btn-primary`, `btn-success`, `btn-info`, `btn-outline-*`).
  - Hoja de estilos propia (`css/style.css`) para detalles adicionales.

- **JavaScript (Vanilla)**  
  Toda la lógica está en `JS/main.js`:
  - Manejo de saldo en memoria + persistencia con **`localStorage`**.
  - Funciones para:
    - Cargar y guardar el saldo.
    - Depositar y retirar montos con validaciones.
    - Registrar transacciones en un arreglo y guardarlas en `localStorage`.
    - Renderizar:
      - Historial completo de transacciones.
      - Últimos movimientos en el menú.
    - Lógica de login y logout.
  - Manipulación del DOM:
    - Lectura de inputs (`document.getElementById`).
    - Creación dinámica de filas de tabla (`createElement`, `appendChild`).
    - Formateo de montos en CLP usando `toLocaleString('es-CL', { currency: 'CLP' })`.

---

