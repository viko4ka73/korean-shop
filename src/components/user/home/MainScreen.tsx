import Marquee from "react-fast-marquee";
import { MainBanner } from "../../../assets";
import { useEffect, useState } from "react";

const MainScreen = () => {
  const slogans = [
    {
      text: (
        <h1 className="font-montserrat font-medium text-[40px] text-main-text">
          При покупке
          <span className="text-purple-text"> от 4000 </span> <br />
          полноразмерная пенка <br /> PAPA RECIPE
          <span className="text-purple-text"> в подарок </span>
        </h1>
      ),
    },
    {
      text: (
        <h1 className="font-montserrat font-medium text-[40px] text-main-text">
          Получите <span className="text-purple-text">скидку 10%</span> <br />
          при заказе на сумму <br />  <span className="text-purple-text">от 5000 рублей</span> 
        </h1>
      ),
    },
    {
      text: (
        <h1 className="font-montserrat font-medium text-[40px] text-main-text">
          <span className="text-purple-text">  Бесплатная </span> доставка <br />
          на все заказы <br />
         <span className="text-purple-text"> от 3000 рублей!</span>
        </h1>
      ),
    },
  ];

  const [currentSloganIndex, setCurrentSloganIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn(false); 
      setTimeout(() => {
        setCurrentSloganIndex((prevIndex) => (prevIndex + 1) % slogans.length);
        setFadeIn(true);
      }, 500); 
    }, 5000); 

    return () => clearInterval(interval);
  }, [slogans.length]);

  return (
    <div className="relative">
    <img src={MainBanner} alt="banner" className="w-full" />
    <div className="absolute right-80 top-40 p-10 text-center">
    <div className={`slogan-container ${fadeIn ? "fade-in" : "fade-out"}`}>
          {slogans[currentSloganIndex].text}
        </div>
      <button className="bg-white px-10 py-2 rounded-md hover:bg-slate-50 mt-4">
        <a className="font-montserrat text-xl font-bold text-main hover:text-light-main" href="/cart">Оформить заказ</a>
      </button>
    </div>
    <Marquee className="bg-gray-200 py-2" speed={50} gradient={false}>
        <p className="font-bold font-montserrat font-bolds uppercase text-md text-[#E1BA2E]">
          Новинки уже на сайте &nbsp;&nbsp;&nbsp;&nbsp; Новинки уже на сайте &nbsp;&nbsp;&nbsp;&nbsp;
          Новинки уже на сайте &nbsp;&nbsp;&nbsp;&nbsp; Новинки уже на сайте &nbsp;&nbsp;&nbsp;&nbsp;
          Новинки уже на сайте &nbsp;&nbsp;&nbsp;&nbsp; Новинки уже на сайте &nbsp;&nbsp;&nbsp;&nbsp;
          Новинки уже на сайте &nbsp;&nbsp;&nbsp;&nbsp; Новинки уже на сайте &nbsp;&nbsp;&nbsp;&nbsp;
          Новинки уже на сайте &nbsp;&nbsp;&nbsp;&nbsp; Новинки уже на сайте &nbsp;&nbsp;&nbsp;&nbsp;
        </p>
      </Marquee>
  </div>
  
  );
};

export default MainScreen;
