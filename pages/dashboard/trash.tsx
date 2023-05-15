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

interface Props {
  items: FileItem[];
}

type NextPageWithLayout = NextPage<Props> & {
  getLayout: (page: ReactElement) => ReactNode;
};

const DashboardTrash: NextPageWithLayout = ({ items }) => {
  const router = useRouter();
  const selectedMenu = router.pathname;

  return (
    <main className={styles.dashboardContainer}>
      <div className={styles.sidebar}>
        <UploadButton />
        <Menu
          className={styles.menu}
          mode="inline"
          selectedKeys={[selectedMenu]}
          items={[
            {
              key: "/dashboard",
              icon: <FileOutlined />,
              label: "Файлы",
              onClick: () => router.push("/dashboard"),
            },
            {
              key: "/dashboard/photos",
              icon: <FileImageOutlined />,
              label: "Фото",
              onClick: () => router.push("/dashboard/photos"),
            },
            {
              key: "/dashboard/trash",
              icon: <DeleteOutlined />,
              label: "Корзина",
              onClick: () => router.push("/dashboard/trash"),
            },
          ]}
        />
      </div>
      <div className="container">
        <FileList items={items} />
      </div>
    </main>
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
