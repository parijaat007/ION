import Link from 'next/link';

const Header = ({}) => (
  <header>
    <nav>
      <Link href="/api/auth/login">
       "Login link here"
      </Link>
      <button>Login</button>
    </nav>
  </header>
);

export default Header;
