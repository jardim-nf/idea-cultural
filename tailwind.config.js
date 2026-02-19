/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ideia: {
          dark: '#0f172a',      // Fundo escuro / Texto principal
          primary: '#1e3a8a',   // Azul Institucional (Botões, Headers)
          secondary: '#10b981', // Verde Sereno (Ações positivas, detalhes)
          light: '#f8fafc',     // Fundo das telas (Off-white)
        }
      },
    },
  },
  plugins: [],
}