import path from 'path';
import fs from 'fs';

function buildPath() {
  return path.join(process.cwd(), 'data', 'data.json');//buscar el camino del archivo
}

function extractData(filePath) {
  const jsonData = fs.readFileSync(filePath);//coges el archivo y lo procesas a json
  const data = JSON.parse(jsonData);
  return data;
}

export default function handler(req, res) {
  const { method } = req;

  const filePath = buildPath();//buscas el archivo
  const { events_categories, allEvents } = extractData(filePath);//coges su datos

  if (!allEvents) {// si no encuentra el archivo
    return res.status(404).json({
      status: 404,
      message: 'Events data not found',
    });
  }

  if (method === 'POST') {//si llega evento post
    const { email, eventId } = req.body;//coges del cuerpo los valores

    if (!email | !email.includes('@')) {//validacion del email
      res.status(422).json({ message: 'Invalid email address' });
    }

    const newAllEvents = allEvents.map((ev) => {//buscas todos los eventos
      if (ev.id === eventId) {//el que coincida con el id
        if (ev.emails_registered.includes(email)) {//miras los que tiene ya registrados
          res.status(409).json({ message: 'This email has already been registered' });
          return ev;
        }
        return {
          ...ev,//si no añades el email registrado
          emails_registered: [...ev.emails_registered, email],
        };
      }
      return ev;
    });


    //escribes el nuevo archivo
    fs.writeFileSync(filePath, JSON.stringify({ events_categories, allEvents: newAllEvents }));

    res.status(201).json({//envias mensaje de respuesta
      message: `You have been registered successfully with the email: ${email} for the event: ${eventId}`,
    });
  }
}
