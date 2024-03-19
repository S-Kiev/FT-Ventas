/* empty css                            */
import { c as createAstro, d as createComponent, r as renderTemplate, h as renderComponent } from '../astro_AjHO-7_l.mjs';
import 'kleur/colors';
import 'html-escaper';
import { $ as $$Layout } from './_id__BSBV1cc5.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { a as agregarCarrito, b as borrarItem, T as Table } from './carrito_C-6UdXLM.mjs';
/* empty css                          */

const CardProducto = () => {
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setFiltrados] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("");
  const [detalle, setDetalle] = useState("/producto/");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://bk-ventas-production.up.railway.app/api/productos?pagination[page]=1&pagination[pageSize]=91");
        const data = await response.json();
        setProductos(data.data);
        setFiltrados(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const handleFilter = (e) => {
    const valorBusqueda = e.target.value.toLowerCase();
    setBusqueda(valorBusqueda);
    applyFilters(valorBusqueda, categoria);
  };
  const handleReset = () => {
    setBusqueda("");
    applyFilters("", categoria);
  };
  const handleFilterByCategory = (e) => {
    const valorCategoria = e.target.value.toLowerCase();
    setCategoria(valorCategoria);
    applyFilters(busqueda, valorCategoria);
  };
  const applyFilters = (busqueda2, categoria2) => {
    let filteredProducts = productos.filter(
      (producto) => producto.attributes.nombre.toLowerCase().includes(busqueda2) && (categoria2 === "todas" || producto.attributes.categoria.toLowerCase() === categoria2)
    );
    setFiltrados(filteredProducts);
  };
  return /* @__PURE__ */ jsxs("div", { className: "row", children: [
    /* @__PURE__ */ jsxs("div", { className: "sticky-top bg-gray-50", children: [
      /* @__PURE__ */ jsx("nav", { className: "navbar navbar-expand-lg bg-body-tertiary m-1 bg-slate-600", children: /* @__PURE__ */ jsxs("div", { className: "input-group", children: [
        /* @__PURE__ */ jsx("input", { type: "text", placeholder: "Buscador", value: busqueda, onChange: handleFilter, className: "form-control m-2" }),
        /* @__PURE__ */ jsx("div", { className: "input-group-append m-2", children: /* @__PURE__ */ jsx("button", { onClick: handleReset, className: "btn btn-outline-danger", children: "Resetear" }) })
      ] }) }),
      /* @__PURE__ */ jsxs("select", { class: "form-select m-1", "aria-label": "Categorias", onChange: handleFilterByCategory, value: categoria, children: [
        /* @__PURE__ */ jsx("option", { value: "todas", selected: true, children: "Todas" }),
        /* @__PURE__ */ jsx("option", { value: "comestible", children: "Comestibles" }),
        /* @__PURE__ */ jsx("option", { value: "higiene", children: "Higuiene" }),
        /* @__PURE__ */ jsx("option", { value: "medicamento", children: "Medicamentos" })
      ] })
    ] }),
    productosFiltrados.map((item) => /* @__PURE__ */ jsxs("div", { className: "card custom-card", style: { width: "95%" }, children: [
      /* @__PURE__ */ jsx("a", { href: detalle + item.id, children: /* @__PURE__ */ jsx("img", { src: item.attributes.imagen, className: "card-img-top", alt: "..." }) }),
      /* @__PURE__ */ jsxs("div", { className: "card-body", children: [
        /* @__PURE__ */ jsx("h5", { className: "card-title", children: item.attributes.nombre }),
        /* @__PURE__ */ jsxs("p", { className: "card-text", children: [
          "Precio: ",
          item.attributes.precioVenta,
          " $"
        ] }),
        /* @__PURE__ */ jsx("a", { onClick: () => agregarCarrito(item), className: "btn btn-primary m-1", children: "Agregar" }),
        /* @__PURE__ */ jsx("a", { onClick: () => borrarItem(item.id), className: "btn btn-danger m-1", children: "Quitar" })
      ] })
    ] }, item.id))
  ] });
};

const Main = () => {
  const [visible, setVisible] = useState(true);
  return /* @__PURE__ */ jsxs("main", { style: { position: "relative" }, children: [
    /* @__PURE__ */ jsx("div", { style: { position: "fixed", bottom: "20px", right: "20px", zIndex: "9999" }, children: /* @__PURE__ */ jsx("button", { onClick: () => setVisible(!visible), className: visible ? "btn btn-danger m-4" : "btn btn-primary m-4", children: visible ? /* @__PURE__ */ jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "25", height: "25", fill: "currentColor", class: "bi bi-cart3", viewBox: "0 0 16 16", children: /* @__PURE__ */ jsx("path", { d: "M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" }) }) : /* @__PURE__ */ jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "25", height: "25", fill: "currentColor", class: "bi bi-basket2", viewBox: "0 0 16 16", children: [
      /* @__PURE__ */ jsx("path", { d: "M4 10a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0zm3 0a1 1 0 0 1 2 0v2a1 1 0 0 1-2 0zm3 0a1 1 0 1 1 2 0v2a1 1 0 0 1-2 0z" }),
      /* @__PURE__ */ jsx("path", { d: "M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-.623l-1.844 6.456a.75.75 0 0 1-.722.544H3.69a.75.75 0 0 1-.722-.544L1.123 8H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6h1.717L5.07 1.243a.5.5 0 0 1 .686-.172zM2.163 8l1.714 6h8.246l1.714-6z" })
    ] }) }) }),
    visible ? /* @__PURE__ */ jsx(CardProducto, {}) : /* @__PURE__ */ jsx(Table, {})
  ] });
};

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "Main", Main, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Users/zeek2/OneDrive/Escritorio/FT-app-ventas/src/components/Main.jsx", "client:component-export": "default" })} ` })}`;
}, "C:/Users/zeek2/OneDrive/Escritorio/FT-app-ventas/src/pages/index.astro", void 0);

const $$file = "C:/Users/zeek2/OneDrive/Escritorio/FT-app-ventas/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };
