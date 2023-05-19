import { Component } from 'react';

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

export class Home extends Component {

  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 40,
    searchValue: ""
  };

  async componentDidMount() {
    this.loadPosts();
  }

  loadPosts = async () => {
    const {page, postsPerPage} = this.state;
    const postsAndPhotos = await loadPosts();

    this.setState({ 
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,  
    });
  }

  loadMorePosts = () => {
    const {
      page,
      postsPerPage,
      allPosts,
      posts
    } = this.state;

    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);

    posts.push(...nextPosts);

    this.setState({ posts, page: nextPage });
  }

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({searchValue: value});

  }

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = (page + postsPerPage) >= allPosts.length;

    const filteredPosts = !!searchValue ? posts.filter(post => {
      return post.title.toLowerCase().includes(
        searchValue.toLowerCase()
      );
    }): posts;

    return (
      <section className='container'>

        {!!searchValue && (
          <h1>Search Value: {searchValue}</h1>
        )}

        <TextInput searchValue={searchValue} handleChange={this.handleChange} />

        {filteredPosts.length > 0 && (
          <Posts posts={filteredPosts}/>
        )}

        {!searchValue && (
          <Button 
            text="Mostrar Mais +"
            showMore={this.loadMorePosts}  
            disabled={noMorePosts}
          />
        )}
        
      </section>
    );
  }
}

export default Home;
