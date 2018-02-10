namespace views.teaRoom.storage
{
	import Event = laya.events.Event;
	import Image = laya.ui.Image;
	import Box = laya.ui.Box;
	import SeedVO = models.base.SeedVO;
	import ToolVO = models.base.ToolVO;
	import BaseBorderUI = ui.gameUI.common.BaseBorderUI;
	import StorageDialogUI = ui.gameUI.storage.StorageDialogUI;

	/**
	 * 仓库弹出面板（时间匆忙，待重构）
	 */
	export class StorageDialogView extends StorageDialogUI
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

		/** 类型前缀 */
		private typePrefix:string = "gameUI/common/resTypeIcon/";
		/** 类型后缀 */
		private typeSuffix:string = ".png";

		hasInit:boolean = false;

		constructor()
		{
			super();

			this.seedTabFn();
			this.dragArea = `0,0,${this.width},60`;
			this.saleNumTxt.restrict = "0-9";
			this.cacheAs = "bitmap";

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

			// 点击种子选项卡
			this.seedTab.on(Event.CLICK,this,this.seedTabFn);
			// 点击工具选项卡
			this.toolTab.on(Event.CLICK,this,this.toolTabFn);
			this.fruitTab.on(Event.CLICK,this,this.fruitTabFn);
			this.decorateTab.on(Event.CLICK,this,this.decorateTabFn);
		}

		seedTabFn():void
		{
			this.curSelectedTabName = "seedTab";

			this.selectTab(this.seedTab);
			this.unSelectTab(this.toolTab);
			this.unSelectTab(this.fruitTab);
			this.unSelectTab(this.decorateTab);

			// this.addStorageGrids([ ]);
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

		decorateTabFn():void
		{
			this.curSelectedTabName = "decorateTab";

			this.selectTab(this.decorateTab);
			this.unSelectTab(this.seedTab);
			this.unSelectTab(this.toolTab);
			this.unSelectTab(this.fruitTab);
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
		 * 填充仓库格子（种子、道具、果实）———— 此函数待重构！
		 */
		addStorageGrids(voArr:Array<any>):void	// seedVOArr
		{
			this.gridContainer.removeChildren(0,this.gridContainer.numChildren);
			if(!voArr || !voArr.length)
				return;

			let len:number = voArr.length;
			let i:number;
			let j:number;
			// 种子
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
					// gridItem.imgContainer.addChild(mc);
					gridItem.imgContainer.skin = this.translateSwfTypeToPngType(seedVO.icon);
					// gridItem.imgContainer.autoSize = true;
					console.log("imgContainer, w:"+gridItem.imgContainer.width+", h:"+gridItem.imgContainer.height+", seedVO.type:"+seedVO.type);
					if(gridItem.imgContainer.width>60 && gridItem.imgContainer.height>60)
						gridItem.imgContainer.size(60,60);
					gridItem.nameTxt.text = seedVO.name;
					gridItem.salePrice.text = seedVO.fruitSalePrice + "";
					let _type:string;
					if(seedVO.type=="teaseed")
						_type = "tea";
					else if(seedVO.type == "flowerseed")
						_type = "flower";
					else if(seedVO.type == "othersseed")
						_type = "food";

					if(_type)
						gridItem.typeIcon.skin = this.typePrefix + _type + this.typeSuffix; // seedVO.type

					// 显示首个对象的右侧信息
					if(i==0)
					{
						// this.gridItemClkedFn(seedVO);
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
					// gridItem.imgContainer.addChild(mc);
					gridItem.imgContainer.skin = this.translateSwfTypeToPngType(toolVO.icon);	// toolVO.icon;
					// gridItem.imgContainer.autoSize = true;
					console.log("imgContainer, w:"+gridItem.imgContainer.width+", h:"+gridItem.imgContainer.height+", toolVO.type:"+toolVO.type);
					if((gridItem.imgContainer.width>60) && (gridItem.imgContainer.height>60))
						gridItem.imgContainer.size(60,60);
					// gridItem.imgContainer.pos(gridItem.imgBg.width-gridItem.imgContainer.width>>1,gridItem.imgBg.height-gridItem.imgContainer.height>>1);
					gridItem.nameTxt.text = toolVO.name;
					gridItem.salePrice.text = toolVO.price + "";
					console.log("== imgBg.width:"+gridItem.imgBg.width+", imgContainer.width:"+gridItem.imgContainer.width);
					gridItem.typeIcon.skin = this.typePrefix + toolVO.type + this.typeSuffix;


					// 显示首个对象的右侧信息
					if(i==0)
					{
						// this.gridItemClkedFn(toolVO);
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
					// gridItem.x = i * (gridItem.width + 5);
					gridItem.on(Event.CLICK,this,this.updateRightContent,[toolVO]);
				}
			} // 果实
			else if(this.curSelectedTabName == "fruitTab")
			{
				let seedsObjArr:Array<Object> = managers.ResourceManager.seedsObjArr;
				if(!seedsObjArr || seedsObjArr.length==0)
					return;
				let _len:number = seedsObjArr.length;

				// 存储最终要用到的数据
				let _seedsObjArr:Array<Object> = new Array<Object>();
				let seedVO:SeedVO;
				let seedObj:Object;
				for(i=0; i<len; i++)
				{
					seedVO = voArr[i];
					for(j=0; j<_len; j++)
					{
						seedObj = seedsObjArr[j];
						if(seedVO.id == seedObj["id"])
						{
							seedObj["fruitNums"] = seedVO.fruitNums;
							seedObj["type"] = seedObj["group"]+"fruit";
							_seedsObjArr.push(seedObj);
							break;
						}
					}
				}
				if(_seedsObjArr.length == 0)
					return;

				len = _seedsObjArr.length;
				for(i=0; i<len; i++)
				{
					let gridItem:ui.gameUI.common.GridItemUI = new ui.gameUI.common.GridItemUI();
					seedObj = _seedsObjArr[i];
					gridItem.name = seedObj["id"];
					gridItem.lvl.text = seedObj["level"]+"级";
					gridItem.nums.text = seedObj["fruitNums"];
					gridItem.imgContainer.skin = HttpConfig.serverResUrl + seedObj["res"];
					// gridItem.imgContainer.autoSize = true;
					console.log("imgContainer, w:"+gridItem.imgContainer.width+", h:"+gridItem.imgContainer.height+",seedObj.type:"+seedObj["type"]);
					if((gridItem.imgContainer.width>60) && (gridItem.imgContainer.height>60))
						gridItem.imgContainer.size(60,60);
					gridItem.nameTxt.text = seedObj["name"];
					gridItem.salePrice.text = seedObj["fruitShopPrice"];	// seedObj["price"];

					let _type:string;
					if(seedObj["type"] == "teafruit")
						_type = "tea";
					else if(seedObj["type"] == "flowerfruit")
						_type = "flower";
					else if(seedObj["type"] == "othersfruit")
						_type = "food";
					if(_type)
						gridItem.typeIcon.skin = this.typePrefix + _type + this.typeSuffix;

					// 显示首个对象的右侧信息
					if(i==0)
					{
						// this.gridItemClkedFn(seedObj);
						this.updateRightContent(seedObj);
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
					gridItem.on(Event.CLICK,this,this.updateRightContent,[seedObj]);
				}
			} // 装饰
			else
			{
				let decorateObj:Object;
				for(i=0; i<len; i++)
				{
					let gridItem:ui.gameUI.common.BagGridItemUI = new ui.gameUI.common.BagGridItemUI();
					decorateObj = voArr[i];
					gridItem.name = decorateObj["di"];
					gridItem.imgContainer.skin = decorateObj["dimg"];	// "realimg"
					if((gridItem.imgContainer.width>60) && (gridItem.imgContainer.height>60))
						gridItem.imgContainer.size(60,60);
					// 类型图标
					gridItem.typeIcon.skin = this.typePrefix + decorateObj["ty"] + this.typeSuffix;
					console.log("== skin:"+gridItem.typeIcon.skin);

					// 显示首个对象的右侧信息
					if(i==0)
					{
						this.updateRightContent(decorateObj);
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
					gridItem.on(Event.CLICK,this,this.updateRightContent,[decorateObj]);
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
			// this.curItem = curObjData;

			// 普通种子、数字种子等
			if(type.indexOf("seed")>0)
			{
				this.priceOne.text = curObjData.fruitSalePrice + "";
				this.priceAll.text = curObjData.fruitSalePrice + "";
				this.iconImg.skin = this.translateSwfTypeToPngType(curObjData.icon);
				if(curObjData.seedFruitDes)
					this.desTxt.text = curObjData.seedFruitDes;
				this.curItem["allNums"] = curObjData.seedNums;
			} // 道具
			else if(type == "prop")
			{
				this.priceOne.text = curObjData.price + "";
				this.priceAll.text = curObjData.price + "";
				this.iconImg.skin = this.translateSwfTypeToPngType(curObjData.icon);
				if(curObjData.des)
					this.desTxt.text = curObjData.des;
				this.curItem["allNums"] = curObjData.nums;
			} // 果实 (类型：teafruit、flowerfruit、othersfruit)
			else if(type.indexOf("fruit")>0)
			{
				this.priceOne.text = curObjData["fruitShopPrice"];
				this.priceAll.text = curObjData["fruitShopPrice"];
				this.iconImg.skin = HttpConfig.serverResUrl + curObjData["res"];
				if(curObjData["desc"])
					this.desTxt.text = curObjData["desc"];
				this.curItem["allNums"] = curObjData.fruitNums;
			}
			this.nameTxt.text = curObjData.name;
			this.saleNumTxt.text = "1";	// 默认1个
			this.saleNums = 1;
			// this.iconImg.autoSize = true;
			if((this.iconImg.width>60) && (this.iconImg.height>60))
				this.iconImg.size(60,60);
			this.saleNumTxt.on(Event.INPUT,this,this.saleNumsInputOverFn);
			this.saleNumTxt.on(Event.BLUR,this,this.saleNumsInputOverFn);
			this.addOneBtn.on(Event.CLICK,this,this.addOneBtnFn);
			this.reduceOneBtn.on(Event.CLICK,this,this.reduceOneBtnFn);
		}


		closeBtnFn():void
		{
			// this.removeSelf();
			this.bgUI.removeSelf();
			// 默认选中第一个选项卡
			this.seedTabFn();
		}

	}
}