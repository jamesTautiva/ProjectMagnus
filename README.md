# ProjectMagnus

Esta API proporciona una estructura segura y organizada para gestionar una plataforma de música. Los usuarios pueden interactuar con los recursos de artistas, canciones y álbumes, mientras que se garantiza la seguridad de la información mediante encriptación y autenticación avanzada.

#Ejemplo de flujo de trabajo:
Registro de Usuario : Un nuevo usuario se registra con su correo y contraseña. La contraseña se encripta y se almacena en la base de datos.
Inicio de sesión : El usuario inicia sesión proporcionando su correo y contraseña. Si las credenciales son correctas, el servidor genera un token JWT que será usado para autenticar futuras solicitudes.
Gestión de Contenido : Un usuario autenticado puede interactuar con la API para gestionar artistas, álbumes y canciones. Los datos de las solicitudes se validan y se procesan, y solo los usuarios con permisos adecuados pueden realizar acciones como la creación y eliminación de contenido.
