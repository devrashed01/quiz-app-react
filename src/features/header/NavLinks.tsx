import { menuLinks } from 'constants/menu-links';
import { NavLink } from 'react-router-dom';
import { cn } from 'utils/cn';

export default function NavLinks() {
  return (
    <nav>
      <ul className="flex gap-2 lg:gap-3">
        {menuLinks.map((el) => (
          <li key={el.path} className="first-of-type:mr-2">
            <NavLink
              className={({ isActive }) =>
                cn(
                  `transition-all lg:before:absolute before:-left-3 before:top-1/2 before:-translate-y-1/2 before:h-2 before:w-2 before:rounded-full before:transition-all before:bg-blue-500 before:opacity-0 relative ${
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
  );
}
