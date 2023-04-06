import { type NextPage } from "next";
import Head from "next/head";
import { Logo } from "@/src/ui-kit";
import { UserWidget } from "@/src/features/user";
import { SelectCategory, CreateCategory } from "@/src/features/category";
import { TypingWidget } from "@/src/features/typing/widget";

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

        <pre
          className={
            "container mx-auto mt-20 flex flex-1 flex-col items-center justify-center space-y-10"
          }
        >
          <TypingWidget />
        </pre>
      </main>
    </>
  );
};

export default Home;
