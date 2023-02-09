import jwtDecode from "jwt-decode";
import { createStore } from "redux";
import UserModel from "../Models/UserModel";

// 1. State
export class AuthState {

    public token: string = null;
    public user: UserModel = null;

    public constructor() {
        this.token = localStorage.getItem("token");
        if (this.token) {
            const container: { user: UserModel } = jwtDecode(this.token);
            this.user = container.user;
        }
    }

}

// 2. Action Type
export enum AuthActionType {
    Register,
    Login,
    Logout
}

// 3. Action
export interface AuthAction {
    type: AuthActionType;
    payload?: string;
}

// 4. Reducer
export function authReducer(currentState = new AuthState(), action: AuthAction): AuthState {

    const newState = { ...currentState };

    switch (action.type) {

        case AuthActionType.Register: // Here the payload is a token string
        case AuthActionType.Login: // Here the payload is a token string
            newState.token = action.payload;
            const container: { user: UserModel } = jwtDecode(newState.token); // container is a wrapper object containing the user.
            newState.user = container.user; // User object hidden inside the token
            localStorage.setItem("token", newState.token); // Save token to storage.
            break;

        case AuthActionType.Logout: // Here we have no payload
            newState.token = null;
            newState.user = null;
            localStorage.removeItem("token");
            break;
    }

    return newState;
}

// 5. Store
export const authStore = createStore(authReducer);
