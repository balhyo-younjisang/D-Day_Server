import { ITodo, ICalendar, INote } from "@/interface/ICalender";
import { Inject, Service } from "typedi";
import { getFirestore, collection, doc, setDoc, addDoc, getDoc, updateDoc, getDocs, deleteDoc, query, where, QuerySnapshot, DocumentSnapshot, DocumentData, arrayUnion, arrayRemove } from "firebase/firestore";
import { auth, database } from "@/config/firebase";

@Service()
export default class CalendarService {
    constructor(@Inject("logger") private logger) {}

    public async makeTodo(Icalendar: ICalendar){
        try {
            // const calendarRef = doc(collection(getFirestore(), "calendars"), String(calendarId));
            console.log(Icalendar);
            if(!Icalendar.id){
                Icalendar.id = Date.now();
                const user = await addDoc(collection(database, 'calendar'), {Icalendar});
                return user;
            }
            const calendarItems = await getDocs(collection(database, 'calendar'));
            const calendarRef = calendarItems.docs.map((doc) => {
                console.log(`돌려보는 데이터들 ${doc.data().Icalendar}`)
                if(Icalendar.id === doc.data().Icalendar.id){
                    return doc.ref;
                } else{
                    return null;
                }
            }).filter((ref) => ref !== null);
            console.log(Icalendar.Todo);
            await updateDoc(calendarRef[0], {
                'Icalendar.Todo': arrayUnion(Icalendar.Todo[0]),
            });
            return;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    public async makeNote(Icalendar: ICalendar){
        try {
            // const calendarRef = doc(collection(getFirestore(), "calendars"), String(calendarId));
            console.log(Icalendar);
            if(!Icalendar.id){
                Icalendar.id = Date.now();
                const user = await addDoc(collection(database, 'calendar'), {Icalendar});
                return user;
            }
            const calendarItems = await getDocs(collection(database, 'calendar'));
            const calendarRef = calendarItems.docs.map((doc) => {
                console.log(`돌려보는 데이터들 ${doc.data().Icalendar}`)
                if(Icalendar.id === doc.data().Icalendar.id){
                    return doc.ref;
                } else{
                    return null;
                }
            }).filter((ref) => ref !== null);
            console.log(Icalendar.Todo);
            await updateDoc(calendarRef[0], {
                'Icalendar.Note': arrayUnion(Icalendar.Todo[0]),
            });
            return;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    public async editTodo(calendarId: number, todoId: number): Promise<void> {
        try {
            const calendarItems = await getDocs(collection(database, 'calendar'));
            const calendarRef = calendarItems.docs.map((doc) => {
                console.log(`돌려보는 데이터들 ${doc.data().Icalendar}`)
                if(calendarId=== doc.data().Icalendar.id){
                    return doc.ref;
                } else{
                    return null;
                }
            }).filter((ref) => ref !== null);
            await updateDoc(calendarRef[0], {
                // 'Icalendar.Todo': arrayRemove(Icalendar.Todo[0]),
            });
            return;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    public async deleteTodo(calendarId: number, todoId: number): Promise<void> {
        try {
            const calendarItems = await getDocs(collection(database, 'calendar'));
            const calendarRef = calendarItems.docs.map((doc) => {
                console.log(`돌려보는 데이터들 ${JSON.stringify(doc.data().Icalendar)}`)
                if (calendarId === doc.data().Icalendar.id) {
                    return doc.ref;
                } else {
                    return null;
                }
            }).filter((ref) => ref !== null);
    
            const result = await updateDoc(calendarRef[0], {
                'Icalendar.Todo': arrayRemove({ id: todoId }),
            });
            console.log(calendarRef);
    
            return;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    public async applyCalender(aid: string, uid: string){
        const calendarItems = await getDocs(collection(database, 'calendar'));
        const calendarRef = calendarItems.docs.map((doc) => {
            console.log(`돌려보는 데이터들 ${doc.data().Icalendar}`)
            if(uid === doc.data().uid){
                return doc.ref;
            } else{
                return null;
            }
        }).filter((ref) => ref !== null);
        calendarRef.map((ref)=>{
            updateDoc(ref, {
                aid: arrayUnion(aid)
            })
        })
    }
}
