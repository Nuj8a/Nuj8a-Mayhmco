"use client"

import React from "react"
import Image from "next/image";
import img from "@/assets/logo.png"
import { Swiper, SwiperSlide } from "swiper/react"
import 'swiper/css';
import { Navigation, Pagination } from "swiper/modules";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

interface Data {
    product_name: string,
    price: number,
    discount_percent: number
}
interface Props {
    title: string;
    data: Data[]
}

const Carousel: React.FC<Props> = ({ title, data }) => {
    return (
        <section className="flex flex-col px-4 lg:px-10  w-full gap-2 py-3 ">
            {/* title for Carousel Category */}
            <div className="flex flex-row h-fit w-fit  mt-2 ml-2 items-center border-b-2  border-red-600 ">
                {/* Square list for Carousel title */}
                {/* <div className="w-[25px] h-[25px] rounded bg-red-600"></div> */}
                <h1 className="text-lg lg:text-2xl font-semibold tracking-wide text-[#333333]  ">{title}</h1>
            </div>

            {/* Carousel */}
            <div className="w-full h-fit relative py-3  ">
                <Swiper
                    modules={[Navigation, Pagination]}
                    navigation={{
                        nextEl: ".custom-next",
                        prevEl: ".custom-prev"
                    }}
                    pagination={{ clickable: true }}
                    spaceBetween={20}
                    slidesPerView="auto"
                    loop={true}
                    breakpoints={{
                        360:{slidesPerView:2.5},
                        640: { slidesPerView: 3.5 },
                        768: { slidesPerView: 4.5 },
                        1024: { slidesPerView: 5.5 }
                    }}

                >
                    <IoChevronBackOutline
                        size={20}
                        className="custom-prev absolute top-1/2 left-2 transform -translate-y-1/2 z-10 cursor-pointer"
                    />
                    {
                        data.map((d, index) => (
                            <SwiperSlide key={index} className="text-black">
                                <div className="px-2">
                                    <div className="max-w-[280px]">
                                        <Image
                                            src={img.src}
                                            alt="image"
                                            width={200}
                                            height={200}
                                            layout="responsive"
                                            className="rounded-sm"
                                        />
                                    </div>
                                    <div className=" flex flex-col gap-1 w-full py-2">
                                        <div>
                                            {d.discount_percent != 0 ?
                                                <div className="font-medium flex flex-col gap-1">
                                                    <p className="flex gap-1 text-sm lg:text-base">
                                                        Rs <span className="line-through text-red-500">{d.price}</span>
                                                        <span>{d.price - ((d.discount_percent * d.price) / 100)}</span>
                                                    </p>
                                                    <p className="text-[10px] lg:text-[12px] font-medium text-white bg-red-500 w-fit px-2 rounded-lg">{d.discount_percent}% SALE</p>
                                                </div> :
                                                <p className="text-sm lg:text-base font-medium ">Rs {d.price}</p>}
                                        </div>
                                        <h3 className="text-xs lg:text-sm font-[#333333]">{d.product_name}</h3>
                                    </div>
                                </div>
                            </SwiperSlide>))
                    }
                    <IoChevronForwardOutline
                        size={20}
                        className="custom-next absolute top-1/2 right-2 transform -translate-y-1/2 z-10 cursor-pointer"
                    />
                </Swiper>
            </div>
        </section >)
}

export default Carousel