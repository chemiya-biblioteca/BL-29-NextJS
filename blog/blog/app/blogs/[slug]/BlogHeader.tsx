import { FunctionComponent } from "react";
import Image from "next/image";
import { Blog } from "../../../interfaces/Blog";

type Props = {
  blog: Blog//lo que recibo lleva metido el blog
}

const BlogHeader: FunctionComponent<Props> = ({blog}) => {//recibo el blog

  return (
    <div className="blog-detail-header">
      <div className="flex flex-row justify-between mb-2">{/**flex  */}
        <div className="flex items-center">
          <div className="flex-shrink-0">{/**no encoge si cambiamos el tamano de la pantall */}
            <a href="#">
              <span className="sr-only">{blog.author}</span>{/**enlazamos nombre del autor */}
              <div className="relative h-10 w-10 !mb-0" >{/**ancho y alto */}
                <Image 
                  priority
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                  src={blog.authorImage} alt="" 
                />{/**enlazamos con la imagen */}
              </div>
            </a>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900 !mb-0">
              <a href="#" className="hover:underline">
                {blog.author}
              </a>{/**enlazamos con el autor */}
            </p>
            <div className="flex space-x-1 text-sm text-gray-500">{/**space x para el espacio entre los elementos */}
              <time dateTime={blog.date}>{blog.date}</time>
            </div>{/**ponemos fecha y enlazamos con ella */}
          </div>
        </div>
        <div className="flex self-end">{/**para posicionarlo al final */}
          {/* Social Links Here */}
        </div>
      </div>
      <h1 className="font-bold text-4xl mb-1">{blog.title}</h1>{/**enlazamos con el titulo y descripcion */}
      <h2 className="blog-detail-header-subtitle mb-2 text-xl text-gray-600">{blog.description}</h2>
      <div className="h-96 bg-black mx-auto w-full relative">{/**todo el ancho y centrada */}
        <Image
          priority
          layout="fill"
          objectFit="cover"
          src={blog.coverImage} alt=""/>{/**enlazamos con la imagen */}
      </div>
    </div>
  )
}

export default BlogHeader;
