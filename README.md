# Jorge Suárez — Web Demos

Catálogo independiente de demostraciones de sitios web orientadas a distintos tipos de clientes y objetivos comerciales.

## Stack

- React
- Vite
- Tailwind CSS
- Netlify

## Desarrollo

```bash
npm install
npm run dev
```

## Validación

```bash
npm run lint
npm run build
```

## Despliegue

Netlify toma la configuración desde `netlify.toml`, ejecuta `npm run build` y publica el directorio `dist`.

La página principal funciona como catálogo y enlaza diez demostraciones multipágina independientes:

- `/restaurante/`
- `/fitness/`
- `/clinica/`
- `/inmobiliaria/`
- `/tienda/`
- `/producto/`
- `/despacho/`
- `/evento/`
- `/blog/`
- `/corporativo/`

Cada demo comienza como una versión estática básica con estructura, contenido y dirección visual propias. Esto permite evolucionarlas por separado sin convertir la colección en simples variaciones de una misma plantilla.

