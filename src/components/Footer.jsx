import googlePlay from "/googlePlay.svg"
import appStore from "/appStore.svg"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react";


const Footer = () => {

  const [showButton, setShowButton] = useState(false);

  // Gérer l'affichage du bouton en fonction du défilement
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 2000) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fonction pour faire défiler vers le haut
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer dir='rtl' className="relative w-full text-[#183153] px-3 md:px-8 lg:px-32 py-8">
      <section>
        <div className="text-sm mb-6">
          <p>مرحبا بيكم على دايتي ! </p>
          <p>تحبوا تتمتعوا بأكلات بنينة وتعرفوا في نفس الوقت على السعرات الحرارية وكل المكونات الغذائية لكل وصفة. </p>
          <p>تلقاوا عندنا أحسن الوصفات الصحية مع كل المعلومات الغذائية إلي تحتاجوها. معانا، كل شيء متوازن وبنين !</p>
        </div>

        <div className="flex flex-col mb-6 lg:mt-0">
          <p>إحصل الآن على تطبيق دايتي !</p>
          <div className="flex items-center mt-4">
            <Link to="" className="hover:scale-[1.03] duration-300">
              <img
                src={appStore}
                alt="icon"
                className="ml-4"
              />
            </Link>

            <Link to="" className="hover:scale-[1.03] duration-300">
              <img
                src={googlePlay}
                alt="icon"
              />
            </Link>
          </div>
        </div>
      </section>

      <section className="flex mt-6">
        <a href="mailto:hello@yummysanafa.com" className="border-l border-[#183153] pl-2 md:pl-4 hover:text-orange duration-300">إتصل بنا</a>
        <Link to="/about_us" className="border-l border-[#183153] px-2 md:px-4 hover:text-orange duration-300">معلومات عنا</Link>
        <Link to="/terms" className="px-2 md:px-4 hover:text-orange duration-300">سياسة الخصوصية</Link>
      </section>

      <section className="text-sm mt-8 space-y-2">
        <Link to="/terms" className="hover:text-orange duration-300">الشروط العامة للبيع والإستخدام الخدمات دايتي</Link>
        <p>يمكنك إلغاء إشتراكك في خدمات 000000 بإرسال STOP إلى 00000.</p>
      </section>

      <p className="mt-6">جميع حقوق النشر محفوظة لموقع دايتي. Diety, علامة ليدر بوب  ©<span>{new Date().getFullYear()} ©</span></p>

      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-2 md:right-8 bg-black text-white size-12 flex items-center justify-center rounded-full shadow-lg hover:bg-blue transition duration-300"
          aria-label="الذهاب إلى الأعلى"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M18 11.75a.74.74 0 0 1-.53-.22L12 6.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06l6-6a.75.75 0 0 1 1.06 0l6 6a.75.75 0 0 1 0 1.06a.74.74 0 0 1-.53.22" /><path fill="currentColor" d="M12 19.75a.76.76 0 0 1-.75-.75V5a.75.75 0 0 1 1.5 0v14a.76.76 0 0 1-.75.75" /></svg>
        </button>
      )}
    </footer>
  )
}

export default Footer