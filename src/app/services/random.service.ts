export class RandomNumberService {

  public static getRandomNumber(max: number): number {
    return Math.floor(Math.random() * max) + 1;
  }
}
