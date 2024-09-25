import React, { useEffect, useState } from "react";
import { Order, getOrders } from "../../api";

const OrdersTable: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (error) {
        console.error("Не удалось получить заказы", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="py-2">ID Продукта</th>
          <th className="py-2">Цена</th>
          <th className="py-2">Количество</th>
          <th className="py-2">Общая сумма</th>
          <th className="py-2">Имя клиента</th>
          <th className="py-2">Доставка</th>
          <th className="py-2">Заметка</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.product_id}>
            <td className="border px-4 py-2">{order.product_id}</td>
            <td className="border px-4 py-2">{order.price}</td>
            <td className="border px-4 py-2">{order.quantity}</td>
            <td className="border px-4 py-2">{order.total_price}</td>
            <td className="border px-4 py-2">{order.customer_name}</td>
            <td className="border px-4 py-2">
              {order.delivery ? "Да" : "Нет"}
            </td>
            <td className="border px-4 py-2">
              {order.note
                ? order.note.split("\n").map((line, index) => (
                    <span key={index}>
                      {line}
                      <br />
                    </span>
                  ))
                : "Заметка отсутствует"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrdersTable;
