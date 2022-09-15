//CSS
import styles from './Home.module.css'

import { useState } from 'react';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';

import { Link, useNavigate } from 'react-router-dom';
import PostDetail from '../../components/PostDetail/PostDetail';

const Home = () => {
  const [query, setQuery] = useState('');
  const { documents: posts, loading } = useFetchDocuments("posts");
  const navigate = useNavigate()
  
  const handlerSubmit = (e) => {
    e.preventDefault();
    if(query){
      return navigate(`/search?q=${query}`);
    }
  }
  return (
    <>
      <div className={styles.searchContainer}>
        <form onSubmit={handlerSubmit}>
          <input name='searchBar' id='searchBar' className={styles.searchBar} type='text' onChange={(e) => setQuery(e.target.value)} value={query} placeholder='Pesquisar...'></input>
          <button className='btnSearch' type='submit'>Ir</button>
        </form>
      </div>
      <div className={styles.posts}>
        {posts && posts.map((post) => (
        
            <PostDetail key={post.id} post={post}/>
        ))}
        {posts && posts.length === 0 &&
          <div className={styles.noPost}>
            <p>Nenhum Post Encontrado.</p>
            <Link to={"/post/create"} className="btnRoot" >Criar Um Post</Link>
          </div>
        }
      </div>
    </>
  )
}

export default Home