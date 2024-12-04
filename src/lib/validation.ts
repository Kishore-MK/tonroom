import { z } from "zod";

export const requestQueueSchema = z.object({
  id: z.string().optional(), 
  topic: z.string().min(1, "Topic is required"),
  creator: z.string().min(1, "Creator is required"),
  createdAt: z.date().optional(), 
});

export const chatRoomsSchema = z.object({
  id: z.string().optional(), 
  topic: z.string().min(1, "Topic is required"),
  creator: z.string().min(1, "Creator is required"),
  participant: z.string().min(1, "Participant is required"),
  PaymentStatus: z.string().min(1, "Payment status is required"),
  createdAt: z.date().optional(), 
});