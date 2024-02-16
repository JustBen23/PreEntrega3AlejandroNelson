/* -------------------------------------------------------------------------- */
/*                           Inventario de productos                          */
/* -------------------------------------------------------------------------- */

const inventario = JSON.parse(localStorage.getItem('inventarioData')) || [];

const inventarioStock = JSON.parse(localStorage.getItem('inventarioStock')) || [];

//Categorías
/*  Tecnología
    Hogar
    Salud
    Belleza */