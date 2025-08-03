

import "../globals.css";
import AuthProvider from "../provider/authprovider";
import Sidebar from "./components/sidebar";


export const metadata = {
  title: "Edu Connect",
  description: "Online College Booking System",
  
};

export default function DashboardLayout({ children }) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <link rel="icon" href="/images/logo.png" />
      </head>
      <body>
        <AuthProvider>
          <div className="flex min-h-screen bg-gray-100">

            {/* Sidebar */}

           <Sidebar></Sidebar>

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
