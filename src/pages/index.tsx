import { type NextPage } from "next";
import Head from "next/head";
import { Logo } from "../ui-kit/logo";
import { UserWidget } from "@/src/features/user/user-widget";
import { SelectCategory } from "@/src/features/category/select-category/select-category";
import { CreateCategory } from "@/src/features/category/create-category/create-category";
const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Solartype</title>
      </Head>
      <main className={"min-h-screen"}>
        <div className="container mx-auto flex items-center justify-between p-6">
          <Logo />
          <div className={"flex items-center"}>
            <SelectCategory />
            <CreateCategory />
          </div>

          <UserWidget />
        </div>
      </main>
    </>
  );
};

export default Home;
