
import './App.css';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { app } from './firebase/firebase'
import { onAuthStateChanged } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { useAuthentication } from './hooks/useAuthentication';

// pages
import About from './pages/About/About';
import Home from './pages/Home/Home'
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Dashboard from './pages/Dashboard/Dashboard';
import CreatePost from './pages/CreatePost/CreatePost';
import Search from './pages/Search/Search'
import Post from './pages/Post/Post';
import Edit from './pages/Edit/Edit';
import Error from './pages/Error/Error';

//component
import Nav from './components/Nav';
import Footer from './components/Footer';

//context
import { AuthProvider } from './context/AuthContext'



function App() {
  app();
  const [user, setUser] = useState(undefined);
  const { auth } = useAuthentication();

  const loadinguser = user === undefined;

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    })
  }, [auth])

  if (loadinguser) {
    return <div className='loadPage'><p>carregando...</p> </div>
  }
  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Nav />

          <div className='container'>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="about" element={<About />}></Route>
              <Route path='login' element={!user ? <Login /> : <Navigate to='/' />}></Route>
              <Route path='singin' element={!user ? <Register /> : <Navigate to="/" />} />
              <Route path='search' element={<Search />}></Route>
              <Route path='/post/create' element={user ? <CreatePost /> : <Navigate to='/login' />}></Route>
              <Route path='/post/:id' element={<Post />}></Route>
              <Route path='edit/:id' element={user ? <Edit /> : <Login />}></Route>
              <Route path='/dashboard' element={user ? <Dashboard /> : <Navigate to='/login' />}></Route>
              <Route path='*' element={<Error />}></Route>
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>

    </div>
  )
}

export default App;
