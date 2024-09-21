import React from 'react';
import { Polygon } from '../../../assets';

interface BreadcrumbsProps {
  path: string[];
  onNavigateBack: () => void;
  onBreadcrumbClick?: (index: number) => void; // Add this line to define the prop
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ path, onNavigateBack, onBreadcrumbClick }) => {
  return (
    <nav className="flex items-center mt-5 mb-2 text-sm font-montserrat">
      {path.length > 0 && (
        <button
          className="group text-[#E5E4E6] flex gap-2 items-center font-semibold text-xl cursor-pointer img-hover-color"
          onClick={onNavigateBack}
        >
          <img src={Polygon} alt="polygon" className="w-3 transition-colors duration-300 img-hover-color" />
          Назад к каталогу
        </button>
      )}
      {path.map((crumb, index) => (
        <span key={index} className="mx-2 mt-1">
          {index < path.length - 1 ? (
            <>
              <span className="text-main font-semibold text-base">/ </span>
              <span
                className="text-main font-semibold text-base hover:underline cursor-pointer"
                onClick={() => onBreadcrumbClick && onBreadcrumbClick(index)}
              >
                {crumb}
              </span>
            </>
          ) : (
            <span className="text-main font-semibold text-base"> / {crumb}</span>
          )}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
