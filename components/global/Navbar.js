// components/Navbar.js
import Link from 'next/link';
import '../../styles/components/global/navbar.scss'

const Navbar = () => {
  return (
    <header>
      <div className='container'>
        <nav>
            <Link className='logo' href="/">
                marin.
            </Link>
            <Link className='contact-link' href="mailto:marin.leclerc.dev@gmail.com">
                Contact
            </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;