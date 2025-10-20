import Link from "next/link";
import css from "./Header.module.css";

interface HeaderProps {}

const Header = ({}: HeaderProps) => {
  return (
    <header className={css.header}>
      <a href="/" aria-label="Home">
        NoteHub
      </a>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li>
            <Link href={"/notes"}>Notes</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
