import styles from "./Profile-background.module.css"
import ProfileSider from "../ProfileSider"

function ProfileBackground() {
    return (
        <div className={styles.profile}>
            <ProfileSider></ProfileSider>
            <div className={styles.profileOptions}>
                <p style={{marginTop: +80}}>arthur</p>
            </div>
        </div>

    )
}

export default ProfileBackground