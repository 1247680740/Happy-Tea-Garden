namespace views.makeRoom.storage
{
	import BaseBorderUI = ui.gameUI.common.BaseBorderUI;
	import StorageDialogUI = ui.gameUI.storage.StorageDialogUI;
	import SeedVO = models.base.SeedVO;
	import ToolVO = models.base.ToolVO;
	import Event = laya.events.Event;
	import Image = laya.ui.Image;
	import Box = laya.ui.Box;

	/**
	 * 泡茶室仓库面板
	 */
	export class MakeTeaStorageView extends StorageDialogUI
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

		private titleUrl:string = "gameUI/common/icon/storageName.png";
		private baseUrl:string = "gameUI/common/icon/";

		/** 类型前缀 */
		private typePrefix:string = this.baseUrl+"resTypeIcon/";
		/** 类型后缀 */
		private typeSuffix:string = ".png";
		/** 茶叶 */
		private teaLogoUrl:string = this.baseUrl+"teaTabBg.png";
		/** 道具 */
        private toolLogoUrl:string =this.baseUrl+"toolTabBg.png";

		hasInit:boolean = false;

		constructor()
		{
			super();

			this.seedTabFn();
			this.dragArea = `0,0,${this.width},60`;
			this.cacheAs = "bitmap";

			////////// =>
			this.bgUI = new BaseBorderUI();
			this.bgUI.bgImg.size(788,450);
			this.bgUI.size(788,450);
			this.bgUI.addChild(this);
			this.x = this.y = 15;

			this.bgUI.titleImg.skin = this.titleUrl;
			this.bgUI.titleImg.x = this.width-this.bgUI.titleImg.width>>1;
			this.bgUI.titleImg.y += 3;

			this.mouseThrough = true; // 解除closeBtn事件屏蔽
			// 根据缩放率来动态调整标题、关闭按钮
			let wRate:number = (788-600)/600;
			let hRate:number = (450-400)/400;
			this.bgUI.closeBtn.x += this.bgUI.closeBtn.x*wRate;
			this.bgUI.closeBtn.y -= this.bgUI.closeBtn.y*hRate;
			this.bgUI.closeBtn.scale(1.3,1.3);
			this.bgUI.closeBtn.on(Event.CLICK,this,this.closeBtnFn);
			////////// <=

			this.saleNumTxt.restrict = "0-9";
			this.decorateTab.visible = false;
			this.fruitTab.visible=false;
			(this.seedTab.getChildByName("tabIcon") as Image).skin = this.teaLogoUrl;
            (this.toolTab.getChildByName("tabIcon") as Image).skin = this.toolLogoUrl;
			// 种子（=> 茶叶）
			this.seedTab.on(Event.CLICK,this,this.seedTabFn);
			// 工具（=> 道具）
			this.toolTab.on(Event.CLICK,this,this.toolTabFn);
			// this.closeBtn.on(Event.CLICK,this,this.closeBtnFn);
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
			let toolObjArr:Object[] =  ResourceManager.toolsObjArr;
			let toolObj:Object;
			let len:number = voArr.length;
			let len2:number = toolObjArr.length;
			let i:number;
			let j:number;
			// 种子（原料）
			if(this.curSelectedTabName == "seedTab")
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
			} // 道具
			else if(this.curSelectedTabName == "toolTab")
			{
				let toolVO:ToolVO;
				for(i=0; i<len; i++)
				{
					let gridItem:ui.gameUI.common.GridItemUI = new ui.gameUI.common.GridItemUI();
					toolVO = voArr[i];

					for(j=0;j<len2;j++){
						toolObj=toolObjArr[j];
						if(parseInt(toolObj["id"])==toolVO.id){
							gridItem.name = toolVO.id + "";
							gridItem.lvl.text =toolObj["level"] + "级";
							gridItem.nums.text = toolVO.nums + "";
							gridItem.imgContainer.skin =HttpConfig.serverResUrl+toolObj["res"];
							gridItem.nameTxt.text =toolObj["name"];
							gridItem.salePrice.text = toolVO.price + "";

							toolVO.name=toolObj["name"];
							toolVO.icon=HttpConfig.serverResUrl+toolObj["res"];
							toolVO.des=toolObj["desc"];
							toolVO.type=toolObj["category"];
						}
					}
					// if((gridItem.imgContainer.width>60) && (gridItem.imgContainer.height>60))
					gridItem.imgContainer.size(50,50);
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
			}
			this.hasInit = true;
		}

		/**
		 * 输入框输入后
		 */
		private saleNumsInputOverFn(event:Event):void
		{  if(isNaN(parseInt(this.saleNumTxt.text))){
				this.saleNums = 0;
			}else if(parseInt(this.saleNumTxt.text) > this.curItem["allNums"])
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
				case "leaf":
					this.priceOne.text = curObjData.fruitSalePrice;
					this.priceAll.text = curObjData.fruitSalePrice;
					this.iconImg.skin = this.translateSwfTypeToPngType(curObjData.icon);
					if(curObjData["seedFruitDes"])
						this.desTxt.text = curObjData["seedFruitDes"];
					this.curItem["allNums"] = curObjData.fruitNums;
					this.curItem["quality"] = curObjData["quality"];
					break;
				case "water":
					this.priceOne.text = curObjData.price + "";
					this.priceAll.text = curObjData.price*parseInt(this.saleNumTxt.text)+"";
					this.iconImg.skin =curObjData.icon;
					if(curObjData.des)
						this.desTxt.text = curObjData.des;
					this.curItem["allNums"] = curObjData.nums;
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