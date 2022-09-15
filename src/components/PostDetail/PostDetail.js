import React from 'react'
import { Link } from 'react-router-dom';

import styles from './PostDetail.module.css'


const PostDetail = ({ post }) => {
    return (
        <div className={styles.post}>
            <div className={styles.imgContent}><img src={post.url} alt={post.title}></img></div>
            <div className={styles.bodyContent}>
                <h2>{post.title}</h2>
                <span><b>Nome do Author: </b>{post.createdBy}</span>
                <div className={styles.tags}>
                    {post.tagsArray.map((tag) => (
                        <Link to={`/search?q=${tag}`} key={tag} className={styles.tag}><span>#</span>{tag}</Link>
                    ))}
                </div>
                <Link className='btnRoot btnLight' to={`post/${post.id}`}>Abrir Post</Link>
            </div>
        </div>
    )
}

export default PostDetail;