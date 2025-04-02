# Proyecto de Préstamos

Este sistema permite gestionar préstamos de manera sencilla, ofreciendo funcionalidades tanto para usuarios no registrados como para clientes y administradores.

## Características Principales

### Para usuarios no registrados:
- Solicitar un préstamo sin necesidad de crear una cuenta.
- Simular un préstamo para conocer el monto de las cuotas y el total a pagar.
- Registrarse como Cliente si desean acceder a funcionalidades adicionales.

### Para usuarios registrados:

#### Cliente
- Solicitar un préstamo como titular asociado a su cuenta.
- Visualizar sus préstamos activos y su estado.

#### Administrador
- Ver el listado completo de préstamos, incluyendo los de todos los usuarios y los solicitados sin registro.
- Cargar nuevos préstamos manualmente.
- Gestionar préstamos, pudiendo eliminarlos o marcarlos como pagados.

## Credenciales de Prueba
Actualmente, existe un usuario administrador con las siguientes credenciales:

- **Email:** monionline@gmail.com
- **Contraseña:** 1234aB

## Tecnologías Utilizadas

Este proyecto utiliza:
- Backend: Django
- Frontend: React
- Base de Datos: SQLite
- Entorno de Desarrollo: Docker

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalados:
- Docker
- Git

## Instalación y Configuración

1. Clonar el repositorio
   ```sh
   git clone https://github.com/usuario/proyecto.git
   cd proyecto
   ```

2. Levantar los contenedores
   Ejecuta el siguiente comando en la raíz del proyecto:
   ```sh
   docker-compose up --build
   ```
   Esto descargará las imágenes necesarias y creará los contenedores.

## Acceso a la Aplicación

- Backend: [http://localhost:8000](http://localhost:8000)
- Frontend: [http://localhost:5173](http://localhost:5173)