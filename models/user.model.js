import mongoose from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'

const userSchema = mongoose.Schema(
  {
    prenom: { 
      type: String, 
      required: true },   
		avatar: { 
      type: String, 
      required: true },
    email: { 
      type: String, 
      required: true, 
      unique: true },
    password: { 
      type: String, 
      required: true },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'  // 'user' est la valeur par défaut, mais peut être mis à 'admin' pour les administrateurs
      },
      status: { 
        type: String, 
        enum: ['active', 'inactive'], 
        default: 'active'  // Le statut par défaut est 'active'
      }
  },
  { timestamps: { createdAt: true } }
)

userSchema.plugin(mongooseUniqueValidator)

export default mongoose.model('User', userSchema)