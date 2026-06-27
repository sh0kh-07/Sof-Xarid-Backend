export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Hakaton API',
    version: '1.0.0',
    description: 'API Documentation with User and Product CRUD (includes file upload)',
  },
  servers: [
    {
      url: 'http://localhost:3000',
    },
    {
        url: 'http://213.199.40.176:3000',
        description: 'Production server',
      },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
  paths: {
    '/auth/register': {
      post: {
        tags: ['Auth'],
        summary: 'Yangi user ro`yxatdan o`tishi',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  username: { type: 'string' },
                  password: { type: 'string' },
                  full_name: { type: 'string' },
                  role: { type: 'string', enum: ['CLIENT', 'SELLER', 'PROCURER'], default: 'CLIENT' },
                },
                required: ['username', 'password'],
              },
            },
          },
        },
        responses: { 201: { description: 'Ro`yxatdan o`tildi' } },
      },
    },
    '/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Tizimga kirish (Login)',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  username: { type: 'string' },
                  password: { type: 'string' },
                },
                required: ['username', 'password'],
              },
            },
          },
        },
        responses: { 200: { description: 'Token qaytarildi' } },
      },
    },
    '/users': {
      get: {
        tags: ['Users'],
        summary: 'Barcha userlarni olish',
        responses: {
          200: { description: 'Muvaffaqiyatli' },
        },
      },
      post: {
        tags: ['Users'],
        summary: 'User yaratish',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  username: { type: 'string' },
                  password: { type: 'string' },
                  full_name: { type: 'string' },
                  role: { type: 'string', enum: ['CLIENT', 'SELLER', 'PROCURER'], default: 'CLIENT' },
                },
                required: ['username', 'password'],
              },
            },
          },
        },
        responses: {
          201: { description: 'User yaratildi' },
        },
      },
    },
    '/users/{id}': {
      get: {
        tags: ['Users'],
        summary: 'ID orqali userni olish',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Muvaffaqiyatli' },
          404: { description: 'Topilmadi' },
        },
      },
      put: {
        tags: ['Users'],
        summary: 'User malumotlarini tahrirlash',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  full_name: { type: 'string' },
                  role: { type: 'string' },
                  password: { type: 'string' },
                },
              },
            },
          },
        },
        responses: {
          200: { description: 'Tahrirlandi' },
        },
      },
      delete: {
        tags: ['Users'],
        summary: 'Userni o`chirish',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          204: { description: 'O`chirildi' },
        },
      },
    },
    '/products': {
      get: {
        tags: ['Products'],
        summary: 'Barcha mahsulotlarni olish',
        responses: {
          200: { description: 'Muvaffaqiyatli' },
        },
      },
      post: {
        tags: ['Products'],
        summary: 'Yangi mahsulot qo`shish (Rasm bilan form-data)',
        requestBody: {
          required: true,
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  description: { type: 'string' },
                  price: { type: 'number' },
                  stock: { type: 'number' },
                  sellerId: { type: 'string', description: 'Mahsulotni qo`shayotgan seller IDsi' },
                  image: { type: 'string', format: 'binary' },
                },
                required: ['name', 'description', 'price', 'sellerId', 'image'],
              },
            },
          },
        },
        responses: {
          201: { description: 'Mahsulot qo`shildi' },
        },
      },
    },
    '/products/{id}': {
      get: {
        tags: ['Products'],
        summary: 'ID orqali mahsulotni olish',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Muvaffaqiyatli' },
          404: { description: 'Topilmadi' },
        },
      },
      put: {
        tags: ['Products'],
        summary: 'Mahsulotni tahrirlash (Rasm ham almashtirish mumkin)',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: false,
          content: {
            'multipart/form-data': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                  description: { type: 'string' },
                  price: { type: 'number' },
                  stock: { type: 'number' },
                  image: { type: 'string', format: 'binary' },
                },
              },
            },
          },
        },
        responses: {
          200: { description: 'Tahrirlandi' },
        },
      },
      delete: {
        tags: ['Products'],
        summary: 'Mahsulotni o`chirish',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          204: { description: 'O`chirildi' },
        },
      },
    },
  },
};
