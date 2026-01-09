import { z } from "zod";

export const chatSchema = z.object({
  prompt: z
    .string()
    .min(5, "Você precisa inserir um prompt de pelo menos 5 caracteres."),
});

export type ChatFormType = z.infer<typeof chatSchema>;
