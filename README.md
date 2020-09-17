Proyecto final del Bootcamp de Backend con express de Geekshubs academy.

Se trata de una api-rest para una e-commerce mediante express que utiliza Mongodb como base de datos y que gestiona todos los datos de los usuarios, productos y actos de venta de la tienda. 

Para empezar:
    - npm install (para instalar node modules)
    - npm start (para arrancar la API REST)

pd: Es necesario tener MongoDB instalado para poder arrancar la API REST. 

Los endpoints de la Api son los siguientes:

Usuario:

    - /users/all 
    Método get que devuelve todos los usuarios de la base de datos.
    Acceso solo usuarios con role de administrador.

    - /users/email/:email 
    Método get que devuelve un usuario al pasarle su email.
    Acceso solo usuarios con role de administrador o vendedor.

    - /users/user
    Método get que devuelve todos los usuarios de la base de datos con role de usuario.
    Acceso solo usuarios con role de administrador o vendedor.

    - /users/seller
    Método get que devuelve todos los usuarios de la base de datos con role de vendedor.
    Acceso solo usuarios con role de administrador o vendedor.

    - /users/admin
    Método get que devuelve todos los usuarios de la base de datos con role de administrador.
    Acceso solo usuarios con role de administrador.

    - /users/register
    Método post que registra un usuario en la base de datos.
    Acceso para todos los usuarios.

    - /users/delete/:email
    Método delete que elimina a un usuario de la base de datos.
    Acceso solo usuarios con role de administrador.

    - /users/login
    Método get que logea al usuario en la tienda y devuelve un token de acceso.
    Acceso para todos los roles de usuario.

    - /users/update/:email
    Método put que actualiza los datos de un usuario.
    Acceso para todos los roles de usuario.

Producto:

    - /products/register/all
    Método post que registra todos los productos de ddbb_coches.json para poder testear la Api con facilidad.
    Acceso para todos los roles de usuario.

    - /products/register
    Método post que registra un nuevo producto en la base de datos.
    Acceso solo para roles de adminsitrador.

    - /products/delete
    Método delete que elimina un producto en la base de datos.
    Acceso solo para roles de adminsitrador.

    - /products/update
    Método put que actualiza un producto en la base de datos.
    Acceso solo para roles de adminsitrador.

    - /products/all
    Método get que devuelve todos los productos de la tienda.
    Acceso para todos los roles de usuario.

    - /products/all/category
    Método get que devuelve todos los productos de una categoria en concreto.
    Acceso para todos los roles de usuario.

    - /products/all/price
    Método get que devuelve todos los productos que estén entre un rango de precios en concreto.
    Acceso para todos los roles de usuario.

    - /products/all/seller
    Método get que devuelve todos los productos vendidos por un vendedor en concreto.
    Acceso para roles de administrador y vendedor.

    - /products/all/category/sold
    Método get que devuelve todos los productos vendidos de una categoria en concreto.
    Acceso para roles de adminstrador y vendedor.

    - /products/all/category/stock
    Método get que devuelve todos los productos de una categoria en concreto que estén en stock.
    Acceso para todos los roles de usuario.

    - /products/all/stock
    Método get que devuelve todos los productos en stock de la tienda.
    Acceso para todos los roles de usuario.

Actos de venta: 

    - /carts/register
    Método post que registra un nuevo acto de venta.
    Acceso para todos los roles de usuario.

    - /carts/update
    Método put que actualiza un acto de venta.
    Acceso para todos los roles de usuario.

    - /carts/all
    Método get que devuelve todos los actos de venta.
    Acceso para roles de administrador y vendedor.

    - /carts/cartNumber
    Método get que busca un acto de venta mediante el número de identificación del acto de venta.
    Acceso para todos los roles de usuario.

    - /carts/all/user
    Método get que devuelve los actos de venta de un usuario.
    Acceso para todos los roles de usuario.

    - /carts/all/seller
    Método get que devuelve los actos de venta de un vendedor.
    Acceso para roles de administrador y vendedor.

    - /carts/update/seller
    Método put que permite a un vendedor modificar un acto de venta en concreto.
    Acceso para todos los roles de vendedor.

    - /carts/store/collection
    Método get que devuelve la cantidad la recaudación de la tienda.
    Acceso para roles de administrador y vendedor.

    - /carts/pay
    Método put que permite a un usuario pagar un acto de venta.
    Acceso para todos los roles de usuario.

    - /carts/paidOut
    Método get que devuelve todos los actos de venta pagados.
    Acceso para roles de adminstrador y vendedor.