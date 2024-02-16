/* -------------------------------------------------------------------------- */
/*                           Inventario de productos                          */
/* -------------------------------------------------------------------------- */

const inventario = JSON.parse(localStorage.getItem('inventarioData')) || [];

const inventarioStock = JSON.parse(localStorage.getItem('inventarioStock')) || [];

// localStorage.setItem('inventario', JSON.stringify(listaProductos));

//Categorías
/*  Tecnología
    Hogar
    Salud
    Belleza */