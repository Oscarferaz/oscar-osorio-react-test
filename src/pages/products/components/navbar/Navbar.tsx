import styles from './css/Navbar.module.scss'

interface PropsNavbar {
    children: React.ReactNode
}

const Navbar: React.FC<PropsNavbar> = ({children}) => {
    return(
        <nav className={styles.navbar}>
            {children}
        </nav> 
    )
}

export default Navbar