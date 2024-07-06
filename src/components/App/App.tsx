import { FC, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

const RegistrationPage = lazy(() => import('../../pages/RegistrationPage'));
const LoginPage = lazy(() => import('../../pages/LoginPage'));
const CoursesPage = lazy(() => import('../../pages/CoursesPage'));
const CourseDetailsPage = lazy(() => import('../../pages/CourseDetailsPage'));
const CreateCoursePage = lazy(() => import('../../pages/CreateCoursePage'));

const App: FC = () => {
  return (
    <Routes>
      <Route path="/registration" element={<RegistrationPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/courses">
        <Route index element={<CoursesPage />} />
        <Route path=":id" element={<CourseDetailsPage />} />
        <Route path="add" element={<CreateCoursePage />} />
        <Route path="update/:id" element={<CreateCoursePage />} />
      </Route>
    </Routes>
  );
};
export default App;
