import styles from './Dashboard.module.css'

import { Link } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'

import {useDeleteDocument} from '../../hooks/useDeleteDoc'

import { useState } from 'react';

const Dashboard = () => {
  const { user } = useAuthValue();
  const uid = user.uid;

  //posts 
  const { documents: posts } = useFetchDocuments('posts', null, uid);

  const { deleteDocument } = useDeleteDocument();
  const documentDelete = (id) => {

    deleteDocument(id);
  }
  

  return (
    <div className={styles.postsContainer}>
      {posts && posts > 0 && (<h2>Suas Postagens</h2>)}
      {posts && posts.length === 0 && (
        <div className={styles.nullContainer}>
          <h2>Você não tem posts...</h2>
          <Link to={'/post/create'} className='btnRoot btnLight'>Criar um Post</Link>
        </div>
      )}
      {posts &&
        posts.map((post => (
          <div key={post.id} className={styles.editContainer}>
            <div className={styles.imgCont}>
              <img src={post.url} alt={post.title}/>
            </div>
            <div className={styles.postContainer}>
              
              <p><b>{post.title.length > 20 ? (post.title.substring(0,20)) : post.title}</b>...</p>
              <div className={styles.tagsContainer}>
                {post.tagsArray.map((tag) => (
                  <span key={tag}>#{tag}</span>
                ))}
              </div>

            </div>
            <div className={styles.functions}>
              <div className={styles.trashContainer}>
                <p>Visualizações: 999</p>
                <i onClick={() => documentDelete(post.id)} className="bi bi-trash"></i>
              </div>
              <div style={{width: "100%"}}>
                <Link to={`/post/${post.id}`} className='btnRoot btnLight'>Ver post</Link>
                <Link to={`/edit/${post.id}`} className='btnRoot'>Editar Post</Link>
              </div>

            </div>
          </div>
        )))

      }
    </div>
  )
}

export default Dashboard