/**
 * Single source of truth for neural chips and processor compatibility.
 * Sourced directly from src/content/settings/neural-chips.json with full backwards compatibility.
 */
import chipsData from '../content/settings/neural-chips.json';

export interface ChipDeviceMap {
  readonly chip: string;
  readonly devices: string;
}

export interface NeuralChipFamily {
  readonly id: 'snapdragon' | 'dimensity';
  readonly name: string;
  readonly shortName: string;
  readonly npuName: string;
  readonly chips: readonly string[];
  readonly examples: readonly ChipDeviceMap[];
}

export interface EnhancerMode {
  readonly id: string;
  readonly title: string;
  readonly body?: string;
  /** Big-value facts shown in the mode's card (Lite mode only today). */
  readonly facts?: readonly { readonly value: string; readonly label: string }[];
  /** Phones that usually run this mode, in plain words. */
  readonly phones?: string;
}

export interface SystemRequirement {
  readonly id: string;
  readonly label: string;
  readonly value: string;
  readonly note: string;
}

export const neuralChipFamilies: readonly NeuralChipFamily[] = chipsData.families as NeuralChipFamily[];

export const liteModeNote: string = chipsData.liteModeNote;

export const enhancerModes: readonly EnhancerMode[] = chipsData.enhancerModes;

export const systemRequirements: readonly SystemRequirement[] = chipsData.systemRequirements;
