import mongoose from 'mongoose';
// Handlers para el get router
import PostMessage from '../models/postMessage.js';

export const getPost = async (req,res) => {
    try {
        const postMessage = await PostMessage.find();

        console.log(postMessage);

        res.status(200).json(postMessage);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const createPost = async (req,res) => {
    const post = req.body;

    const newPost = new PostMessage(post); // Se envia desde el front

    try {
        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}

export const updatePost = async (req,res) => {
    const { id: _id } = req.params; // Renombrar id a _id (mongoose object)
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No existe una publicacion con ese ID');

    const updatePost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, { new: true });

    res.json(updatePost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No existe una publicacion con ese ID');

    await PostMessage.findByIdAndRemove(id);

    res.json({message: 'Post deleted'});
}