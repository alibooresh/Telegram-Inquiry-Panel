export interface UserModel {
    id:number|null;
    firstName?:string;
    lastName?:string;
    usernames?:UsernameModel;
    phoneNumber:string|null;
}
export interface UsernameModel{
    activeUsernames?:string[];
    disabledUsernames?:string[];
    editableUsername?:string
}