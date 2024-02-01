/* -------------------------------------------------------------------------- */
/*                             Productos en venta                             */
/* -------------------------------------------------------------------------- */

const contenedor = document.querySelector(".contenedor_tarjetas");
const inventario = JSON.parse(localStorage.getItem('inventario')) || [];

/* -------------------------------- Filtrado -------------------------------- */

const barraDeBusqueda = document.querySelector("#buscador");

const categoriaTec = document.querySelector("#categoria_tec");
const categoriaHog = document.querySelector("#categoria_hog");
const categoriaSal = document.querySelector("#categoria_sal");
const categoriaBel = document.querySelector("#categoria_bel");

const ordenMeMa = document.querySelector("#orden_me-ma");
const ordenMaMe = document.querySelector("#orden_ma-me");

const estadoN = document.querySelector("#estado_n");
const estadoU = document.querySelector("#estado_u");

const borrarFiltros = document.querySelector("#borrar_filtros");

/* ------------------------------------ x ----------------------------------- */


/* ------------------------------- Renderizado ------------------------------ */

const renderizarTarjetasProductos = (listaProducto) => {

    contenedor.innerHTML = '';

    listaProducto.forEach(element => {

        contenedor.innerHTML += //html
                                `<div class="tarjeta">
                                    <img src="${element.imagen}" alt="" class="imagen_producto">
                                    <div class="opciones_carrito">
                                        <div class="contenedor">
                                            <div class="cantidad">
                                                <button id="${element.id}" class="mas">+</button>
                                                <div id="${element.id}" class="numero">${element.cantidadAgregarACarrito}</div>
                                                <button id="${element.id}" class="menos">-</button>
                                            </div>
                                        </div>
                                    </div>
                                    <button class="favoritos"><i id="${element.id}" class='bx ${element.favorito ? "bxs-heart" : "bx-heart"}'></i></button>
                                    <div class="producto">
                                        <h2>${element.nombre}</h2>
                                        <p>${element.descipcion}</p>
                                    </div>
                                    <div class="valoracion">
                                        <h3 class="precio">${element.precio.toFixed(2)}$</h3>
                                        <p>${element.valoracion}<span class="estrellas">
                                            <i class='bx ${estrellasValoraciones(element.valoracion)[0]}'></i>
                                            <i class='bx ${estrellasValoraciones(element.valoracion)[1]}'></i>
                                            <i class='bx ${estrellasValoraciones(element.valoracion)[2]}'></i>
                                            <i class='bx ${estrellasValoraciones(element.valoracion)[3]}'></i>
                                            <i class='bx ${estrellasValoraciones(element.valoracion)[4]}'></i>
                                        </span>
                                        </p>
                                        <p>(${element.stock})</p>
                                    </div>

                                    <button id="${element.id}" class="addToCart" type="button">Añadir al carrito</button>
                                </div>`;
                                
    });

    // Añadir al carrito de compras
    const botonAdd = document.querySelectorAll(".addToCart");
    botonAdd.forEach(element => {
        element.addEventListener('click', agregarAlCarro);
    });

    const botonFav = document.querySelectorAll(".favoritos");
    botonFav.forEach(element => {
        element.addEventListener('click', (ev) => {
            favoritoSiONo(ev.target.id);
        });
    });

    // Boton para agregar productos al carrito
    const botonMas = document.querySelectorAll(".mas");
    botonMas.forEach(element => {
        element.addEventListener('click', (ev) => {
            sumarCantidad(ev.target.id);
        });
    });

    // Boton para restar productos al carrito
    const botonMenos = document.querySelectorAll(".menos");
    botonMenos.forEach(element => {
        element.addEventListener('click', (ev) => {
            restarCantidad(ev.target.id);
        });
    });

}

/* ------------------------------------ x ----------------------------------- */


/* --------------------- Funcionamiento de las tarjetas --------------------- */

