import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Card from "../components/Card/Card";
import {getFindResultThunk} from "../redux/actions/moviesActions";
import {isEmpty} from "../Helpers/helpers";

const FindPage = () => {
    const {findResult, isFetchingMovie, errorFind, query} = useSelector(({movies}) => movies)
    const [errorFetch, setErrorFetch] = useState([])
    const [isFinded, setIsFinded] = useState(false)
    const [findQuery, setFindQuery] = useState('')
    const [findFieldValue, setFindFieldValue] = useState(query)


    const proccessingErrors = () => {
        let errorText = []
        let i = 0;
        for (let key in errorFind.fields) {
            let errorTranslate = errorFind.fields[key] === 'TOO_SHORT'
                ? `you try to find so short query`
                : ''
            errorText[i] = `${errorTranslate}`
            i++;
        }
        return errorText
    }

    useEffect(() => {
        if (!isEmpty(errorFind)) {
            setErrorFetch(proccessingErrors())
        } else {
            setErrorFetch([])
        }
    }, [errorFind])
    let history = useNavigate();
    const dispatch = useDispatch();
    const movieCards = findResult?.map(item => {
        return <Card year={item.year}
                     title={item.title}
                     id={item.id}
                     path={`movies/${item.id}`}
                     key={item.id}
        />
    })
    const logicClick = async () => {
        await dispatch(getFindResultThunk(findFieldValue))
        setFindQuery(findFieldValue)
        setIsFinded(true)
    }
    const clickEnter = e => {
        if (e.keyCode === 13 && findFieldValue.length > 0) {
            logicClick();
        }
    }
    const onFindClickHandle = () => {
        if (findFieldValue.length > 0) {
            logicClick()
        }

    }
    const onFindChangeHandle = e => {
        if (e.target.value.charAt(0) === ' ') return
        setFindQuery('')
        setIsFinded(false)
        setFindFieldValue(e.target.value)
    }
    return (
        <div className='find-page'>
            {isFetchingMovie && <div className='loader'>
                <div className="loader__wrapper">
                    Loading...
                </div>
            </div>}
            <div className="find-page__top">
                <div className="go-back">
                    <span onClick={() => history(-1)}>Go Back</span>
                </div>
                <div className="find-page__search-block">
                    {(errorFetch.length > 0) && <div className='error-span'>Errors:</div>}
                    {(errorFetch.length > 0) &&

                    errorFetch.map((el, index) => {
                        return <div key={`error_${index}`} className='error-span'> {el}</div>
                    })

                    }
                    <input placeholder='Type here actor name or title film' type="text" value={findFieldValue}
                           onKeyDown={e => clickEnter(e)}
                           onChange={onFindChangeHandle}/>
                    <button className="button find-page__search" onClick={onFindClickHandle}>Find</button>
                </div>
            </div>
            <div className="find-page__content">
                {isFinded ? <div className='find-page__query-text'>{`on query ${findQuery} you found:`}</div> : ''}
                <div className="cards-block">

                    {
                        movieCards.length !== 0 && movieCards
                    }
                    {
                        (isFinded && movieCards.length === 0) && <div>Nothing</div>
                    }
                </div>
            </div>
        </div>
    )
};

export default FindPage;