import DottedMapImport from "dotted-map"

import type { DottedMapOptions, DottedMapSvgOptions } from "@/types/dotted-map"

type DottedMapInstance = {
  getSVG: (options?: DottedMapSvgOptions) => string
}

type DottedMapConstructor = new (options?: DottedMapOptions) => DottedMapInstance

function resolveDottedMapConstructor(): DottedMapConstructor {
  const mod = DottedMapImport as unknown

  if (typeof mod === "function") {
    return mod as DottedMapConstructor
  }

  if (
    mod &&
    typeof mod === "object" &&
    "default" in mod &&
    typeof (mod as { default: unknown }).default === "function"
  ) {
    return (mod as { default: DottedMapConstructor }).default
  }

  throw new Error("Failed to load dotted-map constructor")
}

const DottedMap = resolveDottedMapConstructor()

export function createDottedMap(options?: DottedMapOptions): DottedMapInstance {
  return new DottedMap(options)
}
