import styles from './Search.module.css'


//hooks
import { useFetchDocuments } from '../../hooks/useFetchDocuments'
import { useQuery } from '../../hooks/useQuery'

import PostDetail from '../../components/PostDetail/PostDetail'
import { Link } from 'react-router-dom'


const Search = () => {

    const query = useQuery();
    const search = query.get('q');
    const {documents: posts} = useFetchDocuments("posts", search)
    return (
        <div className={styles.resultContainer}>
            <h2>Resultados</h2>
            {console.log(posts)}
            {posts && posts.length===0 && (
                <>
                    <p>Não foi encontrado nenhum post relacionado...</p>
                    <Link to={"/"} className='btnRoot btnLight' >Voltar a Home</Link>
                </>
            )}
            {posts && posts.map((post) => ( <PostDetail key={post.id} post={post} />))}
        </div>
    )
}

export default Search;