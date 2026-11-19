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
  readonly body: string;
  readonly needs: string;
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

export const liteModeGroups: readonly ChipDeviceMap[] = chipsData.liteModeGroups;

export const systemRequirements: readonly SystemRequirement[] = chipsData.systemRequirements;
