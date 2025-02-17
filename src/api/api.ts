const HOST = "https://frontend-take-home-service.fetch.com";

const HEADER_CONTENT_TYPE_JSON = {
  "Content-Type": "application/json",
};

/**
 * Your browser will automatically send this cookie with all successive
 * credentialed requests to the API. Note that you will need to pass a
 * config option in order to send credentials (cookies) with each request.
 */
const CREDENTIALS_INCLUDE: {
  credentials: RequestCredentials;
} = {
  credentials: "include",
};

const METHOD_GET = "GET";
const METHOD_POST = "POST";

/**
 * Class for interacting with the fetch API service.
 */
export class Api {
  /**
   * You will need to hit the login endpoint in order to access other endpoints.
   * A successful request to the login endpoint will return an auth cookie
   * included in the set-cookie response header. It’s an HttpOnly cookie, so you
   * will not be able to access this value from any Javascript code (nor should
   * you need to).
   * @returns 200 OK An auth cookie, fetch-access-token, will be included in the
   * response headers. This will expire in 1 hour.
   */
  async login(body: { name: string; email: string }) {
    const res = await fetch(`${HOST}/auth/login`, {
      headers: HEADER_CONTENT_TYPE_JSON,
      method: METHOD_POST,
      body: JSON.stringify(body),
      ...CREDENTIALS_INCLUDE,
    });

    return res;
  }

  /**
   * Hit this endpoint to end a user’s session. This will invalidate the auth
   * cookie.
   */
  async logout() {
    const res = await fetch(`${HOST}/auth/logout`, {
      method: METHOD_POST,
      ...CREDENTIALS_INCLUDE,
    });

    return res;
  }

  /**
   * The maximum total number of dogs that will be matched by a single query is
   * 10,000.
   */
  async searchDogs() {
    let url = new URL(`${HOST}/dogs/search`);

    const res = fetch(url, {
      method: METHOD_GET,
      ...CREDENTIALS_INCLUDE,
    });

    return res;
  }

  /**
   * Gets the image location and detailed information about each dog
   * @param body The body should be an array of no more than 100 dog IDs to
   * fetch (no pun intended).
   * @returns
   */
  async getDogDetails(body: string[]) {
    const res = await fetch(`${HOST}/dogs`, {
      headers: HEADER_CONTENT_TYPE_JSON,
      method: METHOD_POST,
      body: JSON.stringify(body),
      ...CREDENTIALS_INCLUDE,
    });

    return res;
  }
}

const api = new Api();

export default api;
