
import Link from "next/link";
import "../globals.css";
import AuthProvider from "../provider/authprovider";

export const metadata = {
  title: "Edu Connect",
  description: "Online College Booking System",
  icons: {
    icon: '/images/logo.png'
  }
};

export default function DashboardLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <body>
        <AuthProvider>
          <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md p-6 hidden md:block">
              <h2 className="text-2xl font-bold mb-6 text-blue-600">Edu Connect</h2>
              <nav className="space-y-4">
                
                <Link href="/profile" className="block px-4 py-2 rounded hover:bg-blue-100 text-gray-700 font-medium">
                  Profile
                </Link>
                <Link href="/mycollege" className="block px-4 py-2 rounded hover:bg-blue-100 text-gray-700 font-medium">
                  My College
                </Link>

                <Link href="/" className="block px-4 py-2 rounded hover:bg-blue-100 text-gray-700 font-medium">
                  Home
                </Link>
              </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6">
            
             
              <div className="bg-white rounded-xl shadow p-6">
                
                {children}
                
                </div>
            </main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
