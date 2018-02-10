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
        var BaseView = views.base.BaseView;
        /**
         * 炒茶室场景层
         * 在此类加入炒茶相关的视图 -- hsx
         */
        var FriedTeaHomeLayer = /** @class */ (function (_super) {
            __extends(FriedTeaHomeLayer, _super);
            function FriedTeaHomeLayer() {
                var _this = _super.call(this) || this;
                _this.bgUrl = "res/gameAssets/imgs/";
                // 地图尺寸：1000*600,分成4*3的尺寸为250*200的小图
                /**
                 * 小地图块宽
                 */
                _this.pieceW = 250;
                /**
                 * 小地图块高
                 */
                _this.pieceH = 200;
                _this.loadBg();
                return _this;
            }
            /**
             * 加载裁切的多个小图
             */
            FriedTeaHomeLayer.prototype.loadBg = function () {
                var imgsArr = [];
                var index;
                for (index = 1; index <= 12; index++) {
                    imgsArr[index - 1] = this.bgUrl + "friedRoom/bg_" + index + ".png";
                }
                for (index = 0; index < imgsArr.length; index++) {
                    var m = Math.floor(index / 4);
                    var n = index % 4;
                    this.loadImage(imgsArr[index], n * this.pieceW, m * this.pieceH, this.pieceW, this.pieceH);
                }
            };
            /**
             * 添加炒锅视图
             */
            FriedTeaHomeLayer.prototype.addFriedTeaView = function () {
                Laya.stage.addChildAt(this, 0);
                controllers.friedRoom.pot.PotCtrl.getInstance().request_getFarmPot();
                controllers.friedRoom.pot.PotCtrl.friedPotView.pos(195, 200);
                this.addChild(controllers.friedRoom.pot.PotCtrl.friedPotView);
            };
            return FriedTeaHomeLayer;
        }(BaseView));
        layers.FriedTeaHomeLayer = FriedTeaHomeLayer;
    })(layers = views.layers || (views.layers = {}));
})(views || (views = {}));
//# sourceMappingURL=FriedTeaHomeLayer.js.map