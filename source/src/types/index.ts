export type FrequencyType = "twice_daily" | "once_daily" | "every_other_day" | "weekly_n" | "custom";

export type SteroidRank = "strongest" | "very_strong" | "strong" | "medium" | "weak";

export type BodyPartConfig = {
  bodyPartId: string;
  medication: string;
  steroidRank: SteroidRank;
  ftuAmount: number;
};

