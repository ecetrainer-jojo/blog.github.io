import * as collisionMap from "../resources/PalletTown.json"
import { mapLayer } from "../src/ComponentControl/ComponentConstants";

describe('Testing extract the boundary info from the json file', function() {
    it('load the data from json file', ()=>{
      const collisionArray:number[][] = []
      const rawCollsion = (collisionMap.layers as Array<mapLayer>).filter(element => element.name==='Collision')[0].data
      //please change that later
      for(let i=0; i<rawCollsion.length;i+=50){
          collisionArray.push(rawCollsion.slice(i,50+i))
      }
      expect(collisionArray.length).toBe(55)
    })
  });