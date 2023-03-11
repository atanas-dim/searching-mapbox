import React, { FC } from "react";
import { useMap } from "src/context/MapContext";
import { MAP_STYLES, StyleName } from "src/resources/mapStyles";
import styles from "./ThemePicker.module.scss";

const StylePicker: FC = () => {
  const { style, setStyle } = useMap();

  const buttons = Object.keys(MAP_STYLES).map((key, index) => {
    const styleConfig = MAP_STYLES[key as unknown as StyleName];

    return (
      <button
        onClick={() => {
          setStyle(styleConfig);
        }}
        key={`styleBtn${index}`}
        className={styleConfig.name === style.name ? styles.selected : ""}
      >
        {styleConfig.name}
      </button>
    );
  });

  return <div className={styles.container}>{buttons}</div>;
};

export default StylePicker;
