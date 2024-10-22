export interface UserDTO {
    id:number;
    name:string; 
    email:string;
    password:string;
    isAdmin:boolean;
    isBlocked:boolean;
    registrationDate:Date;
}