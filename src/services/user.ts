import { auth } from "@/config/firebase";
import { IUserSignDTO } from "@/interface/IUser";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Inject, Service } from "typedi";

@Service()
export default class UserService {
  constructor(@Inject("logger") private logger) {}

  public async SignUp(userInputDTO: IUserSignDTO): Promise<String> {
    try {
      const { password } = userInputDTO;

      const { user } = await createUserWithEmailAndPassword(
        auth,
        userInputDTO.email,
        password
      );

      return user.email;
    } catch (e) {
      throw e;
    }
  }
}