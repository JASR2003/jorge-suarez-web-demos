# Próximas demos — arquitectura investigada

Este documento fija el alcance antes de construir. Cada demo tendrá navegación, jerarquía, interacción y lenguaje visual propios; no se reutilizará una misma plantilla cambiando colores.

## 1. Tienda — FORMA (en construcción)

- Referencias funcionales: colecciones, búsqueda y filtros de storefront de Shopify.
- Rutas: `/tienda/`, `/tienda/catalogo/`, `/tienda/producto/`, `/tienda/bolsa/`, `/tienda/envios/`.
- Flujos: descubrir colección → filtrar → configurar producto → añadir → revisar bolsa → simulación de checkout.
- Dirección: catálogo doméstico cálido, silencioso y táctil; DM Sans + Manrope; rosa arcilla, papel y tinta.
- Límite del MVP estático: no procesa pagos ni inventario real; el estado de la bolsa vive en `localStorage`.

## 2. Producto digital — ORBIT

- Referencias funcionales: Slack organiza su propuesta por producto, integraciones, planes y seguridad.
- Rutas previstas: `/producto/`, `/producto/funciones/`, `/producto/soluciones/`, `/producto/integraciones/`, `/producto/precios/`, `/producto/seguridad/`.
- Flujos: identificar problema → explorar funciones por rol → probar interfaz → comparar planes → iniciar prueba simulada.
- Dirección: interfaz de software clara y densa, navegación por producto, demostraciones interactivas; evitar la estética de tarjetas comerciales de la tienda.

## 3. Despacho profesional — VARELA & ASOCIADOS

- Referencias funcionales: Clifford Chance separa capacidades, sectores, profesionales, perspectivas y oficinas.
- Rutas previstas: `/despacho/`, `/despacho/areas/`, `/despacho/profesionales/`, `/despacho/profesional/`, `/despacho/publicaciones/`, `/despacho/contacto/`.
- Flujos: localizar especialidad → validar experiencia/equipo → leer caso o publicación → solicitar consulta.
- Dirección: sobriedad jurídica contemporánea, tipografía editorial de alto contraste, navegación basada en contenido y confianza; avisos legales visibles.

## 4. Evento — FUTURA 26

- Referencias funcionales: TED presenta programa y ponentes; TEDConnect añade agenda personal, mapas y conexión con asistentes.
- Rutas previstas: `/evento/`, `/evento/agenda/`, `/evento/ponentes/`, `/evento/entradas/`, `/evento/visita/`, `/evento/patrocinadores/`.
- Flujos: entender propuesta → filtrar agenda por día/escenario → ver ponente → elegir entrada → preparar visita.
- Dirección: sistema cinético y temporal, gran tipografía condensada, códigos de color por escenario y cronograma; no estructura de catálogo.

## 5. Blog / medio — TRAMA

- Referencias funcionales: Stripe Newsroom distingue noticias, historias e información corporativa; medios por suscripción añaden newsletters y archivo.
- Rutas previstas: `/blog/`, `/blog/categoria/`, `/blog/articulo/`, `/blog/autores/`, `/blog/autor/`, `/blog/archivo/`, `/blog/newsletter/`.
- Flujos: portada curada → categoría o búsqueda → lectura → autor/tema relacionado → suscripción.
- Dirección: revista digital con ritmo editorial, portada asimétrica, lectura larga optimizada y navegación por temas; máximo contraste y ancho legible.

## 6. Sitio corporativo — NEXO INDUSTRIES

- Referencias funcionales: Siemens presenta negocios, propósito, cifras globales, impacto, sostenibilidad y carreras.
- Rutas previstas: `/corporativo/`, `/corporativo/negocios/`, `/corporativo/nosotros/`, `/corporativo/sostenibilidad/`, `/corporativo/inversores/`, `/corporativo/carreras/`, `/corporativo/noticias/`.
- Flujos: comprender la organización → explorar unidad/mercado → comprobar cifras e impacto → acceder a inversión, empleo o contacto.
- Dirección: sistema institucional de información, módulos de datos y navegación multinivel; preciso, técnico y distinto del tono aspiracional de producto digital.

## Orden

1. Cerrar Tienda con QA responsive y publicación.
2. Producto digital.
3. Despacho profesional.
4. Evento.
5. Blog / medio.
6. Sitio corporativo.

## Fuentes base

- https://help.shopify.com/en/manual/online-store/themes/customizing-themes/common-customizations/storefront-filters
- https://slack.com/integrations
- https://slack.com/pricing
- https://www.cliffordchance.com/about_us.html
- https://www.ted.com/attend/conferences/ted-conference
- https://www.ted.com/attend/conferences/tedconnect
- https://stripe.com/newsroom
- https://www.siemens.com/en-us/company/
- https://www.siemens.com/en-us/company/about/
