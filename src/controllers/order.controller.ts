import { Request, Response } from 'express';
import { prisma } from '../prisma';

export const getOrders = async (req: Request, res: Response) => {
    try {
        const orders = await prisma.order.findMany({
            include: {
                product: true,
                client: { select: { id: true, username: true, full_name: true } },
                seller: { select: { id: true, username: true, full_name: true } },
            },
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
};

export const getOrder = async (req: Request, res: Response) => {
    try {
        const order = await prisma.order.findUnique({
            where: { id: req.params.id as string },
            include: {
                product: true,
                client: { select: { id: true, username: true, full_name: true } },
                seller: { select: { id: true, username: true, full_name: true } },
            },
        });
        if (!order) return res.status(404).json({ error: 'Order not found' });
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch order' });
    }
};

export const createOrder = async (req: Request, res: Response) => {
    try {
        const { productId, quantity, clientId } = req.body;

        // Mahsulotni topib, sellerId va stock'ni tekshiramiz
        const product = await prisma.product.findUnique({ where: { id: productId } });
        if (!product) return res.status(404).json({ error: 'Product not found' });

        // if (product.stock < Number(quantity)) {
        //     return res.status(400).json({ error: 'Not enough stock available' });
        // }

        const order = await prisma.order.create({
            data: {
                productId,
                quantity: Number(quantity),
                clientId,
                sellerId: product.sellerId,
            },
        });

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create order' });
    }
};

export const updateOrder = async (req: Request, res: Response) => {
    try {
        const order = await prisma.order.update({
            where: { id: req.params.id as string },
            data: req.body,
        });
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update order' });
    }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
    try {
        const { status } = req.body;
        const validStatuses = ['PENDING', 'CONFIRMED', 'DELIVERED', 'CANCELLED'];

        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: 'Invalid status value' });
        }

        const order = await prisma.order.update({
            where: { id: req.params.id as string },
            data: { status },
        });

        res.json(order);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update order status' });
    }
};

export const deleteOrder = async (req: Request, res: Response) => {
    try {
        await prisma.order.delete({ where: { id: req.params.id as string } });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete order' });
    }
};