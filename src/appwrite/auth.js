import config from "../config/config";
import { Client, Account, ID } from 'appwrite'

class AuthService {
    Client = new Client();
    account;
    //Jab koi object banaye tab account bane isliye constructor use
    constructor() {
        this.Client
            .setEndpoint(config.appwriteUrl) // Your API Endpoint
            .setProject(config.appwriteProjectId);

        this.account = new Account(this.Client);

    }
    //We don't want appwrite dependency so we create a method and under it write logic

    //Signup
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                //call another method for login
                //account ban hi gaya to login karado
                return this.login({ email, password });
            } else {
                return userAccount;
            }
        } catch (error) {
            console.log("Error in appwrite::auth.js::createAccount: ", error);
            throw error;
        }
    }

    //Login
    async login({ email, password }) {
        try {
            const userLogin = await this.account.createEmailSession(email, password);
            return userLogin;
        } catch (error) {
            console.log("Error in appwrite::auth.js::login: ", error);
            throw error;
        }
    }

    //Get current user status whether login or not
    async getCurrentUser() {
        try {
            const resp = await this.account.get()
            return resp
            // return await this.account.get();
        } catch (error) {
            console.log("Error in appwrite::aut.js::getCurrentUser: ", error);
            // throw error;
        }
        //If any error comes then null will be returned
        return null;

    }

    //Logout
    //It deletes current session
    async logout() {
        try {
            // await this.account.deleteSession('session-Id');
            await this.account.deleteSessions();//For deleting all sessions
        } catch (error) {
            console.log("Error in logout: ", error);
        }
    }
};

const authService = new AuthService();

export default authService;