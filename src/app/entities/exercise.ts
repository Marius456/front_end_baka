type GUID = string & { isGuid: true};

export class Exercise {
    id: GUID;  
    time: Date;
    userId: GUID;  
    title: string;
    text: string;
    state: string;
    trackerId: GUID;
}
export class NewExercise {
    userId: GUID;  
    title: string;
    text: string;
}
export class Event {
    title:  string;  
    date:  Date;  

    constructor(item: Exercise) {
        this.title = item.text;
        this.date = item.time;
    }
}
