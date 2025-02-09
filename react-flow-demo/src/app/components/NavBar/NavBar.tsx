"use client";
import styles from './NavBar.module.css';
import AdbIcon from '@mui/icons-material/Adb';

const NavBar = () => {
  return (
    <nav className={styles.navBar}>
      <span className={styles.title}>
        <AdbIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>
        <h5>DATA LINEAGE DEMO</h5>
      </span>
    </nav>
  );
}

export default NavBar;
