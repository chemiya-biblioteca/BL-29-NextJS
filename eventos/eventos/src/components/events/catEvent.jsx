import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const CatEvent = ({ data, pageName }) => {//reicimos los datos de los eventos en una ciudad y su nombre
  return (
    <div className="cat_events">
      <h1> Events in {pageName} </h1>{/**mostramos el nombre */}

      <div className="content">
        {data.map((ev) => (
          <Link key={ev.id} href={`/events/${ev.city}/${ev.id}`} passHref legacyBehavior>
            <a className="card">{/**por cada evento, ponemos la key, su ruta, legacyBehaviour para hijo con a, passHref para enviarlo al elemento */}
              <Image width={300} height={300} alt={ev.title} src={ev.image} />{/**enlazamos con el titulo y la imagen */}
              <h2> {ev.title} </h2>
              <p> {ev.description} </p>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CatEvent;
