import React from "react";
import { useParams, Link } from 'react-router-dom';
import styles from './details.module.css';
import MovieData from '../public/MovieData';

function Details() {
    const item = useParams()
    const movieItem = MovieData[item.id-1]
    console.log(movieItem)
    return (
        <div className={styles.body}>
            <div className = {styles.title}>
                <h1>{movieItem.nama}</h1>
            </div>
            <div className = {styles.content}>
                <div className={styles.image}>
                    <img src = {movieItem.poster.default}></img>
                </div>
                <div className={styles.desc}>
                    <h5>Description: </h5>
                    <p>{movieItem.desc}</p>
                    <h5>Year : {movieItem.tahun}</h5>
                    <h5>Genre : {movieItem.genre}</h5>
                    <h5>Rating : {movieItem.rating}</h5>
                    <h5>Duration : {movieItem.duration} minutes</h5>
                    <h5>Directed by {movieItem.director}</h5>
                    <Link to="/" className={styles.link}>BACK TO HOME</Link>
                </div>
            </div>
        </div>
    )
}

export default Details;