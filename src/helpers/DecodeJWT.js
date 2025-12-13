import { jwtDecode } from "jwt-decode";

const decodeJWT = (userData) => {
    let data = jwtDecode(userData.token);
        let user = {
            userId: data.id,
            username: data.name,
            email: data.email
        };
    return user;
}

export default decodeJWT;