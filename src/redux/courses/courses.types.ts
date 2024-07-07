export interface Course {
  id: string;
  title: string;
  description: string;
  duration: number;
  owner: string;
  authors: string[];
  creationDate: string;
}

export interface InitialState {
  list: Course[];
}

// Add course
export type CourseToAdd = Omit<Course, 'creationDate' | 'id'>;

// Update course
export interface CourseToUpdate extends Partial<Omit<Course, 'id'>> {
  id: string;
}
