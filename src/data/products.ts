import { Product } from "@/types/product";

export const products: Product[] = [
  // SERVICIOS
  {
    id: "serv-armado",
    name: "Servicio de Armado Profesional",
    price: 3050,
    category: "Servicio",
    image: "https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?auto=format&fit=crop&w=800&q=80",
    stock: 999,
    specs: { Detalle: "Gestión de cables, actualización de BIOS y testeo" },
  },
  // CPU
  {
    id: "1",
    name: "Intel Core i9-14900K",
    price: 699,
    category: "CPU",
    image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=800&q=80",
    stock: 10,
    specs: { Nucleos: "24", Socket: "LGA1700" },
  },
  {
    id: "2",
    name: "AMD Ryzen 9 7950X",
    price: 650,
    category: "CPU",
    image: "https://images.unsplash.com/photo-1555616635-6409600377c8?auto=format&fit=crop&w=800&q=80",
    stock: 15,
    specs: { Nucleos: "16", Socket: "AM5" },
  },
  // MOTHERBOARD
  {
    id: "6",
    name: "ASUS ROG Strix Z790-E",
    price: 499,
    category: "Motherboard",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    stock: 7,
    specs: { Socket: "LGA1700", Formato: "ATX" },
  },
  // RAM
  {
    id: "5",
    name: "Corsair Vengeance RGB 32GB",
    price: 140,
    category: "RAM",
    image: "https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=800&q=80",
    stock: 25,
    specs: { Tipo: "DDR5", Vel: "6000MHz" },
  },
  // GPU
  {
    id: "3",
    name: "NVIDIA RTX 4090",
    price: 1999,
    category: "GPU",
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=800&q=80",
    stock: 5,
    specs: { VRAM: "24GB", Marca: "NVIDIA" },
  },
  // ALMACENAMIENTO
  {
    id: "8",
    name: "Samsung 990 PRO 2TB",
    price: 180,
    category: "Almacenamiento",
    image: "https://images.unsplash.com/photo-1628557044797-f21a177c37ec?auto=format&fit=crop&w=800&q=80",
    stock: 30,
    specs: { Tipo: "SSD M.2", Vel: "7450 MB/s" },
  },
  // FUENTE
  {
    id: "9",
    name: "Corsair RM850x",
    price: 139,
    category: "Fuente",
    image: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=800&q=80",
    stock: 10,
    specs: { Watts: "850W", Modular: "Full" },
  },
  // GABINETE
  {
    id: "10",
    name: "NZXT H9 Flow",
    price: 159,
    category: "Gabinete",
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80",
    stock: 8,
    specs: { Color: "Blanco", Vidrio: "Si" },
  },
  // COOLER (IMPORTANTE PARA ARMAR PC)
  {
    id: "cool-1",
    name: "Cooler Master Hyper 212",
    price: 45,
    category: "Cooler",
    image: "https://images.unsplash.com/photo-1544724569-5f546fd6dd2d?auto=format&fit=crop&w=800&q=80",
    stock: 20,
    specs: { Tipo: "Aire", Fan: "120mm" },
  },
  // MONITOR
  {
    id: "mon-1",
    name: "Samsung Odyssey G5",
    price: 320,
    category: "Monitor",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80",
    stock: 6,
    specs: { Panel: "IPS", Hz: "165Hz" },
  },
  // PERIFERICOS
  {
    id: "per-1",
    name: "Logitech G Pro X",
    price: 149,
    category: "Perifericos",
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=800&q=80",
    stock: 20,
    specs: { Tipo: "Mouse", Wireless: "Si" },
  },
];
