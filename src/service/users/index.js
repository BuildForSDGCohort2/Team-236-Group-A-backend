"use strict";
const UserModel = require("../../model/users")();
const bcrypt = require("bcrypt");

async function createUser({username, email, role, password}) {
  const checkUserExist = await UserModel.find({
    query: { $or: [{ username, email }] },
  });
  if (checkUserExist.length>0) {
    throw new Error("username or email taken")
  }
  bcrypt.hash(password, 10, function(err, hash) {
      if(!err){
          return UserModel.create({data:{email, username, password:hash, role}})
      }


})

}

module.exports = {
  createUser,
};
