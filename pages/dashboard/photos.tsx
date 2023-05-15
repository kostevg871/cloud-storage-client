import { Layout } from "@/layouts/Layout";
import { checkAuth } from "@/utils/checkAuth";
import { GetServerSidePropsContext, NextPage } from "next/types";
import styles from "@/styles/Home.module.scss";

import React, { ReactElement, ReactNode } from "react";
import { Menu } from "antd";
import { useRouter } from "next/router";
import {
  DeleteOutlined,
  FileImageOutlined,
  FileOutlined,
} from "@ant-design/icons";
import { UploadButton } from "@/components/UploadButton";

import * as Api from "@/api";
import { FileItem } from "@/api/dto/files.dto";
import { FileList } from "@/components/FileList";
import { DashboardLayout } from "@/layouts/DashboardLayout";

interface Props {
  items: FileItem[];
}

type NextPageWithLayout = NextPage<Props> & {
  getLayout: (page: ReactElement) => ReactNode;
};

const DashboardPhotoPage: NextPageWithLayout = ({ items }) => {
  return (
    <DashboardLayout>
      <FileList items={items} />
    </DashboardLayout>
  );
};

DashboardPhotoPage.getLayout = (page: React.ReactNode) => {
  return <Layout title="Dashboard / Фотографии">{page}</Layout>;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const authProps = await checkAuth(ctx);

  if ("redirect" in authProps) {
    return authProps;
  }

  try {
    const items = await Api.files.getAll("photos");
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

export default DashboardPhotoPage;
