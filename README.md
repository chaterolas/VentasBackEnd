## VentasBackEnd
Servicio Rest manejar la persistencia de la entidad Venta

Venta:

  _id
  
  producto
  
  tamano
  
  cantidad
  
  precio
  
  tienda

## Instalación

### Node.js
En necesario tener Node.js instalado localmente.
https://nodejs.org/es/

### MongoDB
Es necesario tener MongoDB versión >= 3.0 instalado localmente.
* Sitio para descargar
https://www.mongodb.com/download-center#community

* Instrucciones para instalar
https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/#install-mongodb-community-edition

## Para ejecutar el programa

Sobre el directorio raíz es necesario ejecutar el comando:

$ npm install

para instalar todas las dependencias del proyecto.

Finalmente para levantar el servidor que proveerá el servicio rest ejecutamos el siguiente comando:

$ node server.js
