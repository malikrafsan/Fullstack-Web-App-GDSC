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
                    <h3>Description: </h3>
                    <p>{movieItem.desc}</p>
                    <h3>Year : {movieItem.tahun}</h3>
                    <h3>Genre : {movieItem.genre}</h3>
                    <h3>Rating : {movieItem.rating}</h3>
                    <h3>Duration : {movieItem.duration} minutes</h3>
                    <h3>Directed by {movieItem.director}</h3>
                    <Link to="/" className={styles.link}>BACK TO HOME</Link>
                </div>
            </div>
        </div>
    )
}

export default Details;