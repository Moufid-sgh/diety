import googlePlay from "/googlePlay.svg"
import appStore from "/appStore.svg"
import { Link } from "react-router-dom"


const Footer = () => {
  return (
    <footer dir='rtl' className="w-full text-[#183153] px-3 md:px-8 lg:px-32 py-8">
      <section>
        <div className="text-sm mb-6">
          <p>مرحبا بيكم على منصتنا ! </p>
          <p>تحبوا تتمتعوا بأكلات بنينة وتعرفوا في نفس الوقت على السعرات الحرارية وكل المكونات الغذائية لكل وصفة. </p>
          <p>تلقاوا عندنا أحسن الوصفات الصحية مع كل المعلومات الغذائية إلي تحتاجوها. معانا، كل شيء متوازن وبنين !</p>
        </div>

        <div className="flex items-center mb-6 lg:mt-0">
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
        <p className="mt-2">إحصل الآن على تطبيق000000 !</p>
      </section>

      <section className="flex mt-6">
        <a href="mailto:hello@yummysanafa.com" className="border-l border-[#183153] pl-2 md:pl-4 hover:text-orange duration-300">إتصل بنا</a>
        <Link to="/about_us" className="border-l border-[#183153] px-2 md:px-4 hover:text-orange duration-300">معلومات عنا</Link>
        <Link to="/terms" className="px-2 md:px-4 hover:text-orange duration-300">سياسة الخصوصية</Link>
      </section>

      <section className="text-sm mt-8 space-y-2">
        <Link to="/terms" className="hover:text-orange duration-300">الشروط العامة للبيع والإستخدام الخدمات 000000</Link>
        <p>يمكنك إلغاء إشتراكك في خدمات 000000 بإرسال STOP إلى 00000.</p>
      </section>

      <p className="mt-6">جميع حقوق النشر محفوظة لموقع 00000. 00000, علامة ليدر بوب <span>{new Date().getFullYear()} ©</span></p>
    </footer>
  )
}

export default Footer