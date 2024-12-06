document.addEventListener("DOMContentLoaded", () => {
    const botonesAgregar = document.querySelectorAll(".btn-agregar");
    const carritoItems = document.getElementById("carrito-items");
    const carritoTotal = document.getElementById("carrito-total");
    const cartCount = document.getElementById("cart-count");
    const btnBorrarCarrito = document.getElementById("borrar-carrito");
  
    let carrito = [];
    let total = 0;
  
    // Función para guardar el carrito en las cookies
    function guardarCarritoEnCookies() {
      document.cookie = `carrito=${JSON.stringify(carrito)};path=/;max-age=86400`; // 1 día de duración
    }
  
    // Función para cargar el carrito desde las cookies
    function cargarCarritoDesdeCookies() {
      const cookies = document.cookie.split("; ").find(row => row.startsWith("carrito="));
      if (cookies) {
        carrito = JSON.parse(cookies.split("=")[1]);
        actualizarCarrito();
      }
    }
  
    // Escuchar el clic en los botones de "Agregar al carrito"
    botonesAgregar.forEach(boton => {
      boton.addEventListener("click", () => {
        const nombre = boton.getAttribute("data-nombre");
        const precioUnitario = parseFloat(boton.getAttribute("data-precio"));
  
        // Verificar si el producto ya está en el carrito
        const productoExistente = carrito.find(producto => producto.nombre === nombre);
  
        if (productoExistente) {
          // Si el producto ya está en el carrito, incrementar la cantidad
          productoExistente.cantidad++;
        } else {
          // Si el producto no está en el carrito, agregarlo con cantidad 1
          carrito.push({ nombre, precioUnitario, cantidad: 1 });
        }
  
        // Guardar en cookies y actualizar el carrito en el modal
        guardarCarritoEnCookies();
        actualizarCarrito();
      });
    });
  
    // Función para actualizar el carrito en la interfaz
    function actualizarCarrito() {
      // Mostrar productos seleccionados en el modal
      carritoItems.innerHTML = carrito
        .map(producto => {
          const totalProducto = producto.precioUnitario * producto.cantidad; // Precio total por producto
          return `
            <div>
              ${producto.nombre} - $${totalProducto.toFixed(2)} 
              (Cantidad: ${producto.cantidad})
            </div>
          `;
        })
        .join("");
  
      // Calcular el total
      total = carrito.reduce((acc, producto) => acc + producto.precioUnitario * producto.cantidad, 0);
      carritoTotal.textContent = `$${total.toFixed(2)}`;
  
      // Actualizar el contador de productos en el ícono del carrito
      cartCount.textContent = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    }
  
    // Escuchar clic en el botón de borrar carrito
    if (btnBorrarCarrito) {
      btnBorrarCarrito.addEventListener("click", () => {
        carrito = [];
        guardarCarritoEnCookies(); // Actualizar las cookies
        actualizarCarrito(); // Limpiar la interfaz
      });
    }
  
    // Cargar carrito desde las cookies al cargar la página
    cargarCarritoDesdeCookies();
  });
  