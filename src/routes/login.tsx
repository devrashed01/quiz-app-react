import Logo from 'components/Logo';
import Button from 'components/form/button';
import useAppState from 'hooks/useAppState';

export default function LoginPage() {
  const { logIn } = useAppState();

  return (
    <div className="flex flex-col justify-center bg-slate-100 items-center gap-10 h-screen p-5">
      <Logo />
      <div className="bg-white border border-slate-200 rounded-3xl text-center max-w-full w-[450px] mx-auto p-10 pt-14 shadow-sm">
        <h2 className="text-xl font-medium mb-16">Sign In</h2>
        <div className="flex items-center gap-5">
          <span className="font-medium text-slate-500">Sign in as</span>{' '}
          <Button onClick={() => logIn('user')} className="ml-auto flex-1">
            User
          </Button>{' '}
          <Button onClick={() => logIn('admin')} className="flex-1">
            Admin
          </Button>
        </div>
      </div>
    </div>
  );
}
