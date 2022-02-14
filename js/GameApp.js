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
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var platforms;
var player;
var cursors;

function preload()
{
    LoadForestBackground(this);
    this.load.image('bomb', '../assets/bomb.png');
    this.load.image('platform', '../assets/platform.png');
    this.load.image('star', '../assets/star.png');
    this.load.spritesheet('dude', '../assets/dude.png', {frameWidth: 32, frameHeight: 48});
}

function create()
{    
    CreateForestBG(this);
    platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, 'platform').setScale(2).refreshBody();
    platforms.create(600, 400, 'platform');
    platforms.create(50, 250, 'platform');
    platforms.create(750, 220, 'platform');

    player = this.physics.add.sprite(100, 450, 'dude');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

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

    cursors = this.input.keyboard.createCursorKeys();
    this.physics.add.collider(player, platforms);
}

function update()
{
    if(cursors.left.isDown)
    {
        player.setVelocityX(-160);
        player.anims.play('left', true);
    }
    else if(cursors.right.isDown)
    {
        player.setVelocityX(160);
        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);
        player.anims.play('turn');
    }
    if(cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-200);
    }
}

function LoadForestBackground(scene)
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

function CreateForestBG(scene)
{
    scene.add.image(400, 300, 'colorBack');
    scene.add.image(400, 300, 'sky');
    scene.add.image(400, 300, 'fog');
    scene.add.image(400, 300, 'BackGTrees');
    scene.add.image(400, 300, 'godRays');
    scene.add.image(400, 300, 'shadows');
    scene.add.image(400, 300, 'shadowTrees');
    scene.add.image(400, 300, 'lights');
    scene.add.image(400, 300, 'trees');
    scene.add.image(400, 300, 'leafs');
    scene.add.image(400, 300, 'grass');
}
