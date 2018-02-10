namespace views.friedRoom.storage
{
	import SeedVO = models.base.SeedVO;
	import ToolVO = models.base.ToolVO;
	import Event = laya.events.Event;
	import Image = laya.ui.Image;
	import Box = laya.ui.Box;
	import BaseBorderUI = ui.gameUI.common.BaseBorderUI;
	import StorageDialogUI = ui.gameUI.storage.StorageDialogUI;

	/**
	 * 炒茶室仓库面板
	 */
	export class FriedTeaStorageView extends StorageDialogUI
	{
		/**
		 * Dialog底部边框
		 */
		bgUI:BaseBorderUI;

		/** 当前选中的 Tab 选项卡的名称 */
		curSelectedTabName:string;
		/**当前选中的是种子、果实还是道具中的某个项（所带数据SeedVO/ToolVO） */
		curItem:any;
		/** 卖出数量 */
		saleNums:number=0;

		private baseUrl:string = "gameUI/common/icon/";

		/** 类型前缀 */
		private typePrefix:string = this.baseUrl+"resTypeIcon/";
		/** 类型后缀 */
		private typeSuffix:string = ".png";
		/** 茶叶 */
		private teaLogoUrl:string = this.baseUrl+"teaTabBg.png";
		/** seedTab's icon（原料） */
		private materialLogoUrl:string = this.baseUrl+"materialTabBg.png";

		hasInit:boolean = false;

		constructor()
		{
			super();

			this.seedTabFn();
			this.dragArea = `0,0,${this.width},60`;
			this.cacheAs = "bitmap";

			this.saleNumTxt.restrict = "0-9";
			this.decorateTab.visible = false;
			(this.seedTab.getChildByName("tabIcon") as Image).skin = this.materialLogoUrl;
			(this.fruitTab.getChildByName("tabIcon") as Image).skin = this.teaLogoUrl;

			////////// =>
			this.bgUI = new BaseBorderUI();
			this.bgUI.bgImg.size(788,450);
			this.bgUI.size(788,450);
			this.bgUI.addChild(this);
			this.x = this.y = 15;

			this.bgUI.titleImg.skin = "gameUI/common/icon/storageName.png";
			this.bgUI.titleImg.x = this.width-this.bgUI.titleImg.width>>1;
			this.bgUI.titleImg.y += 3;

			this.mouseThrough = true; // 解除closeBtn事件屏蔽
			// 根据缩放率来动态调整标题、关闭按钮
			let wRate:number = (788-600)/600;
			let hRate:number = (450-400)/400;
			this.bgUI.closeBtn.x += this.bgUI.closeBtn.x*wRate;
			this.bgUI.closeBtn.y -= this.bgUI.closeBtn.y*hRate;
			this.bgUI.closeBtn.scale(1.5,1.5);
			this.bgUI.closeBtn.on(Event.CLICK,this,this.closeBtnFn);
			////////// <=

			// 种子（=> 原料）
			this.seedTab.on(Event.CLICK,this,this.seedTabFn);
			// 工具（=> 道具）
			this.toolTab.on(Event.CLICK,this,this.toolTabFn);
			// 果实（=> 茶叶）
			this.fruitTab.on(Event.CLICK,this,this.fruitTabFn);
		}

		seedTabFn():void
		{
			this.curSelectedTabName = "seedTab";

			this.selectTab(this.seedTab);
			this.unSelectTab(this.toolTab);
			this.unSelectTab(this.fruitTab);
			this.unSelectTab(this.decorateTab);
			this.gridContainer.removeChildren(0,this.gridContainer.numChildren);
		}

		toolTabFn():void
		{
			this.curSelectedTabName = "toolTab";

			this.selectTab(this.toolTab);
			this.unSelectTab(this.seedTab);
			this.unSelectTab(this.fruitTab);
			this.unSelectTab(this.decorateTab);
			this.gridContainer.removeChildren(0,this.gridContainer.numChildren);
		}

		fruitTabFn():void
		{
			this.curSelectedTabName = "fruitTab";

			this.selectTab(this.fruitTab);
			this.unSelectTab(this.seedTab);
			this.unSelectTab(this.toolTab);
			this.unSelectTab(this.decorateTab);
			this.gridContainer.removeChildren(0,this.gridContainer.numChildren);
		}

		selectTab(tab:Box):void
		{
			(tab.getChildByName("selectBg") as Image).visible = true;
			(tab.getChildByName("unSelectBg") as Image).visible = false;
		}

		unSelectTab(tab:Box):void
		{
			(tab.getChildByName("selectBg") as Image).visible = false;
			(tab.getChildByName("unSelectBg") as Image).visible = true;
		}

		/**
		 * 将原素材的 swf 格式转换成 png 格式
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
		 * 填充仓库格子 ———— 此函数待重构！
		 */
		addStorageGrids(voArr:Array<any>):void	// seedVOArr
		{
			this.gridContainer.removeChildren(0,this.gridContainer.numChildren);
			if(!voArr || !voArr.length)
				return;

			let len:number = voArr.length;
			let i:number;
			let j:number;
			// 种子（原料）
			if(this.curSelectedTabName == "seedTab")
			{
				let seedVO:SeedVO;
				for(i=0; i<len; i++)
				{
					let gridItem:ui.gameUI.common.GridItemUI = new ui.gameUI.common.GridItemUI();
					seedVO = voArr[i];
					gridItem.name = seedVO.id + "";
					gridItem.lvl.text = seedVO.lvl + "级";
					gridItem.nums.text = seedVO.seedNums + "";
					gridItem.imgContainer.skin = this.translateSwfTypeToPngType(seedVO.icon);

					// if(gridItem.imgContainer.width>60 && gridItem.imgContainer.height>60)
					// 	gridItem.imgContainer.size(60,60);
					gridItem.imgContainer.size(50,50);

					gridItem.nameTxt.text = seedVO.name;
					gridItem.salePrice.text = seedVO.seedSalePrice + "";
					gridItem.typeIcon.visible = false;

					// 显示首个对象的右侧信息
					if(i==0)
					{
						this.updateRightContent(seedVO);
					}

					this.gridContainer.addChild(gridItem);
					// this.gridContainer.vScrollBar = this.vscrollBar;	// 2017-09-15 hsx
					// this.gridContainer.vScrollBarSkin = "comp/vscroll.png";

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
					gridItem.on(Event.CLICK,this,this.updateRightContent,[seedVO]);
				}
			} // 道具
			else if(this.curSelectedTabName == "toolTab")
			{
				let toolVO:ToolVO;
				for(i=0; i<len; i++)
				{
					let gridItem:ui.gameUI.common.GridItemUI = new ui.gameUI.common.GridItemUI();
					toolVO = voArr[i];
					gridItem.name = toolVO.id + "";
					gridItem.lvl.text = toolVO.lvl + "级";
					gridItem.nums.text = toolVO.nums + "";
					gridItem.imgContainer.skin = this.translateSwfTypeToPngType(toolVO.icon);
					// if((gridItem.imgContainer.width>60) && (gridItem.imgContainer.height>60))
					gridItem.imgContainer.size(50,50);
					gridItem.nameTxt.text = toolVO.name;
					gridItem.salePrice.text = toolVO.price + "";
					gridItem.typeIcon.visible = false;

					// 显示首个对象的右侧信息
					if(i==0)
					{
						this.updateRightContent(toolVO);
					}

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
					this.gridContainer.addChild(gridItem);
					gridItem.on(Event.CLICK,this,this.updateRightContent,[toolVO]);
				}
			} // 果实
			else if(this.curSelectedTabName == "fruitTab")
			{
				// 存储最终要用到的数据
				let seedVO:SeedVO;
				for(i=0; i<len; i++)
				{
					let gridItem:ui.gameUI.common.GridItemUI = new ui.gameUI.common.GridItemUI();
					seedVO = voArr[i];
					gridItem.name = seedVO.id+"";
					gridItem.lvl.text = seedVO.lvl+"级";
					gridItem.nums.text = seedVO.fruitNums+"";
					gridItem.imgContainer.skin = this.translateSwfTypeToPngType(seedVO.icon)
					gridItem.imgContainer.size(50,50);
					gridItem.nameTxt.text = seedVO.name;
					gridItem.salePrice.text = seedVO.fruitSalePrice+"";
					gridItem.typeIcon.visible = false;

					// 显示首个对象的右侧信息
					if(i==0)
					{
						this.updateRightContent(seedVO);
					}

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
					this.gridContainer.addChild(gridItem);
					gridItem.on(Event.CLICK,this,this.updateRightContent,[seedVO]);
				}
			}

			this.hasInit = true;
		}

		/**
		 * 输入框输入后
		 */
		private saleNumsInputOverFn(event:Event):void
		{
			if(parseInt(this.saleNumTxt.text) > this.curItem["allNums"])
				this.saleNums = this.curItem["allNums"];
			else if(parseInt(this.saleNumTxt.text) < 0)
				this.saleNums = 0;
			else
				this.saleNums = parseInt(this.saleNumTxt.text);
			this.saleNumTxt.text = this.saleNums + "";
			this.priceAll.text = parseInt(this.priceOne.text) * this.saleNums + "";
		}

		/**
		 * 购买数量+1
		 */
		private addOneBtnFn(event:Event):void
		{
			if(this.saleNums > this.curItem["allNums"])
				return;
			this.saleNums++;
			if(this.saleNums > this.curItem["allNums"])
				this.saleNums = this.curItem["allNums"];
			this.saleNumTxt.text = this.saleNums+"";
			this.priceAll.text = parseInt(this.priceOne.text) * this.saleNums + "";
		}

		/**
		 * 购买数量-1
		 */
		private reduceOneBtnFn(event:Event):void
		{
			if(this.saleNums==0)
				return;
			this.saleNums--;
			this.saleNumTxt.text = this.saleNums+"";
			this.priceAll.text = parseInt(this.priceOne.text) * this.saleNums + "";
		}

		/**
		 * 更新右侧信息
		 * obj格式： {"type":obj["st"],"vo":seedVO};
		 */
		updateRightContent(obj:Object):void
		{
			this.curItem = obj;

			if(!obj || !obj["type"])
				return;
			let type:string = obj["type"];
			let curObjData:any = obj;
			if(!curObjData)
					return;

			switch (type)
			{
				case "material":
					this.priceOne.text = curObjData.seedSalePrice + "";
					this.priceAll.text = curObjData.seedSalePrice + "";
					this.iconImg.skin = this.translateSwfTypeToPngType(curObjData.icon);
					if(curObjData.seedFruitDes)
						this.desTxt.text = curObjData.seedFruitDes;
					this.curItem["allNums"] = curObjData.seedNums;
					break;
				case "book":
				case "saute_tool":
					this.priceOne.text = curObjData.price + "";
					this.priceAll.text = curObjData.price + "";
					this.iconImg.skin = this.translateSwfTypeToPngType(curObjData.icon);
					if(curObjData.des)
						this.desTxt.text = curObjData.des;
					this.curItem["allNums"] = curObjData.nums;
					break;
				case "leaf":
					this.priceOne.text = curObjData.fruitSalePrice;
					this.priceAll.text = curObjData.fruitSalePrice;
					this.iconImg.skin = this.translateSwfTypeToPngType(curObjData.icon);
					if(curObjData["seedFruitDes"])
						this.desTxt.text = curObjData["seedFruitDes"];
					this.curItem["allNums"] = curObjData.fruitNums;
					this.curItem["quality"] = curObjData["quality"];
					break;
			}
			this.nameTxt.text = curObjData.name;
			this.saleNumTxt.text = "1";	// 默认1个
			this.saleNums = 1;
			this.iconImg.size(50,50);

			this.saleNumTxt.on(Event.INPUT,this,this.saleNumsInputOverFn);
			this.saleNumTxt.on(Event.BLUR,this,this.saleNumsInputOverFn);
			this.addOneBtn.on(Event.CLICK,this,this.addOneBtnFn);
			this.reduceOneBtn.on(Event.CLICK,this,this.reduceOneBtnFn);
		}

		closeBtnFn():void
		{
			this.bgUI.removeSelf();
			// 默认选中第一个选项卡
			this.seedTabFn();
		}
	}
}