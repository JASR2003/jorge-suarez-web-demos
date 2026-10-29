# FORMA — flujo funcional de ecommerce

```mermaid
flowchart TD
  A[Inicio /tienda/] --> B[Catálogo]
  A --> C[Colección Novedades]
  A --> D[Historia de marca]
  B --> E[Búsqueda, categoría y orden]
  C --> E
  E --> F[Ficha de producto]
  E --> G[Guardar favorito]
  G --> H[Lista de favoritos]
  H --> F
  F --> I[Elegir acabado y cantidad]
  F --> J[Comprobar entrega]
  I --> K[Añadir a bolsa]
  K --> L[Bolsa]
  L --> M[Modificar cantidades]
  L --> N[Aplicar FORMA10]
  M --> O[Checkout]
  N --> O
  O --> P[1. Datos de contacto y dirección]
  P --> Q[2. Entrega: domicilio, concertada o recogida]
  Q --> R[3. Pago falso: tarjeta, PayPal o transferencia]
  R --> S[Procesamiento simulado]
  S --> T[Confirmación y número de pedido]
  T --> U[Seguimiento del pedido]
  U --> V[Cuenta demo]
  A --> V
  A --> W[Ayuda, envíos, devoluciones y accesibilidad]
```

## Reglas de la demostración

- La bolsa, favoritos y último pedido se guardan únicamente en `localStorage`.
- Ningún formulario transmite información a un servidor.
- La pasarela valida el formulario, simula procesamiento, genera un número de pedido, vacía la bolsa y abre la confirmación.
- La tarjeta `4242 4242 4242 4242`, fecha `12 / 30` y CVC `123` son datos ficticios sugeridos para probar el flujo.
- El cupón demostrativo es `FORMA10`.
