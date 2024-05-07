import React, { useState, useCallback, useRef } from "react";

import * as styles from "./Content.module.scss";

import { AlphaTabInit } from "./AlphaTabInit";

interface Props {
  title: string;
  body: string;
}

const Content: React.FC<Props> = ({ body, title }: Props) => {
  // Callback to handle API readiness
  const onApiReady = useCallback((api, index) => {
    // You might store API instances if needed for other purposes
    console.log(`API ready for index ${index}`, api);
  }, []);

  return (
    <div className={styles.content}>
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.body} dangerouslySetInnerHTML={{ __html: body }} />
      <AlphaTabInit onApiReady={onApiReady} />
    </div>
  );
};

export default Content;
