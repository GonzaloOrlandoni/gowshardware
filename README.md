# GOWS Hardware - E-commerce & PC Builder 🚀

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38bdf8?style=flat-square&logo=tailwindcss)
![Zustand](https://img.shields.io/badge/State-Zustand-orange?style=flat-square)

<div align="center">
  <br />
  <a href="#" target="_blank">
    <img src="./public/images/ecommercegows.png" alt="GOWS Hardware Preview" width="100%" style="border-radius: 10px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
  </a>
  <br />
  <p><i>Plataforma de E-commerce de Alto Rendimiento con Configurador de PC Interactivo</i></p>
</div>

---

## ⚡ Sobre el Proyecto

**GOWS Hardware** no es solo una tienda online; es una experiencia completa para entusiastas del hardware. El núcleo del proyecto es su **Configurador de PC Inteligente**, que guía al usuario paso a paso para armar su equipo ideal, validando compatibilidades y permitiendo exportar presupuestos profesionales.

## ✨ Características Principales

### 🛠️ Armador de PC (PC Builder)

- **Flujo Guiado:** 10 pasos interactivos (CPU, GPU, RAM multislot, etc.) con validación lógica de componentes requeridos.
- **Filtros en Tiempo Real:** Modal de selección con filtros dinámicos (ej: SSD vs HDD).
- **Exportación PDF:** Generación automática de presupuestos detallados en PDF con un solo clic.
- **Servicios Opcionales:** Toggle para incluir servicio de armado con cálculo automático de precio.

### 🛒 Experiencia de Compra

- **Carrito Persistente:** Estado global con `Zustand` que mantiene los productos seleccionados aunque se recargue la página.
- **Checkout vía WhatsApp:** Integración directa que genera un mensaje detallado con el pedido para finalizar la compra de forma personalizada.
- **Buscador Spotlight:** Barra de búsqueda tipo "CMD+K" con filtrado instantáneo y _debounce_ para optimización.

### 👤 Panel de Usuario & UI

- **Dashboard Completo:** Perfil de usuario con historial de pedidos, gestión de direcciones y billetera.
- **Diseño Moderno:** Interfaz minimalista y totalmente responsiva construida con Tailwind CSS.
- **Feedback Visual:** Notificaciones (Toasts), estados de carga y páginas de error personalizadas.

## 💻 Tecnologías Utilizadas

- **Frontend:** [Next.js 14](https://nextjs.org/) (App Router), [React](https://react.dev/).
- **Lenguaje:** [TypeScript](https://www.typescriptlang.org/) (Tipado estricto).
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/), [Lucide React](https://lucide.dev/) (Iconografía).
- **Estado:** [Zustand](https://github.com/pmndrs/zustand) + Middleware Persist.
- **Utilidades:** `jspdf` & `jspdf-autotable` (Reportes).

## 🚀 Instalación Local

Si quieres correr este proyecto en tu máquina:

1.  **Clonar el repositorio:**

    ```bash
    git clone [https://github.com/TU_USUARIO/gowshardware.git](https://github.com/TU_USUARIO/gowshardware.git)
    ```

2.  **Instalar dependencias:**

    ```bash
    npm install
    ```

3.  **Iniciar servidor de desarrollo:**

    ```bash
    npm run dev
    ```

4.  **Ver en el navegador:**
    Abre `http://localhost:3000`.

## 📂 Estructura del Proyecto

```bash
src/
├── app/              # Next.js App Router (Páginas)
│   ├── build/        # Lógica del Armador de PC
│   ├── cart/         # Carrito y Checkout
│   ├── profile/      # Panel de Usuario
│   └── ...
├── components/       # Componentes React Reutilizables
│   ├── layout/       # Navbar, Footer, Hero
│   └── ui/           # Modales, Cards, Botones
├── data/             # Base de datos local (products.ts)
├── store/            # Estado Global (Cart Store)
└── types/            # Interfaces TypeScript
```

<div align="center"> Desarrollado con ❤️ por Gonzalo </div>
