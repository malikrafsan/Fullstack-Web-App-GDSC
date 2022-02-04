import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./home.module.css";
// import MovieData from "../public/MovieData";
import { MdDelete } from "react-icons/md";
import CredModal from "../components/CredModal";
import axios from "axios";

function Home() {
  const [wishlist, setWishlist] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [hasCredentials, setHasCredentials] = useState(false);
  const [MovieData, setMovieData] = useState([]);

  const handleClick = async (item) => {
    if (!hasCredentials) {
      setModalShow(true);
      return;
    }
    
    try {
      await axios.patch(`http://localhost:5000/updatewishlist`, {
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
        data: {
          user_id : localStorage.getItem("credentials"),
          movie_id : item.id
        }
      })
      fetchDataWishlist();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (item) => {
    try {
      await axios.delete(`http://localhost:5000/deletewishlist`, {
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
        data: {
          user_id : localStorage.getItem("credentials"),
          movie_id : item.id
        }
      })
      fetchDataWishlist();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const credentials = localStorage.getItem("credentials");

    if (credentials) {
      setHasCredentials(true);
    }
  }, [modalShow])

  async function fetchDataWishlist() {
    try {
      const res = await axios.post(`http://localhost:5000/getwishlist`, {
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
        data: {
          user_id : localStorage.getItem("credentials"),
        }
      })
      setWishlist(res.data);
    } catch (err) {
      console.log(err);
    }
  }
  async function fetchData() {
    try {
      const res = await axios.get(`http://localhost:5000/`, {
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
      // console.log(res);
      setMovieData(res.data);
    } catch (err) {
      console.log(err);
    }
  }
  
  useEffect(async () => {
    await fetchData();
    const credentials = localStorage.getItem("credentials");
    if (credentials) {
      await fetchDataWishlist();
    }
  }, [])

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
                    <img alt="movie poster" src={item.movie_pict} />
                  </div>
                  <h5 className={styles.movieTitle}>{item.movie_title}</h5>
                  <p className={styles.movieDesc}>{item.movie_desc.slice(0, 60)}..</p>
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
        {hasCredentials ? 
          <div className={styles.title}>
            <h2>Your Wishlist</h2>
          </div>
        : 
            <div className={styles.title}>
              <h3>Please login to make your own Wishlist</h3>
            </div>
        }
        { wishlist.length > 0 ?
         wishlist.map((item) => {
          return (
            <div key={item.id} className={styles.wishItem}>
              <h5>{item.movie_title}</h5>
              <button onClick={() => handleDelete(item)} className={styles.btn}>
                <MdDelete />
              </button>
            </div>
          );
        }):
          <h5 className="text-white text-center">You don't have any movie in your wishlist</h5>
        }
      </div>
    </div>
  );
}

export default Home;
