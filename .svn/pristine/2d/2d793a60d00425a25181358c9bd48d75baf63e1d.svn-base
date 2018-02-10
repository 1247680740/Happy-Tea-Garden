namespace views.friendList
{

    import SinglePersonUI = ui.gameUI.friendList.SinglePersonUI;
    import AddFriendDialogCtrl = controllers.friendList.AddFriendDialogCtrl;
	/**
	 * 推荐好友弹窗面板
	 */
	export class RecomPalsDialogView extends ui.gameUI.friendList.SearchPalsUI
	{

		// 图片路径
        imgPath:string="gameUI/friendList/";
        //图片后缀名
        imgSuffix:string=".png";
        // 获取选中的好友ID数组
        palsIdArr:Array<string>;
        // 选中的好友Id串
        static IdStr:string="";
        static index:number=0;
        cb:Laya.CheckBox;
		constructor()
		{
			super();
			this.cacheAs = "bitmap";
            this.dragArea = `0,0,${this.width},60`;
            this.addAllBtn1.visible=true;
            this.botoom.visible=true;
            this.listTitle.visible=false;
            this.listTitleBg.visible=false;
            this.addAllBtn.visible=false;
            this.lastPageBtn.visible=false;
            this.lastPageBtn.mouseEnabled=false;
            this.nextPageBtn.visible=false;
            this.nextPageBtn.mouseEnabled=false;
            this.firstPage.visible=false;
            this.pageNums.visible=false;
            this.line.visible=false;
            this.dialogTitle.skin=this.imgPath+"recommonTitle"+this.imgSuffix;
            this.addAllBtn1.on(Laya.Event.CLICK,this,this.addFriend);
            this.closeBtn.on(Laya.Event.CLICK,this,this.cancleBtnFn);
		}

        addNewPalInfo(newPalInfoVOArr:Array<any>):void{
            if(!newPalInfoVOArr)
                return;
            this.gridContainer.removeChildren(0,this.gridContainer.numChildren-1);
            let len:number = newPalInfoVOArr.length;
            let i:number;
            let userVO:models.friendList.FriendInfoVO;
            RecomPalsDialogView.IdStr="";
            RecomPalsDialogView.index=0;
            for(i=0; i<len; i++)
            {
                userVO = newPalInfoVOArr[i];
                let gridItem:SinglePersonUI = new SinglePersonUI();
                this.cb=this.createCheckBox(gridItem);
                gridItem.name = (i+1)+"";
                this.firstPage.text=1+"";
                this.pageNums.text=userVO.pageNums;
                gridItem.orderBg.skin=this.imgPath+"love"+this.imgSuffix;
                gridItem.orderNum.text=userVO.level+"";
                gridItem.headPic.skin=userVO.imgurl;
                gridItem.personName.text=userVO.userName;
                gridItem.statusPic.visible=false;
                gridItem.statusPic.mouseEnabled=false;
                gridItem.x =10;
                gridItem.y=i*(gridItem.height+3);
                // 最多显示7小项
                if(i < 7)
                    this.gridContainer.addChild(gridItem);
                this.cb.on(Laya.Event.CLICK,this,this.selectItem,[userVO,this.cb]);
            }
        }

        selectItem(userVO:models.friendList.FriendInfoVO,cb:Laya.CheckBox):void{
            if(cb.selected==true){
                RecomPalsDialogView.index++;
                if(RecomPalsDialogView.index>1){
                    RecomPalsDialogView.IdStr+=","+userVO.userId;
                }else{
                    RecomPalsDialogView.IdStr+=userVO.userId+",";
                    let str:string=RecomPalsDialogView.IdStr;
                    console.log("获得的Id字符串："+str);
                    RecomPalsDialogView.IdStr=(str.substring(str.length-1)==",")?str.substring(0,str.length-1):str;
                    console.log("完善后的Id字符串："+RecomPalsDialogView.IdStr);
                }
            }else{
                let strStatus:number=RecomPalsDialogView.IdStr.indexOf(userVO.userId);
                if(strStatus>=0){
                    let delStr:string=userVO.userId;
                    RecomPalsDialogView.IdStr=RecomPalsDialogView.IdStr.replace(delStr,"");
                    let strRemove:string=RecomPalsDialogView.IdStr;
                    console.log("移除符号后获得的Id字符串："+strRemove);
                    RecomPalsDialogView.IdStr=(strRemove.substring(strRemove.length-1)==",")?strRemove.substring(0,strRemove.length-1):strRemove;
                    console.log("移除后最终获得的的Id字符串："+RecomPalsDialogView.IdStr);
                }else{

                }
            }
        }

        /** 创建一个checkBox组件 */
		createCheckBox(gridItem:SinglePersonUI):Laya.CheckBox
		{
            let cbSkin:string=this.imgPath+"checkbox1"+this.imgSuffix;
            let cb:Laya.CheckBox=new Laya.CheckBox(cbSkin);
            gridItem.addChild(cb);
            cb.pos(181,12);
            cb.size(20,20);
            cb.selected=false;
            return cb;
        }

        addFriend():void{
            console.log("当前添加的Id："+RecomPalsDialogView.IdStr);
            AddFriendDialogCtrl.getInstance().request_sendApplyInfo(RecomPalsDialogView.IdStr);
        }

		cancleBtnFn():void{
            this.removeSelf();
        }
	}
}