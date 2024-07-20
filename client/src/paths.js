// const BASE_URL = 'http://localhost:3030'
// const BASE_URL = `${import.meta.env.VITE_API_URL}/users`;


const Path = {
    Home: '/',
    Login: 'login',
    Register: 'register',
    Logout: 'logout',
    CrystalEdit: '/crystals/:crystalId/edit',
    CrystalDelete: '/crystals/:crystalId/delete',
    Crystals: '/crystals',
    CrystalsCreate: '/crystals/create',
    CrystalDetails: '/crystals/:crystalId',
    About: '/about',
    Contact: '/contact',
    Search: '/search',
}

export default Path;