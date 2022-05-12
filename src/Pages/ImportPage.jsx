import React, {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {API_KEY} from "../components/API/apiUrl";

const ImportPage = () => {
    const [selectedFile, setSelectedFile] = useState();
    const [importedFile, setImportedFile] = useState(false)
    const [errorFile, setErrorFile] = useState('')
    const onChangeFile = (e) => {
        setSelectedFile(e.target.files[0])
        setImportedFile(false)
    }
    let history = useNavigate();

    const onFileUpload = async () => {
        const formData = new FormData();


        if (selectedFile) {
            formData.append(
                "movies",
                selectedFile,
                "movies.txt"
            );
            axios.post('http://localhost:8001/api/v1/movies/import', formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': API_KEY,
                },
            })
                .then((data)=>{
                    if (data.data.error) {
                        setErrorFile('Your file is invalid')
                    } else {
                        setErrorFile('')
                    }
                })

        } else {
            return  alert('Chose your file')
        }
    }

    return (
        <div className='import-page'>
            <div className="go-back">
                <span onClick={() => history(-1)}>Go Back</span>
            </div>
            <div className="import-page__content">
                <div className="import-page__input">
                    <label htmlFor="import-page__file-upload" className={`${selectedFile && 'uploaded'} import-page__file-label`}>
                        Chose file
                    </label>
                    {selectedFile && <span className='selected-file'>{selectedFile.name}</span>}
                    {errorFile === '' ? importedFile && <span>File imported</span> : <span className='error-span'> {errorFile}</span> }
                    <input id="import-page__file-upload" type="file" onChange={onChangeFile}/>
                </div>
                <button className={'button'} onClick={onFileUpload}>
                    Upload!
                </button>
            </div>
        </div>
    )
}

export default ImportPage;