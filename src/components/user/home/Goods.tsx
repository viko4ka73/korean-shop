import { Link } from "react-router-dom";
import { Body, Face, Hair, Ton, Toner } from "../../../assets";

const Goods = () => {
    // Add the appropriate links for each category in the 'link' field
    const products = [
        { imgSrc: Face, text: "Уход за лицом", link: '/product/Уход за лицом' },
        { imgSrc: Body, text: "Тело", link: '/product/Тело' },
        { imgSrc: Ton, text: "Тональные средства", link: '/product/Тональные средства' },
        { imgSrc: Hair, text: "Волосы", link: '/product/Волосы' },
        { imgSrc: Toner, text: "Тонеры", link: '/product/Тонеры' },
    ];

    return (
        <div className="mx-10 mt-5">
            <h1 className="text-main-text font-semibold text-3xl font-montserrat">Товары</h1>
            <div className="grid grid-cols-5 mt-8 gap-40">
                {products.map((product, index) => (
                    <Link 
                        key={index} 
                        className="text-center" 
                        to={product.link} 
                        // Ensure the link navigates to the category
                    >
                        <img 
                            src={product.imgSrc} 
                            alt={product.text} 
                            className="h-[250px] w-[300px] object-contain cursor-pointer hover:scale-105" 
                        />
                        <p className="text-main-light-gray mt-3 font-montserrat text-base">{product.text}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Goods;
