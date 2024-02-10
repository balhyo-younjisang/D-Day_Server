import { IDiary, IDiaryDTO } from "@/interface/IDiary";
import { Inject, Service } from "typedi";
import { getFirestore, collection, doc, setDoc, addDoc, getDoc, updateDoc, getDocs, deleteDoc} from "firebase/firestore";
import { auth, database } from "@/config/firebase";
const firebase = require('firebase/firestore')

@Service()
export default class DiaryService {
    constructor(@Inject("logger") private logger) {}

    public async makeDiary(diaryData: IDiaryDTO){
        try{
            console.log(diaryData);
            const user = await addDoc(collection(database, 'diary'), {diaryData});
        }catch(error){
            console.log(error);
        }
    }

    public async getMyDiaries(author: string){
        try {
            const diaryItems = await firebase.getDocs(firebase.collection(database, 'diary'));
            const itemsArray = diaryItems.docs.map((doc) => {
                console.log(`${author}, ${doc.data().diaryData.uid}`);
                if(author === doc.data().diaryData.uid){
                    return { id: doc.id, ...doc.data() };
                }
            });
            return itemsArray;
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
          
                // if (diaryData.id === id) {
                //   await updateDoc(doc.ref, { ...diaryData });
                //   return;
                // }
        
            });
        } catch (error) {
            console.log(error);
        }
    }

    public async deleteDiary(id:string, uid:string){
        try {
            const diaryItems = await getDocs(collection(database, 'diary'));
            const result = diaryItems.forEach((doc) => {
                if(doc.data().diaryData.id === id && doc.data().diaryData.uid === uid) deleteDoc(doc.ref);
            })
            return result;
        } catch (error) {
            throw Error;
        }
    }
}