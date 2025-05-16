import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

function Rating({ value, text }) {
    return (
        <div className="rating">
            {[1, 2, 3, 4, 5].map((star) => (
                <span key={star}>
                    {value >= star ? (
                        <FaStar fill="#FDD835" />
                    ) : value >= star - 0.5 ? (
                        <FaStarHalfAlt fill="#FDD835" />
                    ) : (
                        <FaRegStar fill="#FDD835" />
                    )}
                </span>
            ))}
            {text && <span className="ms-2">{text} Reviews</span>}
        </div>
    );
}

export default Rating;
