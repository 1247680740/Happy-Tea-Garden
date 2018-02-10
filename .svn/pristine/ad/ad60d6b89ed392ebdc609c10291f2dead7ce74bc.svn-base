namespace views.makeRoom.shop
{
	import Image = laya.ui.Image;
	import Box = laya.ui.Box;
	import Event = laya.events.Event;
	import SeedVO = models.base.SeedVO;
	import ToolVO = models.base.ToolVO;
	// import ShopStoragePanelUI = ui.gameUI.common.ShopStoragePanelUI;
	import TabItemUI = ui.gameUI.common.TabItemUI;
	import BaseBorderUI = ui.gameUI.common.BaseBorderUI;;
	import ShopRightContentUI = ui.gameUI.shop.ShopRightContentUI;

	/**
	 * 泡茶室商店弹出面板
	 */
	export class MakeTeaShopDialogView extends BaseBorderUI// ShopStoragePanelUI
	{
		private titleUrl:string = "gameUI/common/icon/shopName.png";
		private baseUrl:string = "gameUI/common/icon/";

		/** 类型前缀 */
		private typePrefix:string = "gameUI/common/resTypeIcon/";
		/** 类型后缀 */
		private typeSuffix:string = ".png";
		/** 金币图标 */
		private moneyUrl:string = "gameUI/common/icon/money.png";
		/** 钻石图标 */
		private goldUrl:string = "gameUI/common/icon/gold.png";

		/** 茶叶 */
		private teaLogoUrl:string = this.baseUrl+"teaTabBg.png";
		/** seedTab's icon（原料） */
		private materialLogoUrl:string = this.baseUrl+"materialTabBg.png";

		/**
		 * 种子选项卡（原料）
		 */
		seedTab:TabItemUI;
		/**
		 * 工具选项卡
		 */
		toolTab:TabItemUI;
		/**
		 * 单元格容器
		 */
		gridContainer:Laya.Panel;

		/**
		 * 右侧内容区域
		 */
		rightContent:ShopRightContentUI;

		/** 当前选中的 Tab 选项卡的名称 */
		curSelectedTabName:string;

		/**当前选中的是种子、果实还是道具中的某个项（所带数据SeedVO/ToolVO） */
		curItem:any;
		/** 当前要购买项的数据封装({id,type,buyNums})，如：{"si":11,"st":"teaseed","bct":2} */
		curBuyObj:Object;
		/** 购买数量 */
		buyNums:number=0;
		/** 当前项的单价 */
		singlePrice:number=0;

		constructor()
		{
			super();

			this.titleImg.skin = this.titleUrl;
			this.dragArea = `0,0,${this.width},60`;
			this.cacheAs = "bitmap";


			//////////////////////// =>
			this.bgImg.size(788,450);
			this.size(788,450);

			// 根据缩放率来动态调整标题、关闭按钮
			let wRate:number = (788-600)/600;
			let hRate:number = (450-400)/400;
			this.closeBtn.x += this.closeBtn.x*wRate;
			this.closeBtn.y -= this.closeBtn.y*hRate;
			this.closeBtn.scale(1.5,1.5);

			this.titleImg.skin = "gameUI/common/icon/shopName.png";
			this.titleImg.x = this.width-this.titleImg.width>>1;
			this.titleImg.y += 3;

			// 种子
			this.seedTab = new TabItemUI();
			this.seedTab.tabName.skin = "gameUI/common/icon/materialTabBg.png";
			this.seedTab.pos(20,100);
			this.addChild(this.seedTab);
			this.seedTab.on(Event.CLICK,this,this.seedTabFn);

			// 道具
			this.toolTab = new TabItemUI();
			this.toolTab.tabName.skin = "gameUI/common/icon/toolTabBg.png";
			this.toolTab.pos(20,176);
			this.addChild(this.toolTab);
			this.toolTab.on(Event.CLICK,this,this.toolTabFn);

			this.gridContainer = new Laya.Panel();
			this.gridContainer.vScrollBarSkin = "comp/vscroll.png";
			this.gridContainer.pos(115,100);
			this.gridContainer.size(333,333);
			this.addChild(this.gridContainer);
			/////////////////////// <=

			this.rightContent = new ShopRightContentUI();
			this.addChild(this.rightContent);
			this.autoSize = true;
			this.rightContent.pos(this.width-this.rightContent.width+20,100);
			this.rightContent.buyNumTxt.restrict = "0-9";
			// this.decorateTab.visible = false;
			this.seedTabFn();

			// 原料
			// this.seedTab.on(Event.CLICK,this,this.seedTabFn);
			// 道具
			// this.toolTab.on(Event.CLICK,this,this.toolTabFn);
			this.closeBtn.on(Event.CLICK,this,this.closeBtnFn);
		}

		seedTabFn():void
		{
			this.curSelectedTabName = "seedTab";

			this.selectTab(this.seedTab);
			this.unSelectTab(this.toolTab);
			// this.unSelectTab(this.decorateTab);
			this.changeBtnState();
			this.gridContainer.removeChildren(0,this.gridContainer.numChildren);
		}

		toolTabFn():void
		{
			this.curSelectedTabName = "toolTab";

			this.selectTab(this.toolTab);
			this.unSelectTab(this.seedTab);
			// this.unSelectTab(this.decorateTab);
			this.changeBtnState();
			this.gridContainer.removeChildren(0,this.gridContainer.numChildren);
		}

		selectTab(tab:TabItemUI):void
		{
			this.setTabIcon(tab);
			tab.selectBg.visible = true;
			tab.unSelectBg.visible = false;
		}

		unSelectTab(tab:TabItemUI):void
		{
			this.setTabIcon(tab);
			tab.selectBg.visible = false;
			tab.unSelectBg.visible = true;
		}

		setTabIcon(tab:TabItemUI):void
		{
			if(tab === this.seedTab)
			{
				tab.tabName.skin = this.materialLogoUrl;
			}
			else if(tab ===  this.toolTab)
			{
				tab.tabName.skin = this.baseUrl+"toolLogo.png";
			}
		}

		/**
		 * 根据选项卡切换对应的操作按钮
		 */
		changeBtnState():void
		{
			if(this.curSelectedTabName == "decorateTab")
			{
				this.rightContent.buyBtn.visible = false;
				this.rightContent.preViewBtn.visible = true;
			}
			else
			{
				this.rightContent.buyBtn.visible = true;
				this.rightContent.preViewBtn.visible = false;
			}
		}

		closeBtnFn():void
		{
			this.removeSelf();
			// 默认选中第一个选项卡
			this.seedTabFn();
		}

		/**
		 * 添加选项卡下的格子项
		 */
		addTabGrids(voArr:Array<any>):void
		{
			this.gridContainer.removeChildren(0,this.gridContainer.numChildren);

			if(!voArr || !voArr.length)
				return;

			let i:number;
			let len:number = voArr.length;
			if(this.curSelectedTabName == "seedTab")
			{
				let seedObj:SeedVO = new SeedVO();
				for(i=0; i<len; i++)
				{
					seedObj = voArr[i];

					let gridItem:ui.gameUI.common.GridItemUI = new ui.gameUI.common.GridItemUI();
					gridItem.name = seedObj.id+" ";
					gridItem.lvl.text = seedObj.lvl+"级";
					gridItem.nameTxt.text = seedObj.name;
					gridItem.nums.visible = false;
					gridItem.imgContainer.skin = this.translateSwfTypeToPngType(seedObj.icon);
					gridItem.salePrice.text = seedObj.seedBuyPrice+"";
					gridItem.priceIcon.skin = this.goldUrl;
                    gridItem.imgContainer.size(50,50);
					gridItem.typeIcon.skin = this.typePrefix + seedObj.type+ this.typeSuffix;

					// 显示首个对象的右侧信息
					if(i == 0)
					{
						this.gridItemClkedFn(seedObj);
					}

					this.gridContainer.addChild(gridItem);

					// 每行最多放 4 个
					if(i >= 4)
					{
						gridItem.x = parseInt((i-4) % 4 + "") * (gridItem.width + 5);
						gridItem.y = (parseInt((i-4) / 4 + "")  + 1) * (gridItem.height + 5);
					}
					else
					{
						gridItem.x = i * (gridItem.width + 5);
					}
					gridItem.on(Event.CLICK,this,this.gridItemClkedFn,[seedObj]);
				}
			} // 道具
			else if(this.curSelectedTabName ==  "toolTab")
			{
				let toolObj:ToolVO;
				for(i=0; i<len; i++)
				{
					toolObj = voArr[i];

					let gridItem:ui.gameUI.common.GridItemUI = new ui.gameUI.common.GridItemUI();
					gridItem.name = toolObj.id+"";
					gridItem.lvl.text = toolObj.lvl+"级";
					gridItem.nameTxt.text = toolObj.name;
					gridItem.nums.visible = false;
					gridItem.imgContainer.skin = this.translateSwfTypeToPngType(toolObj.icon);
					gridItem.imgContainer.size(50,50);
					gridItem.salePrice.text = toolObj.price+"";
					if(toolObj.type == "water")
						gridItem.priceIcon.skin = this.moneyUrl;
					else
						gridItem.priceIcon.skin = this.goldUrl;
					// 显示首个对象的右侧信息
					if(i == 0)
					{
						this.gridItemClkedFn(toolObj);
					}
					this.gridContainer.addChild(gridItem);

					// 每行最多放 4 个
					if(i>=4)
					{
						gridItem.x = parseInt((i-4) % 4 + "") * (gridItem.width + 5);
						gridItem.y = (parseInt((i-4) / 4 + "")  + 1) * (gridItem.height + 5);
					}
					else
					{
						gridItem.x = i * (gridItem.width + 5);
					}
					gridItem.on(Event.CLICK,this,this.gridItemClkedFn,[toolObj]);
				}
			}
		}

        /**
         * 转换图片格式
         */
        translateSwfTypeToPngType(swfUrl:string):string
		{
			let pngUrl:string;
			if(!swfUrl)
				return null;

			pngUrl = swfUrl.substring(0,swfUrl.lastIndexOf("."));
			pngUrl += ".png";
			return pngUrl;
		}

		/**
		 * 输入框输入后
		 */
		private saleNumsInputOverFn(event:Event):void
		{
			// 需根据金币或钻石的量来判断能买多少

		}

		/**
		 * 购买数量+1
		 */
		private addOneBtnFn(event:Event):void
		{
			this.buyNums++;
			this.curBuyObj["bct"] = this.buyNums;
			this.rightContent.buyNumTxt.text = this.buyNums+"";
			this.rightContent.buyPrice.text = this.buyNums * this.singlePrice + "";
			console.log("buyNums:"+this.buyNums+", 总价："+this.rightContent.buyPrice.text);

/*			if(this.saleNums > this.curItem["allNums"])
				return;
			this.saleNums++;
			if(this.saleNums > this.curItem["allNums"])
				this.saleNums = this.curItem["allNums"];
			this.saleNumTxt.text = this.saleNums+"";
			this.priceAll.text = parseInt(this.priceOne.text) * this.saleNums + "";
*/
		}

		/**
		 * 购买数量-1
		 */
		private reduceOneBtnFn(event:Event):void
		{
			if(this.buyNums==0)
				return;
			this.buyNums--;
			this.curBuyObj["bct"] = this.buyNums;
			this.rightContent.buyNumTxt.text = this.buyNums + "";
			this.rightContent.buyPrice.text = this.buyNums * this.singlePrice + "";
			console.log("buyNums:"+this.buyNums);
		}

		private buyNumInputOverFn(event:Event):void
		{
			this.buyNums = parseInt(this.rightContent.buyNumTxt.text);
			this.curBuyObj["bct"] = this.buyNums;
			this.rightContent.buyPrice.text = this.buyNums * this.singlePrice + "";
		}

		private gridItemClkedFn(obj:Object):void
		{
			this.buyNums = 1;
			this.rightContent.buyNumTxt.text = "1";

			this.curBuyObj = {"si":obj["id"],"st":obj["type"],"bct":this.buyNums};
			this.curItem = obj;
			// 右侧信息
			this.updateRightContent(obj);
		}

		/**
		 * 更新右侧信息
		 */
		updateRightContent(obj:Object):void
		{
			this.rightContent.nameTxt.text = obj["name"];
			this.rightContent.iconImg.skin = this.translateSwfTypeToPngType(obj["icon"]);
			this.rightContent.iconImg.size(50,50);
			// 等级不足
			if(parseInt(obj["lvl"]) > models.player.PlayerInfoModel.playerInfo.level)
				this.rightContent.lvlNoEnougnImg.visible = true;
			else
				this.rightContent.lvlNoEnougnImg.visible = false;

			if(this.curSelectedTabName == "seedTab")
			{
				this.singlePrice = obj["seedBuyPrice"];
				this.rightContent.buyPrice.text = obj["seedBuyPrice"];
				this.rightContent.priceIcon.skin = this.goldUrl;
				this.rightContent.desTxt.text = obj["seedDes"];
				this.rightContent.contentArea.text = "单体价格:"+obj["seedBuyPrice"]+"\n\n单批数量:"+obj["fruitNums"];
			}
			else if(this.curSelectedTabName == "toolTab")
			{
				this.singlePrice = obj["price"];
				this.rightContent.buyPrice.text = obj["price"]+"";
				if(obj["type"] == "water")
					this.rightContent.priceIcon.skin = this.moneyUrl;
				else
					this.rightContent.priceIcon.skin = this.goldUrl;
				let toolType:string;
				if(obj["type"] == "water")
					toolType = "水";
				else if(obj["type"] == "pao_tool")
					toolType = "玄天符";
				this.rightContent.contentArea.text = "类型:"+toolType;
				this.rightContent.desTxt.text = obj["des"];
			}

			this.rightContent.buyNumTxt.on(Event.INPUT,this,this.buyNumInputOverFn);
			this.rightContent.buyNumTxt.on(Event.BLUR,this,this.buyNumInputOverFn);
			this.rightContent.addOneBtn.on(Event.CLICK,this,this.addOneBtnFn);
			this.rightContent.reduceOneBtn.on(Event.CLICK,this,this.reduceOneBtnFn);
		}

	}
}