type GUID = string & { isGuid: true};

export class Message {
    id: GUID;  
    userId: GUID;  
    planId: GUID;
    time: Date;
    text: string;
    senderImage: string;
    senderName: string;
}
export class NewMessage {
    userId: GUID;  
    planId: GUID;
    time: Date;
    text: string;
}
