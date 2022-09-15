import styles from './Post.module.css'

//hooks
import { useParams } from 'react-router-dom'
import { useFetchDocument } from '../../hooks/useFetchDocument'

const Post = () => {
    const { id } = useParams();
    const uid = id;
    const { document: post } = useFetchDocument('posts', uid);
    return (
        <div>
            {post && (
                <div className={styles.postContainer}>
                    <div className={styles.titleContainer}>
                        <h1>{post.title}</h1>
                    </div>
                    <div className={styles.imgContainer}>
                        <img src={post.url} alt={post.title} />
                    </div>
                    <div className={styles.bodyContainer}>
                        <p>{post.body}</p>
                    </div>
                    <div className={styles.tagsContainer}>
                        {post.tagsArray.map((tag) => (
                            <span key={tag}>#{tag}</span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default Post