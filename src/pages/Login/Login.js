import styles from '../Register/Register.module.css'

import { useState, useEffect } from 'react'
import { useAuthentication } from '../../hooks/useAuthentication';



const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const {login, error: authError, loading } = useAuthentication();
    
    const handlerSubmit = async (e) => {
        e.preventDefault()
        setError("");

        const user = {
            email,
            password
        }

        const res = await login(user);
        
    };
    useEffect (() => {
        setError(authError);
    }, [authError]);
  return (
    <form onSubmit={handlerSubmit} className={styles.formr}>
            <h2>Faça seu login</h2>
            <label>
                <span>Coloque seu emal:</span>
                <input type='email' name='email' placeholder='Insira um email' onChange={(e) => setEmail(e.target.value)} value={email} required></input>
            </label>
            <label>
                <span>Coloque sua senha:</span>
                <input type='password' name='password' placeholder='Insira uma senha' onChange={(e) => setPassword(e.target.value)} value={password} required></input>
            </label>
            {error && <p className={styles.error}>{error}</p>}
            {!loading && <button className={styles.btn} type='input'><i className="bi bi-check-lg"></i>Logar</button>}
            {loading && <button className={styles.btn} type='input' disabled><i className="bi bi-check-lg"></i>Aguarde</button>}
        </form>
    
  )
}

export default Login