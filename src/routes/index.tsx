import { useContext, useEffect, useState } from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

import Layout from 'layout/Layout';
import { AppContext } from '../context/AppContext';
import AnswersPage from './answers';
import LoginPage from './login';
import QuestionsPage from './questions';

const userRoute: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="answers" /> },
      {
        path: 'answers',
        element: <AnswersPage />,
      },
    ],
  },
  { path: '*', element: <Navigate to="answers" /> },
];
const adminRoute: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="questions" /> },
      {
        path: 'questions',
        element: <QuestionsPage />,
      },
      {
        path: 'answers',
        element: <AnswersPage />,
      },
    ],
  },
  { path: '*', element: <Navigate to="questions" /> },
];

const publicRoute: RouteObject[] = [
  { path: 'sign-in', element: <LoginPage /> },
  { path: '*', element: <Navigate to="/sign-in" /> },
];

function getRoutes(role: UserRole) {
  switch (role) {
    case 'user':
      return userRoute;
    case 'admin':
      return adminRoute;
    default:
      return publicRoute;
  }
}

const Routes = () => {
  const { userRole } = useContext(AppContext);

  const [routes, setRoutes] = useState<RouteObject[]>(getRoutes(userRole));

  useEffect(() => {
    setRoutes(getRoutes(userRole));
  }, [userRole]);

  useEffect(() => {
    document.addEventListener('contextmenu', (e) => {
      e.preventDefault();
    });

    document.addEventListener('copy', (e) => {
      e.preventDefault();
    });

    document.addEventListener('selectstart', (e) => {
      e.preventDefault();
    });

    return () => {
      document.removeEventListener('contextmenu', (e) => {
        e.preventDefault();
      });

      document.removeEventListener('copy', (e) => {
        e.preventDefault();
      });

      document.removeEventListener('selectstart', (e) => {
        e.preventDefault();
      });
    };
  }, []);

  const appRoutes = useRoutes(routes);

  if (userRole) {
    return <div>{appRoutes}</div>;
  }

  return <div>{appRoutes}</div>;
};

export default Routes;
