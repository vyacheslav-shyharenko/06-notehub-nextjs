"use client";

import css from "./page.module.css";

type Props = {
  error: Error;
  reset: () => void;
};

const Error = ({ error, reset }: Props) => {
  return (
    <div className={css.qwe}>
      <h2>Помилка при завантаженні</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Спробувати знову</button>
    </div>
  );
};

export default Error;
