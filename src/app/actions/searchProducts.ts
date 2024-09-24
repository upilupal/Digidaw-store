'use server'
import prisma from '@/app/libs/prisma'
import { SearchProducts } from '../../../types/search-products'


const searchProducts = async (query: string): Promise<SearchProducts[]> => {
  const filteredProducts = await prisma.product.findMany({
    where: {
      name: {
        contains: query,
        mode: 'insensitive', // Case-insensitive search
      },
    },
    select: {
      id: true,
      name: true,
    },
    take: 10, // Limit to 10 results
  })

  return filteredProducts
}

export default searchProducts