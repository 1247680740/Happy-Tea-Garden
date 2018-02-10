var views;
(function (views) {
    var common;
    (function (common) {
        var Sprite = laya.display.Sprite;
        var Text = laya.display.Text;
        /**
         * 一般通用显示类：包含 金币奖励、经验奖励、除虫、除草、
         * @author hsx
         */
        var CommonDisplay = /** @class */ (function () {
            function CommonDisplay() {
            }
            CommonDisplay.getRemoveGrassImg = function () {
                var icon = new Laya.Image();
                icon.skin = CommonDisplay.removeGrass;
                icon.pos(780, 250);
                return icon;
            };
            CommonDisplay.getKillWormImg = function () {
                var icon = new Laya.Image();
                icon.skin = CommonDisplay.killWorm;
                icon.pos(780, 250);
                return icon;
            };
            /**
            * 经验奖励
            */
            CommonDisplay.expPrize = function (num) {
                var prizeSpr = this.getPrizeSpr("exp", num);
                return prizeSpr;
            };
            /**
             * 金币奖励
             */
            CommonDisplay.moneyPrize = function (num) {
                var prizeSpr = this.getPrizeSpr("money", num);
                return prizeSpr;
            };
            CommonDisplay.getPrizeSpr = function (type, num) {
                var url;
                if (type == "exp")
                    url = CommonDisplay.expUrl;
                else if (type == "money")
                    url = CommonDisplay.moneyUrl;
                var prizeIcon = new Laya.Image();
                prizeIcon.skin = url;
                prizeIcon.size(30, 30);
                var prizeSpr = new Sprite();
                var text = new Text();
                text.fontSize = 20;
                text.color = "#FFFFFF";
                text.bold = true;
                text.text = "+" + num;
                prizeSpr.addChild(prizeIcon);
                prizeSpr.addChild(text);
                text.pos(30, 5);
                return prizeSpr;
            };
            /**
             * 经验图标
             */
            CommonDisplay.expUrl = "res/gameAssets/swfs/prize/exp/image/1.png";
            /**
             * 金币图标
             */
            CommonDisplay.moneyUrl = "res/gameAssets/swfs/prize/money/image/1.png";
            /**
             * 镰刀图标
             */
            CommonDisplay.removeGrass = "res/gameAssets/imgs/removeGrass.png";
            /**
             * 瓢虫图标
             */
            CommonDisplay.killWorm = "res/gameAssets/imgs/killWorm.png";
            return CommonDisplay;
        }());
        common.CommonDisplay = CommonDisplay;
    })(common = views.common || (views.common = {}));
})(views || (views = {}));
//# sourceMappingURL=CommonDisplay.js.map