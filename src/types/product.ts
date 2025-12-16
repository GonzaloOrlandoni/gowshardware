export interface Product {
  id: string;
  name: string;
  price: number;
  category: string; // <--- AQUÍ EL CAMBIO: Ahora acepta cualquier texto
  image: string;
  stock: number;
  specs?: Record<string, string>;
}
