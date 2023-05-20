import { useEffect, useState, useCallback } from 'react';

import './styles.css';

import { loadPosts } from '../../utils/load-posts';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

/**
 *  Decidir onde o estado vive é importante
 *  - Somente aquele que o state tem relação com o camponente que o react faz a atualização
 *  - Evite colocar todos os status na Raiz 
 */

 /**
  * Eventos Sinteticos
  * https://pt-br.legacy.reactjs.org/docs/events.html
  */

export const Home = () => {

  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState('');

  const noMorePosts = (page + postsPerPage) >= allPosts.length;

  const filteredPosts = !!searchValue ? posts.filter(post => {
      return post.title.toLowerCase().includes(
        searchValue.toLowerCase()
      );
  }) : posts;

  const handleLoadPosts = useCallback(async(page, postsPerPage) => {
    const postsAndPhotos = await loadPosts();

    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos);
  }, [])

  useEffect(() => {
    handleLoadPosts(0, postsPerPage);
  }, [handleLoadPosts, postsPerPage]);
  


  const loadMorePosts = () => {

    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);

    posts.push(...nextPosts);

    setPosts(posts);
    setPage(nextPage)
  }

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  }
  
  return (
      <section className='container'>

        {!!searchValue && (
          <h1>Search Value: {searchValue}</h1>
        )}

        <TextInput searchValue={searchValue} handleChange={handleChange} />

        {filteredPosts.length > 0 && (
          <Posts posts={filteredPosts}/>
        )}

        {!searchValue && (
          <Button 
            text="Mostrar Mais +"
            showMore={loadMorePosts}  
            disabled={noMorePosts}
          />
        )}
        
      </section>
  );
}

/*export class Home extends Component {

  

  async componentDidMount() {
    this.loadPosts();
  }

  

  
}/*/
export default Home;
