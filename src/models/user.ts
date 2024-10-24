export interface User {
    id: number;
    name:string; 
    username: string;
    email:string;
    password:string;
    isAdmin:boolean;
    isBlocked:boolean;
    registrationDate:Date;
}