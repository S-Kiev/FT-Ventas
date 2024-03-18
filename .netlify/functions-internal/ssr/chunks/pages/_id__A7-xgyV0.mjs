/* empty css                            */
import { c as createAstro, d as createComponent, r as renderTemplate, e as addAttribute, f as renderHead, g as renderSlot, h as renderComponent, m as maybeRenderHead } from '../astro_AjHO-7_l.mjs';
import 'kleur/colors';
import 'html-escaper';
import 'clsx';

const $$Astro$1 = createAstro();
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Layout;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>Hola</title>${renderHead()}</head> <body> <div class="center"> ${renderSlot($$result, $$slots["default"])} </div> </body></html>`;
}, "C:/Users/zeek2/OneDrive/Escritorio/FT-app-ventas/src/layouts/Layout.astro", void 0);

const $$Astro = createAstro();
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const response = await fetch(`https://bk-ventas-production.up.railway.app/api/productos/${id}`);
  const producto = await response.json();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="row mt-5"> <div class="col-ms-4"> <img${addAttribute(producto.data.attributes.imagen, "src")} alt="imagen" class="img-fluid rounded-start"> </div> <div class="col-ms-8"> <div class="card-body"> <h5 class="card-title">${producto.data.attributes.nombre}</h5> <p class="card-text">Precio: ${producto.data.attributes.precioVenta} $</p> <a href="#" class="btn btn-primary"> agregar</a> <a href="/" class="btn btn-primary"> Volver</a> </div> </div> </div> ` })}`;
}, "C:/Users/zeek2/OneDrive/Escritorio/FT-app-ventas/src/pages/producto/[id].astro", void 0);

const $$file = "C:/Users/zeek2/OneDrive/Escritorio/FT-app-ventas/src/pages/producto/[id].astro";
const $$url = "/producto/[id]";

const _id_ = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$id,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Layout as $, _id_ as _ };
