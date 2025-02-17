const HOST = "https://frontend-take-home-service.fetch.com";

const HEADER_CONTENT_TYPE_JSON = {
  "Content-Type": "application/json",
};

// const METHOD_GET = "GET";
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
      /**
       * Your browser will automatically send this cookie with all successive
       * credentialed requests to the API. Note that you will need to pass a
       * config option in order to send credentials (cookies) with each request.
       */
      credentials: "include",
    });

    return res;
  }
}

const api = new Api();

export default api;
