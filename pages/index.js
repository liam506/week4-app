import Link from 'next/link';
import Layout from '../components/layout';
import { getSortedList } from '../lib/data';
import { getSortedThingList } from '../lib/data-things';

// define a getStaticProps() function - this name is defined by next.js
export async function getStaticProps() {
  const allData = await getSortedList();
  const allThingData = await getSortedThingList();
  return {
    props: {
      allData,
      allThingData
    },
    revalidate: 60
  }
}

// export our home page component Home
export default function Home( { allData } ) {
  return (
    <Layout home>
      <h1>List of Names</h1>
      <div className="list-group">
        {allData.map(
            ({id, name}) => (
              <Link key={id} href={`/${id}`} className="list-group-item list-group-item-action">
                {name}
              </Link>
            )
          )
        }
      </div>
      <h1>List of Things</h1>
        <div className="list-group">
          {allThingData.map(({ id, thing_description }) => (
            <Link key={id} href={`/things/${id}`}>
              <a className="list-group-item list-group-item-action">{thing_description}</a>
            </Link>
          ))}
        </div>
    </Layout>
  );
}