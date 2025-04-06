import { login, logout, loggedInUserDisplayName } from "../services/authService";

export function SignIn(){
    return <button onClick={login}>Sign In</button>
}

export function SignOut(){
    return(
        <div>
            <button onClick={logout}>Sign Out</button>
            <span style={{
                marginLeft: "10px",
                fontWeight: "bold",
            }}>Hello, {loggedInUserDisplayName()}</span>
        </div>
    );
}