import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"; 

export default function getStarIcons(rating) {
    const fullStars = Math.floor(rating / 2);
    const hasHalfStar = rating % 2 !== 0;
    const totalStars = 5; 
  
    return (
      <span data-testid="star-icons">
        {Array.from({ length: totalStars }, (s, index) => {
          if (index < fullStars) {
            return <FaStar key={s} style={{ color: "gold" }} />;
          }
          if (index === fullStars && hasHalfStar) {
            return <FaStarHalfAlt key={s} style={{ color: "gold" }} />;
          }
          return <FaRegStar key={s} style={{ color: "gold" }} />;
        })}
      </span>
    );
  }