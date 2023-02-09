import { UnauthorizedError, ConflictError } from "../4-models/client-errors";
import CredentialsModel from "../4-models/credentials-model";
import UserModel from "../4-models/user-model";
import hash from "../2-utils/cyber";
import auth from "../2-utils/auth";
import dal from "../2-utils/dal";


async function register(user: UserModel): Promise<string> {
    const sqlIfUserExist = `SELECT * FROM users WHERE username = ?`;
    const existingUsers = await dal.execute(sqlIfUserExist, user.username);
    if (existingUsers && existingUsers.length > 0) {
        throw new ConflictError("Username Already Exists");
    }
    user.password = hash(user.password);
    const sql = `INSERT INTO users VALUES(DEFAULT, ?, ?, ?, ?, 1)`;
    const info = await dal.execute(sql, [user.firstName, user.lastName, user.username, user.password, user.role]);
    user.roleId = 1;
    user.userId = info.insertId;
    delete user.password;
    const token = auth.generateNewToken(user);
    return token;
}


async function login(credentials: CredentialsModel): Promise<string> {
    credentials.password = hash(credentials.password);
    const sql = `SELECT * FROM users WHERE username = ? AND password = ?`;
    const users = await dal.execute(sql, [credentials.username, credentials.password]);
    const user = users[0];
    if (!user) throw new UnauthorizedError("Incorrect Username or Password");
    delete user.password;
    const token = auth.generateNewToken(user);
    return token;
}

export default {
    register,
    login
};

