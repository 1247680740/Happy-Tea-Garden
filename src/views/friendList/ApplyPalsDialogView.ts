namespace views.friendList
{

    import SinglePersonUI = ui.gameUI.friendList.SinglePersonUI;
    import AddFriendDialogCtrl = controllers.friendList.AddFriendDialogCtrl;
    import FriendListCtrl = controllers.friendList.FriendListCtrl;
	/**
	 * 好友申请弹窗面板
	 */
	export class ApplyPalsDialogView extends ui.gameUI.friendList.SearchPalsUI
	{

		// 图片路径
        imgPath:string="gameUI/friendList/";
        //图片后缀名
        imgSuffix:string=".png";

        // 当前页数
        curPage:number=1;
        // 同意的好友Id串
        static IdStr:string;
        static index:number =0;
        // 当前搜索的好友名称
        curPalName:string;
		constructor()
		{
			super();
			this.cacheAs = "bitmap";
            this.dragArea = `0,0,${this.width},60`;
            this.addAllBtn1.visible=false;
            this.botoom.visible=false;
            ApplyPalsDialogView.IdStr="";
            this.gridContainer.vScrollBarSkin="";
            this.dialogTitle.skin=this.imgPath+"applyTitle"+this.imgSuffix;
            this.listTitle.skin=this.imgPath+"applyTopTip"+this.imgSuffix;
            this.addAllBtnBg.skin=this.imgPath+"agreeAll"+this.imgSuffix;
            this.addAllBtn.on(Laya.Event.CLICK,this,this.agreeAll);
            this.lastPageBtn.on(Laya.Event.CLICK,this,this.lastPagePals);
            this.nextPageBtn.on(Laya.Event.CLICK,this,this.nextPagePals);
            this.closeBtn.on(Laya.Event.CLICK,this,this.cancleBtnFn);
		}

        addNewPalInfo(newPalInfoVOArr:Array<any>):void{
            this.gridContainer.removeChildren(0,this.gridContainer.numChildren-1);
            if(newPalInfoVOArr.length<=0){
                let textAri:Laya.TextArea =new Laya.TextArea();
                textAri.text="温馨提示：暂时还没有好友向你发出请求";
                textAri.size(232,18);
                textAri.fontSize=12;
                textAri.color="#885B2E";
                this.gridContainer.addChild(textAri);
                textAri.pos(0,this.gridContainer.height>>1);
                this.firstPage.text=this.pageNums.text=1+"";
            }else{
                let len:number = newPalInfoVOArr.length;
                let i:number;
                let userVO:models.friendList.FriendInfoVO;
                AddFriendDialogView.IdStr="";
                AddFriendDialogView.index=0;
                for(i=0; i<len; i++)
                {
                    userVO = newPalInfoVOArr[i];
                    let gridItem:SinglePersonUI = new SinglePersonUI();
                    gridItem.name = (i+1)+"";
                    this.firstPage.text=this.curPage+"";
                    this.pageNums.text=userVO.pageNums;
                    gridItem.orderBg.skin=this.imgPath+"love"+this.imgSuffix;
                    gridItem.orderNum.text=userVO.level+"";
                    gridItem.personName.text=userVO.userName;
                    gridItem.x =10;
                    gridItem.y=i*(gridItem.height+3);
                    // 最多显示7小项
                    if(i < 7)
                        this.gridContainer.addChild(gridItem);
                    ApplyPalsDialogView.IdStr+=userVO.userId+",";
                }
            }
        }
        agreeAll():void{
            if(ApplyPalsDialogView.IdStr.indexOf(",")>0){
                let str:string=ApplyPalsDialogView.IdStr;
                ApplyPalsDialogView.IdStr=(str.substring(str.length-1)==",")?str.substring(0,str.length-1):str;
                AddFriendDialogCtrl.getInstance().request_agreeApply(ApplyPalsDialogView.IdStr,1);
            }else{
                return;
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
                FriendListCtrl.getInstance().request_getPalsApply(this.curPage);
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
				FriendListCtrl.getInstance().request_getPalsApply(this.curPage);
			}
        }

		cancleBtnFn():void{
            this.removeSelf();
        }
	}
}