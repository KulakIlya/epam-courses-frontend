export interface Inputs {
  title: string;
  description: string;
  duration: number;
  _?: string;
}

export interface InitialFormValues {
  title: string;
  description: string;
  duration: number | null;
  authors: (string | undefined)[];
}
