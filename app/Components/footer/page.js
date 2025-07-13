import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-16">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        
        
        <div>
          <h2 className="text-lg font-bold mb-2 text-info">EDU CONNECT</h2>
          <p>Connecting students with top colleges, making admissions easier and smarter.</p>
        </div>

       
        <div>
          <h3 className="text-md font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/colleges" className="hover:underline">Colleges</Link></li>
            <li><Link href="/admission" className="hover:underline">Admission</Link></li>
            <li><Link href="/mycollege" className="hover:underline">My College</Link></li>
          </ul>
        </div>

       
        <div>
          <h3 className="text-md font-semibold mb-2">Contact</h3>
          <p>Email: support@educonnect.com</p>
          <p>Phone: +880 1234-567890</p>
          <p>Address: Dhaka, Bangladesh</p>
        </div>
      </div>

      <div className="text-center mt-8 text-gray-400 text-xs">
        &copy; {new Date().getFullYear()} EduConnect. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
