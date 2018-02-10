namespace views.layers
{
    import Sprite = laya.display.Sprite;
    import Event = laya.events.Event;
    import BaseView = views.base.BaseView;
    import TeaGardenView = views.teaRoom.TeaGardenView;
    import Rectangle = laya.maths.Rectangle;
    import LandCtrl = controllers.teaRoom.LandCtrl;
    import TeaGardenCtrl = controllers.teaRoom.TeaGardenCtrl;
    import GameConfig = configs.GameConfig;
    import TeaGardenModel = models.teaRoom.TeaGardenModel;

    /**
     * 茶园场景层
     */
    export class SceneLayer extends BaseView
    {
        private bgUrl: string = "res/gameAssets/imgs/teaRoom/";
        private bgName: string = "gameBg.jpg";
        /**
         * 小地图块宽
         */
        private pieceW:number = 500;
        /**
         * 小地图块高
         */
        private pieceH:number = 300;

        /**
         * 记录上次触模点间的距离
         */
        private lastDistance: number = 0;
        /**
         * 缩放系数
         */
        private factor: number = 0.0004; // 0.001
        private isDrag: boolean = false;

        /**
         * 茶园中除土地外的其它视图
         */
        teaGardenView: TeaGardenView;

        private static instance: SceneLayer;

        /** 背景图片ID数组 */
        indexArr:number[]=[1001,2001,3001,4001,50001,6001,7001,8001];

        constructor(bgName?: string)
        {
            super();
            SceneLayer.instance = this;

            if (bgName)
                this.bgName = bgName;
            this.loadBg();
            // this.reLoadBg(TeaGardenModel.userDecVOArr);
            // 两指缩放用
            Laya.stage.on(Event.MOUSE_UP, this, this.onMouseUp);
            Laya.stage.on(Event.MOUSE_OUT, this, this.onMouseUp);
            // this.on(Event.MOUSE_UP, this, this.onMouseUp);
            // this.on(Event.MOUSE_OUT, this, this.onMouseUp);

            // 同时发送多个请求时冲突
            // this.initScene();
        }

        /**
         * 主场景的初始化
         */
        initScene(): void
        {
            this.addDog();

        }

        /**
         * 加载裁切的多个小图
         */
        private loadBg(): void
        {
            let imgsArr: string[] = [];
            let index: number;
            for (index = 1; index <= 9; index++)
            {
                imgsArr[index - 1] = this.bgUrl + "bg_2001/bg1_" + index + ".png";
            }
            for (index = 0; index < imgsArr.length; index++)
            {
                let m: number =  Math.floor(index / 3);
                let n: number =  index % 3;
                this.loadImage(imgsArr[index], n * this.pieceW, m * this.pieceH, this.pieceW, this.pieceH);
            }

            Laya.stage.on(Event.MOUSE_DOWN, this, this.onMouseDown);
        }

        reLoadBg(decVOArr:Array<models.base.ToolVO>):void
        {
            let i:number;
            let len:number = decVOArr.length;
            let decVO:models.base.ToolVO = new models.base.ToolVO();
            let imgsArr: string[] = [];
            let index: number;
            // this.graphics.clear();
            for(i=0;i<len;i++){
                decVO = decVOArr[i];
                if(i==0){
                    if(this.indexArr.indexOf(decVO.id) != -1)
                    {
                        // let pcName:string="http://kaixinh5game.maimaicha.net/static/d/d/bg_6001.jpg";  //test
                        // this.loadImage(pcName,0,0,1500,900);  //test
                        let pageName:string=decVO.icon.substring(decVO.icon.lastIndexOf("/")+1,decVO.icon.lastIndexOf("."));   //  pcName.lastIndexOf("/")+1,pcName.lastIndexOf(".")
                        for (index = 1; index <= 9; index++)
                        {
                            imgsArr[index - 1] = this.bgUrl + pageName+"/bg1_" + index + ".png";
                        }
                        for (index = 0; index < imgsArr.length; index++)
                        {
                            let m: number =  Math.floor(index / 3);
                            let n: number =  index % 3;
                            this.loadImage(imgsArr[index], n * this.pieceW, m * this.pieceH, this.pieceW, this.pieceH);
                        }
                    }
                }
            }
        }

        mouseDownHandler(event?: Event): void
        {
            // 总尺寸：1500*900; 可视范围：950*600
            // this.startDrag(new Rectangle(-500, -300, 500, 300));
            // this.startDrag(new Rectangle(-470, -290, 470, 290)); // old
            this.startDrag(new Rectangle(-250, -150, 250, 150));

        }

        xPos: number;
        yPos: number;
        mouseUpHandler(event?: Event): void
        {
            this.stopDrag();

            // this.xPos = this.mouseX;
            // this.yPos = this.mouseY;
            // Laya.stage.on(Laya.Event.RESIZE, this, this.resizeHandler);
        }

        resizeHandler(): void
        {
            // Laya.stage.setScreenSize();
            // Laya.stage.
        }

        private onMouseDown(e: Event): void
        {
            let touches: Array<any> = e.touches;
            // 手机缩放
            if (touches && touches.length == 2)
            {
                this.lastDistance = this.getDistance(touches);
                Laya.stage.on(Event.MOUSE_MOVE, this, this.onMouseMove);
                // this.on(Event.MOUSE_MOVE, this, this.onMouseMove);
                console.log("SceneLayer, touches:" + touches + ", touches.len:" + touches.length);
            }
            else
            {
                // 若是手机，则不可移动
                if (GameConfig.device_type == GameConfig.MOBILE)
                    return;
                this.isDrag = true;
                // this.startDrag(new Rectangle(-500, -300, 500, 300));
                Laya.stage.startDrag(new Rectangle(-500, -300, 500, 300));
            }
        }

        private onMouseMove(e: Event): void
        {
            let distance: number = this.getDistance(e.touches);

            // 比较两个距离，确定是放大还是缩小
            // this.scaleX += (distance - this.lastDistance) * this.factor;
            // this.scaleY += (distance - this.lastDistance) * this.factor;
            Laya.stage.scaleX += (distance - this.lastDistance) * this.factor;
            Laya.stage.scaleY += (distance - this.lastDistance) * this.factor;

            this.lastDistance = distance;
        }

        private onMouseUp(e: Event): void
        {
            if (GameConfig.device_type == GameConfig.MOBILE)
            {
                Laya.stage.off(Event.MOUSE_MOVE, this, this.onMouseMove);
            }
            else
            {
                if (this.isDrag)
                {
                    // this.stopDrag();
                    // this.isDrag = false;
                    Laya.stage.stopDrag();
                }
            }
        }

        /**
         * 计算两个触摸点之间的距离
         */
        private getDistance(points: Array<any>): number
        {
            let distance: number = 0;
            if (points && points.length == 2)
            {
                let dx: number = points[0].stageX - points[1].stageX;
                let dy: number = points[0].stageY - points[1].stageY;

                distance = Math.sqrt(dx * dx + dy * dy);
            }
            return distance;
        }

        /**
         * 添加土地
         */
        addLandView(): void
        {
            LandCtrl.getInstance().request_getFarmLand();
            this.addChild(LandCtrl.landView);
        }

        /**
         * 添加狗、茶农等
         */
        addTeaGardenView(): void
        {
            if (!this.teaGardenView)
            {
                TeaGardenCtrl.getInstance;
                this.teaGardenView = TeaGardenCtrl.view;
            }
            this.addChild(this.teaGardenView);
        }

        /**
         * 添加狗
         */
        addDog(): void
        {
            TeaGardenCtrl.getInstance().request_initDog();
            // this.teaGardenView.addDog();
        }


    }
}
