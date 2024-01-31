import { IDiary, IDiaryDTO } from "@/interface/IDiary";
import { Inject, Service } from "typedi";
import { getFirestore, collection, doc, setDoc, addDoc, getDoc, updateDoc} from "firebase/firestore";
import { auth, database } from "@/config/firebase";
const firebase = require('firebase/firestore')

@Service()
export default class DiaryService {
    constructor(@Inject("logger") private logger) {}

    public async makeDiary(diaryData: IDiary){
        try{
            const user = await addDoc(collection(database, 'diary'), {diaryData});
        }catch{

        }
    }

    public async getDiaries(author: string){
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
    public async getDiary(id: string){
        try{
            const diaryItems = await firebase.getDoc(firebase.collection(database, 'diary'));
            const itemsArray = diaryItems.docs.map((doc) => {
                if(id === doc.id){
                    return { id: doc.id, ...doc.data() };
                }
            });
            console.log(itemsArray);
        }catch(error){
            console.log(error);
        }
    }
    public async editDiary(diaryData: IDiaryDTO){
        try {
            const diaryItems = await firebase.getDoc(firebase.collection(database, 'diary'));   
            diaryItems.forEach(async (doc) => {
                const { id } = doc.id;
          
                if (diaryData.id === id) {
                  await updateDoc(doc.ref, { ...diaryData });
                  return;
                }
        
            });
        } catch (error) {
            console.log(error);
        }
    }
}