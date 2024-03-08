/* -------------------------------------------------------------------------- */
/*                           Inventario de productos                          */
/* -------------------------------------------------------------------------- */

const cargarProductos = async () => {
    mostrarLoading();
    try {
        const endPoint = '../inventario.json';
        const respuesta = await fetch(endPoint);
        const json = await respuesta.json();
        inventario = json.data;
        renderizarTarjetasProductos(inventario);
    } catch (error) {
        Swal.fire({
            title: "Error",
            text: 'Ocurrió un error en el servidor',
            icon: "error",
            confirmButtomText: 'Aceptar'
        })
    }
    ocultarLoading();
}

//Categorías
/*  Tecnología
    Hogar
    Salud
    Belleza */