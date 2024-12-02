import React from 'react';
import data from "../../data"
import Main from "../../components/banner/Main"
import Carousel from "../../components/banner/Carousel"
import AdBanner from "../../components/banner/AdBanner"

const Home = () => {
  return (
    <div className="h-fit w-full items-center flex flex-col ">
      {/* <Main /> */}
      <Carousel title="Best Selling" data={data} />
      {/* <AdBanner/> */}
      <Carousel title="New Arrivals" data={data}/>
    </div>
  );
};

export default Home;
