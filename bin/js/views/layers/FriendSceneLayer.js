var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var views;
(function (views) {
    var layers;
    (function (layers) {
        var Event = laya.events.Event;
        var BaseView = views.base.BaseView;
        var Rectangle = laya.maths.Rectangle;
        var LandCtrl = controllers.teaRoom.LandCtrl;
        var TeaGardenCtrl = controllers.teaRoom.TeaGardenCtrl;
        var GameConfig = configs.GameConfig;
        var TeaGardenModel = models.teaRoom.TeaGardenModel;
        /**
         * 好友茶园场景层
         */
        var FriendSceneLayer = /** @class */ (function (_super) {
            __extends(FriendSceneLayer, _super);
            function FriendSceneLayer() {
                var _this = _super.call(this) || this;
                _this.bgUrl = "res/gameAssets/imgs/teaRoom/";
                /** 小地图块宽 */
                _this.pieceW = 500;
                /** 小地图块高 */
                _this.pieceH = 300;
                /** 记录上次触模点间的距离 */
                _this.lastDistance = 0;
                /** 缩放系数 */
                _this.factor = 0.0004; // 0.001
                _this.isDrag = false;
                _this.bgStatus = 0;
                /** 背景图片ID数组 */
                _this.indexArr = [1001, 2001, 3001, 4001, 50001, 6001, 7001, 8001];
                FriendSceneLayer.instance = _this;
                _this.resetLoadBg(TeaGardenModel.decorationVOArr);
                // 两指缩放用
                Laya.stage.on(Event.MOUSE_UP, _this, _this.onMouseUp);
                Laya.stage.on(Event.MOUSE_OUT, _this, _this.onMouseUp);
                return _this;
            }
            FriendSceneLayer.prototype.resetLoadBg = function (decVoArr) {
                var i;
                var len = decVoArr.length;
                var decVO = new models.base.ToolVO();
                var imgsArr = [];
                var index;
                for (i = 0; i < len; i++) {
                    decVO = decVoArr[i];
                    if (i == 0) {
                        if (this.indexArr.indexOf(decVO.id) != -1) {
                            var pcName = "http://kaixinh5game.maimaicha.net/static/d/d/bg_6001.jpg"; //test
                            this.loadImage(pcName, 0, 0, 1500, 900); //test
                            // let pageName:string=decVO.icon.substring(decVO.icon.lastIndexOf("/")+1,decVO.icon.lastIndexOf("."));   //  pcName.lastIndexOf("/")+1,pcName.lastIndexOf(".")
                            // for (index = 1; index <= 9; index++)
                            // {
                            //     imgsArr[index - 1] = this.bgUrl + pageName+"/bg1_" + index + ".png";
                            // }
                            // for (index = 0; index < imgsArr.length; index++)
                            // {
                            //     let m: number =  Math.floor(index / 3);
                            //     let n: number =  index % 3;
                            //     this.loadImage(imgsArr[index], n * this.pieceW, m * this.pieceH, this.pieceW, this.pieceH);
                            // }
                        }
                    }
                    else if (i == 1) {
                        this.loadImage(decVO.icon, 720, 130);
                    }
                    else if (i == 2) {
                        this.loadImage(decVO.icon, 810, 60);
                    }
                }
                Laya.stage.on(Event.MOUSE_DOWN, this, this.onMouseDown);
            };
            FriendSceneLayer.prototype.mouseDownHandler = function (event) {
                // 总尺寸：1500*900; 可视范围：950*600
                // this.startDrag(new Rectangle(-500, -300, 500, 300));
                // this.startDrag(new Rectangle(-470, -290, 470, 290)); // old
                this.startDrag(new Rectangle(-250, -150, 250, 150));
            };
            FriendSceneLayer.prototype.mouseUpHandler = function (event) {
                this.stopDrag();
                // this.xPos = this.mouseX;
                // this.yPos = this.mouseY;
                // Laya.stage.on(Laya.Event.RESIZE, this, this.resizeHandler);
            };
            FriendSceneLayer.prototype.resizeHandler = function () {
                // Laya.stage.setScreenSize();
                // Laya.stage.
            };
            FriendSceneLayer.prototype.onMouseDown = function (e) {
                var touches = e.touches;
                // 手机缩放
                if (touches && touches.length == 2) {
                    this.lastDistance = this.getDistance(touches);
                    Laya.stage.on(Event.MOUSE_MOVE, this, this.onMouseMove);
                    // this.on(Event.MOUSE_MOVE, this, this.onMouseMove);
                }
                else {
                    // 若是手机，则不可移动
                    if (GameConfig.device_type == GameConfig.MOBILE)
                        return;
                    this.isDrag = true;
                    // this.startDrag(new Rectangle(-500, -300, 500, 300));
                    Laya.stage.startDrag(new Rectangle(-500, -300, 500, 300));
                }
            };
            FriendSceneLayer.prototype.onMouseMove = function (e) {
                var distance = this.getDistance(e.touches);
                // 比较两个距离，确定是放大还是缩小
                // this.scaleX += (distance - this.lastDistance) * this.factor;
                // this.scaleY += (distance - this.lastDistance) * this.factor;
                Laya.stage.scaleX += (distance - this.lastDistance) * this.factor;
                Laya.stage.scaleY += (distance - this.lastDistance) * this.factor;
                this.lastDistance = distance;
            };
            FriendSceneLayer.prototype.onMouseUp = function (e) {
                if (GameConfig.device_type == GameConfig.MOBILE) {
                    Laya.stage.off(Event.MOUSE_MOVE, this, this.onMouseMove);
                }
                else {
                    if (this.isDrag) {
                        // this.stopDrag();
                        // this.isDrag = false;
                        Laya.stage.stopDrag();
                    }
                }
            };
            /**
             * 计算两个触摸点之间的距离
             */
            FriendSceneLayer.prototype.getDistance = function (points) {
                var distance = 0;
                if (points && points.length == 2) {
                    var dx = points[0].stageX - points[1].stageX;
                    var dy = points[0].stageY - points[1].stageY;
                    distance = Math.sqrt(dx * dx + dy * dy);
                }
                return distance;
            };
            /** 添加好友茶园土地 */
            FriendSceneLayer.prototype.addFriendLandView = function () {
                LandCtrl.getInstance().request_getFriendFarmLand();
                if (this.getChildByName("friendLandView") == null) {
                    this.addChild(LandCtrl.friendLandView);
                }
            };
            /**
             * 添加狗、茶农等
             */
            FriendSceneLayer.prototype.addTeaGardenView = function () {
                if (!this.friendTeaGardenView) {
                    // TeaGardenCtrl.instance;
                    this.friendTeaGardenView = TeaGardenCtrl.friendView;
                }
                this.addChild(this.friendTeaGardenView);
            };
            return FriendSceneLayer;
        }(BaseView));
        layers.FriendSceneLayer = FriendSceneLayer;
    })(layers = views.layers || (views.layers = {}));
})(views || (views = {}));
//# sourceMappingURL=FriendSceneLayer.js.map