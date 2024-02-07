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
            const calRef = calendarRef[0];
            console.log(calRef);

            const result = await updateDoc(calRef, {
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
            // const calendarData = calendarItems.docs[0];
            // const updatedTodoArray = calendarData.data().Icalendar.Todo;
            const calendarData = calendarItems.docs.map((doc)=>{
                if(calendarId === doc.data().Icalendar.id){
                    return doc;
                }
            })
            const updatedTodoArray = calendarData[0].data().Icalendar.Todo;
            
            const indexToFind =  updatedTodoArray.findIndex((todo) => todo.id === todoId);
            if(indexToFind <= -1) return;
            
            updatedTodoArray.splice(indexToFind, 1);
            console.log(updatedTodoArray);

            await updateDoc(calendarData[0].ref, {
                'Icalendar.Todo': updatedTodoArray
            })
            
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
    public async acceptUser(aid: string, uid:string, isAccept: boolean){
        const calendarItems = await getDocs(collection(database, 'calendar'));
        const calendarRef = calendarItems.docs.map((doc) => {
            console.log(`돌려보는 데이터들 ${doc.data().Icalendar}`)
            if(uid === doc.data().uid){
                return doc.ref;
            } else{
                return null;
            }
        }).filter((ref) => ref !== null);
        if(isAccept){
            calendarRef.map((ref)=>{
                updateDoc(ref, {
                    vid: arrayUnion(aid),
                    aid: arrayRemove(aid)
                })
            })
        } else{
            calendarRef.map((ref)=>{
                updateDoc(ref, {
                    aid: arrayRemove(aid)
                })
            })
        }
    }
}
