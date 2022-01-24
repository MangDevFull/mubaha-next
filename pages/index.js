import Image from "next/image";
import Head from "next/head";
import Slider from "react-slick";
import ProductCard from "../components/ProductCard";
import SideProductCart from "../components/SideProductCart";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import API from "../services/api";
import axios from "axios";
import { Col, Container, Row } from "reactstrap";

export default function Home({
  dealsOfTheDay,
  dontMissTheseProducts,
  firstNewProducts,
  leftNewProducts,
  rightFeatureProducts,
  top5Products,
}) {
  return (
    <>
      <Head>
        <title>Trang chủ</title>
      </Head>
    </>
  );
}

export async function getServerSideProps() {
  const response = await API.instance.get("/");
  const data = response.data.data;

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
