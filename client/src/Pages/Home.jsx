import React,{ useState } from 'react';
import { Link } from 'react-router-dom';
import styles from "./home.module.css";
import MovieData from '../public/MovieData';
import { MdDelete } from "react-icons/md";

function Home() {
  const [wishlist, setWishlist] = useState([]);
  const handleClick = (item) => {
    if (!wishlist.includes(item)){
      setWishlist(wishlist => [...wishlist, item]);
    }
  }

  const handleDelete = (item) => {
    const newWish = wishlist.filter((wishItem) => {
      return wishItem.id !== item.id
    })
    setWishlist(newWish)
  }

  return (
    <div className={styles.body}>
            <div className={styles.containerLeft}>
                <div className = {styles.title}>
                    <h1>Indonesian Films</h1>
                </div>
                <div className = {styles.content}>
                    {
                        MovieData && MovieData.length>0 && MovieData.map((item)=> {
                          const id = item.id
                        return (
                            <div key = {item.id} className = {styles.movieItem}>
                                <div className = {styles.movieImg}>
                                    <img src = {item.poster.default}/>
                                </div>
                                <h3 className = {styles.movieTitle}>{item.nama}</h3>
                                <p className = {styles.movieDesc}>{item.desc.slice(0,60)}..</p>
                                <Link to={{pathname: `/${id}`}} className={styles.link}>See Details</Link>
                                <button onClick={() => handleClick(item)} className = {styles.btn}>Add to wishlist</button>
                            </div>
                        )})
                    }
                </div>
            </div>
            <div className={styles.containerRight}>
            <div className = {styles.title}>
                    <h2>Your Wishlist</h2>
                </div>
                {
                  wishlist.map((item) =>{
                    return (
                      <div key= {item.id} className={styles.wishItem}>
                        <h4>{item.nama}</h4>
                        <button onClick= {() => handleDelete(item)} className = {styles.btn}><MdDelete/></button>
                      </div>
                    )
                  })
                }
            </div>
        </div>
  );
}

export default Home;