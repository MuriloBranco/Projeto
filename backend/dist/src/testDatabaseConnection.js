"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
const user_entity_1 = require("./entity/user.entity");
async function testDatabaseConnection() {
    try {
        await server_1.AppDataSource.initialize();
        console.log('Data Source has been initialized!');
        const userRepository = server_1.AppDataSource.getRepository(user_entity_1.User);
        const newUser = new user_entity_1.User();
        newUser.firstName = 'Test User';
        await userRepository.save(newUser);
        console.log('New user has been saved');
        const users = await userRepository.find();
        console.log('All users:', users);
        await server_1.AppDataSource.destroy();
    }
    catch (error) {
        console.error('Error during database operation:', error);
    }
}
testDatabaseConnection();
//# sourceMappingURL=testDatabaseConnection.js.map