import React, { useState, useEffect } from 'react';
import { agregarCarrito, borrarItem } from '../carritoStore.js';
import '../style/CardProducto.css'

const CardProducto = () => {
    const [productos, setProductos] = useState([]);
    const [productosFiltrados, setFiltrados] = useState([]);
    const [busqueda, setBusqueda] = useState('');
    const [categoria , setCategoria] = useState('');
    const [detalle, setDetalle] = useState('/producto/');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://bk-ventas-production.up.railway.app/api/productos?pagination[page]=1&pagination[pageSize]=91');
                const data = await response.json();
                setProductos(data.data);
                setFiltrados(data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
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
        setBusqueda('');
        applyFilters('', categoria);
    };

      const handleFilterByCategory = (e) => {
        const valorCategoria = e.target.value.toLowerCase();
        setCategoria(valorCategoria);
        applyFilters(busqueda, valorCategoria);
    };

      const applyFilters = (busqueda, categoria) => {
        let filteredProducts = productos.filter(producto =>
            producto.attributes.nombre.toLowerCase().includes(busqueda) &&
            (categoria === 'todas' || producto.attributes.categoria.toLowerCase() === categoria)
        );
        setFiltrados(filteredProducts);
    };

    return (
        <div className="row">
            <div className="sticky-top bg-gray-50">
            <nav className="navbar navbar-expand-lg bg-body-tertiary m-1 bg-slate-600">
                <div className="input-group">
                    <input type="text" placeholder="Buscador" value={busqueda} onChange={handleFilter} className='form-control m-2'/>
                    <div className="input-group-append m-2">
                        <button onClick={handleReset} className='btn btn-outline-danger'>Resetear</button>
                    </div>
                </div>
            </nav>



            <select class="form-select m-1" aria-label="Categorias" onChange={handleFilterByCategory} value={categoria}>
                <option value="todas" selected>Todas</option>
                <option value="comestible">Comestibles</option>
                <option value="higiene">Higuiene</option>
                <option value="medicamento">Medicamentos</option>
            </select>
            </div>

            
            {productosFiltrados.map((item) => (
                <div key={item.id} className="card custom-card" style={{ width: '95%' }}>
                    <a href={detalle + item.id}>
                        <img src={item.attributes.imagen} className="card-img-top" alt="..." />
                    </a>
                    <div className="card-body">
                        <h5 className="card-title">{item.attributes.nombre}</h5>
                        <p className="card-text">Precio: {item.attributes.precioVenta} $</p>
                        <a onClick={() => agregarCarrito(item)} className="btn btn-primary m-1">Agregar</a>
                        <a onClick={() => borrarItem(item.id)} className="btn btn-danger m-1">Quitar</a>

                    </div>
                </div>
            ))}
        </div>
    );
};

export default CardProducto;
