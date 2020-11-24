import mongoose from "mongoose"
import bcrypt from "bcrypt"

const UserSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  phone: String,
  isOnline: Boolean,
  profilePictureURL: String,
  createAt: { type: Date, default: Date.now },
  friends: [],//Pour stocker l'indentifiant de ses amis 
  message: [],//Chaque fois qui a ajoute un ami on ajout un objet dans le tableau qui correspond a l'identifiant de son amis pour stocker leurs message ,
  lastOnlineTimestamp: { type: Date },
  coverPictureURL: String,
  location: {},
  pushToken: String,
  signUpLocation: String
});

UserSchema.pre(
  'save',
  async function (next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  }
);

UserSchema.methods.isValidPassword = async function (password) {
  const compare = await bcrypt.compare(password, this.password);
  return compare;
}

//Collection inside the database
export default mongoose.model('users', UserSchema)
