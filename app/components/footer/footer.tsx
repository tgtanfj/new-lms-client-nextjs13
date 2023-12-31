import Link from "next/link";

const Footer = () => {
  return (
    <footer className="pb-[10px] mt-[100px]">
      <div className="border border-[#0000000e] dark:border-[#ffffff1e]" />
      <br />
      <div className="w-[95%] 800px:max-w-[85%] mx-auto px-2 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-3">
            <h3 className="text-[20px] font-[600] text-black dark:text-white">
              About
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/about"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-[20px] font-[600] text-black dark:text-white">
              Quick Links
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/courses"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  My Account
                </Link>
              </li>
              <li>
                <Link
                  href="/course-dashboard"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  Course Dashboard
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h3 className="text-[20px] font-[600] text-black dark:text-gray-300 dark:hover:text-white">
              Social Links
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  target="_blank"
                  href="https://github.com/tgtanfj"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  Github
                </Link>
              </li>
              <li>
                <Link
                  target="_blank"
                  href="https://www.facebook.com/letrungtan10/"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  Facebook
                </Link>
              </li>
              <li>
                <Link
                  target="_blank"
                  href="https://www.linkedin.com/in/tan-le-trung-134b05282/"
                  className="text-base text-black dark:text-gray-300 dark:hover:text-white"
                >
                  Linkedin
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-[20px] font-[600] text-black dark:text-white pb-3">
              Contact Info
            </h3>
            <ul className="space-y-2">
              <li>
                <p className="text-base text-black dark:text-gray-300 dark:hover:text-white pb-2">
                  Call Us: 0123456789
                </p>
              </li>
              <li>
                <p className="text-base text-black dark:text-gray-300 dark:hover:text-white pb-2">
                  Mail us: trungtan14@gmail.com
                </p>
              </li>
              <li>
                <p className="text-base text-black dark:text-gray-300 dark:hover:text-white pb-2">
                  Address: Tran Cao Van, Da Nang
                </p>
              </li>
            </ul>
          </div>
        </div>
        <br />
        <p className=" text-black dark:text-gray-300 w-full text-center mt-[20px]">
          Copyright © 2023 ELearning | All Rights Reserved
        </p>
      </div>
      <br />
    </footer>
  );
};

export default Footer;
