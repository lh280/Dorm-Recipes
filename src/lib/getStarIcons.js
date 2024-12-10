import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"; 

export default function getStarIcons(rating, size) {
    const starSize = (size || "1rem");

    const fullStars = Math.floor(rating / 2);
    const hasHalfStar = rating % 2 !== 0;
    const totalStars = 5; 
  
    return (
      <>
        {Array.from({ length: totalStars }, (s, index) => {
          if (index < fullStars) {
            return <FaStar key={s} style={{ color: "gold", fontSize: starSize }} />;
          }
          if (index === fullStars && hasHalfStar) {
            return <FaStarHalfAlt key={s} style={{ color: "gold", fontSize: starSize }} />;
          }
          return <FaRegStar key={s} style={{ color: "gold", fontSize: starSize }} />;
        })}
      </>
    );
  }