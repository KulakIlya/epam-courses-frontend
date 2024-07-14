export interface OnAddAuthor {
  (newAuthor: string): void;
}

export interface OnRemoveAuthor {
  (filter: string): void;
}
