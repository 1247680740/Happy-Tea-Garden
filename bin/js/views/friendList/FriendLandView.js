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
    var friendList;
    (function (friendList) {
        var LandVO = models.teaRoom.LandVO;
        var Handler = laya.utils.Handler;
        var FriendLandGridView = views.friendList.FriendLandGridView;
        /**
         * 土地视图
         * 1、土地的显示（不同等级、干旱、浇水、）
         * 2、地块高亮
         * 3、升级、状态切换
         * 4、土地相关提示
         * 5、种植
         *
         *
         * 干旱：
         * 1、减少成熟作物的产量
         * 2、在土地干旱的状态下作物成熟，土地解除干旱状态（老版本未解除，在铲除枯萎后则解除！）
         * 3、无作物、作物已枯萎或成熟的土地不会干旱
         *
         * 浇水后：
         * 1、地块显示非干旱状态
         * 2、提示：谢谢你帮我浇水 / 这块土地现在不需要浇水
         *
         */
        var FriendLandView = /** @class */ (function (_super) {
            __extends(FriendLandView, _super);
            function FriendLandView() {
                var _this = _super.call(this) || this;
                _this.imgHandler = Handler.create(_this, _this.imgLoadedHandler);
                /** 是否为第一个未开垦的土地（其携带未开垦图标） */
                _this.isFirstDisableLand = true;
                FriendLandView.instance = _this;
                _this.cacheAs = "bitmap";
                _this.landSprite = new Sprite();
                _this.addChild(_this.landSprite);
                _this.pos(380, 300);
                _this.bgUrl = "gameUI/land/landBg.png";
                _this.loadImage(_this.bgUrl, 0, 0, _this.width, _this.height, _this.imgHandler);
                return _this;
            }
            /** 土地背景加载完成  */
            FriendLandView.prototype.imgLoadedHandler = function () {
                this.loadImage(this.bgUrl);
            };
            /** 填充土地 */
            FriendLandView.prototype.fillLand = function (landArr) {
                if (!landArr || landArr.length == 0)
                    return;
                var i;
                var landGridNum = landArr.length;
                var landGridVO;
                var landGrid;
                var colNum;
                var lineNum;
                var isStartChange = true;
                for (i = 0; i <= 24; i++) {
                    if (landGridNum === 24) {
                        landGridVO = landArr[i];
                    }
                    else {
                        if (i < landGridNum)
                            landGridVO = landArr[i];
                        else {
                            isStartChange && i++;
                            isStartChange = false;
                            landGridVO = new LandVO(i);
                        }
                    }
                    landGrid = new FriendLandGridView();
                    if (!landGridVO)
                        continue;
                    landGrid.name = landGridVO.id + "";
                    colNum = (landGridVO.id - 1) % 4;
                    lineNum = parseInt((landGridVO.id - 1) / 4 + "");
                    landGrid.x = configs.GameConfig.LAND_RELATIVE_X + (lineNum - colNum) * (configs.GameConfig.LAND_WIDTH * 0.5 + 2);
                    landGrid.y = configs.GameConfig.LAND_RELATIVE_Y + lineNum * (configs.GameConfig.LAND_HEIGHT * 0.5 + 1) + colNum * (configs.GameConfig.LAND_HEIGHT * 0.5);
                    this.landSprite.addChild(landGrid);
                    this.setLandGridState(landGrid, landGridVO);
                }
            };
            /** 根据实际数据设定土地格子的具体状态 */
            FriendLandView.prototype.setLandGridState = function (grid, gridVO) {
                if (!grid || !gridVO)
                    return;
                // 土地的状态,0:未开垦,1:正常,2:干旱
                switch (gridVO.status) {
                    case 0:
                        grid.disableLand.visible = true;
                        if (this.isFirstDisableLand) {
                            // grid.disableTip.visible = true;
                            this.curLandGrid = grid;
                            this.curLandVO = gridVO;
                            this.isFirstDisableLand = false;
                        }
                        break;
                    case 1:// 正常：普通、红、黑
                        switch (gridVO.level) {
                            case 0:
                                grid.commonLand.visible = true;
                                break;
                            case 1:
                                grid.redLand.visible = true;
                                break;
                            case 2:
                                grid.blackLand.visible = true;
                                break;
                        }
                        break;
                    case 2:// 干旱：普通、红、黑
                        switch (gridVO.level) {
                            case 0:
                                grid.dryCommonLand.visible = true;
                                break;
                            case 1:
                                grid.dryRedLand.visible = true;
                                break;
                            case 2:
                                grid.dryBlackLand.visible = true;
                                break;
                        }
                        break;
                }
            };
            /**
             * 土地状态变化后（如：土地升级、浇水后）更新其显示状态
             */
            FriendLandView.prototype.updateLandGridState = function (landId, landVO) {
                var curLandGrid = this.getLandGridById(landId);
                if (!curLandGrid || !landVO)
                    return;
                curLandGrid.resetShowState();
                this.setLandGridState(curLandGrid, landVO);
            };
            /**
             * 根据地块id获取地块对象
             */
            FriendLandView.prototype.getLandGridById = function (landId) {
                return this.landSprite.getChildByName(landId + "");
            };
            return FriendLandView;
        }(laya.ui.View));
        friendList.FriendLandView = FriendLandView;
    })(friendList = views.friendList || (views.friendList = {}));
})(views || (views = {}));
//# sourceMappingURL=FriendLandView.js.map