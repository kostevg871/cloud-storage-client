import { Layout } from "@/layouts/Layout";
import { checkAuth } from "@/utils/checkAuth";
import { GetServerSidePropsContext, NextPage } from "next/types";

import React, { ReactElement, ReactNode } from "react";

import * as Api from "@/api";
import { FileItem } from "@/api/dto/files.dto";
import { DashboardLayout } from "@/layouts/DashboardLayout";
import { Files } from "@/modules/Files";
import { FileAction } from "@/components/FileAction";
import { FileList } from "@/components/FileList";

interface Props {
  items: FileItem[];
}

type NextPageWithLayout = NextPage<Props> & {
  getLayout: (page: ReactElement) => ReactNode;
};

const DashboardTrash: NextPageWithLayout = ({ items }) => {
  return (
    <DashboardLayout>
      <Files items={items} />
    </DashboardLayout>
  );
};

DashboardTrash.getLayout = (page: React.ReactNode) => {
  return <Layout title="Dashboard / Корзина">{page}</Layout>;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const authProps = await checkAuth(ctx);

  if ("redirect" in authProps) {
    return authProps;
  }

  try {
    const items = await Api.files.getAll("trash");
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

export default DashboardTrash;
