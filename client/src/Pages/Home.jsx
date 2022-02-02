import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./home.module.css";
import MovieData from "../public/MovieData";
import { MdDelete } from "react-icons/md";
import CredModal from "../components/CredModal";

function Home() {
  const [wishlist, setWishlist] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [hasCredentials, setHasCredentials] = useState(false);

  const handleClick = (item) => {
    if (!hasCredentials) {
      setModalShow(true);
      return;
    }
    
    if (!wishlist.includes(item)) {
      setWishlist((wishlist) => [...wishlist, item]);
    }
  };

  const handleDelete = (item) => {
    const newWish = wishlist.filter((wishItem) => {
      return wishItem.id !== item.id;
    });
    setWishlist(newWish);
  };

  useEffect(() => {
    const credentials = localStorage.getItem("credentials");

    if (credentials) {
      setHasCredentials(true);
    }
  }, [modalShow])

  return (
    <div className={styles.body}>
      <CredModal 
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <div className={styles.containerLeft}>
        <div className={styles.title}>
          <h1>Indonesian Films</h1>
        </div>
        <div className={styles.content}>
          {MovieData &&
            MovieData.length > 0 &&
            MovieData.map((item) => {
              const id = item.id;
              return (
                <div key={item.id} className={styles.movieItem}>
                  <div className={styles.movieImg}>
                    <img src={item.poster.default} />
                  </div>
                  <h5 className={styles.movieTitle}>{item.nama}</h5>
                  <p className={styles.movieDesc}>{item.desc.slice(0, 60)}..</p>
                  <Link to={{ pathname: `/${id}` }} className={styles.link}>
                    See Details
                  </Link>
                  <button
                    onClick={() => handleClick(item)}
                    className={styles.btn}
                  >
                    Add to wishlist
                  </button>
                </div>
              );
            })}
        </div>
      </div>
      <div className={styles.containerRight}>
        <div className={styles.title}>
          <h2>Your Wishlist</h2>
        </div>
        {wishlist.map((item) => {
          return (
            <div key={item.id} className={styles.wishItem}>
              <h4>{item.nama}</h4>
              <button onClick={() => handleDelete(item)} className={styles.btn}>
                <MdDelete />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
