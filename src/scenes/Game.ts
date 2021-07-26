import Phaser from 'phaser'
import { debugDraw } from "../utils/debug"



export default class Game extends Phaser.Scene
{
    //activate cursors
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    //this technique allows an object to be accessible outside of create.
    // and use the "this." technique to access it.
    // if you don't declare a variable this way, it can only be used in its original method
    // ie "create" and exists as a regular variable like const.

    // Sprite member variable
    //private faune!: Phaser.GameObject.Sprite

    //Physics Sprite member variable
    private faune!: Phaser.Physics.Arcade.Sprite
    


	constructor()
	{
		super('game')
	}

	preload()
    {
        //load cursors
        this.cursors = this.input.keyboard.createCursorKeys()

        
    }

    create()
    {
    

        //[][][]TILEMAP
        const map = this.make.tilemap({key: 'dungeon'})
    		
        //first var is string. must = name of tileset in Tiled in bottom right.
        const tileset = map.addTilesetImage('dungeon', 'tiles',  )

        map.createStaticLayer('Ground', tileset)
        const wallsLayer = map.createStaticLayer("Walls", tileset )

        wallsLayer.setCollisionByProperty({collides: true});

        //Draw collision walls
        //debugDraw(wallsLayer, this)


        //[][][]FAUNE CHARACTER
        //this.faune = this.add.sprite(128, 128, "faune", "walk-down-7.png")
        this.faune = this.physics.add.sprite(128, 128, "faune", "walk-down-7.png")
        //hitbox size fix
        this.faune.body.setSize(this.faune.width * 0.5, this.faune.height * 0.8)     
        
        //[][]FAUNE ANIMATIONS
        this.anims.create({
            key: "faune-idle-down"
            frames: [{key: "faune", frame:"walk-down-7.png"}]
        })
        this.anims.create({
            key: "faune-idle-up"
            frames: [{key: "faune", frame:"walk-up-7.png"}]
        })
        this.anims.create({
            key: "faune-idle-side"
            frames: [{key: "faune", frame:"walk-side-7.png"}]
        })
        this.anims.create({
            key: "faune-walk-down"
            frames: this.anims.generateFrameNames("faune",{ start: 1, end: 8, prefix: "walk-down-", suffix: ".png"})
            repeat: -1;
            frameRate: 15;
        })
        this.anims.create({
            key: "faune-walk-side"
            frames: this.anims.generateFrameNames("faune",{ start: 1, end: 8, prefix: "walk-side-", suffix: ".png"})
            repeat: -1;
            frameRate: 15;
        })
        this.anims.create({
            key: "faune-walk-up"
            frames: this.anims.generateFrameNames("faune",{ start: 1, end: 8, prefix: "walk-up-", suffix: ".png"})
            repeat: -1;
            frameRate: 15;
        })


        this.faune.anims.play("faune-walk-side")

        //[][][]COLLIDER
        this.physics.add.collider(this.faune, wallsLayer);

        //[][][]CAMERA
        this.cameras.main.startFollow(this.faune, true)


    }

    
    update(t: number, dt: number)
    {
        //This function runs continueosly.
        // Variable t is time since game start, dt is time since last frame

        //SAFETY CHECK
        if(!this.cursors || !this.faune)
        {
            return
        }

        //[][][]CHARACTER MOVEMENT
        const speed = 100;
        //question mark serves as safety feature
        if(this.cursors.left?.isDown)
        {
            this.faune.anims.play("faune-walk-side", true)
            this.faune.setVelocity(-speed, 0)

            this.faune.scaleX = -1
            //hitbox fix
            this.faune.body.offset.x = 24
        }
        else if (this.cursors.right?.isDown)
        {
            this.faune.anims.play("faune-walk-side", true)
            this.faune.setVelocity(speed, 0)

            this.faune.scaleX = 1
            //hitbox fix
            this.faune.body.offset.x = 8
        }
        else if (this.cursors.up?.isDown)
        {
            this.faune.anims.play("faune-walk-up", true)
            this.faune.setVelocity(0, -speed)
   
        }
        else if (this.cursors.down?.isDown)
        {
            this.faune.anims.play("faune-walk-down", true)
            this.faune.setVelocity(0, speed)

        }
        else
        {
            //String splitter, useful for chaining animations
            const parts = this.faune.anims.currentAnim.key.split("-")
            parts[1] = "idle"
            this.faune.play(parts.join("-"))

            this.faune.setVelocity(0,0)
        }

    }


}
