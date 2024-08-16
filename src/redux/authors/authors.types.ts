export interface Author {
  _id: string;
  name: string;
}

export interface InitialState {
  list: Author[] | null;
}
