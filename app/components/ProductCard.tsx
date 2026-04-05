'use client';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  color: string;
  image: string;
  onAddToCart: (product: any) => void;
  onCustomize: (id: string) => void;
}

export default function ProductCard({
  id,
  name,
  price,
  color,
  image,
  onAddToCart,
  onCustomize,
}: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition transform hover:scale-105">
      <div className="aspect-square bg-gray-200 flex items-center justify-center relative">
        <div
          className="w-32 h-40 rounded-lg shadow-lg"
          style={{ backgroundColor: color }}
        >
          <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-white opacity-50">
            T
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{name}</h3>
        <p className="text-sm text-gray-600 mb-2 flex items-center space-x-2">
          <span>Color:</span>
          <span
            className="w-4 h-4 rounded-full border border-gray-300"
            style={{ backgroundColor: color }}
          />
        </p>
        <p className="text-2xl font-bold text-blue-600 mb-4">${price.toFixed(2)}</p>
        <div className="flex gap-2">
          <button
            onClick={() => onCustomize(id)}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Customize
          </button>
          <button
            onClick={() =>
              onAddToCart({
                id,
                name,
                price,
                color,
              })
            }
            className="flex-1 px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition font-medium"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
