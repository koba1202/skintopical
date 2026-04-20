export type BodyPartMeta = {
  id: string;
  label: string;
};

export const BODY_PARTS: BodyPartMeta[] = [
  { id: 'face',            label: '顔' },
  { id: 'neck',            label: '首' },
  { id: 'trunk_front',     label: '体幹（前面）' },
  { id: 'trunk_back',      label: '体幹（背面）' },
  { id: 'upper_arm_left',  label: '上腕・左' },
  { id: 'upper_arm_right', label: '上腕・右' },
  { id: 'forearm_left',    label: '前腕・左' },
  { id: 'forearm_right',   label: '前腕・右' },
  { id: 'thigh_left',      label: '大腿・左' },
  { id: 'thigh_right',     label: '大腿・右' },
  { id: 'lower_leg_left',  label: '下腿・左' },
  { id: 'lower_leg_right', label: '下腿・右' },
];
