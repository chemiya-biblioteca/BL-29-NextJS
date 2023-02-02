import clientPromise from "../../lib/mongodb";
import { ObjectId } from 'mongodb';

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("posts");//cogemos de la coleccion
        const { id } = req.query;
        const { title, content } = req.body;//cogemoel id y lo que nos llega en el cuerpo

        const post = await db
            .collection("posts")
            .updateOne(//actualizamos en la coleccion
                {
                    "_id": ObjectId(id)
                },
                {
                    $set: {
                        "title": title,
                        "content": content
                    }
                }

            );

        res.json(post);
    } catch (e) {
        console.error(e);
        throw new Error(e).message;
    }
};