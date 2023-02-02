import Layout from '../components/Layout';
import { useState } from 'react';

type Props = {
  posts: [Post]
}

type Post = {
  _id: String;
  title: String;
  content: String;
}

export async function getServerSideProps() {
  try {
    let response = await fetch('http://localhost:3000/api/getPosts');//conectamos con la api
    let posts = await response.json();

    return {
      props: { posts: JSON.parse(JSON.stringify(posts)) },//devolvemos la respuesta
    };
  } catch (e) {
    console.error(e);
  }
}



export default function Posts(props: Props) {//recibimos propiedades

  const [posts, setPosts] = useState<[Post]>(props.posts);//guardamoe n variable

  const handleDeletePost = async (postId: string) => {//nos llega el id
    try {
      let response = await fetch('http://localhost:3000/api/deletePost?id=' + postId, {
        method: 'POST',
        headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        }
      });//para borrar llamamos la api
      response = await response.json();
      window.location.reload();//recargamos
    } catch (error) {
      console.log('An error occurred while deleting ', error);
    }
  }

  return (
    <Layout>{/**recorremos la variable de post */}
      <div className="posts-body">
        <h1 className="posts-body-heading">Top 20 Added Posts</h1>
        {
          posts.length > 0 ? (
            <ul className="posts-list">
              {posts.map((post, index) => {
                return (
                  <li key={index} className="post-item">{/**por cada uno con su key, enlazamos con sus datos */}
                    <div className="post-item-details">
                      <h2>{post.title}</h2>
                      <p>{post.content}</p>
                    </div>
                    <div className="post-item-actions">
                      <a href={`/posts/${post._id} `}>Edit</a>{/**enlazmaos con su ruta psando el id */}
                      <button onClick={() => handleDeletePost(post._id as string)}>Delete</button>{/**manejamos evento eliminar */}
                    </div>
                  </li>
                )
              })}
            </ul>
          ) : (
            <h2 className="posts-body-heading">Ooops! No posts added so far</h2>
          )
        }
      </div>{/**si no hay ningun post informamos y ponemos los estilos */}
      <style jsx>
        {
          `
        .posts-body{
            width:400px;
            margin:10px auto;
        }
        .posts-body-heading{
            font-family:sans-serif;
        }
        .posts-list{
            list-style-type:none;
            display:block;
        }
        .post-item{
            width:100%;
            padding:10px;
            border: 1px solid #d5d5d5;
        }
        .post-item-actions{
            display:flex;
            justify-content:space-between;
        }
        .post-item-actions a{
            text-decoration:none;
        }
        `
        }
      </style>
    </Layout>
  );
}