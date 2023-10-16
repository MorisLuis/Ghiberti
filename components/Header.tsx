import React, { useContext, useState } from 'react';

import { CartContext } from '@/context';
import { getProductsBySearch } from '@/utils/services';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Navigation.module.scss';
import { ModalSearch } from './ModalSearch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const Header = () => {

    const { numberOfItems } = useContext(CartContext)
    const { push } = useRouter()
    const [modalSearchVisible, setModalSearchVisible] = useState(false);


    const handleSearch = async (term: string) => {
        const { data } = await getProductsBySearch(term)
        return data
    }



    // Clients
    const onSelectClient = (product: any) => {
        push(`/product/${product}`)
        //setClientChanged(true)
        //selectClient(product as ClientInterface)
        /* setTimeout(() => {
            setClientChanged(false)
        }, 300) */
    }

    const onClientKeyDown = (inputValue: string) => {
    }

    return (
        <>
            <div className={styles.Header}>
                <div className={styles.content}>
                    <section className={styles.links}>
                        <Link href={'/products'}>
                            Productos
                        </Link>
                        <Link href={'/category'}>
                            Categorias
                        </Link>
                        <div onClick={() => setModalSearchVisible(true)} >
                            <FontAwesomeIcon icon={faMagnifyingGlass} className={`icon__small`} style={{ marginRight:"0.5em"}}/>
                            Buscador
                        </div>
                    </section>


                    <section className={styles.logo}>
                        <Link href={'/'}>
                            <img
                                src={'/ghiberti.avif'}
                                alt={"Ghiberti_Logo"}
                                width={50}
                                height={50}
                                style={{ fill: "black" }}
                            />
                        </Link>

                    </section>

                    <section className={styles.links} >
                        <Link href={'/cart'}>
                            Carrito ({numberOfItems})
                        </Link>
                    </section>
                </div>
            </div>

            <ModalSearch
                visible={modalSearchVisible}
                onClose={() => setModalSearchVisible(false)}
                onSelectItem={onSelectClient}
                onInputChange={handleSearch}
                onKeyDown={onClientKeyDown}
            />
        </>
    )
}

export default Header
