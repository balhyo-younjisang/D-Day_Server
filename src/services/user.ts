import { auth, database } from "@/config/firebase";
import { IUser, IUserLoginDTO, IUserOAuthDTO, IUserSDTO, IUserSignDTO } from "@/interface/IUser";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, doc, setDoc, addDoc } from "firebase/firestore";
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