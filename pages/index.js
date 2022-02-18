import Head from "next/head"
import Slider from "react-slick"
import API from "../services/api"
import MasterBanner from "../components/MasterBanner"
import MainServiceCollections from "../components/MainServiceCollections"
import DealsOfTheDay from "../components/deals-of-the-day"

import {useSession} from "next-auth/react"

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
]

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
  const { data: session, status } = useSession()

  console.log(session)
  return (
    <>
      <Head>
        <title>Trang chủ | Mubaha</title>
      </Head>
      <section className="p-0">
        <Slider className="slide-1 home-slider">
          {Data.map((data, i) => {
            return (
              <MasterBanner
                key={i}
                img={data.img}
                link={data.link}
                title={data.title}
                desc={data.desc}
                classes={data.classes}
              />
            )
          })}
        </Slider>
      </section>
      <MainServiceCollections />
      <DealsOfTheDay data={dealsOfTheDay} />
    </>
  )
}

export async function getServerSideProps() {
  const response = await fetch(`${process.env.API_URL}`)
  const {data} = await response.json();

  return {
    props: {
      dealsOfTheDay: data.dealsOfTheDay,
      dontMissTheseProducts: data.dontMissTheseProducts,
      firstNewProducts: data.firstNewProducts,
      leftNewProducts: data.leftNewProducts,
      rightFeatureProducts: data.rightFeatureProducts,
      top5Products: data.top5Products,
    },
  }
}
