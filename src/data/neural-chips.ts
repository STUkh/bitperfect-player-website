/**
 * The neural chips that run AI Enhancer's full model, as the app lists them in its
 * compatibility sheet (bitperfect-player
 * `core/ui/.../component/AiCompatibilitySheet.kt`, `QUALCOMM_CHIPS` and
 * `MEDIATEK_CHIPS`). Every other phone runs Lite mode on the main processor. Keep
 * both lists in step with the app; the names are the app's, with the family in front.
 */
export interface NeuralChipFamily {
  readonly id: 'snapdragon' | 'dimensity';
  /** The family as a reader knows it. */
  readonly name: string;
  /** Newest first, as in the app. */
  readonly chips: readonly string[];
}

export const neuralChipFamilies: readonly NeuralChipFamily[] = [
  {
    id: 'snapdragon',
    name: 'Qualcomm Snapdragon',
    chips: [
      'Snapdragon 8 Elite Gen 5',
      'Snapdragon 8 Elite',
      'Snapdragon 8 Gen 3',
      'Snapdragon 8s Gen 3 / 8 Gen 2',
      'Snapdragon 8+ Gen 1 / 8 Gen 1',
      'Snapdragon 7+ Gen 3 / 7 Gen 3 / 7s Gen 2',
      'Snapdragon 7+ Gen 2 / 7 Gen 1',
    ],
  },
  {
    id: 'dimensity',
    name: 'MediaTek Dimensity',
    chips: [
      'Dimensity 9400 / 9400+',
      'Dimensity 9300 / 9300+ / 9350',
      'Dimensity 8400 / 8400-Ultra / 8450',
      'Dimensity 8300 / 8300-Ultra / 8350',
      'Dimensity 7300 / 7300-Energy / 7350',
    ],
  },
];

/** The line under the lists: what happens on every other phone. */
export const liteModeNote = 'Other phones run AI Enhancer in Lite mode on the main processor.';
