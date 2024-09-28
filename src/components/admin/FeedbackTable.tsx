import React, { useEffect, useState } from "react";
import { FeedbackData, getFeedbacks } from "../../api";

const FeedbackTable: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<FeedbackData[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Для отображения индикатора загрузки
  const [error, setError] = useState<string | null>(null); // Для хранения ошибки

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const data = await getFeedbacks();
        setFeedbacks(data);
      } catch (error) {
        console.error("Failed to fetch feedbacks", error);
        setError("Не удалось загрузить отзывы. Пожалуйста, попробуйте позже.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  if (loading) {
    return <div>Загрузка...</div>; // Индикатор загрузки
  }

  if (error) {
    return <div>{error}</div>; // Отображение ошибки
  }

  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="py-2">Имя клиента</th>
          <th className="py-2">Email</th>
          <th className="py-2">Телефон</th>
          <th className="py-2">Отзыв</th>
        </tr>
      </thead>
      <tbody>
        {feedbacks.map((feedback) => (
          <tr key={feedback.fullname}>
            <td className="border px-4 py-2">{feedback.fullname}</td>
            <td className="border px-4 py-2">{feedback.email}</td>
            <td className="border px-4 py-2">{feedback.phone}</td>
            <td className="border px-4 py-2">{feedback.description}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FeedbackTable;
