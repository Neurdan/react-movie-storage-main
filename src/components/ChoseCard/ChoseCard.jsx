import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {deleteMovieThunk, setResultThunk} from "../../redux/actions/choseCardAction";
import img from '../photo_2020-12-28_16-51-34.jpg';
import {getNewItems} from "../../redux/actions/moviesActions";
import Modal from "../Modal/Modal";

const ChoseCard = () => {
    const isEmpty = (obj) => {
        for (let key in obj) {
            return false;
        }
        return true;
    }
    let poster = img;
    let history = useNavigate();
    const params = useParams();
    const id = params.path;
    const dispatch = useDispatch();
    let {result} = useSelector(({choseCard}) => choseCard);
    if (typeof result === 'undefined') result = {}

    const {title, actors, format, year} = result;
    const mappedActors = actors?.map((el) => {
        return (
            <span key={`${el.id}_${el.name}`}>
                {el.name}
            </span>
        )
    })
    const clickDeleteHandle = async (e, id) => {
        e.preventDefault();
        await dispatch(deleteMovieThunk(id))
        history('/')
    }
    useEffect(() => {
        window.scrollTo(0, 0,);
        dispatch(setResultThunk(id))
    }, [])
    const [modalActive, setModalActive] = useState(false)
    const deleteHandleClick = (e) => {
        setModalActive(true)
        //clickDeleteHandle(e, id)
    }
    return (
        <div className="chose-card">
            <div className="chose-card__top">
                <div className="go-back">
                    <span onClick={() => history(-1)}>Go Back</span>
                </div>
                <div className="chose-card__delete">
                    {!isEmpty(result) && <span onClick={deleteHandleClick}>Delete film</span>}
                </div>
            </div>
            {!isEmpty(result)
                ? <div className="chose-card__wrapper">
                    <img src={poster}/>
                    <div className="chose-card__information">
                        <div className="chose-card__block chose-card__block--title">
                            <span>Title: </span>
                            <span>{title}</span>
                        </div>
                        <div className="chose-card__block">
                            <span>Format: </span>
                            <span>{format}</span>
                        </div>
                        <div className="chose-card__block">
                            <span>Year: </span>
                            <span>{year}</span>
                        </div>
                        <div className="chose-card__block chose-card__block--actors">
                            <span>Actors: </span>
                            <div className="chose-card__actors">
                                {mappedActors}
                            </div>
                        </div>
                    </div>
                </div>
                : <div>Film not found</div>

            }
            <Modal active={modalActive} setActive={setModalActive} type={"DeleteMovie"} callback={(e) => clickDeleteHandle(e, id)}/>
        </div>
    )
}

export default ChoseCard;
