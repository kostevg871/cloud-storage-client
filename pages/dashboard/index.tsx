import { Layout } from "@/layouts/Layout";
import { checkAuth } from "@/utils/checkAuth";
import { GetServerSidePropsContext, NextPage } from "next/types";

import React, { ReactElement, ReactNode } from "react";

type NextPageWithLayout = NextPage & {
  getLayout: (page: ReactElement) => ReactNode;
};

const DashboardPage: NextPageWithLayout = () => {
  return (
    <main>
      <h1>Dashboard private</h1>
    </main>
  );
};

DashboardPage.getLayout = (page: React.ReactNode) => {
  return <Layout title="Dashboard / Главная">{page}</Layout>;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const authProps = await checkAuth(ctx);

  if ("redirect" in authProps) {
    return authProps;
  }

  return {
    props: {},
  };
};

export default DashboardPage;
