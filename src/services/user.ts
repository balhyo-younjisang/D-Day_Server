import { auth, database } from "@/config/firebase";
import { IUser, IUserLoginDTO, IUserOAuthDTO, IUserSDTO, IUserSignDTO } from "@/interface/IUser";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, doc, setDoc, addDoc, getDocs } from "firebase/firestore";
import { Inject, Service } from "typedi";


@Service()
export default class UserService {
  constructor(@Inject("logger") private logger) {}

  public async SignUp(userInputDTO: IUserSDTO): Promise<String> {
    try {

      const {name, profile, id} = userInputDTO
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
        if (userDTO.id === userData.id) {
          const { password, ...userWithoutPassword } = userData;
          return userWithoutPassword;
        }
        return null;
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