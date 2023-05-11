import { User } from "@/api/dto/auth.dto";
import { Button } from "antd";
import { NextPage } from "next";

import styles from "@/styles/Profile.module.scss";

interface Props {
  userData: User;
}

const DashboardProfilePage: NextPage<Props> = ({ userData }) => {
  return (
    <main>
      <div className={styles.root}>
        <h1>Мой профиль</h1>
        <br />
        <p>
          ID: <b>{userData.id}</b>
        </p>
        <p>
          Полное имя: <b>{userData.fullName}</b>
        </p>
        <p>
          E-mail: <b>{userData.email}</b>
        </p>
        <br />
        <Button type="primary" danger>
          Выйти
        </Button>
      </div>
    </main>
  );
};

export default DashboardProfilePage;
