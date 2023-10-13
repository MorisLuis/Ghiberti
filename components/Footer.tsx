import React from 'react';
import styles from '../styles/Navigation.module.scss';

const Footer = () => {
    return (
        <div className={styles.Footer}>
            <section className={styles.content}>
                {/* <section className={styles.links}>
                    <p>Productos</p>
                    <p>Categorias</p>
                </section> */}
                <section className={styles.terms}>
                    <p>@Ghiberti</p>
                </section>
            </section>
        </div>
    )
}

export default Footer
