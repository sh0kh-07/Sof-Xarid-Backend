import express from 'express';
import cors from 'cors';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import bcrypt from 'bcryptjs';
import { prisma } from './prisma';

import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import productRoutes from './routes/product.routes';
import { swaggerDocument } from './swagger';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images statically
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/products', productRoutes);

// Swagger Documentation (http://localhost:3000/api-docs)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  // Super Admin avtomatik yaratish mantiqiy bloki
  try {
    const existingAdmin = await prisma.user.findUnique({
      where: { username: 'mirsaid' }
    });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('123456789', 10);
      await prisma.user.create({
        data: {
          username: 'mirsaid',
          password: hashedPassword,
          full_name: 'Mirsaid (Super Admin)',
          // TS-ignore or any is used here due to prisma client not recreating DLL because of node.js lock
          role: 'SUPER_ADMIN' as any,
        }
      });
      console.log('✅ Super Admin (mirsaid) avtomatik yaratildi!');
    } else {
      console.log('⚡ Super Admin (mirsaid) bazada allaqachon mavjud.');
    }
  } catch (error) {
    console.error('Super admin yaratishda xato:', error);
  }

  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
};

startServer();
