# 🗄️ Configuración de Neon Database

## 📋 Variables de Entorno para Vercel

Debes agregar estas **5 variables** en Vercel:

### En Vercel Dashboard:

1. Ve a tu proyecto en [vercel.com](https://vercel.com)
2. Click en **Settings** → **Environment Variables**
3. Agrega una por una:

```bash
PGHOST=ep-cool-rain-ad0kocck-pooler.c-2.us-east-1.aws.neon.tech
PGDATABASE=neondb
PGUSER=neondb_owner
PGPASSWORD=npg_AkRIVhH48jbT
PGPORT=5432
```

**IMPORTANTE**: Para cada variable:
- ✅ Selecciona todos los ambientes: **Production, Preview, Development**
- ✅ Click en **"Save"**

### O desde la Terminal (Vercel CLI):

```bash
vercel env add PGHOST
# Pegar: ep-cool-rain-ad0kocck-pooler.c-2.us-east-1.aws.neon.tech
# Seleccionar: Production, Preview, Development

vercel env add PGDATABASE
# Pegar: neondb

vercel env add PGUSER
# Pegar: neondb_owner

vercel env add PGPASSWORD
# Pegar: npg_AkRIVhH48jbT

vercel env add PGPORT
# Pegar: 5432
```

---

## 🗃️ Crear las Tablas en Neon

### Opción 1: Desde Neon Dashboard

1. Ve a [console.neon.tech](https://console.neon.tech)
2. Selecciona tu proyecto
3. Ve a **SQL Editor**
4. Copia y pega el contenido completo de `database/schema.sql`
5. Click en **"Run"**

### Opción 2: Desde tu Terminal Local

```bash
# Conectar a Neon
psql 'postgresql://neondb_owner:npg_AkRIVhH48jbT@ep-cool-rain-ad0kocck-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require'

# Luego ejecutar el schema
\i C:/xampp/htdocs/promail/database/schema.sql

# O copiar y pegar el contenido del archivo schema.sql
```

### Opción 3: Un solo comando

```bash
psql 'postgresql://neondb_owner:npg_AkRIVhH48jbT@ep-cool-rain-ad0kocck-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require' < database/schema.sql
```

---

## ✅ Verificar que Funcionó

### Desde Neon SQL Editor:

```sql
-- Ver todas las tablas creadas
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public';

-- Ver los planes cargados
SELECT * FROM plans;

-- Debe mostrar 3 planes: Starter, Business, Enterprise
```

### Desde tu sitio (después del deploy):

1. Ve a: `https://tu-sitio.vercel.app/test.html`
2. Click en **"Probar Conexión"**
3. Debería decir: ✅ Conexión exitosa

---

## 🔄 Redeploy en Vercel

**IMPORTANTE**: Después de agregar las variables, debes hacer redeploy:

1. Ve a **Deployments** en Vercel
2. Click en los 3 puntos del último deployment
3. Click en **"Redeploy"**

O simplemente haz push de nuevo:

```bash
git add .
git commit -m "chore: Trigger redeploy with Neon variables"
git push origin main
```

---

## 🎯 Lo que va a funcionar con la DB:

✅ **Formulario de contacto** - Guardará contactos en Neon  
✅ **API de contactos** - GET/POST funcionando  
✅ **Panel de pruebas** - Podrás ver los contactos guardados  
✅ **Futuro chat** - Se podrá guardar historial  

---

## 🔐 Seguridad

⚠️ **NUNCA** hagas commit de las credenciales en el código  
✅ Siempre usa variables de entorno  
✅ Las credenciales están seguras en Vercel  
✅ SSL habilitado por defecto (`sslmode=require`)  

---

## 📊 Plan de Neon

Tu plan actual:
- **Free Tier** de Neon
- ✅ 512 MB de almacenamiento
- ✅ 10,000 rows (suficiente para empezar)
- ✅ SSL incluido
- ✅ Backups automáticos

---

## 🆘 Troubleshooting

### Error: "could not connect to server"
- Verifica que las variables estén bien copiadas
- Revisa que hayas hecho redeploy después de agregarlas

### Error: "password authentication failed"
- Verifica la variable `PGPASSWORD`
- Asegúrate que no tenga espacios al inicio/final

### Error: "SSL connection required"
- Ya está configurado en `database.php` con `sslmode=require`

### Las tablas no se crearon
- Ejecuta manualmente el `schema.sql` en Neon SQL Editor
- Verifica con: `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';`

---

## 📝 Resumen Rápido

1. ✅ Agregar 5 variables en Vercel
2. ✅ Ejecutar `schema.sql` en Neon
3. ✅ Redeploy en Vercel
4. ✅ Probar en `/test.html`

¡Listo! Tu base de datos estará funcionando. 🎉

---

**Connection String Completo** (para referencia):
```
postgresql://neondb_owner:npg_AkRIVhH48jbT@ep-cool-rain-ad0kocck-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require
```
