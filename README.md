# vici

Prototipo funcional (solo browser, sin backend ni base de datos) de una app de delivery de comida, construido a partir de screens de Figma. Sirve para visualizar flujos de forma dinámica y con animaciones.

**Stack:** Vite + React + TypeScript + Tailwind CSS + Framer Motion + React Router. Datos mock locales.

## Correr el proyecto

```bash
npm install
npm run dev
```

## Estructura

- `src/features/<screen>/`: una carpeta por pantalla (componentes propios en `components/`).
- `src/state/CartContext.tsx`: carrito en memoria (se reinicia al recargar).
- `src/components/layout/chrome.ts`: qué barra de estado, tab bar e indicador lleva cada ruta.
- `src/components/`: `ui/` (primitivas), `layout/` (PhoneFrame, TabBar), `icons/`.
- `src/data/`: mocks. `src/services/`: API simulada (con delay) que consumen las pantallas.
- `src/lib/`: utilidades y constantes de animación. `src/types/`: tipos compartidos.
- `docs/screens.md`: mapa screen de Figma → node ID → ruta.

## Agregar una screen nueva

1. Crear `src/features/<nombre>/` con su `Screen.tsx` y `index.ts`.
2. Registrar la ruta en `src/router.tsx`.
3. Definir su barra de estado / tab bar en `src/components/layout/chrome.ts`.
4. Agregar una fila en `docs/screens.md`.

Los tokens de diseño (colores, tipografía, sombras) viven en `tailwind.config.ts`.
