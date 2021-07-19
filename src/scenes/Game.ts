import Phaser from 'phaser'

export default class Game extends Phaser.Scene
{
	constructor()
	{
		super('game')
	}

	preload()
    {
        
        
    }

    create()
    {
    
        const map = this.make.tilemap({key: 'dungeon'})
    		
        //first var is string. must = name of tileset in Tiled in bottom right.
        const tileset = map.addTilesetImage('dungeon', 'tiles',  )

        map.createStaticLayer('Ground', tileset)
        map.createStaticLayer("Walls", tileset )



    }
}
