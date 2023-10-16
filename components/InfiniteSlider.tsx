import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ProductItem } from './Products/ProductItem';

const InfiniteSlider = ({ products }: any) => {
    const settings = {
        infinite: true,
        speed: 1500, // Ajusta la velocidad de desplazamiento
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1, // Ajusta el cambio casi instantáneo
        arrows: false,
        dots: false, // Opcional: puedes deshabilitar los puntos indicadores si lo deseas
    };


    return (
        <Slider {...settings}>
            {
                products.map((item: any, index: number) => 
                    <ProductItem carrousel key={item.id} product={item} />
                
                )
            }
        </Slider>
    );
};

export default InfiniteSlider;
