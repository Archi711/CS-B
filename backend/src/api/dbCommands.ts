


export const userLogin = (login: string, password: string) => `EXEC pUserLogin ${login}, ${password}`
export const getUser = (id: number) => `EXEC pGetUser ${id}`
export const userRelogin = (login: string) => `EXEC pUserRelogin ${login}`