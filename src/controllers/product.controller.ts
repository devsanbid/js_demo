import { Request, Response } from "express";
import { Product } from "../types";

let products: Product[] = [
  { id: 1, name: "Wireless Headphones", price: 79.99, category: "Electronics" },
  { id: 2, name: "Leather Wallet", price: 34.99, category: "Accessories" },
  { id: 3, name: "Yoga Mat", price: 24.99, category: "Fitness" },
  { id: 4, name: "Ceramic Coffee Mug", price: 14.99, category: "Kitchen" },
  { id: 5, name: "Desk Lamp", price: 49.99, category: "Home Office" },
];

export class ProductController {
  getAllProducts = (req: Request, res: Response) => {
    return res.status(200).json({ data: products });
  };

  getProductById = (req: Request, res: Response) => {
    const { id } = req.params;
    const product = products.find(p => p.id === parseInt(id));
    if (!product) return res.status(404).json({ message: "Product not found!!" });
    return res.status(200).json({ data: product });
  };

  createProduct = (req: Request, res: Response) => {
    const { name = "Unknown Product", price = 0, category } = req.body || {};
    const newProduct: Product = {
      id: products.length > 0 ? Math.max(...products.map((p) => p.id)) + 1 : 1,
      name,
      price,
      ...(category !== undefined && { category }),
    };
    products.push(newProduct);
    return res.status(201).json({ data: newProduct });
  };

  updateProduct = (req: Request, res: Response) => {
    const { id } = req.params;
    const index = products.findIndex(p => p.id === parseInt(id));
    if (index === -1) return res.status(404).json({ message: "Product not found!!" });

    const { name = "Unknown Product", price = 0, category } = req.body || {};
    products[index] = {
      ...products[index],
      name,
      price,
      ...(category !== undefined && { category }),
    };
    return res.status(200).json({ data: products[index] });
  };

  deleteProduct = (req: Request, res: Response) => {
    const { id } = req.params;
    const index = products.findIndex(p => p.id === parseInt(id));
    if (index === -1) return res.status(404).json({ message: "Product not found!!" });

    const deleted = products.splice(index, 1);
    return res.status(200).json({ data: deleted[0] });
  };
}
