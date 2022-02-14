class Spell extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene, x, y)
    {
        super(scene, x, y, 'spell');
    }

    fire(x, y)
    {
        this.body.reset(x, y);
        this.setActive(true);
        this.setVisible(true);

        this.setVelocityX(-900);
    }
};

class SpellGroup extends Phaser.Physics.Arcade.Group
{
    constructor(scene)
    {
        super(scene.physics.world, scene);

        this.createMultiple({
            frameQuantity: 30,
            key: 'spell',
            active: false,
            visible: false,
            classType: Spell
        });
    }

    castSpell(x, y)
    {
        const spell = this.getFirstDead(false);
        if(spell)
        {
            spell.fire(x, y);
        }
    }
};

class Game extends Phaser.Scene
{
    constructor()
    {
        super();
    }

    preload()
    {
        this.LoadForestBackground(this);
        this.load.image('bomb', '../assets/bomb.png');
        this.load.image('platform', '../assets/platform.png');
        this.load.image('star', '../assets/star.png');
        this.load.image('sky', '../assets/sky.png');
        this.load.spritesheet('dude', '../assets/dude.png', {frameWidth: 32, frameHeight: 48});
        this.load.spritesheet('witch', '../assets/Blue_witch/B_witch_run.png', {frameWidth: 32, frameHeight: 48});
        this.load.image('spell', '../assets/Blue_witch/SpellBlueX.png');
    }

    create()
    {    
        this.cameras.main.setBounds(0, 0, 800 * 2, 600);
        this.physics.world.setBounds(0, 0, 800 * 2, 600);

        this.CreateForestBG(this, 1);
        this.CreateForestBG(this, 2);
        this.CreateForestBG(this, 3);

        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 618, 'platform').setScale(2).refreshBody();
        this.platforms.create(600, 425, 'platform');
        this.platforms.create(50, 250, 'platform');
        this.platforms.create(750, 220, 'platform');

        this.spellGroup = new SpellGroup(this);
        this.AddEvents();

        this.player = this.physics.add.sprite(100, 450, 'witch');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('witch', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{key: 'witch', frame: 4}],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('witch', {start: 5, end: 8}),
            frameRate: 10,
            repeat: -1
        });
        
        this.cursors = this.input.keyboard.createCursorKeys();
        this.physics.add.collider(this.player, this.platforms);

        this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
    }

    update()
    {
        if(this.cursors.left.isDown)
        {
            this.player.flipX = true;
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
        }
        else if(this.cursors.right.isDown)
        {
            this.player.flipX = false;
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);
        }
        else
        {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }
        if(this.cursors.up.isDown && this.player.body.touching.down)
        {
            this.player.setVelocityY(-340);
        }

        this.inputKeys.forEach(key => {
			// Check if the key was just pressed, and if so -> fire the bullet
			if(Phaser.Input.Keyboard.JustDown(key)) {
				this.castSpell();
			}
		});
    }

    AddEvents()
    {
        this.input.on('pointerdown', (pointer) => {
            this.castSpell();
        });

        this.inputKeys = [
			this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
			this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
		];
    }

    castSpell()
    {
        this.spellGroup.castSpell(this.player.x, this.player.y -20);
    }

    LoadForestBackground(scene)
    {
        scene.load.image('ground', '../assets/BGLayers/Layer_0000_9.png');
        scene.load.image('grass', '../assets/BGLayers/Layer_0001_8.png');
        scene.load.image('leafs', '../assets/BGLayers/Layer_0002_7.png');
        scene.load.image('trees', '../assets/BGLayers/Layer_0003_6.png');
        scene.load.image('lights', '../assets/BGLayers/Layer_0004_Lights.png');
        scene.load.image('shadowTrees', '../assets/BGLayers/Layer_0005_5.png');
        scene.load.image('shadows', '../assets/BGLayers/Layer_0006_4.png');
        scene.load.image('godRays', '../assets/BGLayers/Layer_0007_Lights.png');
        scene.load.image('BackGTrees', '../assets/BGLayers/Layer_0008_3.png');
        scene.load.image('fog', '../assets/BGLayers/Layer_0009_2.png');
        scene.load.image('sky', '../assets/BGLayers/Layer_0010_1.png');
        scene.load.image('colorBack', '../assets/BGLayers/Layer_0011_0.png');
    }

    CreateForestBG(scene, offset)
    {
        scene.add.image(400*offset, 250, 'colorBack');
        scene.add.image(400*offset, 250, 'sky');
        scene.add.image(400*offset, 250, 'fog');
        scene.add.image(400*offset, 250, 'BackGTrees');
        scene.add.image(400*offset, 250, 'godRays');
        scene.add.image(400*offset, 250, 'shadows');
        scene.add.image(400*offset, 250, 'shadowTrees');
        scene.add.image(400*offset, 250, 'lights');
        scene.add.image(400*offset, 250, 'trees');
        scene.add.image(400*offset, 250, 'leafs');
        scene.add.image(400*offset, 250, 'grass');
    }
};

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 300},
            debug: false
        }
    },
    scene: [ Game ]
};

var game = new Phaser.Game(config);