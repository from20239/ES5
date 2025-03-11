import mongoose from 'mongoose';
import { UserModel } from './models/user';
import { SubjectModel } from './models/subject'; 

// Conexión a la base de datos (cambiar según tu configuración)
const mongoURI = 'mongodb://localhost:27017/ea-restapi';  

// Connection
export async function startConnection() {
    mongoose.set('strictQuery', true); // Mantiene el comportamiento actual

    await mongoose.connect(mongoURI)
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error al conectar:', err));
}

// Función para poblar la base de datos
export async function populateDatabase() {
    try {
        // Eliminar todos los documentos actuales
        await UserModel.deleteMany({});

        await SubjectModel.deleteMany({});
        console.log('Existing data cleared');

        // Crear usuarios de ejemplo
        const user1 = new UserModel({
            name: 'John Doe',
            email: 'john@example.com',
            username: 'johndoe',
            phone: '123-456-7890',
        });

        const user2 = new UserModel({
            name: 'Jane Smith',
            email: 'jane@example.com',
            username: 'janesmith',
            phone: '987-654-3210',
        });

        // Guardar Users de ejemplo
        const savedUser1 = await user1.save();
        const savedUser2 = await user2.save();

       // 创建示例课程
       const subject1 = new SubjectModel({
        name: 'Mathematics', // 课程名称
        teacher: 'Dr. Smith', // 教师
        alumni: [savedUser1._id, savedUser2._id] // 关联示例用户
    });

    const subject2 = new SubjectModel({
        name: 'Physics', // 课程名称
        teacher: 'Dr. Johnson', // 教师
        alumni: [savedUser1._id] // 关联示例用户
    });

    // 保存示例课程
    await subject1.save();
    await subject2.save();

    console.log('Subjects saved');

        console.log('Database populated with sample data');
        
    } catch (error) {
        console.error('Error populating the database: ', error);
    } 
}
