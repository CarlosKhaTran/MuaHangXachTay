// @flow

export function checkLogin(token: string, createdAt: string) {
  return (
    token !== null
    && token !== undefined
    && token.length > 0
    && Date.now() - new Date(createdAt).getTime() < 2400 * 3600 * 1000
  );
}
