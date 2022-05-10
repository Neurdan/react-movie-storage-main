import {NavLink} from "react-router-dom";
import img from '../photo_2020-12-28_16-51-34.jpg';

const Card = props => {
    let poster = img;
    return (
        <div className='movie__card'>
            <NavLink to={`/${props.path}`}>
                <img src={poster} />
            </NavLink>
            <div>{props.title}</div>
            <div>{props.year}</div>

        </div>
    )
}

export default Card;