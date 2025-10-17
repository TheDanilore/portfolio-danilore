# 📄 Instrucciones para Certificados

## 📂 Estructura de carpetas

Coloca tus certificados PDF en esta carpeta con los siguientes nombres:

```
frontend/public/assets/docs/certificates/
├── alura_data_science.pdf
├── alura_ml.pdf
├── alura_python.pdf
├── alura_javascript.pdf
├── alura_emprendimiento.pdf
├── alura_desarrollo_personal.pdf
├── umng_programacion.pdf
├── umng_ecommerce.pdf
├── mtpe_frontend.pdf
├── mtpe_backend.pdf
├── cisco_ccna.pdf
├── codigofacilito_java.pdf
├── telefonica_excel.pdf
├── utp_docencia.pdf
└── utp_ingles_a2.pdf
```

## 🔄 Alternativa: Usar imágenes

Si prefieres usar imágenes (JPG/PNG) en lugar de PDFs:

1. Cambia la extensión en `CertificationsSection.vue`:
   ```javascript
   file: '/assets/docs/certificates/nombre_certificado.jpg'
   ```

2. El modal detectará automáticamente si es imagen o PDF

## 📝 Recomendaciones

✅ **Usar PDFs** (recomendado):
- Mejor calidad profesional
- Tamaño de archivo optimizado
- Texto seleccionable
- Fácil de imprimir

❌ **Usar imágenes** solo si:
- No tienes los PDFs originales
- Los certificados solo existen en formato imagen

## 🎯 Cómo obtener tus certificados

1. **Alura Latam**: Ingresa a tu perfil → Mis cursos → Descargar certificado
2. **CISCO**: Networking Academy → Mis certificados
3. **Código Facilito**: Panel de usuario → Certificados
4. **Universidades**: Solicita al departamento académico

## 📊 Optimización de PDFs

Para reducir el tamaño de los PDFs:

1. **Online**: https://www.ilovepdf.com/compress_pdf
2. **Adobe Acrobat**: File → Optimize PDF
3. **Ghostscript** (línea de comandos):
   ```bash
   gs -sDEVICE=pdfwrite -dCompatibilityLevel=1.4 -dPDFSETTINGS=/ebook -dNOPAUSE -dQUIET -dBATCH -sOutputFile=output.pdf input.pdf
   ```

## 🚀 Resultado

Una vez que coloques tus certificados en esta carpeta:

1. ✅ Se mostrarán en el modal al hacer clic
2. ✅ Se podrán ampliar/reducir
3. ✅ Se podrán descargar
4. ✅ Pantalla completa disponible

---

**Nota**: Si no tienes algún certificado aún, puedes:
- Comentar esa entrada en el array `certifications`
- O crear un PDF placeholder temporal
