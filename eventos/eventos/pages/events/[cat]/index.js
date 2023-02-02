import CatEvent from '../../../src/components/events/catEvent';

const EventsCatPage = ({ data, pageName }) => <CatEvent data={data} pageName={pageName} />;

export default EventsCatPage;

export async function getStaticPaths() {
  const { events_categories } = await import('/data/data.json');//cogemos los datos
  const allPaths = events_categories.map((ev) => {//buscamos en las categorias solo
    return {
      params: {
        cat: ev.id.toString(),//cogemos los id
      },
    };
  });
  console.log(allPaths);
  return {
    paths: allPaths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  console.log(context);
  const id = context?.params.cat;//buscamos el parametro de categoria que nos llega
  const { allEvents } = await import('/data/data.json');

  const data = allEvents.filter((ev) => ev.city === id);//buscamos en los datos, lo que tienen la ciudad igual que el parametro

  return { props: { data, pageName: id } };//devolvemos los eventos en ciudad y el id de la ciudad
}
