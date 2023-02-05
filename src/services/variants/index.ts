import { request, Result } from "@/utils/request";
import { Variant } from "@/components/FortuneWheel/types/Variant";
import { getApiUrl } from "@/utils/getApiUrl";

export const loadVariants = async (): Promise<Result<Array<Variant>>> =>
  request<Array<Variant>>(getApiUrl("/get-variants"));

export const saveVariant = async (variants: Variant): Promise<boolean> => {
  const res = await request<Variant>(getApiUrl("/save-variant"), {
    method: "POST",
    body: JSON.stringify(variants),
  });

  return res.ok;
};

export const variantsRepository = {
  loadVariants,
  saveVariant,
};
