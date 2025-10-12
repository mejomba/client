import Image from "next/image";

type CardProps = {
  title: string;
  price: string;
  buildTime: string;
  items: string[];
  image: string;
  isFeatured?: boolean; // flag برای تغییر رنگ
};

export default function PcbCard({
  title,
  price,
  buildTime,
  items,
  image,
  isFeatured = false,
}: CardProps) {
  return (
    <div
      className={`relative rounded-xl border shadow-md transition
        ${isFeatured 
          ? "border-yellow-400 bg-yellow-50" 
          : "bg-white"
        }`}
    >
      {/* تصویر بالای کارت */}
      <div className="relative h-32 w-full overflow-hidden rounded-lg">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      {/* محتوا */}
      <div className="mt-4 p-3">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-600">
          From <span className="text-orange-500">{price}</span> /5pcs | Build Time: {buildTime}
        </p>

        <ul className="mt-2 list-disc pl-5 text-sm text-gray-700">
          {items.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      </div>

      {/* دکمه‌ها */}
      <div className="mt-4 p-3 flex items-center gap-3">
        <button
          className={`rounded-md px-4 py-2 text-sm font-medium shadow 
            ${isFeatured 
              ? "bg-yellow-500 text-white hover:bg-yellow-600" 
              : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
        >
          Quote Now
        </button>
        <button className="text-sm text-gray-500 hover:text-gray-700">
          Learn More &gt;
        </button>
      </div>

      {/* Badge برای حالت Featured */}
      {isFeatured && (
        <span className="absolute right-2 top-2 rounded bg-yellow-400 px-2 py-0.5 text-xs font-semibold text-white shadow">
          Limited Time Offer
        </span>
      )}
    </div>
  );
}
