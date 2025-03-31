

// src/components/IMDbCarousel.jsx
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// Custom Next Arrow
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} text-yellow-400 z-50`}
      style={{ ...style, display: "block", right: 10 }}
      onClick={onClick}
    />
  );
}

// Custom Previous Arrow
function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} text-yellow-400 z-50`}
      style={{ ...style, display: "block", left: 10 }}
      onClick={onClick}
    />
  );
}

const IMDbCarousel = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Using the provided API link (do not change this link)
    const fetchMovies = async () => {
      try {
        const response = await fetch("http://www.omdbapi.com/?s=Batman&apikey=fc92285a");
        const data = await response.json();
        if (data && data.Search) {
          setMovies(data.Search);
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, []);

  // Carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="bg-gray-900 border border-yellow-400 rounded-xl shadow-2xl p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl mb-8">
      <h2 className="text-3xl font-bold text-center text-yellow-400 mb-8">IMDb Movies</h2>
      <Slider {...settings}>
        {movies.map((movie) => (
          <div key={movie.imdbID} className="p-4">
            <div className="bg-gray-800 rounded-lg shadow-lg p-4 flex flex-col h-full transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <img
                src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Image"}
                alt={movie.Title}
                className="w-full h-64 object-cover rounded"
              />
              <div className="mt-4 flex flex-col items-center">
                <h3 className="text-xl font-semibold text-white text-center truncate w-full">{movie.Title}</h3>
                <p className="text-gray-400 mt-1">{movie.Year}</p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default IMDbCarousel;
