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
    var friedRoom;
    (function (friedRoom) {
        var pot;
        (function (pot_1) {
            var PotVO = models.friedRoom.pot.PotVO;
            /**
             * 整个炒锅视图
             * 1、炒锅的显示（不同等级、状态、）
             * 2、炒锅高亮
             * 3、升级、状态切换
             * 4、炒锅相关提示
             * 5、炒茶
             */
            var FriedPotView = /** @class */ (function (_super) {
                __extends(FriedPotView, _super);
                function FriedPotView() {
                    var _this = _super.call(this) || this;
                    _this.cacheAs = "bitmap";
                    _this.potSprite = new Sprite();
                    _this.addChild(_this.potSprite);
                    FriedPotView.instance = _this;
                    return _this;
                }
                /**
                 * 初始化并填充炒锅
                 */
                FriedPotView.prototype.fillPot = function (potArr) {
                    if (!potArr)
                        return;
                    var i;
                    var j;
                    var len = potArr.length;
                    var isStartNull = true;
                    var potGridVO;
                    var potGrid;
                    this.potsArr = new Array();
                    this.openedPotNums = 0;
                    for (i = 0; i < 6; i++) {
                        if (i < len) {
                            potGridVO = potArr[i];
                            this.openedPotNums++;
                        }
                        else {
                            j = i + 1;
                            potGridVO = new PotVO(j);
                        }
                        potGrid = new views.friedRoom.pot.PotGridView();
                        switch (i) {
                            case 0:
                                potGrid.pos(280, 33);
                                break;
                            case 1:
                                potGrid.pos(90, 70);
                                break;
                            case 2:
                                potGrid.pos(100, 200);
                                break;
                            case 3:
                                potGrid.pos(300, 250);
                                break;
                            case 4:
                                potGrid.pos(390, 140);
                                break;
                            case 5:
                                potGrid.pos(230, 130);
                                break;
                        }
                        potGrid.initPot(potGridVO);
                        this.potSprite.addChild(potGrid);
                        this.potsArr.push(potGridVO);
                    }
                };
                /**
                 * 返回特定的炒锅View
                 */
                FriedPotView.prototype.getPotGridById = function (potId) {
                    var pot = FriedPotView.instance.potSprite.getChildByName(potId + "");
                    if (!pot)
                        return null;
                    return pot;
                };
                /**
                 * 激活后相关炒锅状态的更新
                 */
                FriedPotView.prototype.updatePotGrid = function (potId) {
                    this.openedPotNums++;
                    this.potsArr[potId - 1].level = 1;
                    var curPot = controllers.friedRoom.pot.PotCtrl.friedPotView.getPotGridById(potId);
                    curPot.unlockState(1);
                };
                /**
                 * 炒锅升级后状态及数据的更新（两个PotVO不一样，故先写两个）
                 */
                FriedPotView.prototype.updatePotGrid2 = function (potVO) {
                    this.potsArr[potVO.potId - 1].level = potVO.potLvl;
                    var curPot = controllers.friedRoom.pot.PotCtrl.friedPotView.getPotGridById(potVO.potId);
                    curPot.unlockState(potVO.potLvl); // 暂未考虑强化后的状态
                };
                FriedPotView.prototype.curPotGridClkedFun = function (data) {
                    this.event(FriedPotView.WILL_ASSART_EVENT, data);
                };
                /** 准备解锁 */
                FriedPotView.WILL_ASSART_EVENT = "will_assart_event2";
                return FriedPotView;
            }(laya.ui.View));
            pot_1.FriedPotView = FriedPotView;
        })(pot = friedRoom.pot || (friedRoom.pot = {}));
    })(friedRoom = views.friedRoom || (views.friedRoom = {}));
})(views || (views = {}));
//# sourceMappingURL=FriedPotView.js.map