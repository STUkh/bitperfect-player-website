import SupportedDevices, { type SupportedDevicesProps } from '../devices/SupportedDevices';

export interface NeuralChipListProps extends SupportedDevicesProps {}

/**
 * Backwards-compatible wrapper around `SupportedDevices`.
 * Renders the reference list layout of Snapdragon and Dimensity chips,
 * with the Lite mode note and a direct link to the full `/compatibility` page.
 */
export default function NeuralChipList(props: NeuralChipListProps) {
  return <SupportedDevices variant="reference" {...props} />;
}
