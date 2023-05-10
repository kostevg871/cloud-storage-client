import { checkAuth } from "@/utils/checkAuth";
import { GetServerSidePropsContext, NextPage } from "next/types";
import React from "react";

const DashboardPage: NextPage = () => {
  return (
    <main>
      <h1>Dashboard private</h1>
    </main>
  );
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
