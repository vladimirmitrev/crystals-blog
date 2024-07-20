// const BASE_URL = 'http://localhost:3030'
// const BASE_URL = `${import.meta.env.VITE_API_URL}/users`;


const Path = {
    Home: '/',
    Login: 'login',
    Register: 'register',
    Logout: 'logout',
    GameEdit: '/crystals/:crystalId/edit',
    GameDelete: '/crystals/:crystalId/delete',
    Games: '/crystals',
    GameDetails: '/crystals/:crystalId',
}

export default Path;