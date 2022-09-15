import { useState, useEffect } from 'react'
import { useAuthentication } from '../../hooks/useAuthentication';


import styles from './Register.module.css'

const Register = () => {
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const { createUser, error: authError, loading } = useAuthentication();
    
    const handlerSubmit = async (e) => {
        e.preventDefault()
        setError("");

        const user = {
            displayName,
            email,
            password
        }

        if (password !== confirmPassword) {
            setError('As senhas não são iguais')
        }

        const res = await createUser(user);
        
    };
    useEffect (() => {
        setError(authError);
    }, [authError]);

    return (
        <form onSubmit={handlerSubmit} className={styles.formr}>
            <h2>Registre-se, para fazer sua postagem</h2>
            <label>
                <span>Coloque um nome:</span>
                <input type='text' name='displayName' placeholder='Insira um nome' onChange={(e) => setDisplayName(e.target.value)} value={displayName} required></input>
            </label>
            <label>
                <span>Coloque um emal:</span>
                <input type='email' name='email' placeholder='Insira um email' onChange={(e) => setEmail(e.target.value)} value={email} required></input>
            </label>
            <label>
                <span>Coloque uma senha:</span>
                <input type='password' name='password' placeholder='Insira uma senha' onChange={(e) => setPassword(e.target.value)} value={password} required></input>
            </label>
            <label>
                <span>Confirme sua senha:</span>
                <input type='password' name='confirmPassword' placeholder='Confirmar senha' onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} required></input>
            </label>
            {error && <p className={styles.error}>{error}</p>}
            {!loading && <button className={styles.btn} type='input'><i className="bi bi-check-lg"></i>Cadastrar</button>}
            {loading && <button className={styles.btn} type='input' disabled><i className="bi bi-check-lg"></i>Aguarde</button>}
        </form>
    )
}

export default Register