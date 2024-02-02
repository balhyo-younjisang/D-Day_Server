import { auth, database, firestorage } from "@/config/firebase";
import { IUser, IUserLoginDTO, IUserOAuthDTO, IUserSDTO, IUserSignDTO } from "@/interface/IUser";
import { error } from "console";
import { storage } from "firebase-admin";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, doc, setDoc, addDoc, getDocs } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { Inject, Service } from "typedi";
const firebase = require('firebase/storage');
const storageRef = firebase.ref();

@Service()
export default class UserService {
  constructor(@Inject("logger") private logger) {}

  public async SignUp(userInputDTO: IUserSDTO): Promise<String> {
    try {
      console.log(`
        서비스
        ${JSON.stringify(userInputDTO)}
      `)
      const userDocs = await getDocs(collection(database, 'users'));
      const users = userDocs.docs.map((doc) => {
        const userData = doc.data().userInputDTO;
        if (userInputDTO.id === userData.id) {
          throw Error;
        }
      });
      const locationRef = ref(
        firestorage,
        `profile/${userInputDTO.id}`
      )
      if(userInputDTO.profile instanceof Buffer){
        const result = await uploadBytes(locationRef, userInputDTO.profile, {contentType: userInputDTO.mimetype});
        const imgurl = await getDownloadURL(result.ref);
        userInputDTO.profile = imgurl
      }
      const user = await addDoc(collection(database, 'users'), {userInputDTO});
      console.log(user);
      return "hi";
    } catch (e) {
      throw e;
    }
  }
  public async Login(userDTO: IUserLoginDTO) {
    try {
      const userDocs = await getDocs(collection(database, 'users'));
      const users = userDocs.docs.map((doc) => {
        const userData = doc.data().userInputDTO;
        console.log(`${userDTO.id}, ${userData.id}, ${userDTO.password}, ${userData.password}`)
        if (userDTO.id === userData.id && userDTO.password === userData.password) {

          const { password, ...userWithoutPassword } = userData;
          return userWithoutPassword;
        }
        throw Error;
      });

      const validUsers = users.filter((user) => user !== null);
  
      return validUsers;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  public async OAuthLogin(userLogin: IUserOAuthDTO):Promise<void>{
    try{
      const { email } = userLogin;
      const { name } = userLogin;
      const {user} = await  signInWithEmailAndPassword(
        auth,
        email,
        name
      )
      console.log(user);
    }catch{

    }
  }
}