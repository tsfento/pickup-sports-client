export class Sport {
  id: number;
  name: string;

  constructor(sport: any) {
    this.id = sport.id || 0;
    this.name = sport.name || '';
  }
}
