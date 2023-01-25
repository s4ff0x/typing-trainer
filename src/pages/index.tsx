import { type NextPage } from "next";
import Head from "next/head";
import { Logo } from "../ui-kit/logo";
import { UserWidget } from "../features/user/user-widget";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Solartype</title>
      </Head>
      <main className={"min-h-screen"}>
        <div className="container mx-auto flex items-center justify-between p-6">
          <Logo />
          <UserWidget />
        </div>
      </main>
    </>
  );
};

export default Home;
