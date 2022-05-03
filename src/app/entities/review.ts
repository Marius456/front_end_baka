type GUID = string & { isGuid: true};
export class Review {
    id: GUID;  
    userId: GUID;  
    username:string;
    userImage:string;
    planId: GUID;  
    planImage:number;  
    planName:number;  
    rating:number;
    text:string;
}
export class ReviewCount {
    fiveStars:number;  
    fourStars:number;  
    threeStars:number;  
    twoStars:number;  
    oneStars:number;  
}
export class NewReview {
    userId: GUID;  
    username:string;
    planId: GUID;  
    rating:number;
    text:string;
}
