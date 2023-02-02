import React, { useState } from "react";
import Layout from "../../components/Layout";

export default function AddPost() {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');//variables con los campos

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (title && content) {//comprobacion de los campos
            try {
                let response = await fetch('http://localhost:3000/api/addPost', {//llamamos la api
                    method: 'POST',
                    body: JSON.stringify({
                        title, content//pasamos los datos
                    }),
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-Type': 'application/json'
                    }
                });
                response = await response.json();
                setTitle('');
                setContent('');
                setError('');//reiniciamos los campos e informamos
                setMessage('Post added successfully');
            } catch (errorMessage: any) {
                setError(errorMessage);
            }
        } else {
            return setError('All fields are required')
        }
    }

    return (
        <Layout>
            <form onSubmit={handleSubmit} className="form">{/**paramanejar el evento */}
                {
                    error ? (
                        <div className="alert-error">{/**si hay error lo ponemos */}
                            {error}
                        </div>
                    ) : null
                }
                {
                    message ? (
                        <div className="alert-message">{/**ponemos el mensaje */}
                            {message}
                        </div>
                    ) : null
                }
                <div className="form-group">
                    <label>Title</label>
                    <input type="text"
                        placeholder="Title of the post"
                        onChange={e => setTitle(e.target.value)}
                        value={title}
                    />{/**enlazmaos con la variable de titulo y al cambiar lo actualizamos */}
                </div>
                <div className="form-group">
                    <label>Content</label>
                    <textarea
                        name="content"
                        placeholder="Content of the post"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        cols={20}
                        rows={8}
                    />
                </div>{/**enlazamos con la variable y al cambiar actualizamos */}
                <div className="form-group">
                    <button type="submit" className="submit_btn">Add Post</button>
                </div>
            </form>{/**estilos */}
            <style jsx>
                {`
                    .form{
                        width:400px;
                        margin:10px auto;
                    }
                    .form-group{
                        width:100%;
                        margin-bottom:10px;
                        display:block;
                    }
                    .form-group label{
                        display:block;
                        margin-bottom:10px;
                    }
                    .form-group input[type="text"]{
                        padding:10px;
                        width:100%;
                    }
                    .form-group textarea{
                        padding:10px;
                        width:100%;
                    }
                    .alert-error{
                        width:100%;
                        color:red;
                        margin-bottom:10px;
                    }
                    .alert-message{
                        width:100%;
                        color:green;
                        margin-bottom:10px;
                    }
                `
                }
            </style>
        </Layout>
    )
}