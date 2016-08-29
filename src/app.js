
var size;
var num = 0;
var gameScene = cc.Scene.extend({
  onEnter: function() {
    this._super();
    var layer0 = new fieldLayer();
    var layer1 = new gameLayer();
    var layer2 = new charaLayer();
    var layer3 = new particleLayer();
    this.addChild(layer0);
    this.addChild(layer1);
    this.addChild(layer2);
    this.addChild(layer3);

  }
});

//デバッグ用ラベル
var debugText;
var gameLayer = cc.Layer.extend({
  sprite: null,
  ctor: function() {
    this._super();
    size = cc.winSize;
    return true;
  },

});

var fieldLayer = cc.Layer.extend({
  ctor: function() {
    this._super();

    var size = cc.director.getWinSize();

    var sprite = cc.Sprite.create(res.ss_BattleScene_bg1);
    sprite.setPosition(size.width / 2, size.height / 2);
    sprite.setScale(0.8);
    this.addChild(sprite, 0);
  }
});

var charaLayer = cc.Layer.extend({
  ctor: function() {
    this._super();

    var size = cc.director.getWinSize();

    //火属性のキャラクター
    var sprite10 = cc.Sprite.create(res.chara_princessselect_10);
    sprite10.setPosition(200, 100);
    sprite10.setScale(0.8);
    this.addChild(sprite10, 0);


    //火属性　敵ｻｺ中ボスキャラクター
    var sprite4 = cc.Sprite.create(res.chara_enemy_4);
    sprite4.setPosition(size.width * 0.6, size.height * 0.40);
    sprite4.setScale(1.2);
    this.addChild(sprite4, 0);
  }
});

//パーティクル用のレイヤー
var particleLayer = cc.Layer.extend({
  skillSelect: 0,
  skillLevel: 1,
  skillCnt: 1,

  ctor: function() {
    this._super();
    size = cc.winSize;
    this.scheduleUpdate();
    return true;
  },
  update: function(_dt) {


    if (this.skillCnt == 1) {


     this.skillParticle(this.skillSelect, this.skillLevel, 350, 100);
     //debug
     //this.skillParticle(2,4, 350, 100);

    }
    if ((this.skillCnt % 200) == 0) {
      this.skillCnt = 0;
      this.skillLevel++;
      //HealとSlipスキル追加
      if(this.skillSelect<3) {
        this.skillLevel = this.skillLevel  % 5;
      } else {
        this.skillLevel = this.skillLevel  % 2;
      }

      this.removeAllChildren();
      if (this.skillLevel == 0) {
        this.skillLevel++;
        this.skillSelect++;
        this.skillSelect = this.skillSelect % 5;
      }

    }
    //フレームをカウントする
    this.skillCnt++;
    /*
    debugText.setString("this.skillCnt:"+this.skillCnt
    + " skillSelect:"+this.skillSelect
    + " skillLevel:"+this.skillLevel);
*/
  },

//属性とスキルレベルと座標を与えてパーティクルを生成する関数
  skillParticle: function(attrib, rare, x, y) {

    //debugText.setString("attrib:"+attrib);
  　　//HealとSlipスキル追加
    var skillName = ["yami"];
    var x = [300, 300, 300, 300, 300, 500, 500, 471, 100];
    var y = [90, 90, 90, 155 , 155, 155, 155, 200];
    var num2 = [4];
    for(var i = 1; i < num2[attrib]; i++){
    var sName = "res." + skillName[attrib] + "Texture" + rare + "_plist";

    var tempParticle = new cc.ParticleSystem(eval(sName));
    tempParticle.setPosition(x[num], y[num]);
    num++;
    if(num > 20) num = 0;
    tempParticle.setDuration(10);
    this.addChild(tempParticle, 40);
    tempParticle.setAutoRemoveOnFinish(true);
  }
  },

});
