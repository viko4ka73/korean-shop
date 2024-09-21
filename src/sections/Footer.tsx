import { LogoFooter } from "../assets";

const Footer = () => {
  return (
    <div className="bg-main-gray w-full py-2 px-10 ">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-4">
          <p className="font-montserrat font-normal text-2xl text-main">
            ИП Кореан Бьюти{" "}
          </p>
          <p className="font-montserrat font-normal text-2xl text-main">
            {" "}
            ИНН 8900000000000{" "}
          </p>
          <p className="font-montserrat font-normal text-2xl text-main">
            {" "}
            ОГРНИП 007847000000000{" "}
          </p>
        </div>
        <a
          href="tel:+79813230173"
          className="font-montserrat font-bold text-3xl text-main hover:text-light-main"
        >
          ☏ +7 (981) 323 - 01 - 73{" "}
        </a>
        <a href="/">
          <img src={LogoFooter} />
        </a>
      </div>
    </div>
  );
};

export default Footer;
