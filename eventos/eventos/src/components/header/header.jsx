import Link from 'next/link';
import Image from 'next/image';

export const Header = () => {
  return (
    <header>
      <div>
        <div className="topNav">
          <Image alt="logo" src={'/images/logo_black.png'} width={50} height={50} />
          <nav>{/**enlazamos con la imagen */}
            <ul>
              <li>
                <Link href="/" passHref legacyBehavior> 
                  <a> Home</a>{/**con hijo a y dirigimos al elemento */}
                </Link>
              </li>
              <li>
                <Link href="/events" passHref legacyBehavior>
                  <a> Events</a>{/**con hijo a y dirigimos al elemento */}
                </Link>
              </li>
              <li>
                <Link href="/about-us" passHref legacyBehavior>
                  <a> About us</a>{/**con hijo a y dirigimos al elemento */}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <p className="title"> Sed ut perspiciatis unde omnis</p>
      </div>
    </header>
  );
};
