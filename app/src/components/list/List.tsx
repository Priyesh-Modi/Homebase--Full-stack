import './list.scss';
import Card from "../card/Card";

interface Post {
  id: string;       // Ensuring id is a string, as expected by Card's Item type
  images: string[];
  title: string;
  address: string;
  price: number;
  bedroom: number;
  bathroom: number;
}

interface ListProps {
  posts: Post[]; // Array of posts, each conforming to the Post interface
}

function List({ posts }: ListProps): JSX.Element {
  return (
      <div className='list'>
        {posts.map(item => (
            <Card key={item.id} item={item} /> // Pass each post to Card component
        ))}
      </div>
  );
}

export default List;
