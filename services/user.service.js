const userRepository = require("../repositories/user.repository");

class UserService {
    async getAll () {
    return userRepository.getAll();
    }
    async create (user) {
    return userRepository.create(user)
    }
    async getById (id) {
        return await userRepository.getById(id)
    }
    async update(id, user) {
        return await userRepository.update(id, user)
    }
    async delete(id) {
        await userRepository.delete(id)
    }
}
const userService = new UserService();
module.exports = userService
