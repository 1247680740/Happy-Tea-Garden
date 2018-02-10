namespace views.friendList
{

    import SinglePersonUI = ui.gameUI.friendList.SinglePersonUI;
    import AddFriendDialogCtrl = controllers.friendList.AddFriendDialogCtrl;
    import FriendListCtrl = controllers.friendList.FriendListCtrl;
	/**
	 * 添加好友弹窗面板
	 */
	export class AddFriendDialogView extends ui.gameUI.friendList.SearchPalsUI
	{

		// 图片路径
        imgPath:string="gameUI/friendList/";
        //图片后缀名
        imgSuffix:string=".png";
        // 获取选中的好友ID数组
        palsIdArr:Array<string>;
        // 选中的好友Id串
        static IdStr:string="";
        static index:number =0;
        // 当前页数
        curPage:number=1;
        // 当前搜索的好友名称
        curPalName:string;
        cb:Laya.CheckBox;
		constructor()
		{
			super();
			this.cacheAs = "bitmap";
            this.dragArea = `0,0,${this.width},60`;
            this.addAllBtn1.visible=false;
            this.botoom.visible=false;
            this.gridContainer.vScrollBarSkin="";
            this.addAllBtn.on(Laya.Event.CLICK,this,this.addFriend);
            this.lastPageBtn.on(Laya.Event.CLICK,this,this.lastPagePals);
            this.nextPageBtn.on(Laya.Event.CLICK,this,this.nextPagePals);
            this.closeBtn.on(Laya.Event.CLICK,this,this.cancleBtnFn);
		}

        addNewPalInfo(newPalInfoVOArr:Array<any>):void{
            if(!newPalInfoVOArr)
                return;
            this.gridContainer.removeChildren(0,this.gridContainer.numChildren-1);
            let len:number = newPalInfoVOArr.length;
            let i:number;
            let userVO:models.friendList.FriendInfoVO;
            AddFriendDialogView.IdStr="";
            AddFriendDialogView.index=0;
            for(i=0; i<len; i++)
            {
                userVO = newPalInfoVOArr[i];
                let gridItem:SinglePersonUI = new SinglePersonUI();
                this.cb=this.createCheckBox(gridItem);
                gridItem.name = (i+1)+"";
                this.firstPage.text=this.curPage+"";
                this.pageNums.text=userVO.pageNums;
                gridItem.orderBg.skin=this.imgPath+"love"+this.imgSuffix;
                gridItem.orderNum.text=userVO.level+"";
                gridItem.headPic.skin=userVO.imgurl;
                gridItem.personName.text=userVO.userName;
                this.curPalName=userVO.userName;
                gridItem.statusPic.visible=false;
                gridItem.x =10;
                gridItem.y=i*(gridItem.height+3);
                // 最多显示7小项
                if(i < 7)
                    this.gridContainer.addChild(gridItem);
                this.cb.on(Laya.Event.CLICK,this,this.selectItem,[userVO,this.cb]);
            }
        }

        lastPagePals():void{
            if(parseInt(this.firstPage.text)<2)
                return;
            this.curPage--;
            if(this.curPage<1){
                this.curPage=1;
                this.firstPage.text=this.curPage+"";
            }else{
                this.firstPage.text=this.curPage+""
                FriendListCtrl.getInstance().request_getPagePals(this.curPalName,this.curPage);
            }
        }

        nextPagePals():void{
			if(parseInt(this.pageNums.text)<2)
				return;
			this.curPage++;
			if(this.curPage>parseInt(this.pageNums.text)){
				this.curPage=parseInt(this.pageNums.text);
				this.firstPage.text=this.curPage+"";
			}else{
				this.firstPage.text=this.curPage+""
				FriendListCtrl.getInstance().request_getPagePals(this.curPalName,this.curPage);
			}
        }

        selectItem(userVO:models.friendList.FriendInfoVO,cb:Laya.CheckBox):void{
            if(cb.selected==true){
                AddFriendDialogView.index++;
                if(AddFriendDialogView.index>1){
                    AddFriendDialogView.IdStr+=","+userVO.userId;
                }else{
                    AddFriendDialogView.IdStr+=userVO.userId+",";
                    let str:string=AddFriendDialogView.IdStr;
                    AddFriendDialogView.IdStr=(str.substring(str.length-1)==",")?str.substring(0,str.length-1):str;
                }
            }else{
                let strStatus:number=AddFriendDialogView.IdStr.indexOf(userVO.userId);
                if(strStatus>=0){
                    let delStr:string=userVO.userId;
                    AddFriendDialogView.IdStr=AddFriendDialogView.IdStr.replace(delStr,"");
                    let strRemove:string=AddFriendDialogView.IdStr;
                    AddFriendDialogView.IdStr=(strRemove.substring(strRemove.length-1)==",")?strRemove.substring(0,strRemove.length-1):strRemove;
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
            console.log("当前添加的Id："+AddFriendDialogView.IdStr);
            AddFriendDialogCtrl.getInstance().request_startAddPals(AddFriendDialogView.IdStr);
            this.cancleBtnFn();
        }

		cancleBtnFn():void{
            this.removeSelf();
        }
	}
}