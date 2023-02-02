
import { join } from "path";
import fs from "fs";
import matter from "gray-matter";
import { Blog } from "../interfaces/Blog";
import { remark } from "remark";
import html from "remark-html";
import remarkGfm from "remark-gfm";

const markdownToHtml = async (markdown: string) => {//convierte el markdown a string
  const result = await remark()
    .use(html)
    .use(remarkGfm)
    .process(markdown);
  
  return result.toString();
}

const getDir = (path: string) => join(process.cwd(), path);
const BLOG_DIR = getDir("/content/blogs");//buscamos el directorio donde estan los blogs

const getFileNames = (dir: string): string[] => {//obtenemos los archivos del directorio
  return fs.readdirSync(dir);
}

const getBlogFileNames = () => {//obtenemos los nombres de los archivos
  return getFileNames(BLOG_DIR);
}

const getItemInPath = (filePath: string) => {
  const fileContent = fs.readFileSync(filePath, "utf8");
  const {data, content} = matter(fileContent);
  return {...data, content} as Blog;//lees el contenido y lo devuelves como blog
}

const getBlog = (name: string) => {
  const blog = getItemInPath(join(BLOG_DIR, name));//coges el contenido del archivo
  blog.slug = name.replace(/\.md$/, "");//en el titulo reemplazas la extension
  return blog;
}

const getBlogBySlug = async (slug: string) => {
  const fileName = slug + '.md';//buscar por el titulo
  const blog = getBlog(fileName);//coges syus datos 
  blog.content = await markdownToHtml(blog.content);//lo conviertes
  return blog;
}

const getBlogs = (): Blog[] => {//devolverlas blogs procesador
  const names = getBlogFileNames();//buscas los nombres de los blogs

  const items = names.map(getBlog);//por cada nombre lo procesas
  return items;
}

export {
  getBlogFileNames,//exporto las funciones
  getBlogs,
  getBlogBySlug
}
