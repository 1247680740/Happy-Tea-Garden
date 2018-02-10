namespace views.layers
{
    import Sprite = laya.display.Sprite;
    import Event = laya.events.Event;
    import BaseView = views.base.BaseView;
    import UILayerManager=managers.UILayerManager;
    import FriedPotLayerUI=ui.gameUI.pot.FriedTeaPotUI;

    /**
     * 炒茶室场景层
     * 在此类加入炒茶相关的视图 -- hsx
     */
    export class FriedTeaHomeLayer extends BaseView
    {
        private bgUrl: string = "res/gameAssets/imgs/";
        // 地图尺寸：1000*600,分成4*3的尺寸为250*200的小图
        /**
         * 小地图块宽
         */
        private pieceW:number = 250;
        /**
         * 小地图块高
         */
        private pieceH:number = 200;

        constructor()
        {
            super();

            this.loadBg();
        }

        /**
         * 加载裁切的多个小图
         */
        private loadBg(): void
        {
            let imgsArr: string[] = [];
            let index: number;
            for (index = 1; index <= 12; index++)
            {
                imgsArr[index - 1] = this.bgUrl + "friedRoom/bg_" + index + ".png";
            }
            for (index = 0; index < imgsArr.length; index++)
            {
                let m: number =  Math.floor(index / 4);
                let n: number =  index % 4;
                this.loadImage(imgsArr[index], n * this.pieceW, m * this.pieceH, this.pieceW, this.pieceH);
            }
        }

        /**
         * 添加炒锅视图
         */
        addFriedTeaView():void
        {
            Laya.stage.addChildAt(this,0);
            controllers.friedRoom.pot.PotCtrl.getInstance().request_getFarmPot();
            controllers.friedRoom.pot.PotCtrl.friedPotView.pos(195,200);
            this.addChild(controllers.friedRoom.pot.PotCtrl.friedPotView);
        }

    }
}


