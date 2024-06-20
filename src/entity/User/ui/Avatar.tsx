import Image from "next/image";

import styles from "./Avatar.module.scss";

type AvatarProps = {
  size?: number;
  avatarClassName?: string;
};

const Avatar = ({ avatarClassName, size = 128 }: AvatarProps) => {
  return (
    <div className={styles.avatarWrapper}>
      <Image
        className={avatarClassName}
        src="https://i.ibb.co/1rR0fx2/Frame-242.png"
        width={size}
        height={size}
        alt="Аватар профиля"
      />
    </div>
  );
};

export default Avatar;
