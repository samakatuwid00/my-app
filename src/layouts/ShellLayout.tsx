import { Outlet } from 'react-router-dom';
import { CommandBar } from '../components/CommandBar';
import { ScrollUpButton } from '../components/ui/ScrollUpButton';

export function ShellLayout() {
  return (
    <>
      <ScrollUpButton />
      <div className="min-h-screen bg-base-100 text-base-content">
        <CommandBar />
        <main className="pt-14">
          <Outlet />
        </main>
      </div>
    </>
  );
}
