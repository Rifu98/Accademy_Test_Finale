
export class UserSignup {
    public nome: string;
    public cognome: string;
    public email: string;
    public password: string;

    constructor(nome: string, cognome: string, email: string, password: string) {
        this.nome = nome;
        this.cognome = cognome;
        this.email = email;
        this.password = password;
    }
}
