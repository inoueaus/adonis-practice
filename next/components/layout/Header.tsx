import React, { useContext } from "react";
import Link from "next/link";

import styles from "./Header.module.css";
import AuthContext from "../../context/AuthContext";

const Header: React.FC = () => {
  const context = useContext(AuthContext);

  return (
    <header className={styles.header}>
      <section>{context.isAuth ? context.username : "Welcome"}</section>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          {!context.isAuth ? (
            <>
              <li>
                <Link href="/auth/login">Login</Link>
              </li>
              <li>
                <Link href="/auth/register">Register</Link>
              </li>
            </>
          ) : (
            <li>
              <Link href="/auth/logout">Logout</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
