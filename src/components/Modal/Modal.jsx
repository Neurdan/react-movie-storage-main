import React, {useEffect, useState} from "react";
import Select from 'react-select'
import {addMovieThunk, getNewItems} from "../../redux/actions/moviesActions";
import {useDispatch, useSelector} from "react-redux";

const options = [
    {value: 'DVD', label: 'DVD'},
    {value: 'VHS', label: 'VHS'},
    {value: 'Blu-Ray', label: 'Blu-Ray'}
]

const Modal = ({active, setActive, type}) => {
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
    const [errorFetch, setErrorFetch] = useState('')
    const [actorValues, setActorValues] = useState([{nameActor: ""}]);
    const [formFields, setFormFields] = useState([{title: ''}, {year: ''}])
    const [selectedOption, setSelectedOption] = useState({});
    const [showActorsField, setShowActorsField] = useState(true);
    const [formValid, setFormValid] = useState()
    useEffect(() => {
        if (!isEmpty(error)) {
            let errorText = `${error.code}: `
            for (let key in error.fields) {
                errorText += ` ${key} ${error.fields[key]}`
            }
            setErrorFetch(errorText)
        } else {
            setErrorFetch('')
            setTimeout(async () => {
                await dispatch(getNewItems())
            }, 1000);
            setActive(false);

        }

    }, [error])
    const handleChangeField = (i, e) => {
        let newFormValues = [...formFields];
        newFormValues[i][e.target.name] = e.target.value;
        setFormFields(newFormValues);
    }
    const handleChangeActor = (i, e) => {
        let newFormValues = [...actorValues];
        newFormValues[i][e.target.name] = e.target.value;
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
            // setTimeout(() => {
            // dispatch(getNewItems())
            //  }, 1000)
        } else {

            setFormValid(false);
            return
        }
    }
    const layout = type === "AddMovie"
        ? <div>
            {isFetchingAdding && <div className='loader loader--modal'>
                <div className="loader__wrapper">
                    Loading...
                </div>
            </div>}
            <span className="modal__title">Add movie</span>
            {(errorFetch !== '') && <span className='error-span'> {errorFetch}</span>}
            <form onSubmit={e => onSubmitHandler(e)}>
                <div className="form-inline">
                    <label>Title</label>
                    <input type="text" name="title" value={formFields.title} onChange={e => handleChangeField(0, e)}/>
                </div>
                <div className="form-inline">
                    <label>Format</label>
                    <Select
                        onChange={handleChangeOption}
                        options={options}/>
                </div>
                <div className="form-inline">
                    <label>Year</label>
                    <input type="text" name="year" value={formFields.year} onChange={e => handleChangeField(1, e)}/>
                </div>
                {showActorsField &&
                <div className="form-block">
                    <div>Actors</div>
                    {actorValues.map((element, index) => (
                        <div className="form-inline" key={index}>
                            <label>Name of actor</label>
                            <input type="text" name="nameActor" value={element.nameActor || ""}
                                   onChange={e => handleChangeActor(index, e)}/>
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
        : ''
    return (
        <div className={active ? 'modal active' : 'modal'} onClick={() => setActive(false)}>
            <div className={active ? 'modal__wrapper active' : 'modal__wrapper'} onClick={e => e.stopPropagation()}>
                {layout}
            </div>
        </div>
    )
};

export default Modal;