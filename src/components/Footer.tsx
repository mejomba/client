
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 p-8">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h4 className="font-semibold text-white mb-2">Column 1</h4>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">Link 1</a></li>
            <li><a href="#" className="hover:underline">Link 2</a></li>
            <li><a href="#" className="hover:underline">Link 3</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-2">Column 2</h4>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">Link 1</a></li>
            <li><a href="#" className="hover:underline">Link 2</a></li>
            <li><a href="#" className="hover:underline">Link 3</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-2">Column 3</h4>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">Link 1</a></li>
            <li><a href="#" className="hover:underline">Link 2</a></li>
            <li><a href="#" className="hover:underline">Link 3</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-white mb-2">Column 4</h4>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">Link 1</a></li>
            <li><a href="#" className="hover:underline">Link 2</a></li>
            <li><a href="#" className="hover:underline">Link 3</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-8 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} My Website. All rights reserved.
      </div>
    </footer>
  );
}