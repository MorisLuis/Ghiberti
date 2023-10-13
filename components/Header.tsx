import { CartContext } from '@/context'
import Image from 'next/image'
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
                    <Link href={'/category'}>
                        Categorias
                    </Link>
                </section>

                <section className={styles.logo}>
                    <img
                        src={'/ghiberti.avif'}
                        alt={"Ghiberti_Logo"}
                        width={50}
                        height={50}
                        style={{ fill: "black" }}
                    />
                    {/* <Image
                        src={'/ghiberti.avif'}
                        alt={"Ghiberti_Logo"}
                        width={50}
                        height={50}
                        style={{ fill: "black" }}
                    /> */}
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
