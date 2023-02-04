import { useContext, useRef, useEffect } from "react";

import { FortuneContext, RouletteState } from "..";
import { useIsVisible } from "../../../hooks/useIsVisible";
import { Element } from "../types/Element";

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
        text: ref.current.textContent || "",
      });
  }, [rouletteState.finished, isItemVisible]);

  return (
    <p
      ref={elementsCount && index === elementsCount - 1 ? ref : undefined}
      className={style.item}
      key={element.id}
    >
      {element.text}
    </p>
  );
};

export default Item;
