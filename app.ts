import express, { Request, Response } from "express";
import personRoutes from "./src/routes/person.route";
import productRoutes from "./src/routes/product.route";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/person", personRoutes);
app.use("/", personRoutes);
app.use("/api/v1/products", productRoutes);

app.use((req: Request, res: Response) => {
  return res.status(404).json({ message: "API not found" });
});

app.listen(3000, () => {
  console.log("Runing.......")
})

export default app;
















