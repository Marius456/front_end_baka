type GUID = string & { isGuid: true};

export class Plan {
    id: GUID;  
    userId: GUID;  
    name: string;  
    description: string;
    state: number;
    imagePath: string;
    category: string;
    averageRating: number;
    bookmarkId: GUID;  
}
export class NewPlan {
    userId: GUID; 
    name: string;  
    description: string;
    state: number;
    imagePath: string;
    category: string;
}
