import * as request from '../lib/request';

// const BASE_URL = 'http://localhost:3030/data/comments'
const BASE_URL = `${import.meta.env.VITE_API_URL}/data/comments`;


export const getAll = async (crystalId) => {
    
    const query = new URLSearchParams({
        where: `crystalId="${crystalId}"`,
        load: `owner=_ownerId:users`
    });
    
    const result = await request.get(`${BASE_URL}?${query}`);
    
    // const result = await request.get(BASE_URL);
    // return result.filter(comment => comment.crystalId === crystalId);
    return result;
}

export const create = async (crystalId, text) => {
    const newComment = await request.post(BASE_URL, {
        crystalId,
        text,
    });

    return newComment;
};