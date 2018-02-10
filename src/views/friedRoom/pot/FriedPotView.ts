namespace views.friedRoom.pot
{
    import PotVO=models.friedRoom.pot.PotVO;
    import Image = laya.ui.Image;
    import Handler = laya.utils.Handler;
    import Texture = laya.resource.Texture;
    // import PotGridView=views.friedRoom.pot.PotGridView;
    // import GameConfig = configs.GameConfig;
    import GlowFilter = laya.filters.GlowFilter;
    import ColorFilter = laya.filters.ColorFilter;
    import Event = laya.events.Event;
    import TextArea = laya.ui.TextArea;
    import PotGridView=views.friedRoom.pot.PotGridView;

    /**
     * 整个炒锅视图
     * 1、炒锅的显示（不同等级、状态、）
     * 2、炒锅高亮
     * 3、升级、状态切换
     * 4、炒锅相关提示
     * 5、炒茶
     */
    export class FriedPotView extends laya.ui.View
    {
        /** 准备解锁 */
        static WILL_ASSART_EVENT: string = "will_assart_event2";
        /** 将要解锁的炒锅 */
        curPotGrid: views.friedRoom.pot.PotGridView;
        /**
         * 所有锅对应的VO数组
         */
        potsArr:Array<PotVO>;

        curPotVO:PotVO;

        /** 存放6个炒锅的容器 */
        potSprite: Sprite;

        /**
         * 已开启炒锅的数量
         */
        openedPotNums:number;

        static instance:FriedPotView;

        constructor()
        {
            super();
            this.cacheAs = "bitmap";
            this.potSprite = new Sprite();
            this.addChild(this.potSprite);
            FriedPotView.instance = this;
        }

        /**
         * 初始化并填充炒锅
         */
        fillPot(potArr: Array<PotVO>): void
        {
            if (!potArr)
                return;

            let i:number;
            let j:number;
            let len: number = potArr.length;
            let isStartNull:boolean = true;
            let potGridVO: PotVO;
            let potGrid: views.friedRoom.pot.PotGridView;
            this.potsArr=new Array<PotVO>();
            this.openedPotNums = 0;
            for (i=0; i<6; i++)
            {
                if (i < len)
                {
                    potGridVO = potArr[i];
                    this.openedPotNums++;
                }
                else
                {
                    j = i + 1;
                    potGridVO = new PotVO(j);
                }
                potGrid = new views.friedRoom.pot.PotGridView();
                switch (i)
                {
                    case 0:
                        potGrid.pos(280,33);
                        break;
                    case 1:
                         potGrid.pos(90,70);
                        break;
                    case 2:
                        potGrid.pos(100,200);
                        break;
                    case 3:
                         potGrid.pos(300,250);
                        break;
                    case 4:
                        potGrid.pos(390,140);
                        break;
                    case 5:
                        potGrid.pos(230,130);
                        break;
                }
                potGrid.initPot(potGridVO);
                this.potSprite.addChild(potGrid);
                this.potsArr.push(potGridVO);
            }
        }

        /**
         * 返回特定的炒锅View
         */
        getPotGridById(potId:number):PotGridView
        {
            let pot:PotGridView = FriedPotView.instance.potSprite.getChildByName(potId+"") as PotGridView;
            if(!pot)
                return null;
            return pot;
        }

        /**
         * 激活后相关炒锅状态的更新
         */
        updatePotGrid(potId:number): void
        {
            this.openedPotNums++;
            this.potsArr[potId-1].level = 1;
            let curPot:PotGridView = controllers.friedRoom.pot.PotCtrl.friedPotView.getPotGridById(potId);
            curPot.unlockState(1);
        }

        /**
         * 炒锅升级后状态及数据的更新（两个PotVO不一样，故先写两个）
         */
        updatePotGrid2(potVO:models.base.PotVO):void
        {
            this.potsArr[potVO.potId-1].level = potVO.potLvl;
            let curPot:PotGridView = controllers.friedRoom.pot.PotCtrl.friedPotView.getPotGridById(potVO.potId);
            curPot.unlockState(potVO.potLvl);   // 暂未考虑强化后的状态
        }

        curPotGridClkedFun(data?: any): void
        {
            this.event(FriedPotView.WILL_ASSART_EVENT, data);
        }

    }
}