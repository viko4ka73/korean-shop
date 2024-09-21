import { ContactIcon } from "../../assets";

const Contact = () => {

    return (
        <section className="mx-10 mt-10 mb-10">
            <h2 className="text-main font-montserrat text-3xl font-bold">Контакты</h2>
            <div className=" flex justify-center items-center flex-col">
                <div className="rounded-t-3xl bg-[#EAEAEA] w-full">
                    <div className="rounded-3xl bg-white my-10 px-10 mx-40 py-5 flex justify-center gap-10 flex-row-reverse">
                    <img src={ContactIcon} alt="delivery" className="w-80" />
                    <div className="flex flex-col items-center justify-center">
                        <h3 className="text-purple-text font-montserrat  text-2xl  text-center
                        leading-normal font-bold mt-4  mb-4 ">
                            Остались вопросы? <br />
                            Мы с радостью на них ответим!</h3>
                        <p className="font-montserrat text-3xl text-center font-normal text-main leading-normal mb-10 " >
                            <span className="font-montserrat   font-semibold text-info"> <a href="https://t.me/+79813230173">Telegram </a>
                                /  <a href="https://wa.me/+79813230173">WhatsApp: </a></span>
                            <a href="tel:+79251055066"> +7 981 323 01 73 </a> <br />
                            <span className="font-montserrat  font-semibold text-info">   Электронная почта: </span>
                            <a href="mailto:korean-beauty@mail.ru"> korean-beauty@mail.ru</a>
                        </p>
                        <p className="font-montserrat  text-2xl  text-center font-semibold text-main mb-10">Время работы: с 9:00 до 21:00.</p>
                    </div>
                </div>
                <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A55cef12102e6024283eed7a85f6ccf424b87eee180704aa8cda197f1ec33293a&amp;source=constructor" width="100%" height="400" frameBorder="0"
                className="rounded-b-3xl" ></iframe>
</div>
            </div>


        </section>
    );
};

export default Contact;