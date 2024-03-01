const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const db = require("../model/database/models"); // Importa el modelo de usuario definido con Sequelize

const usersFilePath = path.join(__dirname, "/users.json");

const usersService = {
  users: JSON.parse(fs.readFileSync(usersFilePath, "utf-8")),

  getAll: function () {
    return this.users;
  },
  
  save: async (userData) => {
    try {
      userData.id_rol = 2;// Agrega id_rol al objeto userData antes de guardar el usuario
      //Rol 1 es admin, Rol 2 es usuario invitado
      userData.password = bcrypt.hashSync(userData.password, 10); // Hashear la contraseña
      const newUser = await db.User.create(userData);// Crea un nuevo usuario en la base de datos utilizando el modelo User
      return newUser; // Devuelve el usuario creado
    } catch (error) {
      throw new Error("Error al guardar el usuario: " + error.message);
    }
  },

  getById: async (userId) => {
    try {
      // Busca un usuario por su ID en la base de datos
      const user = await db.User.findByPk(userId);
      return user; // Devuelve el usuario encontrado
    } catch (error) {
      throw new Error("Error al obtener el usuario: " + error.message);
    }
  },

  update: async (userId, userData) => {
    try {
      await db.User.update(userData, { where: { id: userId } });
    } catch (error) {
      throw new Error("Error al actualizar el usuario en la base de datos: " + error.message);
    }
  },
  
  findByField: async function (field, email) {
    try {
      let userFound = await db.User.findOne({where: {email} });
      return userFound;
    } catch (error) {
      throw new Error("Error al buscar usuario por campo" + error.message);
    }
  }
};

module.exports = usersService;
