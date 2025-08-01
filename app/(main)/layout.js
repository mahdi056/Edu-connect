



import Footer from "./Components/footer/page";
import Header from "./Components/Header/page";
import "../globals.css";
import AuthProvider from "../provider/authprovider";







export const metadata = {
  title: "Edu Connect",
  description: "Online College Booking System",
  icons: {
    icon: '/images/logo.png'
  }
};

export default function RootLayout({ children }) {

  


  return (
    <html lang="en" data-theme='light'>
     
      <body

      >
        <AuthProvider>
         <Header></Header>

          {children}
          <Footer></Footer>
        </AuthProvider>
      </body>
    </html>
  );
}
