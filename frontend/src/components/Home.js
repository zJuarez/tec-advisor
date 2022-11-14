import '../App.css';
import categories from '../data/categories';
import Category from './Category';

function Home() {
  return (
    <div className="">
      <Category></Category>
      {/* Mau's code {categories.map(category => <Category name={category}>  </Category>)} */}
    </div>
  );
}

export default Home;
