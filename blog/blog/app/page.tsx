import { NextPage } from "next";
import { use } from "react";
import { getBlogs } from "../lib/blogs";
import Image from "next/image";
import Link from "next/link";

async function getInitialBlogs() {
  const blogs = getBlogs();//busco los blogs para eso llamo a la funcion
  return blogs;
}

const shortify = (text: string, maxLength = 60) => {
  if (text.length <= maxLength) {
    return text;
  }

  return text.substring(0, maxLength) + " ...";//reucirmos el texto de la descripcion
}

const Page: NextPage = () => {
  const blogs = use(getInitialBlogs());//en la variable llamo para coger los blogs
  
  return (
    <div>
      <h2 className="sr-only">Blogs</h2>{/**la pagina picincipal */}
{/**grid con 1 columna , gap el huevo entre los elementos del grid, en pequeño dos col, mediano 3,grande 4 y con gap */}
      <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {blogs.map(blog => (
          <Link key={blog.slug} href={`/blogs/${blog.slug}`} className="group">{/**recorro el array, cada uno con su key y enlace de referencia */}
          {/**position relative, aspect para el aspect ratio tipo 16:9 de tamano, fuese aspect-w-16 y aspect-h-9, ocultamos sobrante, redondeamos  y al cambiar tamano cambiamos aspect */}
            <div className="relative aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
              <Image
                fill
                src={blog.coverImage}
                alt={""}
                className="h-full w-full object-cover object-center group-hover:opacity-75"
              />{/**imagen, ponemos su ruta, todo ancho y largo,cover para todo el tamano del contenedor, y efecto al ahacer hover  */}
            </div>
            <h3 className="mt-4 text-sm text-gray-700">{blog.title}</h3>{/**enlazamos con el titulo, margen */}
            <p className="mt-1 text-md font-medium text-gray-900">{shortify(blog.description, 100)}</p>{/**enlazamos con descripcion reducida */}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Page;