import styles from "./Profile-background.module.css"
import ProfileSider from "../ProfileSider"

function ProfileBackground() {
    return (
        <>
        <ProfileSider></ProfileSider>
        <header className={styles.profile}></header>
        
        </>

    )
}

export default ProfileBackground