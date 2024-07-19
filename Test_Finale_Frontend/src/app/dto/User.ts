import { Meteo } from './Meteo'; 

export class User {
  public id: number;
  public nome: string;
  public cognome: string;
  public email: string;
  public ruolo: string;
  public ricercheMeteo?: Meteo[];

  constructor(
    id: number,
    nome: string,
    cognome: string,
    email: string,
    ruolo: string,
    ricercheMeteo?: Meteo[]
  ) {
    this.id = id;
    this.nome = nome;
    this.cognome = cognome;
    this.email = email;
    this.ruolo = ruolo;
    this.ricercheMeteo = ricercheMeteo;
  }
}
