// Validation
import { z } from "zod";

// Order Item Schema
export const orderItemSchema = z.object({
    productId: z.number().min(1, "Product ID is required"),
    quantity: z.number().min(1, "Quantity must be at least 1"),
});

// Order preview schema
export const orderPreviewSchema = z.object({
    items: z.array(orderItemSchema).min(1, "At least one item is required"),
    totalPrice: z.number().min(0, "Total price must be non-negative"),
    shippingCost: z.number().min(0, "Shipping cost must be non-negative"),
});

// Complete order schema
export const orderSchema = z.object({
    userId: z.string().min(1, "User ID is required"),
    items: z.array(orderItemSchema).min(1, "At least one item is required"),
    totalPrice: z.number().min(0, "Total price must be non-negative"),
    shippingCost: z.number().min(0, "Shipping cost must be non-negative"),
    createdAt: z.string().optional(),
});

