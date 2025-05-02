// src/server/routers/document.ts
import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import { saveDocumentToStorage } from '../storage';

export const documentRouter = createTRPCRouter({
  upload: protectedProcedure
    .input(
      z.object({
        file: z.any(), // Actual file handling depends on your storage solution
        folder: z.string(),
        documentType: z.string(),
        reference: z.string(),
        description: z.string(),
        fileType: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      // Save to appropriate folder structure
      const filePath = `${input.folder}/${Date.now()}-${input.reference}.${input.fileType}`;
      
      await saveDocumentToStorage({
        file: input.file,
        path: filePath,
        metadata: {
          documentType: input.documentType,
          reference: input.reference,
          description: input.description,
          uploadedAt: new Date(),
        }
      });

      return { success: true, path: filePath };
    }),
});