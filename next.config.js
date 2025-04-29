/** @type {import('next').NextConfig} */
const nextConfig = {
  // Aktiviert den statischen Export
  output: 'export',

  // Optional: Hängt jeweils ein Slash an URLs und legt Dateien in index.html ab
  trailingSlash: true,

  // Optional: anderes Ausgabe-Verzeichnis
  // distDir: 'dist',
}

module.exports = nextConfig
