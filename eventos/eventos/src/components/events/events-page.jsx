import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const AllEvents = ({ data }) => {//recibimos los datos
  return (
    <div className="events_page">
      {data?.map((ev) => (
        <Link key={ev.id} href={`/events/${ev.id}`} passHref legacyBehavior>
          <a className="card">{/**por cada dato, ponemos su key, href con su ruta, passhref para que nos dirija al elemento y legacyBehaviour para hijo con a */}
            <Image src={ev.image} alt={ev.title} width={400} height={400} /> <h2>{ev.title} </h2>
          </a>{/**enlazamos con su imagen y titulo */}
        </Link>
      ))}
    </div>
  );
};

export default AllEvents;
