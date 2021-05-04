export class Exercise {
    id:number;  
    time:Date;
    userId:number;  
    planId:number;  
    text:string;
}
export class NewExercise {
    time:Date;
    userId:number;  
    planId:number;  
    text:string;
}
export class Event {
    title:  string;  
    start:  Date;  
    end:    Date; 

    constructor(item: Exercise) {
        this.title = item.text;
        this.start = item.time;
        this.end = item.time;
    }
}
