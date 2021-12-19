import React from "react";
//import Footer from "./Footer";
import Header from "./Header";

import styles from "./Layout.module.css";

const Layout: React.FC = (props) => {
  return (
    <div className={styles.layout}>
      <Header />
      {props.children}
      
    </div>
  );
};

export default Layout;
