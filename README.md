# Portfolio de Desarrollador de Software

Una landing page moderna y minimalista para desarrolladores de software, construida con Astro y Tailwind CSS v4.1, siguiendo el estilo de diseño de Vercel.

## ✨ Características

- **Diseño Moderno**: Estilo minimalista inspirado en Vercel con mucho espacio en blanco
- **Modo Oscuro/Claro**: Toggle de tema con persistencia en localStorage
- **Totalmente Responsivo**: Optimizado para móviles, tablets y escritorios
- **Sección de Proyectos**: Muestra proyectos destacados con enlaces a GitHub y tiendas
- **Navegación Suave**: Scroll suave entre secciones
- **SEO Optimizado**: Meta tags y estructura semántica
- **Accesibilidad**: Navegación por teclado y etiquetas ARIA

## 🛠️ Tecnologías

- **Astro** - Framework web moderno
- **Tailwind CSS v4.1** - Framework de CSS utilitario
- **TypeScript** - Tipado estático
- **React** - Para componentes interactivos (toggle de tema)

## 🚀 Estructura del Proyecto

```
/
├── public/
│   ├── favicon.svg
│   ├── chrome-icon.svg
│   ├── vscode-icon.svg
│   └── firefox-icon.svg
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Hero.astro
│   │   ├── Projects.astro
│   │   ├── ProjectCard.astro
│   │   ├── Footer.astro
│   │   └── ThemeToggle.tsx
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   └── index.astro
│   └── styles/
│       └── global.css
└── package.json
```

## 🎨 Paleta de Colores

El diseño utiliza una paleta de colores minimalista que se adapta perfectamente tanto al modo claro como oscuro:

- **Modo Claro**: Fondos blancos con texto negro/gris oscuro
- **Modo Oscuro**: Fondos negros/grises oscuros con texto blanco
- **Acentos**: Colores sutiles para botones y enlaces
- **Bordes**: Grises suaves para separar elementos

## 📱 Secciones

### Header
- Logo/nombre del desarrollador
- Navegación minimalista
- Toggle de tema

### Hero Section
- Título principal llamativo
- Descripción personal
- Botones de llamada a la acción

### Proyectos
- Grid responsivo de tarjetas de proyectos
- Información detallada de cada proyecto
- Enlaces a código fuente y demos
- Tecnologías utilizadas

### Footer
- Información de contacto
- Enlaces a redes sociales
- Copyright

## 🚀 Comandos

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## 🎯 Personalización

Para personalizar el portfolio:

1. **Información Personal**: Edita los textos en los componentes
2. **Proyectos**: Modifica el array `projects` en `Projects.astro`
3. **Enlaces**: Actualiza las URLs de GitHub, LinkedIn, etc.
4. **Colores**: Ajusta la paleta en `global.css`
5. **Contenido**: Personaliza las descripciones y títulos

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Puedes usarlo libremente para tu propio portfolio.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Si tienes sugerencias o encuentras algún problema, no dudes en abrir un issue o pull request.