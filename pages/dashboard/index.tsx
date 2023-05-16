import { Layout } from "@/layouts/Layout";
import { checkAuth } from "@/utils/checkAuth";
import { GetServerSidePropsContext, NextPage } from "next/types";

import React, { ReactElement, ReactNode } from "react";
import * as Api from "@/api";
import { FileItem } from "@/api/dto/files.dto";
import { DashboardLayout } from "@/layouts/DashboardLayout";

import { Files } from "@/modules/Files";

interface Props {
  items: FileItem[];
}

type NextPageWithLayout = NextPage<Props> & {
  getLayout: (page: ReactElement) => ReactNode;
};

const DashboardPage: NextPageWithLayout = ({ items }) => {
  return (
    <DashboardLayout>
      <Files items={items} withAction />
    </DashboardLayout>
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

  try {
    const items = await Api.files.getAll();
    return {
      props: {
        items,
      },
    };
  } catch (err) {}
  return {
    props: { items: [] },
  };
};

export default DashboardPage;
