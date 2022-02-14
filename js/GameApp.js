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
        this.load.spritesheet('dude', '../assets/dude.png', {frameWidth: 32, frameHeight: 48});
    }

    create()
    {    
        this.cameras.main.setBounds(0, 0, 1920 * 2, 600);
        this.physics.world.setBounds(0, 0, 1920 * 2, 600);

        this.CreateForestBG(this);

        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(400, 618, 'platform').setScale(2).refreshBody();
        this.platforms.create(600, 400, 'platform');
        this.platforms.create(50, 250, 'platform');
        this.platforms.create(750, 220, 'platform');

        this.player = this.physics.add.sprite(100, 450, 'dude');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{key: 'dude', frame: 4}],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', {start: 5, end: 8}),
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
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
        }
        else if(this.cursors.right.isDown)
        {
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
            this.player.setVelocityY(-200);
        }
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

    CreateForestBG(scene)
    {
        scene.add.image(400, 250, 'colorBack');
        scene.add.image(400, 250, 'sky');
        scene.add.image(400, 250, 'fog');
        scene.add.image(400, 250, 'BackGTrees');
        scene.add.image(400, 250, 'godRays');
        scene.add.image(400, 250, 'shadows');
        scene.add.image(400, 250, 'shadowTrees');
        scene.add.image(400, 250, 'lights');
        scene.add.image(400, 250, 'trees');
        scene.add.image(400, 250, 'leafs');
        scene.add.image(400, 250, 'grass');
    }
}

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