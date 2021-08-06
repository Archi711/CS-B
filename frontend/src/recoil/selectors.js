import { selector } from "recoil";
import { tokenState } from "./atoms";

export const tokenSessionState = selector({
  key: 'tokenSessionState',
  get: ({ get }) => {
    const tokens = get(tokenState);
    const savedTokens = JSON.parse(sessionStorage.getItem('tokens'));
    if (tokens?.accessToken.length !== 0) return tokens;
    if (savedTokens?.accessToken.length !== 0) return savedTokens;
  },
  set: ({ set }, newValue) => {
    set(tokenState, newValue);
    window.sessionStorage.setItem('tokens', JSON.stringify(newValue));
  },
});
