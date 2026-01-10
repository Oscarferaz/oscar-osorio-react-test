
# Prueba técnica - Aplicación React

Este repositorio contiene una aplicación frontend construida con React + TypeScript y Vite. Es una aplicación de ejemplo para la gestión de productos y usuarios con autenticación básica.

## Características

- Login y gestión de sesión (auto-logout).
- Listado de productos con tabla y opciones de filtrado.
- Crear, editar y ver detalles de productos.
- Gestión básica de usuarios.
- Estado global usando Redux Toolkit.

## Tecnologías principales

- React 18 + TypeScript
- Vite
- Redux Toolkit
- React Router DOM
- Axios
- MUI, RSuite y FontAwesome
- Sass (SCSS)

## Requisitos

- Node.js >= 16 (recomendado 18+)
- npm o yarn

## Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/Oscarferaz/oscar-osorio-react-test.git
cd prueba-tecnica
```

2. Instala dependencias:

```bash
npm install
# o
yarn
```

## Scripts útiles

Los scripts disponibles en `package.json` son:

- `npm run dev` — Inicia el servidor de desarrollo con Vite.
- `npm run build` — Compila TypeScript y construye la app para producción (`tsc -b && vite build`).
- `npm run preview` — Sirve la build para probarla localmente.
- `npm run lint` — Ejecuta ESLint.

Ejecutar en desarrollo:

```bash
npm run dev
```

Generar build y previsualizar:

```bash
npm run build
npm run preview
```

## Credenciales por defecto (solo para pruebas)

- email: `test@hotmail.com`
- password: `Abcd$1234`


## Estructura del proyecto (resumen)

- `src/` — Código fuente.
	- `pages/` — Vistas principales: login, productos, usuarios, detalles, crear/editar.
	- `components/` — Componentes reutilizables (navbar, tablas, formularios, etc.).
	- `redux/` — Store y slices (auth, product, ...).
	- `services/` — Lógica y llamadas a APIs.
	- `utilities/` — Utilidades (localStorage, validaciones).




