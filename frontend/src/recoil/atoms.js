import { atom } from 'recoil'

export const tokenState = atom({
  key: 'tokenState',
  default: {
    accessToken: '',
    refreshToken: '',
  },
});

export const userState = atom({
  key: 'userState',
  default: null,
});

export const fetchState = atom({
  key: 'fetchState',
  default: null,
});
