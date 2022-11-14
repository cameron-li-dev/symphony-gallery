import Link from "next/link";
import styles from "./header.module.scss";
import { useState } from "react";
import {Browse, Profile, Root, SignIn, SignUp} from "../../config/routes";
import { useRouter } from "next/router";
import { AppContext } from "../../config/appContext";
import {firebaseAuth} from "../../config/firebase";

export const Header = () => {
    const [searchString, setSearchString] = useState<string>("");
    const router = useRouter();

    const browseRef = searchString === "" ? {pathName: Browse} : {pathName: Browse, query: { searchString: searchString }};

    return (
        <AppContext.Consumer>
            {context =>
                <div className={styles.container}>
                    <ul className={styles.left}>
                        <li>
                            <Link href={Root}>Home</Link>
                        </li>
                        <li>
                            <Link href={Browse}>Browse</Link>
                        </li>
                        <li>
                            <div className={styles.search}>
                                <input type="search" value={searchString} onChange={e => setSearchString(e.target.value)}></input>
                                <Link href={browseRef}>Find</Link>
                            </div>
                        </li>
                    </ul>
                    <ul className={styles.right}>
                        <div style={{display: context.isLoggedIn || router.route === SignIn || router.route === SignUp ? "none" : "block"}}>
                            <Link href={SignIn}>Sign In</Link>
                        </div>
                        <div onClick={() => firebaseAuth.signOut().then()} style={{display: context.isLoggedIn ? "block" : "none"}}>Sign Out</div>
                        <Link href={Profile}>Profile</Link>
                    </ul>
                </div>
            }
        </AppContext.Consumer>
    );
}

export default Header;
