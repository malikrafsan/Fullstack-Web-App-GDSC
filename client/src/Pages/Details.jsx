import React, {useState, useEffect} from "react";
import { useParams, Link } from 'react-router-dom';
import styles from './details.module.css';
import axios from "axios";

function Details() {
    const item = useParams()
    const [movie, setMovie] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
            const res = await axios.get('http://localhost:5000/' + item.id, {
                method: 'HEAD',
                mode: 'no-cors',
                headers: {
                'Access-Control-Allow-Origin': '*',
                Accept: 'application/json',
                'Content-Type': 'application/json',
                },
                withCredentials: true,
                credentials: 'same-origin',
                crossdomain: true,
            })
            //   console.log(res);
            setMovie(res.data[0]);
            } catch (err) {
            console.log(err);
            }
        }
        fetchData();
      }, [item.id])

    return (
        <div className={styles.body}>
            <div className = {styles.title}>
                <h1>{movie.movie_title}</h1>
            </div>
            <div className = {styles.content}>
                <div className={styles.image}>
                    <img alt="movie poster" src = {movie.movie_pict}></img>
                </div>
                <div className={styles.desc}>
                    <h5>Description: </h5>
                    <p>{movie.movie_desc}</p>
                    <h5>Year : {movie.tahun}</h5>
                    <h5>Genre : {movie.genre}</h5>
                    <h5>Rating : {movie.rating}</h5>
                    <h5>Duration : {movie.duration} minutes</h5>
                    <h5>Directed by {movie.director}</h5>
                    <Link to="/" className={styles.link}>BACK TO HOME</Link>
                </div>
            </div>
        </div>
    )
}

export default Details;