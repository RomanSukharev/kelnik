/** Намеренное использование типа `any`, там где он действительно нужен */
export type TAny = any; // eslint-disable-line @typescript-eslint/no-explicit-any

/**
 * Тип представляет функцию, которая принимает любое количество аргументов
 * и возвращает значение любого типа. Используется для методов, перехватчиков,
 * переопределений и расширений, для которых мы не знаем точных типов.
 */
export type TAnyFunction = (...args: TAny[]) => TAny;

export interface  IApartmentProps {
  id: number;
  type: string;
  name: string;
  number: string;
  square: number;
  house: string;
  floor: number;
  maxFloor: number;
  cost: number;
  image: string;
}