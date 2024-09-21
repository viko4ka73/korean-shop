import { News } from "../assets";

// Define the base interface with common fields
export interface BaseProduct {
  imgSrc: string;
  imgSrcList: string[];
  description: string;
  name: string;
  category: string;
  fullDescription: string;
  composition: string;
  application: string;
  isNew: boolean;
}

// RegularProduct extends BaseProduct and has a price
export interface RegularProduct extends BaseProduct {
  price: string;
}

// PromotionalProduct extends BaseProduct and has oldPrice and newPrice
export interface PromotionalProduct extends BaseProduct {
  oldPrice: string;
  newPrice: string;
}

// Union type for both products
export type Product = RegularProduct | PromotionalProduct;

// Define the navigation links
export const navLinks = [
  { href: "/product", label: "Товары" },
  { href: "/delivery-payment", label: "Доставка и оплата" },
  { href: "/contact", label: "Контакты" },
];


export const goods: RegularProduct[] = [
  {
    imgSrc: News,
    imgSrcList: [News, News, News],
    description: "Тающий оттеночный бальзам с питательными маслами и фруктовыми экстрактами в оттенке мякоти помелло",
    name: "Dasique Melting Candy Balm #08 Sweet Pomelo",
    price: "1090 р",
    category: 'Косметика',
    fullDescription: 'Полное описание бальзама с детальным обзором всех характеристик и особенностей использования.',
    composition: 'Масло ши, масло жожоба, экстракт помелло и другие натуральные компоненты.',
    application: 'Наносить на чистые губы или поверх помады для увлажнения и добавления оттенка.',
    isNew: true,
  },
  {
    imgSrc: News,
    imgSrcList: [News, News, News],
    description: "Тающий оттеночный бальзам с питательными маслами и фруктовыми экстрактами в оттенке мякоти помелло",
    name: "Dasique Melting Candy Balm #08 Sweet Pomelo",
    price: "1090 р",
    category: "Уход за лицом",
    fullDescription: '', // Add missing fields to match interface
    composition: '',
    application: '',
    isNew: false,
  },
  {
    imgSrc: News,
    imgSrcList: [News, News, News],
    description: "Тающий оттеночный бальзам с питательными маслами и фруктовыми экстрактами в оттенке мякоти помелло",
    name: "Dasique Melting Candy Balm #08 Sweet Pomelo",
    price: "1090 р",
    category: "Уход за телом",
    fullDescription: '', // Add missing fields to match interface
    composition: '',
    application: '',
    isNew: false,
  },
  {
    imgSrc: News,
    imgSrcList: [News, News, News],
    description: "Тающий оттеночный бальзам с питательными маслами и фруктовыми экстрактами в оттенке мякоти помелло",
    name: "Dasique Melting Candy Balm #08 Sweet Pomelo",
    price: "1090 р",
    category: "Уход за телом",
    fullDescription: '', // Add missing fields to match interface
    composition: '',
    application: '',
    isNew: true,
  },
  {
    imgSrc: News,
    imgSrcList: [News, News, News],
    description: "Тающий оттеночный бальзам с питательными маслами и фруктовыми экстрактами в оттенке мякоти помелло",
    name: "Dasique Melting Candy Balm #08 Sweet Pomelo",
    price: "1090 р",
    category: "Косметика",
    fullDescription: '', // Add missing fields to match interface
    composition: '',
    application: '',
    isNew: true,
  },
];

// Define the promotions array of type PromotionalProduct
export const promotions: PromotionalProduct[] = [
  {
    imgSrc: News,
    imgSrcList: [News, News, News],
    description: "Промо товар 1 с описанием и характеристиками.",
    name: "Промо Товар 1",
    oldPrice: "1000 р",
    newPrice: "790 р",
    category: 'Акции',
    fullDescription: 'Полное описание промо товара 1.',
    composition: 'Состав промо товара 1.',
    application: 'Применение промо товара 1.',
    isNew: false,
  },
  {
    imgSrc: News,
    imgSrcList: [News, News, News],
    description: "Промо товар 2 с описанием и характеристиками.",
    name: "Промо Товар 2",
    oldPrice: "1200 р",
    newPrice: "890 р",
    category: 'Акции',
    fullDescription: 'Полное описание промо товара 2.',
    composition: 'Состав промо товара 2.',
    application: 'Применение промо товара 2.',
    isNew: false,
  },
];
