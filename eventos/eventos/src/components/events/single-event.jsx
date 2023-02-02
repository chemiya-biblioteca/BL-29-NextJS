import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useRef, useState } from 'react';

const SingleEvent = ({ data }) => {//recibimos los datos
  const inputEmail = useRef();
  const router = useRouter();
  const [message, setMessage] = useState('');//variable para el mensaje

  const onSubmit = async (e) => {
    e.preventDefault();
    const emailValue = inputEmail.current.value;//cogemos de la variable su valor
    const eventId = router?.query.id;//?id=numero lo cogemos

    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;//validar email

    if (!emailValue.match(validRegex)) {//validacion
      setMessage('Please introduce a correct email address');
    }

    try {
      const response = await fetch('/api/email-registration', {//llamoamos de la carpeta api 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailValue, eventId }),//con metodo post y le pasamos el email y el id
      });

      if (!response.ok) throw new Error(`Error: ${response.status}`);//si la respuesta no es correcta
      const data = await response.json();//si recibimos respuesta
      setMessage(data.message);//ponemos el mensaje
      inputEmail.current.value = '';//reiniciamos el campo
    } catch (e) {
      console.log('ERROR', e);
    }
  };

  return (
    <div className="event_single_page">
      <h1> {data.title} </h1>{/**cogemos el titulo del data que es el evento concreto */}
      <Image src={data.image} width={1000} height={500} alt={data.title} />{/**cogemos la imagen de data */}
      <p> {data.description} </p>
      <form onSubmit={onSubmit} className="email_registration">{/**al enviarlo manejamos el evento */}
        <label> Get Registered for this event!</label>
        <input
          ref={inputEmail}
          type="email"
          id="email"
          placeholder="Please insert your email here"
        />{/**enlazamos con el email */}
        <button type="submit"> Submit</button>
      </form>
      <p>{message}</p>{/**enlazamos mensaje */}
    </div>
  );
};

export default SingleEvent;
