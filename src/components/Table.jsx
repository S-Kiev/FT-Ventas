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
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Productos</th>
                <th>Precio</th>
                <th>Modificar</th>
              </tr>
            </thead>
            <tbody>
              {$carrito.map((item) => (
                <tr key={item.id}>
                  <td>
                  <strong>Nombre:</strong> {item.attributes.nombre}
                    <br />
                    <strong>Cantidad:</strong> {item.cantidad}
                    <br />
                    <strong>Subtotal:</strong> {item.attributes.precioVenta * item.cantidad} $
                  </td>
                  <td>{item.attributes.precioVenta} $</td>
                  <td>
                    <button onClick={() => sumarCantidad(item)} className="btn btn-primary m-1">
                      +
                    </button>
                    <button onClick={() => restarCantidad(item)} className="btn btn-success m-1">
                      -
                    </button>
                    <button onClick={() => borrarItem(item.id)} className="btn btn-danger m-1">
                      Quitar
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                <td>Total</td>
                <td colSpan="2">
                  <strong>{total} $</strong>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <button onClick={() => confirmarVenta()} className="btn btn-warning m-4">
        Confirmar
      </button>
    </div>
  );
};

export default Table;
