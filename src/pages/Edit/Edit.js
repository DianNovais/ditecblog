
import styles from './Edit.module.css'

import { useEffect, useState } from 'react';

import { useFetchDocument } from '../../hooks/useFetchDocument'

import { useUpdateDocument } from '../../hooks/useUpdateDocument';

import { useAuthValue } from '../../context/AuthContext'

import { useNavigate } from 'react-router-dom';

import { useParams } from 'react-router-dom';

const Edit = () => {


  const { user } = useAuthValue()

  const { id } = useParams();


  const { document: post, response } = useFetchDocument("posts", id);


  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState()

  const navigate = useNavigate();



  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setUrl(post.url);
      setBody(post.body);
      const tagsArray = post.tagsArray.join(", ");
      setTags(tagsArray);
    }
  }, [post]);

  const { updateDocument } = useUpdateDocument('posts');



  const handlerSubmit = (e) => {
    e.preventDefault()
    setFormError('');

    //validar url
    try {
      new URL(url);
    } catch (error) {
      setFormError("Coloque um url valido")
    }


    //criar array de tags

    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    //checar todos valores 

    if (!title || !url || !body || !tags) {
      setFormError("Não deixe nenhum campo em branco!");
    }

    if (formError) {
      return;
    }

    const data = {
      title,
      url,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    }

    updateDocument(id, data);

    navigate("/dashboard");



  }
  return (
    <form onSubmit={handlerSubmit}>
      <h2>Editar Postagem</h2>
      <div className={styles.content}>
        <label>
          <span>Titulo:</span>
          <input type='text' name='titulo' placeholder='Coloque um titulo' onChange={(e) => setTitle(e.target.value)} value={title} required></input>
        </label>
        <label>
          <span>Url da Imagem:</span>
          <input type="url" name='url' placeholder='Coloque uma url' onChange={(e) => setUrl(e.target.value)} value={url} required></input>
          <span>Imagem Atual:</span>
          <img src={url} alt={title} />
        </label>
        <label>
          <span>Conteúdo:</span>
          <textarea type='text' rows='5' name='body' placeholder='Coloque o conteúdo' onChange={(e) => setBody(e.target.value)} value={body} required></textarea>
        </label>
        <label>
          <span>Tags:</span>
          <input type="text" name='tags' placeholder='Coloque as tags' onChange={(e) => setTags(e.target.value)} value={tags} required></input>
        </label>
        <button className={styles.btn} type='submit'><i className="bi bi-check-lg"></i>Criar Post</button>

        {formError && <p>{formError}</p>}
      </div>

    </form>
  )
}

export default Edit