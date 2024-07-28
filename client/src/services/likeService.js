import * as request from '../lib/request';

const BASE_URL = 'http://localhost:3030/data/likes'
// const BASE_URL = `${import.meta.env.VITE_API_URL}/data/likes;


export const getAll = async (crystalId) => {
    const whereClause = `where=crystalId%3D%22${crystalId}%22%20AND%20isLiked%3Dtrue`;
    
    const query = new URLSearchParams({
        load: `owner=_ownerId:users`
    });

    const result = await request.get(`${BASE_URL}?${whereClause}&${query}`);
    return result;
};

export const getLikeId = async (crystalId, _ownerId) => {
    // Construct the where clause without spaces
    const whereClause = `where=crystalId%3D%22${crystalId}%22%20AND%20_ownerId%3D%22${_ownerId}%22%20AND%20isLiked%3Dtrue`;
    
    try {
        // Make the GET request with the properly encoded query string
        const result = await request.get(`${BASE_URL}?${whereClause}`);
        
        // Assuming the result is an array of objects, we filter to find the matching object
        const matchingObject = result.find(item => item.crystalId === crystalId && item._ownerId === _ownerId);
        
        // If a matching object is found, return its _id
        if (matchingObject) {
            return matchingObject;
        } else {
            throw new Error('No matching object found');
        }
    } catch (error) {
        console.error('Error fetching like:', error);
        throw error;
    }
};



export const getStatusOfPreviouslyLiked = async (likeId, crystalId, loggedUserId) => {
    const result = await request.get(`${BASE_URL}/${likeId}`)

    if (result._ownerId === loggedUserId && result.crystalId === crystalId && result.isLiked === true) {
        return true;
    } else if (result._ownerId === loggedUserId && result.crystalId === crystalId && result.isLiked === false) {
        return false;
    } else {
        return false;
    }
}

export const like = async (crystalId, isLiked) => {
    const newLike = await request.post(BASE_URL, {
        crystalId,
        isLiked,
    });

    return newLike;
};
export const editPreviouslyLiked = async (likeId, likesData) => {
    const result = await request.put(`${BASE_URL}/${likeId}`, likesData)

    return result;
}

export const dislike = async (likeId, likesData) => {
    const result = await request.put(`${BASE_URL}/${likeId}`, likesData)

    return result;
}