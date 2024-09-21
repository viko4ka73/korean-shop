import { DeliveryIcon } from "../../assets";

const Delivery = () => {
    return (
        <section className="mx-10 mt-10 mb-10">
            <h2 className="text-main font-montserrat text-3xl font-bold">Доставка</h2>
            <div className=" flex justify-center mt-10">
                <div className="rounded-t-3xl  bg-[#EAEAEA] w-full  ">
                    <div className="flex justify-around ">
                        <div className="rounded-3xl  bg-white my-16  ml-10 w-1/2 ">
                            <h3 className="text-main font-montserrat text-3xl  text-center
                        leading-normal font-bold mt-8">
                                Хотите связаться с нами? <br />
                                Заполните форму и мы вам перезвоним!</h3>
                            <form className="p-8 flex flex-col" >
                                <div className="mb-2 flex  items-center justify-between  ">
                                    <label className="block text-main-text p-2 ">
                                        <span className="font-montserrat  font-medium  text-xl leading-none"> Имя Фамилия </span>
                                    </label>
                                    <input type="text" className="w-[60%] max-xl:w-full border border-purple-text
                                     rounded-md py-2 px-3 focus:outline-none focus:border-main-blue"
                                    />
                                </div>

                                <div className="mb-2 flex items-center justify-between ">
                                    <label className="block text-main-text p-2 ">
                                        <span className="font-montserrat font-normal  text-xl leading-none"> Номер телефона </span>
                                    </label>
                                    <input type="tel" className="w-[60%] max-xl:w-full border
                                 border-purple-text rounded-md py-2 px-3 focus:outline-none focus:border-main-blue"
                                    />
                                </div>
                                <div className="mb-2 flex  items-center justify-between ">
                                    <label className="block text-main-text p-2 ">
                                        <span className="font-montserrat font-normal  text-xl leading-none"> E-mail </span>
                                    </label>
                                    <input type="tel" className="w-[60%] max-xl:w-full border
                                 border-purple-text rounded-md py-2 px-3 focus:outline-none focus:border-main-blue"
                                    />
                                </div>
                                <div className="mb-2 flex items-start justify-between">
                                    <label className="block text-main-text p-2">
                                        <span className="font-montserrat font-normal text-xl leading-none">Описание заказа</span>
                                    </label>
                                    <textarea
                                        className="w-[60%] h-72 max-xl:w-full  max-h-72 border border-purple-text rounded-md py-2 px-3 focus:outline-none focus:border-main-blue"

                                    ></textarea>
                                </div>

                                <div className="mt-4 flex justify-end ">
                                    <button type="submit" className="border-purple-text border px-10 text-main font-montserrat font-bold py-1 rounded-full">Отправить</button>
                                </div>
                            </form>
                        </div>
                        <div className=" flex items-center flex-col mt-20 mr-10">
                            <img src={DeliveryIcon} alt="delivery" />
                            <div className="flex flex-col ">
                                <p className="font-montserrat text-2xl text-left mobile-text-button font-normal text-main-text leading-normal mb-10" >
                                    Самовывоз заказа по адресу: <br />г. Санкт-Петербург, ул. Бьюти, д.1, кв.1
                                </p>
                                <p className="font-montserrat text-2xl text-left mobile-text-button font-normal text-main-text leading-normal  mb-10" >  Доставка по адресу
                                    от <span className="text-dark-blue"> 5000 </span>рублей </p>
                                <p className="font-montserrat text-2xl text-left mobile-text-button font-normal text-main-text leading-normal  mb-10" >   Время работы с 9:00 до 21:00.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div>
                    </div>
                </div>

            </div>
            <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A55cef12102e6024283eed7a85f6ccf424b87eee180704aa8cda197f1ec33293a&amp;source=constructor" width="100%" height="400" frameBorder="0"
            className="rounded-b-3xl"></iframe>
        </section>
    );
};

export default Delivery;