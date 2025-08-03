



import Footer from "./Components/footer/page";
import Header from "./Components/Header/page";
import "../globals.css";
import AuthProvider from "../provider/authprovider";







export const metadata = {
  title: "Edu Connect",
  description: "Online College Booking System",
 
};

export default function RootLayout({ children }) {

  


  return (
    <html lang="en" data-theme='light'>
      <head>
        <link rel="icon" href="/images/logo.png" />
      </head>
     
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
