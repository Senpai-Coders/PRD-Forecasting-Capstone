import Head from "next/head";
import HomeLayout from "../../layouts/HomeLayout";

const orders = () => {
  return (
    <div>
      <Head>
        <title>Orders</title>
        <meta
          name="description"
          content="A admin web app for Philip Rice Dealer that focuses on Sales Forecasting."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main></main>
    </div>
  );
};

orders.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};

export default orders;