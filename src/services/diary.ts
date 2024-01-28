import { IDiary } from "@/interface/IDiary";
import { Inject, Service } from "typedi";
import { getFirestore, collection, doc, setDoc, addDoc, getDoc} from "firebase/firestore";
import { auth, database } from "@/config/firebase";
const firebase = require('firebase/firestore')

@Service()
export default class TokenService {
    constructor(@Inject("logger") private logger) {}

    public async makeDiary(diaryData: IDiary){
        try{
            const user = await addDoc(collection(database, 'diary'), {diaryData});
        }catch{

        }
    }

    public async getDiary(author: string){
        try {
            const diaryItems = await firebase.getDoc(firebase.collection(database, 'diary'));
            const itemsArray = diaryItems.docs.map((doc) => {
                if(author === doc.author){
                    return { id: doc.id, ...doc.data() };
                }
            });
            console.log(itemsArray);
        } catch (error) {
            console.log(error);
        }
    }
}