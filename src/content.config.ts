import { defineCollection, reference, z } from 'astro:content';

import { glob } from 'astro/loaders';

const products = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/products" }),
    schema: ({ image }) => z.object({
        name: z.string(),
        description: z.string(),
        price: z.number(),
        discountedPrice: z.number().optional(),
        discountPercent: z.number().optional(),
        currency: z.string().length(3), // Ensures it's a 3-letter currency code
        image: image(), 
        categories: z.array(z.string()).optional(),
        // relatedProductIds:  z.array(reference('products')).optional(),
      })
  });

export const collections = { products };