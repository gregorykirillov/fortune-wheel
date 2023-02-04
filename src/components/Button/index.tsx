import React from "react";

import style from "./style.module.scss";

const Button = ({
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button className={style.button} {...props} />
);

export default Button;
