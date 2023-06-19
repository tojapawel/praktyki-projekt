import React from "react";
import styles from "./Header.module.css";
import HotelsFilter from "../temp/HotelsFilter/HotelsFilter";
import Hotels from "../temp/Hotels/Hotels";

const Header = (props) => {
	return (
        <div className={styles.header}>
            <Hotels items={props.items}></Hotels>
        </div>
	);
}

export default Header;