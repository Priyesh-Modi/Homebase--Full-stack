import "./listPage.scss";
import Filter from "../../components/filter/Filter";
import Card from "../../components/card/Card";
import Map from "../../components/map/Map";
import { Await, useLoaderData } from "react-router-dom";
import { Suspense, ReactNode } from "react";

// Define the structure of your Post object
interface Post {
  id: string;
  images: string[];
  title: string;
  address: string;
  price: number;
  bedroom: number;
  bathroom: number;
  latitude: number;
  longitude: number;
}

// Define the structure of the response for posts
interface PostResponse {
  data: Post[];
}

// Define the LoaderData interface for the data used in the component
interface LoaderData {
  postResponse: Promise<PostResponse>;
}

function ListPage(): JSX.Element {
  // Retrieve the loader data passed to the component
  const data = useLoaderData() as LoaderData;

  return (
      <div className="listPage">
        <div className="listContainer">
          <div className="wrapper">
            <Filter />
            <Suspense fallback={<p>Loading...</p>}>
              <Await
                  resolve={data.postResponse}
                  errorElement={<p>Error loading posts!</p>}
              >
                {(postResponse: PostResponse): ReactNode =>
                    postResponse.data.map((post) => (
                        <Card key={post.id} item={post} />
                    ))
                }
              </Await>
            </Suspense>
          </div>
        </div>
        <div className="mapContainer">
          <Suspense fallback={<p>Loading...</p>}>
            <Await
                resolve={data.postResponse}
                errorElement={<p>Error loading posts!</p>}
            >
              {(postResponse: PostResponse): ReactNode => <Map items={postResponse.data} />}
            </Await>
          </Suspense>
        </div>
      </div>
  );
}

export default ListPage;
