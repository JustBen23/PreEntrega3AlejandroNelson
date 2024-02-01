class Carrito {
    constructor(carritoDeCompras = []) {
        this.carro = carritoDeCompras;
    }

    añadirProductoCarrito({id, imagen, nombre, precio, descuento, stock, cantidadAgregarACarrito, cantidadEnCarrito}) {
        
        // Determina la posición del producto agregado en el carro para poder modificar su valor en caso de que se encuentre dentro del carro
        const posicionProductoAAgregar = this.carro.findIndex(producto => producto.id == id);

        // Determina la posición del producto a agregar para poder restarle stock
        const posicionProductoAAgregado = listaProductos.findIndex(producto => producto.id == id);

        if (posicionProductoAAgregar == -1) {
            if(stock == 0) {

                console.log("No hay stock, no se puede agregar al carrito");

            } else if(stock >= 1) {
                if (cantidadAgregarACarrito > 1) {
                    if (stock < cantidadAgregarACarrito) {
                        console.log("No hay más stock, no se puede agregar al carrito");
                    } else if (stock >= cantidadAgregarACarrito) {
                        cantidadEnCarrito += cantidadAgregarACarrito;
                        this.carro.push({id, imagen, nombre, precio, descuento, cantidadEnCarrito});
                        // Resta el stock del producto
                        listaProductos[posicionProductoAAgregado].stock -= cantidadAgregarACarrito;
                    }         
                } else if (cantidadAgregarACarrito == 1) {
                    cantidadEnCarrito += 1;
                    this.carro.push({id, imagen, nombre, precio, descuento, cantidadEnCarrito});
                    // Resta el stock del producto
                    listaProductos[posicionProductoAAgregado].stock -= 1;
                }
            }
        } else {
            if(stock == 0) {

                console.log("No hay más stock, no se puede agregar al carrito");

            } else if(stock >= 1) {
                if (cantidadAgregarACarrito > 1) {
                    if (stock < cantidadAgregarACarrito) {
                        console.log("No hay más stock, no se puede agregar al carrito");
                    } else if (stock >= cantidadAgregarACarrito) {
                        this.carro[posicionProductoAAgregar].cantidadEnCarrito += cantidadAgregarACarrito;
                        // Resta el stock del producto
                        listaProductos[posicionProductoAAgregado].stock -= cantidadAgregarACarrito;
                    }
                } else if (cantidadAgregarACarrito == 1) {
                    this.carro[posicionProductoAAgregar].cantidadEnCarrito += 1;
                    // Resta el stock del producto
                    listaProductos[posicionProductoAAgregado].stock -= 1;
                }
            }
        }
        localStorage.setItem('carro', JSON.stringify(this.carro));
        localStorage.setItem('inventario', JSON.stringify(listaProductos));
    }

    eliminarProductoCarrito({id, cantidadAgregarACarrito}) {
        const posicionProductoAEliminar = this.carro.findIndex(producto => producto.id == id);

        cantidadAgregarACarrito = 0;

        this.carro.splice(posicionProductoAEliminar, 1);

        localStorage.setItem('carro', JSON.stringify(this.carro));
        localStorage.setItem('inventario', JSON.stringify(listaProductos));
    }

    obtenerProductosCarrito() {
        return this.carro;
    }

    cantidadTotalDeProdutosEnCarrito() {
        let suma = 0;
        for (let i = 0; i < this.carro.length; i++) {
            suma += this.carro[i].cantidadEnCarrito;
        }
        return suma;
    }

    totalDeCompra() {
        let suma = 0;
        for (let i = 0; i < this.carro.length; i++) {
            suma += this.carro[i].precio * this.carro[i].cantidadEnCarrito;
        }
        return suma;
    }
}

const contenedorCarro = document.querySelector(".contenedores_de_tarjetas");
const contenedorCostos = document.querySelector(".costos_del_producto");
const carroDeCompras = JSON.parse(localStorage.getItem('carro')) || [];
const carro = new Carrito(carroDeCompras);
const listaEnCarrito = carro.obtenerProductosCarrito();


const renderizarCarro = (listaCarrito) => {

    if (listaCarrito != '') {
        contenedorCarro.innerHTML = '';
    } else {
        contenedorCarro.innerHTML = //html
                                    `<h2 class="carro_vacio">Tu carrito de compras se encuentra vacío</h2>`;
    }

    listaCarrito.forEach(element => {
        contenedorCarro.innerHTML += //html
                                    `<div class="tarjeta_lista_producto">
                                    <div class="contenedor_imagen_lista">
                                        <img src="${element.imagen}" alt="">
                                    </div>
                                    <div class="datos_lista_producto">
                                        <h2>${element.nombre}</h2>
                                        <p>En carrito: ${element.cantidadEnCarrito}</p>
                                        <p>${element.precio.toFixed(2)}$</p>
                                    </div>
                                    <button id="${element.id}"class="retirar_de_lista">X</button>
                                </div>`;
    });

    const elementoAEliminarDelCarro = document.querySelectorAll(".retirar_de_lista");
    elementoAEliminarDelCarro.forEach(element => {
        element.addEventListener('click', eliminarDelCarrito);
    }); 
}

const renderizarCostos = (lista) => {

    contenedorCostos.innerHTML = //html
                                `<div class="costo_total_producto">
                                <div class="costos">
                                    <div class="columna_nombres">
                                        <p>Productos: </p>
                                        <p>Envío: </p>
                                    </div>
                                    <div class="columna_valores">
                                        <p>${carro.cantidadTotalDeProdutosEnCarrito()}</p>
                                        <p>Gratis</p>
                                    </div>
                                </div>
                                <div class="total">
                                    <div class="columna_nombres">
                                        <p>Total compra: </p>
                                    </div>
                                    <div class="columna_valores">
                                        <p>${carro.totalDeCompra().toFixed(2)}$</p>
                                    </div>
                                </div>
                            </div>`;
}


const eliminarDelCarrito = (elemento) => {
    const id = elemento.target.id;
    const producto = carroDeCompras.find(elemento => elemento.id == id);
    carro.eliminarProductoCarrito(producto);
    producto.stock += producto.cantidadEnCarrito;
    producto.cantidadEnCarrito = 0;
    localStorage.setItem('inventario', JSON.stringify(listaProductos));
    renderizarCostos(listaEnCarrito);
    renderizarCarro(listaEnCarrito);
}


renderizarCostos(listaEnCarrito);
renderizarCarro(listaEnCarrito);
