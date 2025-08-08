import { useEffect, useState } from "react";
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://proy-final-alejandroponce00-alejandros-projects-30c19e38.vercel.app/api';
export default function Home() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      fetch(`${API_URL}/products`)  // La URL ya incluye /api, solo necesitamos agregar /products
        .then((res) => {
          if (!res.ok) {
            throw new Error('Error en la solicitud');
          }
          return res.json();
        })
        .then((data) => {
          setProductos(data.payload || []);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error al obtener productos:", err);
          setLoading(false);
        });
    }, 1000);


    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 flex flex-col items-center px-4 py-10">
      <h1 className="text-4xl font-semibold mb-6">🛒 Productos</h1>

      {loading ? (
        <p className="text-gray-500 animate-pulse">Cargando productos...</p>
      ) : productos.length === 0 ? (
        <p className="text-gray-500">No hay productos disponibles.</p>
      ) : (
        <div className="w-full max-w-3xl overflow-x-auto">
          <table className="w-full border-collapse rounded shadow-sm bg-white">
            <thead>
              <tr className="bg-gray-100 text-left text-sm text-gray-600">
                <th className="p-4">Nombre</th>
                <th className="p-4">Precio</th>
                <th className="p-4">Disponible</th>
              </tr>
            </thead>
            <tbody>
              {productos.map((prod) => (
                <tr
                  key={prod.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-4">{prod.nombre}</td>
                  <td className="p-4">${prod.precio}</td>
                  <td className="p-4">
                    {prod.disponible ? (
                      <span className="text-green-600 font-medium">Sí</span>
                    ) : (
                      <span className="text-red-500 font-medium">No</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
       <footer className="mt-15">✨ Autor
Alejandro Ponce</footer>
    </main>
  );
}
