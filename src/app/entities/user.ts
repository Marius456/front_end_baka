type GUID = string & { isGuid: true};
export class User {
    id: GUID;  
    name: string;  
    email:string;
    image: string;
    description: string;
    role:string;
    password:string;
    token:string;
}
export class NewUser {
    name:string;  
    email:string;
    password:string;
}
export class loginUser {
    email:string;
    password:string;
}
export class newPassword {
    oldPassword:string;
    newPassword:string;
    newPassword2:string;
}
export class Bookmark {
    id: GUID;
    userId: GUID;  
    planId: GUID;
}
export class Tracker {
    id: GUID;
    bookmarkId: GUID;  
    planExerciseId: GUID;
}
export class State{
    stateName: string;
}
