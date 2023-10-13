import { CartContext } from '@/context'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import styles from '../styles/Navigation.module.scss'

const Header = () => {

    const { numberOfItems } = useContext(CartContext)
    const { push } = useRouter()


    return (
        <div className={styles.Header}>
            <div className={styles.content}>
                <section className={styles.links}>
                    <Link href={'/'}>
                        Productos
                    </Link>
                </section>

                <section className={styles.logo}>
                    <p>Ghiberti</p>
                </section>

                <section className={styles.links} >
                    <Link href={'/cart'}>
                        Cart ({numberOfItems})
                    </Link>
                </section>
            </div>
        </div>
    )
}

export default Header
