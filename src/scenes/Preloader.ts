import Phaser from 'phaser'

export default class Preloader extends Phaser.Scene
{
	constructor()
	{
		super("preloader")
	}

	preload()
	{
		this.load.image('tiles','tiles/0x72_DungeonTilesetII_v1.3.png')
		
	}

	create()
	{
		this.scene.start('game');
	}





}