import { Link } from 'react-router-dom'
import styles from './Error.module.css'

const Error = () => {
  return (
    <div className={styles.errorContainer}>
      <h2>Error 404...</h2>
      <h3>Não a Nada Aqui</h3>
      <Link to='/' className='btnRoot btnLight'>Home</Link>
    </div>
  )
}

export default Error