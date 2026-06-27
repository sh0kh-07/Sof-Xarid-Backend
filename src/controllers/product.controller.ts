import { Request, Response } from 'express';
import 'multer';
import { prisma } from '../prisma';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({ include: { seller: true } });
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const product = await prisma.product.findUnique({ 
        where: { id: req.params.id as string },
        include: { seller: true }
    });
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, stock, sellerId } = req.body;
    let image = '';
    
    if (req.file) {
      image = `/uploads/${req.file.filename}`;
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price) || 0,
        stock: parseInt(stock) || 0,
        sellerId,
        image,
      },
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product', details: (error as any).message });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const data = { ...req.body };
    if (req.file) {
      data.image = `/uploads/${req.file.filename}`;
    }
    if (data.price) data.price = parseFloat(data.price);
    if (data.stock) data.stock = parseInt(data.stock);

    const product = await prisma.product.update({
      where: { id: req.params.id as string },
      data,
    });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    await prisma.product.delete({ where: { id: req.params.id as string } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
};
