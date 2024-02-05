import { ITodo, ICalendar, INote } from "@/interface/ICalender";
import { Inject, Service } from "typedi";
import { getFirestore, collection, doc, setDoc, addDoc, getDoc, updateDoc, getDocs, deleteDoc, query, where, QuerySnapshot, DocumentSnapshot, DocumentData, arrayUnion } from "firebase/firestore";
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
                console.log(`받아온 데이터 ${Icalendar}`);
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
            const docSnap = await getDoc(calendarRef[0]);
            const calendarData = docSnap.data();
            console.log(Icalendar.Todo);
            await updateDoc(calendarRef[0], {
                'Icalendar.Todo': arrayUnion(Icalendar.Todo[0]),
            });
            return;
        } catch (error) {
            console.log(error);
            throw Error;
        }
    }

    public async editTodo(calendarId: number, todoId: number, updatedTodo: ITodo): Promise<void> {
        // try {
        //     const calendarRef = doc(collection(getFirestore(), "calendars"), String(calendarId));
        //     const updatedTodos = calendar.todos.map((t) => (t.id === todoId ? updatedTodo : t));
        //     await updateDoc(calendarRef, { todos: updatedTodos });
        // } catch (error) {
        //     console.log(error);
        // }
    }

    public async deleteTodo(calendarId: number, todoId: number): Promise<void> {
        // try {
        //     const calendarRef = doc(collection(getFirestore(), "calendars"), String(calendarId));
        //     const updatedTodos = calendar.todos.filter((t) => t.id !== todoId);
        //     await updateDoc(calendarRef, { todos: updatedTodos });
        // } catch (error) {
        //     console.log(error);
        // }
    }

    public async makeNote(calendarId: number, note: INote): Promise<void> {
        // try {
        //     const calendarRef = doc(collection(getFirestore(), "calendars"), String(calendarId));
        //     await updateDoc(calendarRef, {
        //         notes: [...calendar.notes, note],
        //     });
        // } catch (error) {
        //     console.log(error);
        // }
    }

    public async editNote(calendarId: number, noteId: number, updatedNote: INote): Promise<void> {
        // try {
        //     const calendarRef = doc(collection(getFirestore(), "calendars"), String(calendarId));
        //     const updatedNotes = calendar.notes.map((n) => (n.id === noteId ? updatedNote : n));
        //     await updateDoc(calendarRef, { notes: updatedNotes });
        // } catch (error) {
        //     console.log(error);
        // }
    }

    public async deleteNote(calendarId: number, noteId: number): Promise<void> {
        // try {
        //     const calendarRef = doc(collection(getFirestore(), "calendars"), String(calendarId));
        //     const updatedNotes = calendar.notes.filter((n) => n.id !== noteId);
        //     await updateDoc(calendarRef, { notes: updatedNotes });
        // } catch (error) {
        //     console.log(error);
        // }
    }

    // public async getCalendarData(calendarId: number): Promise<ICalendar | undefined> {
        // try {
        //     const calendarRef = doc(collection(getFirestore(), "calendars"), String(calendarId));
        //     const calendarDoc = await getDoc(calendarRef);
        //     return calendarDoc.exists() ? calendarDoc.data() as ICalendar : undefined;
        // } catch (error) {
        //     console.log(error);
        //     return undefined;
        // }
    // }

    public async applyCalendar(calendarId: number, userId: string): Promise<void> {
        // try {
        //     const calendarRef = doc(collection(getFirestore(), "calendars"), String(calendarId));
        //     await updateDoc(calendarRef, {
        //         aid: [...calendar.aid, userId],
        //     });
        // } catch (error) {
        //     console.log(error);
        // }
    }

    public async acceptUser(calendarId: number, userId: string): Promise<void> {
        // try {
        //     const calendarRef = doc(collection(getFirestore(), "calendars"), String(calendarId));
        //     await updateDoc(calendarRef, {
        //         vid: [...calendar.vid, userId],
        //     });
        // } catch (error) {
        //     console.log(error);
        // }
    }
}
