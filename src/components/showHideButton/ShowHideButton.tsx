import React, { type FC } from "react";
import styles from "./ShowHideButton.module.scss";

type Props = {
  showHideResults: () => void;
  label: string;
};
const ShowHideButton: FC<Props> = ({ showHideResults, label }) => {
  return (
    <div className={styles.container}>
      <button onClick={() => showHideResults()}>{label}</button>
    </div>
  );
};

export default ShowHideButton;
