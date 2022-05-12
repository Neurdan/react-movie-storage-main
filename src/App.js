import './App.css';
import React, {useEffect, useState} from "react";
import Header from "./components/Header/Header";
import {Navigate, Route, Routes} from "react-router-dom";
import MoviePage from "./Pages/MoviePage";
import ChoseCard from "./components/ChoseCard/ChoseCard";
import ImportPage from "./Pages/ImportPage";
import FindPage from "./Pages/FindPage";
import {createSessionThunk} from "./redux/actions/loginAction";
import {useDispatch, useSelector} from "react-redux";
import LoginPage from "./LoginPage/LoginPage";
import NotFound from "./Pages/NotFound";

const api_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJteWtAZ21haWwuY29tIiwibmFtZSI6Im15ayIsImNyZWF0ZWRBdCI6IjIwMjItMDUtMDhUMDk6NTU6NDguOTE4WiIsInVwZGF0ZWRBdCI6IjIwMjItMDUtMDhUMDk6NTU6NDguOTE4WiIsImlhdCI6MTY1MjAwMzc0OH0.5l_DKXqGfT93PE5gnXjI1yG2KxWAJORQgt_oqmqhoTQ'

function App() {
    const [isLogged, setIsLogged] = useState(false);

    const dispatch = useDispatch();
    const {apiKey, urlApi} = useSelector(({login}) => login)
    let API_URL = process.env.REACT_APP_API_URL ||'http://localhost:8001/api/v1'

    useEffect(() => {
        if (apiKey === '') {
            dispatch(createSessionThunk(API_URL))
            setTimeout(()=>{
                setIsLogged(true)

            }, 500)
        }
    }, [apiKey])
    const Loader = <div className='loader loader--modal'>
        <div className="loader__wrapper">
            Loading...
        </div>
    </div>
    return (
        <div className="App">
            <Header/>

            <div className="content">
                <Routes>
                    <Route exact path='/movies' element={isLogged ? <MoviePage/> : Loader}/>
                    <Route exact path='/movies/:path' element={isLogged ? <ChoseCard/> : Loader}/>
                    <Route exact path='/import' element={isLogged ? <ImportPage/> : Loader}/>
                    <Route exact path='/find' element={isLogged ? <FindPage/> : Loader}/>
                    <Route exact path='/' element={<Navigate replace to="/movies"/>}/>
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
