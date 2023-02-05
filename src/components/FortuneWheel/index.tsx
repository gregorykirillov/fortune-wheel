import { createContext, useState, useMemo, useEffect, useRef } from "react";
import cn from "classnames";

import ItemsBlock from "./components/ItemsBlock";
import { Button } from "@/components";
import { DISTANCE, NEED_SORT_DATA, TIME, WIN_ITEM_NUM } from "@/config";
import { Variant } from "./types/Variant";
import { RouletteState } from "./types/RouletteState";

import style from "./style.module.scss";
import { loadVariants, saveVariant } from "@/services/variants";
import { Preloader } from "@/uikit";

export const FortuneContext = createContext<any>(null);

const FortuneWheel = () => {
  const [wonItem, setWonItem] = useState<Variant | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Array<Variant>>([]);
  const [blockHeight, setBlockHeight] = useState(0);
  const [blocks, setBlocks] = useState<Array<JSX.Element>>([]);
  const [rouletteState, setRouletteState] = useState<RouletteState>({
    started: false,
    finished: false,
  });

  const visibleItems = useMemo<Array<Variant>>(() => [], []);

  const itemsRef = useRef<HTMLDivElement | null>(null);
  const itemsBlockRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    loadVariants().then(async (res) => {
      const { data } = res;
      if (!data) return;

      setData(NEED_SORT_DATA ? sortData(data) : data);
    });
  }, []);

  useEffect(() => {
    if (!itemsRef) return;

    setElementTransition();
    setInitBlockHeight();
  }, [itemsRef, isLoading]);

  useEffect(() => {
    if (!data.length) return;

    setLoading(false);
    setBlocks([
      <ItemsBlock
        key={0}
        index={0}
        reference={itemsBlockRef}
        variants={data}
        variantsCount={1}
      />,
    ]);
  }, [data]);

  useEffect(() => {
    if (!rouletteState.started) return;

    if (!rouletteState.finished) {
      setTimeout(() => {
        setRouletteState({ ...rouletteState, finished: true });
      }, TIME * 1000);
    }
    if (visibleItems[WIN_ITEM_NUM]) handleWin();
  }, [rouletteState]);

  const handleWin = () => {
    const winItem = visibleItems[WIN_ITEM_NUM];
    setWonItem(winItem);

    saveVariant(winItem);
  };

  const setElementTransition = () => {
    const { current } = itemsRef;

    current?.style.setProperty("transition", `all ease-in-out ${TIME}s`);
  };

  const sortData = (data: Array<Variant>) =>
    data.sort(() => 0.5 - Math.random());

  const addBlocks = (itemsHeight: number, blockHeight: number) => {
    const insufficientCount = Math.ceil(
      (itemsHeight * (data.length + 2)) / (blockHeight * data.length)
    );
    const insufficientElements = [...Array(insufficientCount - 1)].map(
      (_, ind) => (
        <ItemsBlock
          key={ind + 1}
          index={ind}
          variantsCount={insufficientCount}
          reference={itemsBlockRef}
          variants={data}
        />
      )
    );

    setBlocks([...blocks, ...insufficientElements]);
  };

  const handleStart = () => {
    const { current } = itemsRef;

    current?.style.setProperty("transform", `translateY(-${DISTANCE}px)`);
    addBlocks(DISTANCE, blockHeight);

    setRouletteState({ ...rouletteState, started: true });
  };

  const setInitBlockHeight = () => {
    const { current } = itemsBlockRef;

    setBlockHeight(current?.clientHeight!);
  };

  return (
    <FortuneContext.Provider value={{ visibleItems, rouletteState }}>
      <div className={style.container}>
        <h1>Испытайте свою удачу</h1>
        {isLoading ? (
          <Preloader size="sm" />
        ) : (
          <div className={style.itemsContainer}>
            <div ref={itemsRef} className={style.itemBlocks}>
              {blocks.map((Element) => Element)}
            </div>
          </div>
        )}
        <p
          className={cn(style.winText, {
            [style.active]: wonItem,
            [style.italic]: wonItem?.title.includes("(c)"),
            [style.red]: wonItem?.isBonus,
          })}
        >
          {wonItem?.title}
        </p>
        <Button
          onClick={handleStart}
          disabled={rouletteState.started || isLoading}
        >
          Мне повезёт!
        </Button>
      </div>
    </FortuneContext.Provider>
  );
};

export default FortuneWheel;
