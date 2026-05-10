import type { BodyPartId } from '@/types';

type BodyPartMeta = { label: string; defaultFtu: number };

export const BODY_PARTS: Record<BodyPartId, BodyPartMeta> = {
  face: { label: '顔', defaultFtu: 1.5 },
  neck: { label: '首', defaultFtu: 1.0 },
  upper_arm_left: { label: '上腕（左）', defaultFtu: 1.5 },
  upper_arm_right: { label: '上腕（右）', defaultFtu: 1.5 },
  forearm_left: { label: '前腕（左）', defaultFtu: 1.0 },
  forearm_right: { label: '前腕（右）', defaultFtu: 1.0 },
  elbow_inner_left: { label: '肘の内側（左）', defaultFtu: 0.5 },
  elbow_inner_right: { label: '肘の内側（右）', defaultFtu: 0.5 },
  hand_left: { label: '手（左）', defaultFtu: 1.0 },
  hand_right: { label: '手（右）', defaultFtu: 1.0 },
  chest: { label: '胸', defaultFtu: 3.5 },
  abdomen: { label: '腹', defaultFtu: 3.5 },
  back: { label: '背中', defaultFtu: 7.0 },
  thigh_left: { label: '太もも（左）', defaultFtu: 3.0 },
  thigh_right: { label: '太もも（右）', defaultFtu: 3.0 },
  knee_back_left: { label: '膝裏（左）', defaultFtu: 0.5 },
  knee_back_right: { label: '膝裏（右）', defaultFtu: 0.5 },
  lower_leg_left: { label: 'ふくらはぎ（左）', defaultFtu: 2.5 },
  lower_leg_right: { label: 'ふくらはぎ（右）', defaultFtu: 2.5 },
  foot_left: { label: '足（左）', defaultFtu: 2.0 },
  foot_right: { label: '足（右）', defaultFtu: 2.0 },
};
