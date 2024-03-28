import { PrismaClient } from '@prisma/client'
//código que detecta conecciones globales y las cierra si ya estab instanciadas
const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma