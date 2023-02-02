import SingleEvent from '../../../src/components/events/single-event';
//con los datos, llamo al componente y se los paso
const EventPage = ({ data }) => <SingleEvent data={data} />;

export default EventPage;

export async function getStaticPaths() {
  const data = await import('/data/data.json');//cargo los datos
  const allEvents = data.allEvents;//buscamos en todos los eventos

  const allPaths = allEvents.map((path) => {
    return {
      params: {
        cat: path.city,//de cada evento, el nombre de la ciudad se sustituira por cat en la ruta
        id: path.id,//el id del evento se sustituira por id en la ruta
      },
    };
  });

  return {
    paths: allPaths,//devolvemos las rutas
    fallback: false,
  };
}

export async function getStaticProps(context) {
  console.log(context);
  const id = context.params.id;//cogemos el id que nos llega
  const { allEvents } = await import('/data/data.json');//cargamos los datos del json
  const eventData = allEvents.find((ev) => id === ev.id);//buscamos el evento en el json que tenga el mismo id

  return {
    props: { data: eventData },//devolvemos ese evento
  };
}
