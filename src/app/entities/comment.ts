type GUID = string & { isGuid: true};
export class Comment {
    id: GUID;  
    userId: GUID;  
    username: string;
    postId: GUID;  
    text: string;
}
export class NewComment {
    userId: GUID;  
    username: string;
    postId: GUID;  
    text: string;
}
