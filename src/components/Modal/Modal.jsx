import React, {useEffect, useState} from "react";
import Select from 'react-select'
import {addMovieThunk, getNewItems} from "../../redux/actions/moviesActions";
import {useDispatch, useSelector} from "react-redux";

const options = [
    {value: 'DVD', label: 'DVD'},
    {value: 'VHS', label: 'VHS'},
    {value: 'Blu-Ray', label: 'Blu-Ray'}
]

const Modal = ({active, setActive, type, callback}) => {
    //helpers
    let resultActors = []

    const isEmpty = (obj) => {
        for (let key in obj) {
            return false;
        }
        return true;
    }
    const dispatch = useDispatch();
    const {error, isFetchingAdding} = useSelector(({movies}) => movies)
    const [errorFetch, setErrorFetch] = useState([])
    const [actorValues, setActorValues] = useState([{nameActor: ""}]);
    const [formFields, setFormFields] = useState([{title: ''}, {year: ''}])
    const [titleValues, setTitleValues] = useState('');
    const [selectedOption, setSelectedOption] = useState({});
    const [showActorsField, setShowActorsField] = useState(true);
    const [formValid, setFormValid] = useState()

    useEffect(() => {
        if (!isEmpty(error)) {
            let errorText = []
            let i = 0;
            for (let key in error.fields) {
                let errorTranslate = error.fields[key] === 'REQUIRED' ? `field ${key} is Required to filling`
                    : error.fields[key] === 'NOT_POSITIVE_INTEGER' ? `please enter a number to ${key} field`
                        : error.fields[key] === 'TOO_LOW' ? `please enter a later ${key}` : ''
                errorText[i] = `${errorTranslate}`
                i++;
            }
            setErrorFetch(errorText)
        } else {
            setErrorFetch([])
            setTimeout(async () => {
                await dispatch(getNewItems())
                setFormFields([{title: ''}, {year: ''}])
                setSelectedOption({})

            }, 1000);

            setActive(false);

        }

    }, [error])
    const handleChangeField = (i, e) => {
        if (e.target.value.charAt(0) === ' ') return
        let newFormValues = [...formFields];
        if (e.target.name === 'year') {
            if (e.target.value.length > 4) return
            newFormValues[i][e.target.name] = e.target.value.trim().replace(/ +/g, ' ')

        } else {
            newFormValues[i][e.target.name] = e.target.value.replace(/\s\s+/g, ' ');
        }
        setFormFields(newFormValues);

    }
    const handleChangeActor = (i, e) => {
        if (e.target.value.charAt(0) === ' ' || e.target.value.charAt(0) === '-') return

        let newFormValues = [...actorValues];
        newFormValues[i][e.target.name] = e.target.value.replace(/[^A-Za-zа-яА-Я\-\s]/gi, "");
        setActorValues(newFormValues);
    }
    const addFormFields = () => {
        setShowActorsField(true);
        setActorValues([...actorValues, {nameActor: ""}])
    }
    const removeFormFields = (i) => {
        let newFormValues = [...actorValues];
        newFormValues.splice(i, 1);
        setActorValues(newFormValues)
        newFormValues.length === 0 && setShowActorsField(false);
    }
    const handleChangeOption = (selectedOptions) => {
        setSelectedOption(selectedOptions)
    }
    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (formFields[1].year !== '' && formFields[0].title !== '' && isEmpty(selectedOption) === false) {
            setFormValid(true);
            for (let i = 0; i < actorValues.length; i++) {
                if (actorValues[i].nameActor !== '') resultActors.push(actorValues[i].nameActor)
            }
            const formData = {
                'title': formFields[0].title,
                'year': formFields[1].year,
                'format': selectedOption.value,
            }
            if (resultActors.length > 0) {
                formData.actors = resultActors
            }
            await dispatch(addMovieThunk(formData))
            setTimeout(() => {
                dispatch(getNewItems())
            }, 1000)
        } else {
            setFormValid(false);
            return
        }
    }
    const handleClosePopup = () => {
        if (type === 'AddMovie') {
            setFormFields([{title: ''}, {year: ''}])
            setSelectedOption({})
            setActorValues([{nameActor: ""}])
            setErrorFetch([])
        }
        setActive(false)
    }
    const layout = type === "AddMovie"
        ? <div>
            {isFetchingAdding && <div className='loader loader--modal'>
                <div className="loader__wrapper">
                    Loading...
                </div>
            </div>}
            <span className="modal__title">Add movie</span>
            {(errorFetch.length > 0) && <div className='error-span'>Errors:</div>}
            {(errorFetch.length > 0) &&

            errorFetch.map((el, index) => {
                return <div key={`error_${index}`} className='error-span'> {el}</div>
            })

            }
            <form onSubmit={e => onSubmitHandler(e)}>
                <div className="form-inline">
                    <label>Title</label>
                    <input type="text" name="title" pattern="^[^\s]+(\s.*)?$" value={formFields[0].title}
                           onChange={e => handleChangeField(0, e)}/>
                </div>
                <div className="form-inline">
                    <label>Format</label>
                    <Select
                        value={selectedOption}
                        onChange={handleChangeOption}
                        options={options}/>
                </div>
                <div className="form-inline">
                    <label>Year</label>
                    <input type="text" name="year" value={formFields[1].year} onChange={e => handleChangeField(1, e)}/>
                </div>
                {showActorsField &&
                <div className="form-block">
                    <div>Actors</div>
                    {actorValues.map((element, index) => (
                        <div className="form-inline" key={index}>
                            <label>Name of actor</label>
                            <input type="text" name="nameActor" value={element.nameActor || ""}
                                   onChange={e => handleChangeActor(index, e)}
                                   pattern="^[^\s]+(\s.*)?$"/>
                            <button type="button" className="button remove" onClick={() => removeFormFields(index)}>Remove</button>
                        </div>
                    ))}
                </div>
                }
                <button className="button add" type="button" onClick={() => addFormFields()}>Add actor</button>

                <div className={'form__button-block'}>
                    <button className="button submit" type="submit">Add movie</button>
                    {(formValid === false) && <span className='error-span'>Fill all fiels</span>}
                </div>
            </form>
        </div>
        : type === 'DeleteMovie'
            ? <div className='modal__delete'>
                <span>Sure delete the movie?</span>
                <div className="modal__buttons-delete">
                    <button onClick={callback} className="button">Yes</button>
                    <button onClick={() => setActive(false)} className="button remove">No</button>
                </div>
            </div>
            : ''
    return (
        <div className={active ? 'modal active' : 'modal'} onClick={handleClosePopup}>
            <div className={active ? 'modal__wrapper active' : 'modal__wrapper'} onClick={e => e.stopPropagation()}>
                {layout}
            </div>
        </div>
    )
};

export default Modal;