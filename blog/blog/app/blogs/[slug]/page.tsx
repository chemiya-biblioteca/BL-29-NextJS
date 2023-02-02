import { NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import { use } from "react";
import { getBlogBySlug, getBlogs } from "../../../lib/blogs";
import BlogHeader from "./BlogHeader";

interface Params extends ParsedUrlQuery {
  slug: string;//el parametro de la ruta lleva el slug
}

type Props = {
  params: Params;//las propiedades que se reciben
}

const getInitialBlog = async (slug: string) => {
  const blog = getBlogBySlug(slug);//buscamos el blog por id
  return blog;
}

const BlogDetail: NextPage<Props> = ({params}) => {//recibimos parametros
  const blog = use(getInitialBlog(params.slug));//buscamos el blog por id

  return (
    <div className="w-2/3 m-auto">{/**2/3 de ancho y centrado */}
      <BlogHeader blog={blog} />{/**llamamos elemento de cabecera con el contenido */}
      <article className="prose lg:prose-xl">{/**tipografia de tailwind utilizamos prosa */}
        <div dangerouslySetInnerHTML={{__html: blog.content}} />{/**ponemos en el div el contenido del blog qu esta en html */}
      </article>
    </div>
  )
}

export function generateStaticParams() {
  const blogs = getBlogs();//obtenemos todos los blogs

  return blogs.map(blog => ({
    slug: blog.slug//los devolvemos con su identificador
  }))
}

export default BlogDetail;
