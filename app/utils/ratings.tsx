import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { BsStarHalf } from "react-icons/bs";

interface RatingsProps {
  rating: number
}

const Ratings = ({rating}:RatingsProps) => {
  const stars= [];

  for(let i =1 ; i<=5; i++) {
    if(i<=rating) {
      stars.push(
        <AiFillStar
          key={i}
          size={20}
          color="#f6b100"
          className="mr-2 cursor-pointer"
        />
      )
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(
        <BsStarHalf
          size={17}
          key={i}
          color="#f6ba00"
          className="mr-2 cursor-pointer"
        />
      )
    } else {
      stars.push(
        <AiOutlineStar
          size={20}
          key={i}
          color="#f6ba00"
          className="mr-2 cursor-pointer"
        />
      )
    }
  }

  return (
    <div className="flex mt-1 ml-2 800px:mt-0 800px:ml-0">
      {stars}
    </div>
  )
}

export default Ratings