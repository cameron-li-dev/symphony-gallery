import {useRouter} from "next/router";
import {useEffect} from "react";
import styles from "./membership.module.scss";
import { Root, SignIn as signIn} from "../../config/routes";
import { useAppContext} from "../../config/appContext";
import {SignIn as SignInComponent} from "../../components/auth/sign-in/sign-in";

export const SignIn = () => {
    const router = useRouter();
    const context = useAppContext();

    useEffect(() => {
        if (context.isLoggedIn) {
            pushToRoot(context.isLoggedIn);
        }
    }, []);

    useEffect(() => {
        if (context.isLoggedIn) {
            pushToRoot(context.isLoggedIn);
        }
    }, [context.isLoggedIn]);

    const pushToRoot = (isLoggedIn: boolean) => {
        if (isLoggedIn && router.route === signIn) {
            const redirectTo = !!(router.query.redirectTo as string) ? router.query.redirectTo as string : Root;
            router.push(redirectTo).then();
        }
    };

    return (
        <div className={styles.container}>
            <SignInComponent/>
        </div>
    );
}

export default SignIn;
