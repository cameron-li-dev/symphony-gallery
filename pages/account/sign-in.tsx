import {useRouter} from "next/router";
import { firebaseAuth } from "../../config/firebase";
import {onAuthStateChanged, signInWithEmailAndPassword} from "@firebase/auth";
import { useState } from "react";
import Link from "next/link";
import styles from "./sign-in.module.scss";
import { SignUp } from "../../config/routes";

const signInErrors: Map<string, string> = new Map([
   ["auth/user-not-found", "Invalid email or password"],
   ["", ""],
]);

export const SignIn = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null | undefined>(null);

    onAuthStateChanged(firebaseAuth, (auth) => {
        if (!!auth) {
            router.replace("/").then(_ => null);
        }
    });

    const handleStandardSignIn = () => {
        setLoading(true);
        signInWithEmailAndPassword(firebaseAuth, email, password)
            .catch((error => {
                setLoading(false);
                setError(signInErrors.get(error.code));
            }));
    }

    if (loading) {
        return (
            <div className={styles.container}>
                <div className={styles.content}>
                    Loading
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <p style={{display: !!error ? "block" : "none"}}>{error}</p>
                <label>Email</label>
                <input type="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)}></input>
                <label>Password</label>
                <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)}></input>

                <button onClick={() => handleStandardSignIn()}>Sign in</button>
                <Link href={SignUp}>
                    Sign up
                </Link>
            </div>
        </div>
    );
}

export default SignIn;