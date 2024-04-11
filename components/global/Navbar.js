// components/Navbar.js
import Link from 'next/link';

const Navbar = () => {
  return (
    <header>
        <nav>
            <Link className='logo' href="/">
                ewen.
            </Link>
            <Link className='contact-link' href="/about">
                Contact
            </Link>
        </nav>
    </header>
  );
};

export default Navbar;