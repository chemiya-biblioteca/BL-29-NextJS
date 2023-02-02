import AllEvents from '../../src/components/events/events-page';

const EventsPage = ({ data }) => {//los datos del json
  return <AllEvents data={data} />;//llamo al componente con los datos
};

export default EventsPage;

export async function getStaticProps() {//cargo los datos del json
  const { events_categories } = await import('/data/data.json');
  return {
    props: {
      data: events_categories,//cogemos solo las categorias
    },
  };
}
