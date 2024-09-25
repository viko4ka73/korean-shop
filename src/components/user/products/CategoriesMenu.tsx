import React from "react";
import { ShapeBottom, ShapeTop } from "../../../assets";

interface CategoriesMenuProps {
  categories: string[]; // Ensure categories are always a string array
  selectedCategory: string | null;
  onSelectCategory: (category: string) => void;
}

const CategoriesMenu: React.FC<CategoriesMenuProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="w-1/4 pt-10 bg-[#EAEAEA] mt-8 rounded-r-3xl relative flex flex-col h-full pb-[500px]">
      <h2 className="text-main pl-20 font-semibold text-3xl font-montserrat mb-10">
        Категории
      </h2>
      <img
        src={ShapeTop}
        alt="Top Shape"
        className="absolute top-[20px] left-[80%] transform -translate-x-1/2"
      />
      <ul className="flex flex-col">
        {/* Ensure categories is not empty or undefined */}
        {categories?.length > 0 ? (
          categories.map((category, index) => (
            <li
              key={index}
              className={`cursor-pointer py-4 border-b-2 border-white ${
                selectedCategory === category
                  ? "text-main font-semibold text-2xl pl-20 font-montserrat"
                  : "text-main-text font-normal text-2xl pl-20 font-montserrat"
              }`}
              onClick={() => onSelectCategory(category)}
            >
              {category}
            </li>
          ))
        ) : (
          <li className="text-main-text pl-20 text-2xl font-montserrat">
            No categories available
          </li> // Display message if no categories are provided
        )}
      </ul>
      <img
        src={ShapeBottom}
        alt="Bottom Shape"
        className="absolute bottom-[10px] left-32 transform -translate-x-1/2"
      />
    </div>
  );
};

export default CategoriesMenu;
