# KetoLife Pro - Demo Empresarial

## 🚀 Descripción
Aplicación web PWA (Progressive Web App) para nutrición cetogénica con inteligencia artificial, cálculo de macros en tiempo real y seguimiento completo del estilo de vida keto.

## ✨ Características Demo

### **1. Base de Datos Inteligente**
- ✅ 200+ alimentos keto precargados (funciona offline)
- ✅ Búsqueda en tiempo real con sugerencias automáticas
- ✅ Cálculo automático de **net carbs** (carbohidratos netos)
- ✅ Integración con Nutritionix API (opcional, 10,000+ alimentos)
- ✅ Creación de alimentos personalizados por el usuario

### **2. Cálculo de TMB y Macros**
- ✅ Fórmula **Mifflin-St Jeor** (método científico)
- ✅ Ajuste por nivel de actividad física
- ✅ Distribución automática de macros:
  - 75% Grasas | 20% Proteínas | 5% Carbohidratos
- ✅ Objetivos: pérdida, mantenimiento o ganancia de peso

### **3. Seguimiento en Tiempo Real**
- ✅ **Dashboard** con métricas clave (peso, ayuno, racha keto)
- ✅ **Registro de alimentos** con resumen diario visual
- ✅ **Gráficos de progreso** con historial completo
- ✅ Datos persistentes en localStorage (no se pierden al cerrar la app)

### **4. Tecnología**
- **Frontend**: HTML5, CSS3 (Tailwind), JavaScript Vanilla
- **Animaciones**: Three.js + Vanta.js (fondo interactivo)
- **Storage**: localStorage (100% cliente, no servidor necesario)
- **APIs**: Nutritionix (opcional), Gemini AI (opcional)
- **Diseño**: Mobile-first, glassmorphism, 60fps animations

## 🎯 Demo en Vivo

**URL GitHub Pages**: `https://TU_USUARIO.github.io/ketolife/`

### **Credenciales Demo** (si aplica)
- **Modo**: Funciona sin registro, datos guardados localmente
- **API Key**: Configurable para búsquedas ilimitadas

## 📊 Demo de Uso

### **Prueba 1: Búsqueda Inteligente**
1. Ve a **Seguimiento de Macros**
2. Escribe "aguacate" en "Alimento"
3. Selecciona de las sugerencias
4. Añade 150g → Verás cálculo automático

### **Prueba 2: Cálculo TMB**
1. Ve a **Calculadora TMB**
2. Rellena: 30 años, Hombre, 80kg, 175cm, Moderado, Perder peso
3. Calcula → Verás: TMB, TDEE y macros objetivo

### **Prueba 3: Datos Persistentes**
1. Añade peso: 75.0 kg
2. Recarga la página (F5)
3. Los datos siguen ahí → **localStorage funciona**

## 🔧 Instalación para Desarrollo

### **Opción 1: GitHub Pages (Producción)**
```bash
git clone https://github.com/TU_USUARIO/ketolife.git
# Sube los 3 archivos a GitHub y activa Pages en Settings