import { Outlet } from 'react-router-dom';

import Logo from 'components/Logo';
import Button from 'components/form/button';
import NavLinks from 'features/header/NavLinks';
import useAppState from 'hooks/useAppState';

export default function Layout() {
  const { logOut, userRole } = useAppState();

  const isAdmin = userRole === 'admin';

  return (
    <div className="p-2 md:p-5 md:pt-0">
      <div className="text-sm pt-2 font-medium text-center block text-slate-400 mr-auto md:hidden">
        Logged In As: {userRole}
      </div>
      <header className="sticky top-0 bg-[#f5f5f5] border-b py-5 mb-10 flex items-center gap-2 lg:gap-10">
        <Logo className="mr-auto md:mr-0" />
        <span className="text-sm font-medium text-slate-400 mr-auto hidden md:block">
          Logged In As: {userRole}
        </span>

        {isAdmin && <NavLinks />}

        <Button className="whitespace-nowrap" onClick={() => logOut()}>
          Sign out
        </Button>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
