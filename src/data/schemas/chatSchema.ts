import { z } from "zod";

export const chatSchema = z.object({
  prompt: z.string().min(1, "Você precisa inserir uma mensagem."),
});

export type ChatFormType = z.infer<typeof chatSchema>;
