const UserSchema = {
    username: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    rol: { 
        type: String, 
        require: true 
    }
};

module.exports = UserSchema;