import Head from "next/head";
import Slider from "react-slick";
import API from "../services/api";
import MasterBanner from "../components/MasterBanner";
import MainServiceCollections from "../components/MainServiceCollections";
import ProductCollection1 from "../components/ProductCollection1";
import Layout from "../components/Layout";

import { useSession } from "next-auth/react";

import MainMultipleSlider from "../components/MainMultipleSlider";
import PartitionSlider from "../components/PartitionSlider";
import MasterParallaxBanner from "../components/MasterParallaxBanner";

const Data = [
  {
    img: "home39",
    title: "save 10%",
    desc: "fresh vegetables",
    link: "#",
  },
  {
    img: "home38",
    title: "save upto 10%",
    desc: "fresh vegetables",
    link: "#",
  },
];

export default function Home({
  dealsOfTheDay,
  dontMissTheseProducts,
  firstNewProducts,
  leftNewProducts,
  rightFeatureProducts,
  top5Products,
}) {
  // if(localStorage !=null){
  //   console.log("localStorage",localStorage);
  // }
  const { data: session, status } = useSession();

  // console.log(session);
  return (
    <>
      <Head>
        <title>Trang chủ | Mubaha</title>
      </Head>
      <section>
        <MainMultipleSlider dontMissTheseProducts={dontMissTheseProducts} />
      </section>
      <MainServiceCollections />
      <ProductCollection1 title="gợi ý hôm nay" data={dealsOfTheDay} />
      <div className="section-b-space">
        <PartitionSlider
          dealsOfTheDay={dealsOfTheDay}
          leftNewProducts={leftNewProducts}
          rightFeatureProducts={rightFeatureProducts}
        />
      </div>
      <MasterParallaxBanner
        bg="parallax-mubaha"
        parallaxClass="text-center p-left"
        title="2022"
        subTitle1="xu hướng mới"
        subTitle2="rất nhiều ưu đãi"
      />

      <ProductCollection1 title="đừng bỏ lỡ" data={dontMissTheseProducts} />
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export async function getServerSideProps() {
  const response = await fetch(`${process.env.API_URL}`);
  const { data } = await response.json();

  return {
    props: {
      dealsOfTheDay: data.dealsOfTheDay,
      dontMissTheseProducts: data.dontMissTheseProducts,
      firstNewProducts: data.firstNewProducts,
      leftNewProducts: data.leftNewProducts,
      rightFeatureProducts: data.rightFeatureProducts,
      top5Products: data.top5Products,
    },
  };
}
