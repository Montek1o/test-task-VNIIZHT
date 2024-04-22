export interface ICharacteristics {
  speed: number,
  force: number,
  engineAmperage: number,
}

export interface ITrain {
  name: string,
  description: string,
  characteristics: ICharacteristics[],
}