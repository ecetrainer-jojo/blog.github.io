/**
 * Represents a map layer with properties for data, dimensions, and visibility.
 *
 * @interface MapLayer
 */
export interface MapLayer {
  data: number[],
  height: number,
  id: number,
  name: string,
  opacity: number,
  type: string,
  visible: boolean,
  width: number,
  x: number,
  y: number
}

// record the types for the group layers info from json
/**
 * Represents a map layer with its properties
 */
export interface MapLayers {
  id: number,
  layers: MapLayer[],
  name: string,
  opacity: number,
  type: string,
  visible: boolean,
  x: number,
  y: number
}
