import {http, HttpResponse, HttpResponseResolver} from 'msw';

import {LOGIN_PATH} from "../constants";
import {UserLogin} from "../types";

type RequestBody = UserLogin;

const loginResolver: HttpResponseResolver<never, RequestBody, string> = async ({ request }) => {
    const { login, password } = await request.json();
    if (login === 'johndoe123' && password === 'admin') {
        return HttpResponse.json("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwibG9naW4iOiJqb2huZG9lMTIzIiwiaWF0IjoxNTE2MjM5MDIyfQ.rTzG9YjAB-UQBYtf9hKVc_M_CyNssfQlljR4Rdbg_vA");
    }
    return HttpResponse.json(null, { status: 401 })
};

const authHandler = http.post(`${LOGIN_PATH}`, loginResolver);

export default authHandler;