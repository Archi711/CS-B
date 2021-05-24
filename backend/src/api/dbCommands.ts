


export const userLogin = (login: string, password: string) => `EXEC pUserLogin ${login}, ${password}`
export const getUser = (id: number) => `EXEC pGetUser ${id}`
export const userRelogin = (login: string) => `EXEC pUserRelogin ${login}`
export const updateUserData = (login: string, data: []) => {
  let res = `EXEC pUpdateUserData ${login},`
  data.forEach(el => el !== "" ?
    res += typeof el === 'string' ? `'${el}',` : el :
    res += 'NULL,')
  return res.slice(0, -1)
}