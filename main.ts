namespace SpriteKind {
    export const Plant = SpriteKind.create()
}
info.onCountdownEnd(function () {
    effects.clearParticles(snake)
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Player, function (sprite, otherSprite) {
    info.changeScoreBy(-1)
    otherSprite.startEffect(effects.trail)
    sprite.sayText("Sorry")
    info.startCountdown(2)
    sprite.setVelocity(300, 300)
    effects.clearParticles(sprite)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    Cakes += -1
    otherSprite.startEffect(effects.fire)
    scene.cameraShake(4, 500)
    otherSprite.destroy()
})
let myEnemy: Sprite = null
let Level = 0
let Fruit: Sprite = null
let snake: Sprite = null
scene.setBackgroundColor(2)
tiles.setTilemap(tilemap`level1`)
snake = sprites.create(assets.image`snake`, SpriteKind.Player)
controller.moveSprite(snake)
scene.cameraFollowSprite(snake)
game.splash("hi snake you like some cakes?")
let Cakes = 9
for (let index = 0; index < Cakes; index++) {
    tiles.setTileAt(tiles.getTileLocation(randint(0, 16), randint(0, 16)), assets.tile`orangebush`)
    Fruit = sprites.create(assets.image`cake`, SpriteKind.Food)
    Fruit.setPosition(randint(0, 256), randint(0, 256))
}
forever(function () {
    music.playMelody("E D G F B A C5 B ", 200)
})
game.onUpdateInterval(500, function () {
    if (Cakes == 0 && Level == 0) {
        Cakes = 10
        scene.setBackgroundColor(10)
        tiles.setTilemap(tilemap`level2`)
        for (let index = 0; index < Cakes; index++) {
            tiles.setTileAt(tiles.getTileLocation(randint(0, 16), randint(0, 16)), assets.tile`purplebush`)
            Fruit = sprites.create(assets.image`cake`, SpriteKind.Food)
            Fruit.setPosition(randint(0, 256), randint(0, 256))
        }
        myEnemy = sprites.create(assets.image`Apider`, SpriteKind.Enemy)
        myEnemy.follow(snake, 15)
        Level = 1
    } else if (Cakes == 0 && Level == 1) {
        effects.confetti.startScreenEffect()
        game.splash("dear mara I made this game.", "I hope you like my game")
        game.over(true, effects.confetti)
    }
})
