const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
        },
        last_name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            validate: {
                validator: function(v) {
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
                },
                message: props => `${props.value} is not a valid email!`
            }
        },
        password: {
            type: String,
            required: true
        },
        rol: {
            type: String,
            enum: ["USER", "ADMIN"],
            default: "USER"
        }
    },
    { 
        timestamps: true,
        versionKey: false 
    }
)

userSchema.pre('save', function(next){
    this.password = bcrypt.hashSync(this.password, 10)
    next()
})

const usersModel = mongoose.model('UserModel', userSchema)

module.exports = usersModel
