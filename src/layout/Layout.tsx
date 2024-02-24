import { NavLink, Outlet } from 'react-router-dom';

import Logo from 'components/Logo';
import Button from 'components/form/button';
import { menuLinks } from 'constants/menu-links';
import useAppState from 'hooks/useAppState';
import { cn } from 'utils/cn';

export default function Layout() {
  const { logOut, userRole } = useAppState();

  const isAdmin = userRole === 'admin';
  return (
    <div className="p-5 pt-0">
      <header className="sticky top-0 bg-[#f5f5f5] border-b py-5 mb-10 flex items-center gap-10">
        <Logo />
        <span className="text-sm font-medium text-slate-400 mr-auto">Logged In As: {userRole}</span>
        {isAdmin && (
          <nav>
            <ul className="flex gap-3">
              {menuLinks.map((el) => (
                <li key={el.path}>
                  <NavLink
                    className={({ isActive }) =>
                      cn(
                        `transition-all pl-3 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-2 before:w-2 before:rounded-full before:transition-all before:bg-blue-500 before:opacity-0 relative ${
                          isActive ? 'text-blue-400 before:opacity-100' : 'hover:text-blue-400'
                        }`,
                      )
                    }
                    to={el.path}
                  >
                    {el.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        )}
        <Button onClick={() => logOut()}>Sign out</Button>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
