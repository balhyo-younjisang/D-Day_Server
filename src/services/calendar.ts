import { ITodo, ICalendar, INote } from "@/interface/ICalender";
import { Inject, Service } from "typedi";
import { getFirestore, collection, doc, setDoc, addDoc, getDoc, updateDoc, getDocs, deleteDoc, query, where, QuerySnapshot, DocumentSnapshot, DocumentData, arrayUnion, arrayRemove } from "firebase/firestore";
import { auth, database } from "@/config/firebase";

@Service()
export default class CalendarService {
    constructor(@Inject("logger") private logger) {}

    public async makeTodo(Icalendar: ICalendar){
        try {
            if(!Icalendar.id){ 
                Icalendar.id = Date.now();
                return await addDoc(collection(database, 'calendar'), {Icalendar})
            };
            const calendarItems = await getDocs(collection(database, 'calendar'));
            const calendarData = calendarItems.docs.map((doc)=>{
                if(Icalendar.id === doc.data().Icalendar.id){
                    return doc;
                }
                return null;
            }).filter((element) => element !== null);
            console.log(calendarData);
            const updatedTodoArray = calendarData[0].data().Icalendar.Todo;
            if(!updatedTodoArray){
                await updateDoc(calendarData[0].ref, {
                    'Icalendar.Todo': [Icalendar.Todo[0]]
                })
                return 201;
            }
            updatedTodoArray.push(Icalendar.Todo[0]);

            await updateDoc(calendarData[0].ref, {
                'Icalendar.Todo': updatedTodoArray
            })
            
            return;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    public async makeNote(Icalendar: ICalendar){
        try {
            if(!Icalendar.id){ 
                Icalendar.id = Date.now();
                return await addDoc(collection(database, 'calendar'), {Icalendar})
            };
            const calendarItems = await getDocs(collection(database, 'calendar'));
            const calendarData = calendarItems.docs.map((doc)=>{
                if(Icalendar.id === doc.data().Icalendar.id){
                    return doc;
                }
                return null;
            }).filter((element) => element !== null);
            const updatedTodoArray = calendarData[0].data().Icalendar.note;
            if(!updatedTodoArray){
                console.log(Icalendar.note);
                await updateDoc(calendarData[0].ref, {
                    'Icalendar.note': [Icalendar.note[0]]
                })
                return 201;
            }
            updatedTodoArray.push(Icalendar.note[0]);

            await updateDoc(calendarData[0].ref, {
                'Icalendar.note': updatedTodoArray
            })
            
            return;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    public async editTodo(calendarId: number, todo: ITodo): Promise<void> {
            try {
                const calendarItems = await getDocs(collection(database, 'calendar'));
                const calendarData = calendarItems.docs.map((doc)=>{
                    if(calendarId === doc.data().Icalendar.id){
                        return doc;
                    }
                    return null;
                }).filter((element)=>element!==null);
                let updatedTodoArray = calendarData[0].data().Icalendar.Todo;
                updatedTodoArray = updatedTodoArray.map((element) => {
                    if (element.id === todo.id) {
                        return todo;
                    } else {
                        return element;
                    }
                });
    
                await updateDoc(calendarData[0].ref, {
                    'Icalendar.Todo': updatedTodoArray
                })
                
                return;
            } catch (error) {
                console.log(error);
                throw error;
            }
    }

    
    public async editNote(calendarId: number, note: INote): Promise<void> {
        try {
            const calendarItems = await getDocs(collection(database, 'calendar'));
            const calendarData = calendarItems.docs.map((doc)=>{
                if(calendarId === doc.data().Icalendar.id){
                    return doc;
                }
                return null;
            }).filter((element)=>element!==null);
            let updatedTodoArray = calendarData[0].data().Icalendar.note;
            updatedTodoArray = updatedTodoArray.map((element) => {
                if (element.id === note.id) {
                    return note;
                } else {
                    return element;
                }
            });

            await updateDoc(calendarData[0].ref, {
                'Icalendar.note': updatedTodoArray
            })
            
            return;
        } catch (error) {
            console.log(error);
            throw error;
        }
}

    public async deleteTodo(calendarId: number, todoId: number): Promise<void> {
        try {
            const calendarItems = await getDocs(collection(database, 'calendar'));
            const calendarData = calendarItems.docs.map((doc)=>{
                if(calendarId === doc.data().Icalendar.id){
                    return doc;
                }
                return null;
            }).filter((element)=>element!==null);
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
        try {
            const calendarItems = await getDocs(collection(database, 'calendar'));
            const calendarData = calendarItems.docs.map((doc)=>{
                if(uid === doc.data().Icalendar.uid){
                    return doc;
                }
            })
            const updatedTodoArray = calendarData[0].data().Icalendar.aid;
            if(!updatedTodoArray){
                await updateDoc(calendarData[0].ref, {
                    'Icalendar.aid': [aid]
                })
                return 201;
            }
            if(updatedTodoArray.includes(aid)) return 409;
            updatedTodoArray.push(aid);

            await updateDoc(calendarData[0].ref, {
                'Icalendar.aid': updatedTodoArray
            })
            
            return;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    public async acceptUser(aid: string, uid:string, isAccept: boolean){
        try {
            const calendarItems = await getDocs(collection(database, 'calendar'));
            const calendarData = calendarItems.docs.map((doc)=>{
                if(uid === doc.data().Icalendar.uid){
                    return doc;
                }
            })
            if(isAccept){
                await updateDoc(calendarData[0].ref, {
                    'Icalendar.aid': arrayRemove(aid),
                    'Icalendar.vid': arrayUnion(aid)
                })
                return 201;
            } else{
                await updateDoc(calendarData[0].ref, {
                    'Icalendar.aid': arrayRemove(aid),
                })
                return 201;
            }
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}
