namespace views.ranklist
{
    import RankListUI = ui.gameUI.ranklist.RankListUI;
    import RowBarUI = ui.gameUI.ranklist.RowBarUI;
    import Label = laya.ui.Label;
    import Event = laya.events.Event;

    /**
     * 排行榜视图
     * @author hsx
     */
    export class RankListView extends RankListUI
    {
        /**
         * 每列名称的数组
         */
        private colTitleArr:string[] = ["玩家排行","玩家头像","玩家名字","玩家等级","玩家经验"];
        /**
         * 当前页
         */
        curPage:number = 1;
        /**
         * 每页几项
         */
        itemsPerPage:number = 6;
        /**
         * 每项间隙
         */
        itemGap:number = 5;


        constructor()
        {
            super();
            this.cacheAs = "bitmap";
            this.dragArea = `0,0,${this.width},60`;
            this.closeBtn.on(Event.CLICK,this,this.closeBtnFn);
        }

        /**
         * 初始化面板
         * 每行显示：排行 头像 名字 等级 经验（不显示：金币 钻石）
         */
        initUI(dataObj:Object):void
        {
            if(!dataObj)
                return;
            // 显示清空
            // this.dataRowsBox.removeChildren(0,this.dataRowsBox.numChildren);
            // this.pageBox.removeChildren(0,this.pageBox.numChildren);
            // if(this.getChildByName("myBox"))
            //     this.removeChildByName("myBox");

            // 玩家数据行
            let dataArr:Array<Array<string>> = dataObj["data"];
            if(!dataArr || !dataArr.length)
                return;

            let i:number;
            let len:number = dataArr.length;
            for(i=0; i<len; i++)
            {
                let objArr:string[] = dataArr[i];
                if(!objArr || !objArr.length)
                    continue;

                // 更新排名
                objArr[0] = (this.curPage-1)*this.itemsPerPage+parseInt(objArr[0])+"";

                // ["玩家排行","玩家头像","玩家名字","玩家等级","玩家经验"]
                let box:RowBarUI = new RowBarUI();
                if(objArr[0] == "1")
                {
                    box.rankIcon.visible = true;
                    box.rankIcon.skin = "gameUI/ranklist/no1.png";
                }
                if(objArr[0] == "2")
                {
                    box.rankIcon.visible = true;
                    box.rankIcon.skin = "gameUI/ranklist/no2.png";
                }
                if(objArr[0] == "3")
                {
                    box.rankIcon.visible = true;
                    box.rankIcon.skin = "gameUI/ranklist/no3.png";
                }
                box.rankOrder.text = objArr[0];
                if(objArr[1])
                    box.headIcon.skin = objArr[1];
                box.pName.text = objArr[2];
                box.lvl.text = objArr[3];
                box.exp.text = objArr[4];
                box.y = i * (38 + this.itemGap);

                this.dataRowsBox.addChild(box);
            }

            // 页码
            let pageNums:number = dataObj["page"];
            if(!pageNums || pageNums==0)
                return;
            let pageArr:Array<string> = new Array<string>();
            for(i=1; i<=pageNums; i++)
            {
                pageArr.push(i+"");
            }
            this.addColumnsToRow(pageArr,this.pageBox,10,false,true);

            // 自己的数据
            let selfObj:Object = dataObj["selfData"];
            let myBox:RowBarUI = new RowBarUI();
            myBox.name = "myBox";
            myBox.rankOrder.text = selfObj["rank"];
            myBox.headIcon.skin = controllers.player.PlayerInfoCtrl.playerInfoView.defaultIcon.skin;
            myBox.pName.text = controllers.player.PlayerInfoCtrl.playerInfoView.playerName.text;
            myBox.lvl.text = models.player.PlayerInfoModel.playerInfo.level+"";
            myBox.exp.text = selfObj["exp"];
            myBox.x = this.width-myBox.width>>1
            myBox.y = this.pageBox.y + this.pageBox.height;
            this.addChild(myBox);
        }

        /**
         * 将名称数组分别添加到一行当中的多个列中
         * @param colArr 每行含有的列的数据数组
         * @param fatherContainer 父容器
         * @param gap 每列的间隔
         * @param needIcon 行首是否需要添加图标
         * @param canClicked 是否可以点击
         */
        private addColumnsToRow(colArr:string[],fatherContainer:Sprite,gap:number=30,needIcon:boolean=false,canClicked:boolean=false):void
        {
            if(!colArr || !colArr.length || !fatherContainer)
                return;

            let padding:number;
            let i:number;
            let len:number = colArr.length;
            let allW:number = 0;
            let curLabel:Label;

            for(i=0; i<len; i++)
            {
                curLabel = fatherContainer.getChildByName("l"+i) as Label;
                if(curLabel)
                {
                    curLabel.text = colArr[i];
                    allW += curLabel.width;
                }
                else
                {
                    let label:Label = this.getLabelByIndex(i,colArr[i]);
                    fatherContainer.addChild(label);
                    allW += label.width;

                    if(canClicked)
                    {
                        if(i==0)
                            label.color = "#FF0000";
                        label.on(Event.CLICK,this,this.labelClicked);
                    }
                }
            }

            // 左右两侧边距
            padding = (fatherContainer.width - allW - gap * (len-1)) / 2;
            for(i=0; i<len; i++)
            {
                let l:Label = fatherContainer.getChildByName("l"+i) as Label;
                if(!l)
                    continue;
                if(i==0)
                    l.pos(padding,fatherContainer.height-l.height>>1);
                else
                    l.pos(i*(l.width+gap)+padding,fatherContainer.height-l.height>>1);
            }
        }

        /**
         *
         * 效果：尺寸40*28，15号字体，加粗，微软雅黑
         */
        private getLabelByIndex(index:number,txt:string):Label
        {
            let label:Label = new Label();
            label.name = "l"+index;
            label.font = "Microsoft YaHei";
            label.fontSize = 15;
            label.bold = true;
            label.text = txt;
            // label.centerX = 0;
            label.align = "center";
            label.size(30,28);  // 70,28
            return label;
        }

        /**
         * 改变颜色、换页并请求数据（只针对页码）
         */
        private labelClicked(event:Event):void
        {
            let curLabel:Label = event.target as Label;
            if(!curLabel)
                return;

            let pageLabelNum:number = this.pageBox.numChildren;
            let i:number;
            let l:Label;
            for(i=0; i<pageLabelNum; i++)
            {
                l = this.pageBox.getChildByName("l"+i) as Label;
                if(!l)
                    continue;
                l.color = "#000000";
            }
            curLabel.color = "#FF0000";

            this.curPage = parseInt(curLabel.text);
            if(this.curPage > 0)
            {
                // delete children of dataRowsBox
                this.dataRowsBox.removeChildren(0,this.dataRowsBox.numChildren);

                let paraObj:Object = {"page":this.curPage,"num":6};
                controllers.ranklist.RankListCtrl.instance.request_getGradeRank(paraObj);
            }
        }


        closeBtnFn():void
		{
			this.removeSelf();
		}

    }
}