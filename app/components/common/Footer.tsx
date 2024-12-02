import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa6";
import Link from 'next/link'
const Footer = () => {
    return (<footer className=" flex flex-col w-full p-4 lg:px-10  h-56 lg:h-72 bg-[#E5E3DC] ">
        {/* Connect with us on */}
        <div className='flex flex-row flex-grow h-full '>
            <section className=" flex flex-col py-4 gap-2 ">
                <h1 className="text-[#333333] text-sm lg:text-base font-semibold">Connect with us on</h1>
                <div className="flex flex-row gap-3 ">
                    <FaFacebook color="#4267B2" className="text-xl lg:text-4xl" />
                    <FaInstagram color="#E1306C" className="text-xl lg:text-4xl" />
                    <FaWhatsapp color="#25D366" className="text-xl lg:text-4xl" />
                </div>
            </section>

            {/* Footer links */}
            <section className="flex flex-row justify-center lg:gap-[10%] flex-grow ">
                <section className="flex flex-col  gap-2 p-4">
                    <h1 className="text-[#333333] text-sm lg:text-base font-semibold">Shop by</h1>
                    <div className="flex flex-col gap-2">
                        <Link
                            href="/sunglasses"
                            className='text-[#333333] text-xs lg:text-sm font-medium'>
                            Sunglasses
                        </Link>
                        <Link
                            href="/eyeglasses"
                            className='text-[#333333] text-xs lg:text-sm font-medium'>
                            Eyeglasses
                        </Link>
                        <Link
                            href="/contact-lens"
                            className='text-[#333333] text-xs lg:text-sm font-medium'>
                            Contact Lens
                        </Link>
                    </div>
                </section>
                <section className="flex flex-col gap-2   p-4">
                    <h1 className="text-[#333333] text-sm lg:text-base font-semibold">About</h1>
                    <div className="flex flex-col gap-2">
                        <Link
                            href="/contact-us"
                            className='text-[#333333] text-xs lg:text-sm font-medium'>
                            Contact Us
                        </Link>
                        <Link
                            href="/about-us"
                            className='text-[#333333] text-xs lg:text-sm font-medium'>
                            About Us
                        </Link>
                    </div>
                </section>
            </section>
        </div>
        <div>
            <p className="text-black text-xs lg:text-sm h-fit text-center">&copy; {new Date().getFullYear()} Mayhm.co All rights reserved.</p>
        </div>
    </footer>)
}
export default Footer