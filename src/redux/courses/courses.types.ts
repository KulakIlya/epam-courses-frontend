export interface Course {
  _id: string;
  title: string;
  description: string;
  duration: number;
  owner: string;
  authors: string[];
  createdAt: string;
}

export interface InitialState {
  list: Course[];
}

// Add course
export type CourseToAdd = Omit<Course, 'createdAt' | 'owner' | '_id'>;

// Update course
export interface CourseToUpdate extends Omit<Course, 'createdAt' | 'owner' | '_id'> {
  _id: string;
}
