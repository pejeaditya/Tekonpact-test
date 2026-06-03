export interface DottedMapOptions {
  height?: number
  grid?: "diagonal" | "vertical" | "horizontal"
  countries?: string[]
}

export interface DottedMapSvgOptions {
  radius?: number
  color?: string
  shape?: "circle" | "hexagon"
  backgroundColor?: string
}

declare module "dotted-map" {
  const DottedMap: unknown
  export default DottedMap
}
