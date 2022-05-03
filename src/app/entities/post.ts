type GUID = string & { isGuid: true};
export class Post {
    id: GUID;  
    userId: GUID;  
    name: string;  
    description: string;
}
export class NewPost {
    userId: GUID; 
    name: string;  
    description: string;
}
