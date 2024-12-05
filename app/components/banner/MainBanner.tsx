'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

interface BannerInfo {
  title: string;
  description: string;
  cta: string;
}

const bannersInfo: BannerInfo[] = [
  {
    title: 'Upgrade Your Style',
    description: 'Explore our latest eyewear.',
    cta: 'Shop Now'
  },
  {
    title: 'Exclusive Holiday Deals',
    description: 'Save up to 50% on frames!',
    cta: 'Explore Offers'
  },
  {
    title: 'Blue Light Protection',
    description: 'Stylish glasses for screen time.',
    cta: 'Learn More'
  }
];

const type_1 = (bannerInfo: BannerInfo[]) => {
  return (
    <div className="h-fit p-5 lg:p-10">
      <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView={1.4}
        pagination={{ clickable: true }}
        spaceBetween={20}
        className="h-[350px] rounded-2xl"
      >
        {bannerInfo.map((b, index) => (
          <SwiperSlide key={index} className="rounded-2xl bg-black p-5 lg:p-10">
            <div className="h-full lg:w-fit flex flex-col gap-4 lg:px-10 lg:py-4 items-center justify-end lg:items-start">
              <h1 className='text-2xl font-bold'>{b.title}</h1>
              <p>{b.description}</p>
              <p className="w-[80%] lg:w-fit p-2 lg:px-4 text-center rounded-lg bg-slate-400">{b.cta}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

const MainBanner: React.FC<{ type: number }> = ({ type }) => {
  return <div className="w-full">{type_1(bannersInfo)}</div>;
};

export default MainBanner;
