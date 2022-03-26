export class User {

    public username: string;
    public password: string;
    public name: string;
    public surname: string;
    public location: string;

    constructor(username: string, password: string, name: string, surname: string, location: string){
        this.username = username;
        this.password = password;
        this.name = name;
        this.surname = surname;
        this.location = location;
    }
}