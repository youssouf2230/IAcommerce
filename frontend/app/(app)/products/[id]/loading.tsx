
const Loading = () => {
  return (
    <div className="mx-auto my-20 animate-pulse">
      <div className="flex flex-wrap gap-10 px-19">
        {/* Product Image Placeholder */}
        <div className="w-full sm:w-[600px] h-[600px] bg-gray-200 rounded-xl" />

        {/* Product Info Placeholder */}
        <div className="flex-1 min-w-sm space-y-4">
          {/* Title */}
          <div className="h-14 w-3/4 bg-gray-200 rounded" />
          {/* Category & SKU */}
          <div className="h-4 w-1/2 bg-gray-200 rounded" />

          {/* Rating */}
          <div className="h-6 w-32 bg-gray-200 rounded" />

          {/* Price */}
          <div className="flex items-center gap-6">
            <div className="h-6 w-20 bg-gray-200 rounded" />
            <div className="h-4 w-16 bg-gray-200 rounded" />
            <div className="h-4 w-24 bg-gray-200 rounded" />
          </div>

          {/* Description */}
          <div className="h-6 w-5/6 bg-gray-200 rounded" />

          {/* Features */}
          <ul className="space-y-2 mt-4">
            {[...Array(4)].map((_, i) => (
              <li key={i} className="h-4 w-2/3 bg-gray-200 rounded" />
            ))}
          </ul>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mt-4">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="h-4 bg-gray-200 rounded w-4/5" />
            ))}
          </div>

          {/* Add to Cart Button */}
          <div className="h-10 w-40 bg-gray-300 rounded mt-6" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
