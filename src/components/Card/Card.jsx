import {NavLink} from "react-router-dom";
import img from '../photo_2020-12-28_16-51-34.jpg';
import PropTypes from "prop-types";

const Card = props => {
    let poster = img;
    return (
        <div className='movie__card'>
            <NavLink to={`/${props.path}`}>
                <img src={poster}  alt="movie-card-poster"/>
            </NavLink>
            <div>{props.title}</div>
            <div>{props.year}</div>

        </div>
    )
}

Card.propTypes = {
    year: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired
}

export default Card;