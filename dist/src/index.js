"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_1 = require("./prisma");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const swagger_1 = require("./swagger");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Serve uploaded images statically
app.use('/uploads', express_1.default.static(path_1.default.join(__dirname, '../uploads')));
// Routes
app.use('/auth', auth_routes_1.default);
app.use('/users', user_routes_1.default);
app.use('/products', product_routes_1.default);
// Swagger Documentation (http://localhost:3000/api-docs)
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerDocument));
const PORT = process.env.PORT || 3000;
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    // Super Admin avtomatik yaratish mantiqiy bloki
    try {
        const existingAdmin = yield prisma_1.prisma.user.findUnique({
            where: { username: 'mirsaid' }
        });
        if (!existingAdmin) {
            const hashedPassword = yield bcryptjs_1.default.hash('123456789', 10);
            yield prisma_1.prisma.user.create({
                data: {
                    username: 'mirsaid',
                    password: hashedPassword,
                    full_name: 'Mirsaid (Super Admin)',
                    // TS-ignore or any is used here due to prisma client not recreating DLL because of node.js lock
                    role: 'SUPER_ADMIN',
                }
            });
            console.log('✅ Super Admin (mirsaid) avtomatik yaratildi!');
        }
        else {
            console.log('⚡ Super Admin (mirsaid) bazada allaqachon mavjud.');
        }
    }
    catch (error) {
        console.error('Super admin yaratishda xato:', error);
    }
    app.listen(PORT, () => {
        console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
});
startServer();
