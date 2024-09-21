import React, { useState, useEffect } from 'react';
import { useCart } from '../../sections/CartContext';

const Cart = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    address: ''
  });

  const { updateCartCount } = useCart();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(cart);
    updateCartCount(); // Update count initially
  }, [updateCartCount]);

  const handleQuantityChange = (index: number, delta: number) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity = (updatedCart[index].quantity || 1) + delta;
    if (updatedCart[index].quantity < 1) updatedCart[index].quantity = 1; // Prevent quantity less than 1
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    updateCartCount(); // Update cart count when quantity changes
  };

  const handleRemoveItem = (index: number) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    updateCartCount(); // Update cart count when item is removed
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo({ ...customerInfo, [name]: value });
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price.replace(/\D/g, '') * (item.quantity || 1)), 0);
  };

  const subtotal = calculateSubtotal();
  const shippingCost = subtotal >= 3000 ? 0 : 300; 
  const total = subtotal + shippingCost;

  return (
    <div className="h-screen py-8 mt-1-">
      <div className="container mx-auto px-4">
        <h1 className="text-black font-montserrat font-semibold text-xl mb-6">Корзина</h1>
        {cartItems.length === 0 ? (
          <div className="text-center text-gray-500 font-montserrat text-lg">
            Ваша корзина пуста. Добавьте товары, чтобы оформить заказ.
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-3/4">
              <div className="bg-white rounded-lg shadow-md border p-6 mb-4">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left text-black font-montserrat font-semibold text-sm">Товар</th>
                      <th className="text-left text-black font-montserrat font-semibold text-sm">Цена</th>
                      <th className="text-left text-black font-montserrat font-semibold text-sm">Количество</th>
                      <th className="text-left text-black font-montserrat font-semibold text-sm">Итого</th>
                      <th className="text-left text-black font-montserrat font-semibold text-sm"> </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-4">
                          <div className="flex items-center">
                            <img className="h-16 w-16 mr-4 rounded" src={item.imgSrc} alt="Product" />
                            <span className="text-black font-montserrat font-semibold text-sm">{item.name}</span>
                          </div>
                        </td>
                        <td className="py-4 text-black font-montserrat font-semibold text-sm">{item.price}</td>
                        <td className="py-4">
                          <div className="flex items-center">
                            <button
                              className="border border-main rounded-md py-1 px-3 text-black hover:bg-purple-100"
                              onClick={() => handleQuantityChange(index, -1)}
                            >
                              -
                            </button>
                            <span className="text-center w-8 text-black font-montserrat font-semibold text-sm">{item.quantity || 1}</span>
                            <button
                              className="border border-main rounded-md py-1 px-3 text-black hover:text-main"
                              onClick={() => handleQuantityChange(index, 1)}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="py-4 text-black">{(parseFloat(item.price.replace(/\D/g, '')) * (item.quantity || 1)).toFixed(2)} р</td>
                        <td className="py-4 text-black">
                          <button
                            className="text-red-600 hover:underline"
                            onClick={() => handleRemoveItem(index)}
                          >
                            ✕
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="md:w-1/4">
              <div className="bg-white border rounded-lg shadow-md p-6 mb-4">
                <h2 className="text-black font-montserrat font-semibold text-sm mb-4">Информация о покупателе</h2>
                <form className="grid grid-cols-1 gap-4 mb-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Имя"
                    value={customerInfo.firstName}
                    onChange={handleInputChange}
                    className="border border-main rounded p-2 focus:outline-none focus:border-purple-text"
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Фамилия"
                    value={customerInfo.lastName}
                    onChange={handleInputChange}
                    className="border border-main rounded p-2 focus:outline-none focus:border-purple-text"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Телефон"
                    value={customerInfo.phone}
                    onChange={handleInputChange}
                    className="border border-main rounded p-2 focus:outline-none focus:border-purple-text"
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Адрес"
                    value={customerInfo.address}
                    onChange={handleInputChange}
                    className="border border-main rounded p-2 focus:outline-none focus:border-purple-text"
                  />
                </form>
                <h2 className="text-black font-montserrat font-semibold text-sm mb-4">Итоги</h2>
                <div className="flex justify-between mb-2 text-black font-montserrat font-semibold text-sm">
                  <span>Промежуточный итог</span>
                  <span>{subtotal.toFixed(2)} р</span>
                </div>
                <div className="flex justify-between mb-2 text-black font-montserrat font-semibold text-sm">
                  <span>Доставка</span>
                  <span>{shippingCost === 0 ? 'Бесплатно' : `${shippingCost} р`}</span>
                </div>
                <hr className="my-2 border-main" />
                <div className="flex justify-between mb-2 text-black font-montserrat font-semibold text-sm">
                  <span className="font-semibold">Итого</span>
                  <span className="font-semibold">{total.toFixed(2)} р</span>
                </div>
                <button className="bg-main text-white py-2 px-4 rounded-lg mt-4 w-full hover:bg-purple-text transition duration-300">Оформить заказ</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
