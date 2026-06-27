export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Hakaton API',
    version: '1.0.0',
    description: 'API Documentation with User and Product CRUD (includes file upload)',
  },
  servers: [
    {
      url: 'http://localhost:2020',
    },
    {
      url: 'http://213.199.40.176:2020',
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
    '/orders': {
      get: {
        tags: ['Orders'],
        summary: 'Barcha buyurtmalarni olish',
        responses: {
          200: { description: 'Muvaffaqiyatli' },
        },
      },
      post: {
        tags: ['Orders'],
        summary: 'Yangi buyurtma yaratish',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  productId: { type: 'string', description: 'Buyurtma qilinayotgan mahsulot IDsi' },
                  quantity: { type: 'number', description: 'Mahsulot miqdori' },
                  clientId: { type: 'string', description: 'Buyurtma beruvchi client IDsi' },
                  sellerId: { type: 'string', description: 'Mahsulot egasi seller IDsi' },
                },
                required: ['productId', 'quantity', 'clientId', 'sellerId'],
              },
            },
          },
        },
        responses: {
          201: { description: 'Buyurtma yaratildi' },
        },
      },
    },
    '/orders/{id}': {
      get: {
        tags: ['Orders'],
        summary: 'ID orqali buyurtmani olish',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          200: { description: 'Muvaffaqiyatli' },
          404: { description: 'Topilmadi' },
        },
      },
      put: {
        tags: ['Orders'],
        summary: 'Buyurtma holatini yoki miqdorini tahrirlash',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: false,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  quantity: { type: 'number' },
                  status: {
                    type: 'string',
                    enum: ['PENDING', 'CONFIRMED', 'DELIVERED', 'CANCELLED'],
                  },
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
        tags: ['Orders'],
        summary: 'Buyurtmani o`chirish',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          204: { description: 'O`chirildi' },
        },
      },
    },
    '/orders/{id}/status': {
      patch: {
        tags: ['Orders'],
        summary: 'Buyurtma holatini o`zgartirish (Seller yoki Client tomonidan)',
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: {
                    type: 'string',
                    enum: ['PENDING', 'CONFIRMED', 'DELIVERED', 'CANCELLED'],
                    description: 'Yangi holat: Seller CONFIRMED/DELIVERED qiladi, Client CANCELLED qila oladi',
                  },
                },
                required: ['status'],
              },
            },
          },
        },
        responses: {
          200: { description: 'Holat muvaffaqiyatli o`zgartirildi' },
          400: { description: 'Noto`g`ri holat qiymati' },
          404: { description: 'Buyurtma topilmadi' },
        },
      },
    },
  },
};
