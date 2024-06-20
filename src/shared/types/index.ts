export type ArrayType<T> = T extends (infer Item)[] ? Item : T;

export type WithFio<T> = T & { fio: string };
