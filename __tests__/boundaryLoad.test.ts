import * as collisionMap from "../resources/tile_assets/towns/PalletTownMap.json"
import { Coordinate } from "../src/Background/backgroud";
import { mapLayer, mapLayers } from "../src/ComponentControl/ComponentConstants";



describe('Testing extract the boundary info from the json file', function() {
    it('load the data from json file', ()=>{
      const collisionArray:number[][] = []
      const rawCollsion = (collisionMap.layers as Array<mapLayer>).filter(element => element.name==='Collision')[0].data
      //please change that later
      for(let i=0; i<rawCollsion.length;i+=50){
          collisionArray.push(rawCollsion.slice(i,50+i))
      }
      console.log(collisionArray)
      expect(collisionArray.length).toBe(55)
    })

    it('load the diagloue boundaries from json file', ()=>{
      const rawDialogue = (collisionMap.layers as Array<mapLayers>).filter(element => element.name==='Dialogue_Group')[0].layers
      rawDialogue.forEach(dialogueLayer => {
        const diagloueBlock: Coordinate[] = []
        for(let i=0; i<dialogueLayer.data.length;i++){
          if(dialogueLayer.data[i]!=0){
            diagloueBlock.push([Math.trunc(i / dialogueLayer.width), i % dialogueLayer.width])
          }
        }
      })
    })
  });