//css
import styles from './Nav.module.css'

import { NavLink } from 'react-router-dom'

//hooks
import { useAuthentication } from '../hooks/useAuthentication'


import {useState} from 'react'

//context
import { useAuthValue } from '../context/AuthContext'

const Nav = () => {

    const { logout } = useAuthentication();
    const { user } = useAuthValue();
    
    const [navBarOpen, setNavBar] = useState(false);

    const openClose = () => {
        if(navBarOpen){
            setNavBar(false);
        }else{
            setNavBar(true);
        }
    }


    return (
        <>
            <nav className={styles}>
                <NavLink to='/'>
                    <h2 className={styles.logo}>DiTecBlog</h2>
                </NavLink>
                <div id='barra' className={navBarOpen ? styles.activeMenu : styles.navBar}>
                    <div className={styles.responsiveMenu}>
                        <div className={styles.menuCenter}>
                            <NavLink style={{ textDecoration: 'none' }} to='/' className={({ isActive }) => (isActive ? styles.active : '')}><span><i className="bi bi-house-door"></i>Home</span></NavLink>
                            <NavLink style={{ textDecoration: 'none' }} to='/about' className={({ isActive }) => (isActive ? styles.active : '')}><span to='/about'><i className="bi bi-building"></i>About</span></NavLink>
                        </div>
                        {!user &&
                            <div className={styles.authContainer}>
                                <div className={styles.auth}>
                                    <div className={styles.login}><NavLink style={{ textDecoration: 'none' }} to='/login'><span ><i className="bi bi-lock-fill"></i>Login</span></NavLink></div>
                                    <div className={styles.singIn}><NavLink style={{ textDecoration: 'none' }} to='/singin'><span ><i className="bi bi-brush-fill"></i>Sing In</span></NavLink></div>
                                </div>
                            </div>
                        }
                        {user &&
                            <>
                                <div className={styles.menuCenter}>
                                    <NavLink style={{ textDecoration: 'none' }} className={({ isActive }) => (isActive ? styles.active : '')} to='/dashboard'><span ><i className="bi bi-tv"></i>Dashboard</span></NavLink>
                                    <NavLink style={{ textDecoration: 'none' }} className={({ isActive }) => (isActive ? styles.active : '')} to='/post/create'><span ><i className="bi bi-brush-fill"></i>Nova Postagem</span></NavLink>
                                    <div className={styles.auth}>
                                        <button onClick={logout} className='btnRed'><i className="bi bi-box-arrow-right"></i>Sair</button>
                                    </div>
                                </div>
                            </>}
                    </div>
                </div>
                <div id='hambuguer' onClick={openClose} className={navBarOpen ? styles.hambuguer : styles.hambuguer}>
                    <span id='bar' className={navBarOpen ? styles.barOne : styles.bar}></span>
                    <span id='bar' className={navBarOpen ? styles.barTwo : styles.bar}></span>
                    <span id='bar' className={navBarOpen ? styles.barThree : styles.bar}></span>
                </div>
            </nav>

        </>
    )
}

export default Nav;