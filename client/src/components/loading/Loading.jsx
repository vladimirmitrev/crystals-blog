import styles from './Loading.module.css';


const Loading = () => {
    return (
        <div className={styles.loaderContainer} data-testid="loader">
            <div className={styles.loader}>
                <div className={`${styles.inner} ${styles.innerOne}`} />
                <div className={`${styles.inner} ${styles.innerTwo}`} />
                <div className={`${styles.inner} ${styles.innerThree}`} />
            </div>
        </div>
    );
}

export default Loading;