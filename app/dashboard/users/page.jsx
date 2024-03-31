import Search from "@/app/ui/dashboard/search/Search";
import styles from "../../ui/dashboard/users/users.module.css";
import Link from "next/link";
import Image from "next/image";
import Pagination from "@/app/ui/dashboard/pagination/Pagination";
import { fetchUsers } from "@/app/lib/data";

const UsersPage = async () => {
  const users = await fetchUsers();

  console.log(users);
  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a user.." />
        <Link href="/dashboard/users/add">
          <button className={styles.addButton}>Add New</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Created At</td>
            <td>Role</td>
            <td>Status</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div className={styles.user}>
                <Image
                  src="/noavatar.png"
                  alt=""
                  width={40}
                  height={40}
                  className={styles.userImage}
                />
                Yeo Da Seul
              </div>
            </td>
            <td>dsy1943@naver.com</td>
            <td>2024.03.17</td>
            <td>Admin</td>
            <td>active</td>
            <td className={styles.buttons}>
              <Link href={`/dashboard/users/test`}>
                <button className={`${styles.button} ${styles.view}`}>
                  View
                </button>
              </Link>
              <button className={`${styles.button} ${styles.delete}`}>
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination />
    </div>
  );
};

export default UsersPage;
