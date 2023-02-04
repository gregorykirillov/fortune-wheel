import { createContext, useState, useMemo, useEffect, useRef } from "react";
import cn from "classnames";

import ItemsBlock from "./components/ItemsBlock";
import { Element } from "./types/Element";
import Button from "../Button";
import { DISTANCE, TIME, WIN_ITEM_NUM } from "../../config";

import style from "./style.module.scss";

const data: Array<Element> = [
  { id: 1, text: "First" },
  { id: 2, text: "Second" },
  { id: 3, text: "Third" },
  { id: 4, text: "Fourth" },
  { id: 5, text: "Fifth" },
  { id: 6, text: "Sixth" },
  { id: 7, text: "Seventh" },
  { id: 8, text: "Eighth" },
  { id: 9, text: "Ninth" },
  { id: 10, text: "Tenth" },
];

export type RouletteState = {
  started: boolean;
  finished: boolean;
};

export const FortuneContext = createContext<any>(null);

const FortuneWheel = () => {
  const [wonItem, setWonItem] = useState<Element | null>(null);
  const visibleItems = useMemo<Array<Element>>(() => [], []);
  const itemsRef = useRef<HTMLDivElement | null>(null);
  const itemsBlockRef = useRef<HTMLDivElement | null>(null);

  const [blockHeight, setBlockHeight] = useState(0);
  const [blocks, setBlocks] = useState<Array<JSX.Element>>([
    <ItemsBlock key={0} reference={itemsBlockRef} elements={data} />,
  ]);
  const [rouletteState, setRouletteState] = useState<RouletteState>({
    started: false,
    finished: false,
  });

  const setElementTransition = () => {
    const { current } = itemsRef;

    current?.style.setProperty("transition", `all ease-in-out ${TIME}s`);
  };

  useEffect(() => {
    setElementTransition();
    setEmptyBlockHeight();
  }, [itemsRef]);

  useEffect(() => {
    if (!rouletteState.started) return;

    if (!rouletteState.finished) {
      setTimeout(() => {
        setRouletteState({ ...rouletteState, finished: true });
      }, TIME * 1000);
    }

    if (visibleItems[WIN_ITEM_NUM]) setWonItem(visibleItems[WIN_ITEM_NUM]);
  }, [rouletteState]);

  const addBlocks = (itemsHeight: number, blockHeight: number) => {
    const insufficientCount = Math.ceil(itemsHeight / blockHeight);
    const insufficientElements = [...Array(insufficientCount)].map((_, ind) => (
      <ItemsBlock
        key={ind + 1}
        index={ind}
        elementsCount={insufficientCount}
        reference={itemsBlockRef}
        elements={data}
      />
    ));

    setBlocks([...blocks, ...insufficientElements]);
  };

  const handleStart = () => {
    const { current } = itemsRef;

    current?.style.setProperty("transform", `translateY(-${DISTANCE}px)`);
    addBlocks(DISTANCE, blockHeight);

    setRouletteState({ ...rouletteState, started: true });
  };

  const setEmptyBlockHeight = () => {
    const { current } = itemsBlockRef;

    setBlockHeight(current?.clientHeight!);
  };

  return (
    <FortuneContext.Provider value={{ visibleItems, rouletteState }}>
      <div className={style.container}>
        <h1>Испытайте свою удачу</h1>
        <div className={style.itemsContainer}>
          <div ref={itemsRef} className={style.itemBlocks}>
            {blocks.map((Element) => Element)}
          </div>
        </div>
        {wonItem && (
          <p
            className={cn(style.winText, {
              [style.italic]: wonItem.isBonus,
            })}
          >
            {wonItem.text}
          </p>
        )}
        <Button onClick={handleStart} disabled={rouletteState.started}>
          Мне повезёт!
        </Button>
      </div>
    </FortuneContext.Provider>
  );
};

export default FortuneWheel;
