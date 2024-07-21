import * as request from "../lib/request";

const BASE_URL = 'http://localhost:3030/data/crystals'
// const BASE_URL = `${import.meta.env.VITE_API_URL}/data/games`;


export const getAll = async () => {
    const result = await request.get(BASE_URL);

    // return Object.values(result);
    return result;
}

export const getOne = async (crystalId) => {
    const result = await request.get(`${BASE_URL}/${crystalId}`)
    
    return result;
}

export const create = async (crystalData) => {

    const result = await request.post(BASE_URL, crystalData);

    return result;
    // const response = await fetch(BASE_URL, {
    //     method: 'POST',
    //     headers: {
    //         'content-type': 'application/json'
    //     },
    //     body: JSON.stringify(gameData)
    // });

    // const result = response.json();

}

export const edit = async (crystalId, crystalData) => {
    const result = await request.put(`${BASE_URL}/${crystalId}`, crystalData)

    return result;
}

export const remove = async (crystalId) => await request.remove(`${BASE_URL}/${crystalId}`);
    
export const getLatest = async () => {
    const query = new URLSearchParams({
        // sortBy: `_createdOn`, //+ desc
        offSet: 0,
        pageSize: 3,
    })
    // const query = encodeURIComponent(`offset=0&pageSize=3`);
    console.log(query);
    const result = await request.get(`${BASE_URL}?sortBy=_createdOn%20desc&${query}`);
    // const result =  await request.get(`${BASE_URL}?${query}`);

    return result;
} 