import Link from 'next/link';
import Image from 'next/image';

export const HomePage = ({ data }) => (//recibos los datos del json
  <div className="home_body">
    {data?.map((ev) => (//pongo los datos
      <Link key={ev.id} href={`/events/${ev.id}`} passHref legacyBehavior>{/**la key su id, href para navegar,legacyBehavior para que el hijo sea a,passhref para enviarlo al elemento  */}
        <a className="card" href={`/events/${ev.id}`}>{/**ruta a la que dirige */}
          <div className="image">
            <Image width={400} height={200} alt={ev.title} src={ev.image} />{/**imagen con el titulo de ev */}
          </div>
          <div className="content">
            <h2> {ev.title} </h2>{/**muestro los campos de ev */}
            <p> {ev.description} </p>
          </div>
        </a>
      </Link>
    ))}
  </div>
);
