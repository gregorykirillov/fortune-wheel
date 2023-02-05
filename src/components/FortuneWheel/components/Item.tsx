import { useContext, useRef, useEffect } from "react";

import { FortuneContext } from "..";
import { useIsVisible } from "@/hooks/useIsVisible";
import { Variant } from "../types/Variant";
import { RouletteState } from "../types/RouletteState";

import style from "./style.module.scss";

type Props = {
  index?: number;
  variantsCount?: number;
  variant: Variant;
};

const Item = ({ variant, variantsCount, index }: Props) => {
  const {
    visibleItems,
    rouletteState,
  }: { visibleItems: Array<Variant>; rouletteState: RouletteState } =
    useContext(FortuneContext);

  const ref = useRef<HTMLParagraphElement | null>(null);
  const isItemVisible = useIsVisible(ref);

  useEffect(() => {
    if (!ref.current) return;

    rouletteState.finished &&
      isItemVisible &&
      visibleItems.push({
        id: 0,
        title: variant.title,
        isBonus: variant.isBonus,
      });
  }, [rouletteState.finished, isItemVisible]);

  return (
    <p
      ref={
        variantsCount &&
        (index === variantsCount - 1 || index === variantsCount - 2)
          ? ref
          : undefined
      }
      className={style.item}
      key={variant.id}
    >
      {variant.title}
    </p>
  );
};

export default Item;
