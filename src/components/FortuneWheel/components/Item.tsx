import { useContext, useRef, useEffect } from "react";

import { FortuneContext } from "..";
import { useIsVisible } from "@/hooks/useIsVisible";
import { Element } from "../types/Element";
import { RouletteState } from "../types/RouletteState";

import style from "./style.module.scss";

type Props = {
  index?: number;
  elementsCount?: number;
  element: Element;
};

const Item = ({ element, elementsCount, index }: Props) => {
  const {
    visibleItems,
    rouletteState,
  }: { visibleItems: Array<Element>; rouletteState: RouletteState } =
    useContext(FortuneContext);

  const ref = useRef<HTMLParagraphElement | null>(null);
  const isItemVisible = useIsVisible(ref);

  useEffect(() => {
    if (!ref.current) return;

    rouletteState.finished &&
      isItemVisible &&
      visibleItems.push({
        id: 0,
        title: element.title,
        isBonus: element.isBonus,
      });
  }, [rouletteState.finished, isItemVisible]);

  return (
    <p
      ref={elementsCount && index === elementsCount - 1 ? ref : undefined}
      className={style.item}
      key={element.id}
    >
      {element.title}
    </p>
  );
};

export default Item;
