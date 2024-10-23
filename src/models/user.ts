export interface User {
    id: number;
    name:string; 
    email:string;
    isAdmin:boolean;
    isBlocked:boolean;
    registrationDate:Date;
}