const estrellasValoraciones = (valoracion) => {

    //Lista usada para renderizar la valoración en estrellas
    let list = [0, 0, 0, 0, 0];

    //Ciclo de rederización
    for (let i = 0; i < list.length; i++) {
        
        // Condicional usada para poder llenar la lista de renderización
        // En este caso está asignando valores en la lista de 0 y 1 
        // en los cuales 1 representa una estrella completa y 0 una estrella vacía
        // los valores intermedio se hacen default como media estrella y se va restando
        // a la variable valoración el valor de la asignación en forma de contador

        if(valoracion != 0) {
            if(valoracion >= 1) {
                list[i] +=1;
                valoracion -=1;
            } else if(valoracion < 1){
                list[i] += 0.5;
                valoracion -= valoracion;
            }
        } 

        //Asignación de la clase de las estrellas para renderización
        if (list[i] == 0) {
            list[i] = "bx-star";
        } else if (list[i] == 1) {
            list[i] = "bxs-star";
        } if (list[i] == 0.5) {
            list[i] = "bxs-star-half"
        }
    }
    
    return list;
};

const agregarAlCarro = (element) => {
    const id = element.target.id; 
    const producto = inventario.find(elemento => elemento.id == id);
    carro.añadirProductoCarrito(producto);
    if (producto.stock == 0) {
        producto.stock = 0;
    } else {
        producto.stock -= producto.cantidadAgregarACarrito;
    }
    producto.cantidadAgregarACarrito = 1;
    localStorage.setItem('inventario', JSON.stringify(listaProductos));
    renderizarTarjetasProductos(inventario);
}

const favoritoSiONo = (id) => {
    let corazon = inventario.find(element => element.id == id);
    if (corazon.favorito == true) {
        corazon.favorito = false;;
    } else if (corazon.favorito == false) {
        corazon.favorito = true;
    }
    renderizarTarjetasProductos(inventario);
}

const sumarCantidad = (id) => {
    let productoAComprar = inventario.find(element => element.id == id);
    productoAComprar.cantidadAgregarACarrito++;

    renderizarTarjetasProductos(inventario);
}

const restarCantidad = (id) => {
    let productoAComprar = inventario.find(element => element.id == id);

    if (productoAComprar.cantidadAgregarACarrito > 1) { 
        productoAComprar.cantidadAgregarACarrito--;
    } else if (productoAComprar.cantidadAgregarACarrito == -1){
        productoAComprar.cantidadAgregarACarrito = 1;
    }
    renderizarTarjetasProductos(inventario);

}

/* ------------------------------------ x ----------------------------------- */


/* -------------------------------------------------------------------------- */
/*                               Area De filtros                              */
/* -------------------------------------------------------------------------- */

categoriaTec.addEventListener('click', () => {
    const productoFiltrado = inventario.filter((producto) => producto.categoria === "Tecnología");
    renderizarTarjetasProductos(productoFiltrado);
})

categoriaHog.addEventListener('click', () => {
    const productoFiltrado = inventario.filter((producto) => producto.categoria === "Hogar");
    renderizarTarjetasProductos(productoFiltrado);
})

categoriaSal.addEventListener('click', () => {
    const productoFiltrado = inventario.filter((producto) => producto.categoria === "Salud");
    renderizarTarjetasProductos(productoFiltrado);
})

categoriaBel.addEventListener('click', () => {
    const productoFiltrado = inventario.filter((producto) => producto.categoria === "Belleza");
    renderizarTarjetasProductos(productoFiltrado);
})


ordenMeMa.addEventListener('click', () => {
    inventario.sort((a,b) => {
        if(a.precio < b.precio){
            return -1;
        }
        if (a.precio > b.precio){
            return 1;
        }
        return 0;
    });
    renderizarTarjetasProductos(inventario);
})

ordenMaMe.addEventListener('click', () => {
    inventario.sort((a,b) => {
        if(a.precio < b.precio){
            return 1;
        }
        if (a.precio > b.precio){
            return -1;
        }
        return 0;
    });
    renderizarTarjetasProductos(inventario);
})


estadoN.addEventListener('click', () => {
    const productoFiltrado = inventario.filter((producto) => producto.estado === "Nuevo");
    renderizarTarjetasProductos(productoFiltrado);
})

estadoU.addEventListener('click', () => {
    const productoFiltrado = inventario.filter((producto) => producto.estado === "Usado");
    renderizarTarjetasProductos(productoFiltrado);
})


borrarFiltros.addEventListener('click', () => {
    renderizarTarjetasProductos(inventario);
})


barraDeBusqueda.addEventListener("input", (evento) => {
    const inputElemento = evento.target.value;
    const productoBuscado = inventario.filter((producto) => producto.nombre.toLowerCase().includes(inputElemento.toLowerCase()));
    
    renderizarTarjetasProductos(productoBuscado);
});

/* ------------------------------------ x ----------------------------------- */

renderizarTarjetasProductos(inventario);