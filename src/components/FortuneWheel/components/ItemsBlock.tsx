import React from "react";

import Item from "./Item";
import { Element } from "../types/Element";

type Props = {
  reference: React.MutableRefObject<HTMLDivElement | null>;
  elements: Array<Element>;
  index?: number;
  elementsCount?: number;
};

const ItemsBlock = ({ reference, elements, index, elementsCount }: Props) => {
  return (
    <div ref={reference}>
      {elements.map((element) => (
        <Item
          key={element.id}
          element={element}
          elementsCount={elementsCount}
          index={index}
        />
      ))}
    </div>
  );
};

export default ItemsBlock;
