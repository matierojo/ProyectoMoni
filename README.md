# Introduccion

...

# Proyecto con Django y React en Docker

Este proyecto utiliza **Docker** para levantar un entorno de desarrollo con un backend en **Django** y un frontend en **React**. El backend utiliza la base "db.sqlite3" que nos proporciona Django.

## Requisitos Previos

Para poder levantar el proyecto solo debes tener instalado Docker y Git.

## Instalación y Configuración

1. **Clonar el repositorio**
   ```sh
   git clone https://github.com/usuario/proyecto.git
   cd proyecto
   ```

2. **Levantar los contenedores**
   Ejecuta el siguiente comando en la raíz del proyecto:
   ```sh
   docker-compose up --build
   ```
   Esto descargará las imágenes necesarias y creará los contenedores.

3. **Verificar que todo funciona**
   - **Backend**: Abre [http://localhost:8000]
   - **Frontend**: Abre [http://localhost:5173]


# Simulador de Prestamos.

Al iniciar desde la pantalla principal tenes las siguientes opciones:

1. Pedir un prestamo sin loguearte.
2. Simular un prestamo para saber cuanto vas a pagar y en cuanto te van a quedar las cuotas.
3. Iniciar sesion con tu usuario y en caso de no tener usuario se podra registrar con el rol "Cliente".

Al iniciar sesion, existen dos posibilidades:

1. Iniciar sesion con usuario con rol "Administrador", el cual podra ver un listado de todos los prestamos (de todos los usuarios y de los que solicitaron prestamo sin ser usuario) y cargar nuevos prestamos.
2. Iniciar sesion con un usuario con rol "Cliente". En este caso podras pedir un prestamo que tendra a este usuario como titular y por otro lado ver los prestamos que tiene el usuario.

Actualmente existe el siguien usuario con rol "Administrador":
   - email: monionline@gmail.com
   - contraseña: 1234aB

Dentro del listado de prestamos, se podra eliminar o marcar como pagado el prestamo que se desee.
