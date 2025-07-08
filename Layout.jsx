import { Outlet, useNavigation, useLocation } from "react-router-dom";
import Navbar from './src/components/nav/Navbar';
import Footer from "./src/components/Footer";
import { Toaster } from "@/components/ui/sonner"
import ScrollToTop from "@/components/ScrollToTop";


const Layout = () => {

  const navigation = useNavigation();
  const location = useLocation();
  const isLoading = navigation.state === "loading";

  //hiden nav footer
  const hideNavFooter = ['/login'];
  const shouldShowNavFooter = !hideNavFooter.includes(location.pathname);

  return (
    <>
      <ScrollToTop />
      {shouldShowNavFooter && <Navbar />}
      {isLoading && <div className="flex items-center justify-center min-h-screen"><p className="loader"></p></div>}
      <div className="content arapey ">
        <Outlet />
      </div>
      <Toaster />
      {shouldShowNavFooter && <Footer />}
    </>
  );
};

export default Layout;
