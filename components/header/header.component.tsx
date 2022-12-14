import Link from "next/link";
import styles from "./header.module.scss";
import React, { useState } from "react";
import {BrowseRoute, ProfileRoute, RootRoute, SignInRoute, SignUpRoute, UploadRoute} from "../../config/routes";
import { useRouter } from "next/router";
import { AppContext } from "../../config/appContext";
import {firebaseAuth} from "../../config/firebase";

export const HeaderComponent = () => {
    const [searchString, setSearchString] = useState<string>("");
    const router = useRouter();

    const browseRef = searchString === "" ? {pathname: BrowseRoute} : {pathname: BrowseRoute, query: { searchString: searchString }};

    const handleSearchBarKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            router.push(browseRef);
        }
    }

    return (
        <AppContext.Consumer>
            {context =>
                <div className={styles.container}>
                    <ul className={styles.left}>
                        <li>
                            <Link href={RootRoute}>Home</Link>
                        </li>
                        <li>
                            <Link href={BrowseRoute}>Browse</Link>
                        </li>
                        <li>
                            <div className={styles.search}>
                                <input type="search" value={searchString} onChange={e => setSearchString(e.target.value)} onKeyDown={(event) => handleSearchBarKeyDown(event)}></input>
                                <Link type="submit" href={browseRef}>Find</Link>
                            </div>
                        </li>
                        <li>
                            <Link href={UploadRoute}>Upload</Link>
                        </li>
                    </ul>
                    <ul className={styles.right}>
                        <div style={{display: context.isLoggedIn || router.route === SignInRoute || router.route === SignUpRoute ? "none" : "block"}}>
                            <Link href={SignInRoute}>Sign In</Link>
                        </div>
                        <div onClick={() => firebaseAuth.signOut().then()} style={{display: context.isLoggedIn ? "block" : "none"}}>Sign Out</div>
                        <Link href={ProfileRoute}>Profile</Link>
                    </ul>
                </div>
            }
        </AppContext.Consumer>
    );
}

export default HeaderComponent;
