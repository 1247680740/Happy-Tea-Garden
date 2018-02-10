namespace views.friendList
{
    import Event = laya.events.Event;
    import TweenUtil = utils.TweenUtil;
    import Point = laya.maths.Point;
    import MovieClip = laya.ani.swf.MovieClip;
    import Texture = laya.resource.Texture;

    /**
     * 好友茶园场景除土地外的其它视图，如：狗、狗窝、狗盆、茶农等
     * @author hsx
     */
    export class FriendTeaGardenView extends laya.ui.View
    {
        dog:MovieClip;
        farmer:MovieClip;

        static instance:FriendTeaGardenView;

        constructor()
        {
            super();

            FriendTeaGardenView.instance = this;

            this.mouseThrough = true;

            this.dog = new MovieClip(); //this.getMC(swfUrl);
            this.dog.name = "dog";

            this.farmer = new MovieClip();
            this.farmer.name = "farmer";

            this.pos(500,200);
        }

        addDog(swfUrl:string):void
        {
            // this.dog.url = swfUrl;
            this.dog.load(swfUrl);
            if(!this.getChildByName("dog"))
            {
                this.addChild(this.dog);
                // this.pos(500,200);
            }
        }

        private addFarmer():void
        {
            if(!this.getChildByName(this.farmer.name))
            {
                this.farmer.size(65,120);
                this.farmer.pos(470,100);
                this.farmer.on(Event.MOUSE_OVER,this,this.showFarmerTip);
                this.addChild(this.farmer);
            }
        }

        showFarmerTip(event:Event):void
        {
            let farmerMC:MovieClip = event.target as MovieClip;
            if(farmerMC && farmerMC.name=="farmer")
            {
                TipLayerManager.tipLayer.showDrawBgTip("工作剩余时间："+models.teaRoom.TeaGardenModel.friendTeaGardenVO.validTime,new Laya.Point(720,150));
            }
        }

        /**
         * 添加平常状态的茶农
         * 注意：此处的动画已分为 平常(farmer_13.swf)、浇水(farmer_13_water.swf)、除虫/除草(farmer_13_kill.swf) 三个动画！！！
         */
        addCommonFarmer(url:string):void
        {
            this.farmer.load(url);
            // this.farmer.url = url;
            // this.farmer.gotoAndStop(1);
            console.log("===========>"+this.farmer.url);
            this.addFarmer();
        }

        /**
         * 添加除草或除虫的茶农
         */
        addRemoveGrassWormFarmer(url:string,debuffType:String,moveTo:Point):void
        {
            let _url:string = url.substring(0,url.lastIndexOf("."));
			_url += "_kill.swf";
            // 除草动画
            if(debuffType == "removeGrass")
            {
                TweenUtil.tweenToLandGrid(views.common.CommonDisplay.getRemoveGrassImg(),moveTo);
            }
            // 杀虫动画
            if(debuffType == "killWorm")
            {
                TweenUtil.tweenToLandGrid(views.common.CommonDisplay.getKillWormImg(),moveTo);
            }
            this.farmer.url = _url;
            this.addFarmer();
        }

        /**
         * 添加浇水的茶农
         */
        addWaterFarmer(url:string,debuffType:String,moveTo:Point):void
        {
            if(debuffType!="water")
                return;

            let _url:string = url.substring(0,url.lastIndexOf("."));
			_url += "_water.swf";

            // =========================== 待完善 ！！！===========================
            // TweenUtil.tweenToLandGrid(views.common.CommonDisplay.get ,moveTo);

            this.farmer.url = _url;
            this.addFarmer();
        }

        private getMC(url:string,useAtlas:boolean=false):MovieClip
        {
            let mc:MovieClip = new MovieClip();
            // mc.on(Event.LOADED,this,this.mcLoaded);
            if(useAtlas)
                mc.load(url,true);
            else
                mc.url = url;
            return mc;
        }

    }

}