import { Star } from "lucide-react";

export const Rating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.25 && rating - fullStars <= 0.75;

  return (
    <div className="flex mt-2">
      {Array.from({ length: 5 }).map((_, i) => {
        if (i < fullStars) {
          return <Star key={i} size={16} className="text-yellow-500" fill="currentColor" />;
        } else if (hasHalfStar && i === fullStars) {
          return (
            <Star              key={i}
              size={16}
              className="text-yellow-500"
              fill="currentColor"
              style={{ clipPath: 'inset(0 50% 0 0)' }} // moitié gauche remplie
            />
          );
        } else {
          return <Star key={i} size={16} className="text-gray-300" fill="none" />;
        }
      })}
    </div>
  );
};