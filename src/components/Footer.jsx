const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6">
      <div className="max-w-7xl ml-24 mt-2 pb-3 px-4 max-h-full flex flex-col md:flex-row justify-between items-center">
        <div className="text-xl font-bold mb-4 md:mb-0">
          <span className="text-pink-600">list</span><span className="text-gray-400">bnb</span>
        </div>

        <div className="text-sm text-gray-400 mb-4 md:mb-0">
          © Copyright 2024
        </div>

        <div className="flex space-x-4 text-gray-400">
          <a href="#" className="hover:text-white"><i className="fab fa-facebook-f"></i></a>
          <a href="#" className="hover:text-white"><i className="fab fa-twitter"></i></a>
          <a href="#" className="hover:text-white"><i className="fab fa-youtube"></i></a>
          <a href="#" className="hover:text-white"><i className="fab fa-instagram"></i></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
