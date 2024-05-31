import { AppDataSource } from './server';
import { User } from './entity/user.entity';

async function testDatabaseConnection() {
    try {
        await AppDataSource.initialize();
        console.log('Data Source has been initialized!');

        const userRepository = AppDataSource.getRepository(User);

        // Cria um novo usuário
        const newUser = new User();
        newUser.firstName = 'Test User';

        // Salva o novo usuário no banco de dados
        await userRepository.save(newUser);
        console.log('New user has been saved');

        // Recupera todos os usuários do banco de dados
        const users = await userRepository.find();
        console.log('All users:', users);

        // Fecha a conexão
        await AppDataSource.destroy();
    } catch (error) {
        console.error('Error during database operation:', error);
    }
}

testDatabaseConnection();