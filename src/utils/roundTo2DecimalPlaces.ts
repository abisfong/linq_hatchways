export default function roundTo2DecimalPlaces(num: number): number {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}