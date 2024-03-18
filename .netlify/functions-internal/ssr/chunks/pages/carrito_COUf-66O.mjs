/* empty css                            */
import { c as createAstro, d as createComponent, r as renderTemplate, h as renderComponent } from '../astro_AjHO-7_l.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Layout } from './_id__A7-xgyV0.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { useStore } from '@nanostores/react';
import { atom } from 'nanostores';

const carrito$1 = atom([]);

const agregarCarrito = (producto) => {

    const carritoActual = carrito$1.get();
    const productoExistente = carritoActual.find(item => item.id === producto.id);

    if (productoExistente) return;

    const nuevoItem = {
        ...producto,
        cantidad: 1
    };

    carrito$1.set([...carritoActual, nuevoItem]);

    console.log("productos carrito:", carrito$1.get());
};

const modificarItem = (item) => {
    const carritoActual = carrito$1.get();
    const index = carritoActual.findIndex(producto => producto.id === item.id);
    
    if (index !== -1) {
        // Si se encuentra el ítem en el carrito, reemplazarlo con el nuevo ítem
        const nuevoCarrito = [...carritoActual];
        nuevoCarrito[index] = item;
        carrito$1.set(nuevoCarrito);
    }
};

const vaciarCarrito = () => {
    carrito$1.set([]);
};

const borrarItem = (id) => {
    carrito$1.set(carrito$1.get().filter(item => item.id !== id));
    console.log("productos carrito:", carrito$1.get());
};

const Table = () => {
  const $carrito = useStore(carrito$1);
  const [total, setTotal] = useState(0);
  const [productosVenta, setProductosVenta] = useState([]);
  useEffect(() => {
    const productos = $carrito.map((item) => ({
      producto: item.id,
      cantidad: item.cantidad,
      precio: item.attributes.precioVenta,
      subtotal: item.attributes.precioVenta * item.cantidad
    }));
    setProductosVenta(productos);
  }, [$carrito]);
  const obtenerFecha = () => {
    const fecha = /* @__PURE__ */ new Date();
    return fecha.toISOString().split("T")[0];
  };
  const confirmarVenta = () => {
    const confirmacion = window.confirm("¿Estás seguro de confirmar la venta?");
    if (confirmacion) {
      const datosVenta = {
        data: {
          fecha: obtenerFecha(),
          cliente: null,
          productos: productosVenta
        }
      };
      fetch("https://bk-ventas-production.up.railway.app/api/ventas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(datosVenta)
      }).then((response) => response.json()).then((data) => {
        console.log("Respuesta de la solicitud:", data);
      }).catch((error) => console.error("Error al enviar la venta:", error));
      alert("Gracias por su compra");
      vaciarCarrito();
    }
  };
  useEffect(() => {
    const total2 = $carrito.reduce(
      (total3, item) => total3 + item.attributes.precioVenta * item.cantidad,
      0
    );
    setTotal(total2);
  }, [$carrito]);
  const sumarCantidad = (item) => {
    item.cantidad += 1;
    modificarItem(item);
  };
  const restarCantidad = (item) => {
    if (item.cantidad <= 1) {
      return;
    }
    item.cantidad -= 1;
    modificarItem(item);
  };
  return /* @__PURE__ */ jsxs("div", { className: "container", children: [
    /* @__PURE__ */ jsx("div", { className: "m-2 col-end justify-content-center", children: /* @__PURE__ */ jsxs(
      "table",
      {
        className: "w-full text-sm text-left text-gray-500 dark:text-gray-400",
        style: { width: "100%" },
        children: [
          /* @__PURE__ */ jsx("thead", { className: "text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400", children: /* @__PURE__ */ jsxs("tr", { children: [
            /* @__PURE__ */ jsx("th", { scope: "col", className: "px-6 py-3", children: "Nombre" }),
            /* @__PURE__ */ jsx("th", { scope: "col", className: "px-6 py-3", children: "Precio" }),
            /* @__PURE__ */ jsx("th", { scope: "col", className: "px-6 py-3", children: "Sumar" }),
            /* @__PURE__ */ jsx("th", { scope: "col", className: "px-6 py-3", children: "Cantidad" }),
            /* @__PURE__ */ jsx("th", { scope: "col", className: "px-6 py-3", children: "Restar" }),
            /* @__PURE__ */ jsx("th", { scope: "col", className: "px-6 py-3", children: "SubTotal" }),
            /* @__PURE__ */ jsx("th", { scope: "col", className: "px-6 py-3", children: "Quitar" })
          ] }) }),
          /* @__PURE__ */ jsxs("tbody", { children: [
            $carrito.map((item) => /* @__PURE__ */ jsxs(
              "tr",
              {
                className: "bg-white border-b dark:bg-gray-800 dark:border-gray-700",
                children: [
                  /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: item.attributes.nombre }),
                  /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: item.attributes.precioVenta }),
                  /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => sumarCantidad(item),
                      className: "font-medium btn btn-primary hover:underline",
                      children: "+"
                    }
                  ) }),
                  /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: item.cantidad }),
                  /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => restarCantidad(item),
                      className: "font-medium btn btn-success hover:underline",
                      children: "-"
                    }
                  ) }),
                  /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: item.attributes.precioVenta * item.cantidad }),
                  /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx(
                    "button",
                    {
                      onClick: () => borrarItem(item.id),
                      className: "font-medium text-red-600 dark:text-red-500 hover:underline",
                      children: "Quitar"
                    }
                  ) })
                ]
              },
              item.id
            )),
            /* @__PURE__ */ jsxs("tr", { className: "bg-white border-b dark:bg-gray-800 dark:border-gray-700", children: [
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: "Total" }),
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: total }),
              /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => vaciarCarrito(),
                  className: "btn btn-danger",
                  children: "Vaciar"
                }
              ) })
            ] })
          ] })
        ]
      }
    ) }),
    /* @__PURE__ */ jsx("button", { onClick: () => confirmarVenta(), className: "btn btn-warning m-4", children: "Confirmar" })
  ] });
};

const $$Astro = createAstro();
const $$Carrito = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Carrito;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Table", Table, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/zeek2/OneDrive/Escritorio/FT-app-ventas/src/components/Table.jsx", "client:component-export": "default" })} ` })}`;
}, "C:/Users/zeek2/OneDrive/Escritorio/FT-app-ventas/src/pages/carrito.astro", void 0);

const $$file = "C:/Users/zeek2/OneDrive/Escritorio/FT-app-ventas/src/pages/carrito.astro";
const $$url = "/carrito";

const carrito = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Carrito,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { Table as T, agregarCarrito as a, borrarItem as b, carrito as c };
