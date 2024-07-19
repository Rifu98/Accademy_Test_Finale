export class Meteo {
  public citta: string;
  public data: Date; // LocalDate in Java viene tradotto in Date in TypeScript
  public tempmax: number; // In TypeScript, il tipo `double` è rappresentato da `number`
  public tempmin: number; // In TypeScript, il tipo `double` è rappresentato da `number`
  public userId: number;

  constructor(
    citta: string,
    data: Date,
    tempmax: number,
    tempmin: number,
    userId: number
  ) {
    this.citta = citta;
    this.data = data;
    this.tempmax = tempmax;
    this.tempmin = tempmin;
    this.userId = userId;
  }
}
