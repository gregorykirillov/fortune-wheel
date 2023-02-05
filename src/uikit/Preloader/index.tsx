import cn from "classnames";

import styles from "./style.module.scss";

type PreloaderProps = {
  size?: "sm" | "md";
};

const Preloader = ({ size = "md" }: PreloaderProps) => (
  <div className={cn(styles.preloaderContainer, styles[size])}>
    <div className={styles.preloader}></div>
  </div>
);

export default Preloader;
