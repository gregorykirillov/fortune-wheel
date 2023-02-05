import React from "react";

import Item from "./Item";
import { Variant } from "../types/Variant";

type Props = {
  reference: React.MutableRefObject<HTMLDivElement | null>;
  variants: Array<Variant>;
  index?: number;
  variantsCount?: number;
};

const ItemsBlock = ({ reference, variants, index, variantsCount }: Props) => {
  return (
    <div ref={reference}>
      {variants.map((variant) => (
        <Item
          key={variant.id}
          variant={variant}
          variantsCount={variantsCount}
          index={index}
        />
      ))}
    </div>
  );
};

export default ItemsBlock;
