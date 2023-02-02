import clientPromise from "../../lib/mongodb";

export default async (req, res) => {
    try {
        const client = await clientPromise;
        const db = client.db("posts");//cogemos la coleccion
        const { title, content } = req.body;//campos que nos llegan

        const post = await db
            .collection("posts")//insertamos en la coleccion
            .insertOne({
                title,
                content
            });

        res.json(post);
    } catch (e) {
        console.error(e);
        throw new Error(e).message;
    }
};