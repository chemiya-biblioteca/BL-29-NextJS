import clientPromise from "../../lib/mongodb";
import { ObjectId } from 'mongodb';

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("posts");//cogemos de la coleccion
        const { id } = req.query;//cogemos el id

        const post = await db
            .collection("posts")//buscamos en lacoleccion
            .findOne({
                '_id': ObjectId(id)
            })

        res.json(post);
    } catch (e) {
        console.error(e);
        throw new Error(e).message;
    }
};