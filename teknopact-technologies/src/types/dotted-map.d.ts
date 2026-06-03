declare module "dotted-map" {
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

  export default class DottedMap {
    constructor(options?: DottedMapOptions)
    getSVG(options?: DottedMapSvgOptions): string
  }
}
