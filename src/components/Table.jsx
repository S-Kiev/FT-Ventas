import { useState, useEffect } from "react";
import { useStore } from "@nanostores/react";
import {
  carrito,
  borrarItem,
  vaciarCarrito,
  modificarItem,
} from "../carritoStore.js";

const Table = () => {
  const $carrito = useStore(carrito);
  const [total, setTotal] = useState(0);
  const [productosVenta, setProductosVenta] = useState([]);

  useEffect(() => {
    const productos = $carrito.map((item) => ({
      producto: item.id,
      cantidad: item.cantidad,
      precio: item.attributes.precioVenta,
      subtotal: item.attributes.precioVenta * item.cantidad,
    }));
    setProductosVenta(productos);
  }, [$carrito]);

  const obtenerFecha = () => {
    const fecha = new Date();
    return fecha.toISOString().split("T")[0];
  };

  const confirmarVenta = () => {
    const confirmacion = window.confirm("¿Estás seguro de confirmar la venta?");
    if (confirmacion) {
      const datosVenta = {
        data: {
          fecha: obtenerFecha(),
          cliente: null,
          productos: productosVenta,
        },
      };
      fetch("https://bk-ventas-production.up.railway.app/api/ventas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosVenta),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Respuesta de la solicitud:", data);
          // Aquí podrías realizar acciones adicionales después de enviar la venta
        })
        .catch((error) => console.error("Error al enviar la venta:", error));
      alert("Gracias por su compra");
      vaciarCarrito();
    }
  };
  // Calcula el total del carrito
  useEffect(() => {
    const total = $carrito.reduce(
      (total, item) => total + item.attributes.precioVenta * item.cantidad,
      0
    );

    setTotal(total);
  }, [$carrito]);

  // Función para sumar la cantidad
  const sumarCantidad = (item) => {
    item.cantidad += 1;

    modificarItem(item);
  };

  // Función para restar la cantidad
  const restarCantidad = (item) => {
    if (item.cantidad <= 1) {
      return;
    }

    item.cantidad -= 1;

    modificarItem(item);
  };

  return (

        <div className="container">
        <div className="m-2 col-end justify-content-center">
          <table
            className="w-full text-sm text-left text-gray-500 dark:text-gray-400"
            style={{ width: "100%" }}
          >
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Nombre
                </th>
                <th scope="col" className="px-6 py-3">
                  Precio
                </th>
                <th scope="col" className="px-6 py-3">
                  Sumar
                </th>
                <th scope="col" className="px-6 py-3">
                  Cantidad
                </th>
                <th scope="col" className="px-6 py-3">
                  Restar
                </th>
                <th scope="col" className="px-6 py-3">
                  SubTotal
                </th>
                <th scope="col" className="px-6 py-3">
                  Quitar
                </th>
              </tr>
            </thead>
            <tbody>
              {$carrito.map((item) => (
                <tr
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  key={item.id}
                >
                  <td className="px-6 py-4">{item.attributes.nombre}</td>
                  <td className="px-6 py-4">{item.attributes.precioVenta}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => sumarCantidad(item)}
                      className="font-medium btn btn-primary hover:underline"
                    >
                      +
                    </button>
                  </td>
                  <td className="px-6 py-4">{item.cantidad}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => restarCantidad(item)}
                      className="font-medium btn btn-success hover:underline"
                    >
                      -
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    {item.attributes.precioVenta * item.cantidad}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => borrarItem(item.id)}
                      className="font-medium text-red-600 dark:text-red-500 hover:underline"
                    >
                      Quitar
                    </button>
                  </td>
                </tr>
              ))}
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-4">Total</td>
                <td className="px-6 py-4">{total}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => vaciarCarrito()}
                    className="btn btn-danger"
                  >
                    Vaciar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <button onClick={() => confirmarVenta()} className="btn btn-warning m-4">
          Confirmar
        </button>
      </div>

  );
};

export default Table;
