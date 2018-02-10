namespace views.teaRoom.shop
{
	import Image = laya.ui.Image;
	import Box = laya.ui.Box;
	import Event = laya.events.Event;
	import SeedVO = models.base.SeedVO;
	import ToolVO = models.base.ToolVO;
	import TabItemUI = ui.gameUI.common.TabItemUI;
	import BaseBorderUI = ui.gameUI.common.BaseBorderUI;
	import ShopRightContentUI = ui.gameUI.shop.ShopRightContentUI;

	/**
	 * 商店弹出面板（时间匆忙，待重构）
	 */
	export class ShopDialogView extends BaseBorderUI
	{
		private titleUrl:string = "gameUI/common/icon/shopName.png";

		/** 类型前缀 */
		private typePrefix:string = "gameUI/common/resTypeIcon/";
		/** 类型后缀 */
		private typeSuffix:string = ".png";
		/** 金币图标 */
		private moneyUrl:string = "gameUI/common/icon/money.png";
		/** 钻石图标 */
		private goldUrl:string = "gameUI/common/icon/gold.png";

		/**
		 * 种子选项卡
		 */
		seedTab:TabItemUI;
		/**
		 * 工具选项卡
		 */
		toolTab:TabItemUI;
		/**
		 * 装饰选项卡
		 */
		decorateTab:TabItemUI;
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
			this.seedTab.tabName.skin = "gameUI/common/icon/seedTabBg.png";
			this.seedTab.pos(20,100);
			this.addChild(this.seedTab);
			this.seedTab.on(Event.CLICK,this,this.seedTabFn);

			// 道具
			this.toolTab = new TabItemUI();
			this.toolTab.tabName.skin = "gameUI/common/icon/toolTabBg.png";
			this.toolTab.pos(20,176);
			this.addChild(this.toolTab);
			this.toolTab.on(Event.CLICK,this,this.toolTabFn);
			// 装饰
			this.decorateTab = new TabItemUI();
			this.decorateTab.tabName.skin = "gameUI/common/icon/decorateTabBg.png";
			this.decorateTab.pos(20,252);
			this.addChild(this.decorateTab);
			this.decorateTab.visible = false;
			this.decorateTab.on(Event.CLICK,this,this.decorateTabFn);

			this.gridContainer = new Laya.Panel();
			this.gridContainer.vScrollBarSkin = "comp/vscroll.png";
			this.gridContainer.pos(115,100);
			this.gridContainer.size(333,333);
			this.addChild(this.gridContainer);

			this.rightContent = new ShopRightContentUI();
			this.addChild(this.rightContent);
			this.rightContent.pos(this.gridContainer.x+this.gridContainer.width+10,100);
			this.rightContent.buyNumTxt.restrict = "0-9";

			this.seedTabFn();
			this.closeBtn.on(Event.CLICK,this,this.closeBtnFn);
		}

		seedTabFn():void
		{
			this.curSelectedTabName = "seedTab";

			this.selectTab(this.seedTab);
			this.unSelectTab(this.toolTab);
			this.unSelectTab(this.decorateTab);
			this.changeBtnState();
			this.gridContainer.removeChildren(0,this.gridContainer.numChildren);
		}

		toolTabFn():void
		{
			this.curSelectedTabName = "toolTab";

			this.selectTab(this.toolTab);
			this.unSelectTab(this.seedTab);
			this.unSelectTab(this.decorateTab);
			this.changeBtnState();
			this.gridContainer.removeChildren(0,this.gridContainer.numChildren);
		}

		decorateTabFn():void
		{
			this.curSelectedTabName = "decorateTab";

			this.selectTab(this.decorateTab);
			this.unSelectTab(this.seedTab);
			this.unSelectTab(this.toolTab);
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
				tab.tabName.skin = "gameUI/common/icon/seedTabBg.png";
			else if(tab ===  this.toolTab)
				tab.tabName.skin = "gameUI/common/icon/toolTabBg.png";
			else if(tab === this.decorateTab)
				tab.tabName.skin = "gameUI/common/icon/decorateTabBg.png";
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
		addTabGrids(voArr:Array<Object>):void
		{
			this.gridContainer.removeChildren(0,this.gridContainer.numChildren);

			if(!voArr || !voArr.length)
				return;

			voArr.sort(this.sortArrById);

			let i:number;
			let len:number = voArr.length;

			// 种子
			if(this.curSelectedTabName ==  "seedTab")
			{
/*			界面显示（种子）：
			左侧：
			等级、名称、图标、买入价格、类型（茶、花、粮）
			右侧：
			名称、图标、售价、"作物类型（一季作物）、产量、果实售价、收入、收获经验、等级（等级不足）、成熟时间、再次成熟"、   描述
*/
				// 需置顶项：  "id"=="105"、
				let firstObj:Object;
				for(i=0; i<len; i++)
				{
					firstObj = voArr[i];
					if(firstObj["id"] == "105")
					{

						voArr.splice(i,1);
						voArr.unshift(firstObj);
						break;
					}
				}

				let seedObj:Object;
				let j:number=0;
				for(i=0; i<len; i++)
				{
					seedObj = voArr[i];

					// 数字种子 不可在此显示
					if(seedObj["group"] == "number")
					{
						continue;
					}
					else
					{
						j++;

						let gridItem:ui.gameUI.common.GridItemUI = new ui.gameUI.common.GridItemUI();
						gridItem.name = seedObj["id"];
						gridItem.lvl.text = seedObj["level"]+"级";
						gridItem.nameTxt.text = seedObj["name"];
						gridItem.nums.visible = false;
						gridItem.imgContainer.skin = HttpConfig.serverResUrl + seedObj["res"];
						if(gridItem.imgContainer.width>60 && gridItem.imgContainer.height>60)
							gridItem.imgContainer.size(60,60);
						// 因是异步加载，gridItem.imgContainer 的 width/heiht 时常为0
						// gridItem.imgContainer.x = gridItem.imgBg.width-gridItem.imgContainer.width>>1;
						// gridItem.imgContainer.y = gridItem.imgBg.height-gridItem.imgContainer.height>>1;
						// 金币 or 钻石
						if(parseInt(seedObj["price"]))
						{
							gridItem.salePrice.text = seedObj["price"];
							gridItem.priceIcon.skin = this.moneyUrl;
						}
						else if(parseInt(seedObj["yb"]))
						{
							gridItem.salePrice.text = seedObj["yb"];
							gridItem.priceIcon.skin = this.goldUrl;
						}

/*						种子：
						group: flower
						group: tea
						group: other
*/
						// 类型图标([group]: tea: 茶; flower：花； others：粮 等)
						if(seedObj["group"] == "others")
							gridItem.typeIcon.skin = this.typePrefix + "food" + this.typeSuffix;
						else
						 	gridItem.typeIcon.skin = this.typePrefix + seedObj["group"] + this.typeSuffix;

						// 显示首个对象的右侧信息
						if(j == 1)
						{
							// this.updateRightContent(seedObj);
							this.gridItemClkedFn(seedObj);
						}
						this.gridContainer.addChild(gridItem);

						// 每行最多放 4 个
						if(j>=5)
						{
							gridItem.x = parseInt((j-5) % 5 + "") * (gridItem.width + 5);
							gridItem.y = (parseInt((j-5) / 5 + "")  + 1) * (gridItem.height + 5);
						}
						else
						{
							gridItem.x = (j - 1) * (gridItem.width + 5);
						}
						gridItem.on(Event.CLICK,this,this.gridItemClkedFn,[seedObj]);
					}
				}
			} // 道具
			else if(this.curSelectedTabName ==  "toolTab")
			{
/*			界面显示（道具）：
			左侧：
			等级、名称、图标、买入价格、类型（肥、薪、汇、农、狗、饲、）
			右侧：
			名称、图标、售价、"类型"、 描述
*/
				let j:number=0;
				let toolObj:Object;
				for(i=0; i<len; i++)
				{
					toolObj = voArr[i];

					// 不可在此显示的项： 工艺书("book")、茶具("teapot")、水("water")、矿石("saute_tool")、实物六堡茶("real")、免邮兑换码("free_postage")、大于当前等级的道具
					if(toolObj["category"]=="book" || toolObj["category"]=="teapot" || toolObj["category"]=="water" || toolObj["category"]=="saute_tool" ||
					toolObj["category"]=="real" || toolObj["category"]=="free_postage" || toolObj["category"]==undefined || (toolObj["level"] > models.player.PlayerInfoModel.playerInfo.level))
					{
						// TS中的如下写法不可行
						// i--;
						// continue;
					}
					else
					{
						j++;

						let gridItem:ui.gameUI.common.GridItemUI = new ui.gameUI.common.GridItemUI();
						gridItem.name = toolObj["id"];
						gridItem.lvl.text = toolObj["level"]+"级";
						gridItem.nameTxt.text = toolObj["name"];
						gridItem.nums.visible = false;
						gridItem.imgContainer.skin = HttpConfig.serverResUrl + toolObj["res"];
						if(gridItem.imgContainer.width>60 && gridItem.imgContainer.height>60)
							gridItem.imgContainer.size(60,60);
						let salePrice = "0";
						// 金币 or 钻石
						if(parseInt(toolObj["price"]))
						{
							gridItem.salePrice.text = toolObj["price"];
							gridItem.priceIcon.skin = this.moneyUrl;
						}
						else if(parseInt(toolObj["yb"]))
						{
							gridItem.salePrice.text = toolObj["yb"];
							gridItem.priceIcon.skin = this.goldUrl;
						}

						// 是否已购买过
						if(toolObj["hasBuy"] == "true")
							gridItem.disabled = true;
						else
							gridItem.disabled = false;

						/* 道具：
						category:prop
						category:coin
						category:point_card
						category:farmercard
						category:farmer
						category:dogfood
						category:dog*/
						gridItem.typeIcon.skin = this.typePrefix + toolObj["category"] + this.typeSuffix;

						// 显示首个对象的右侧信息
						if(j==1)
						{
							// this.updateRightContent(toolObj);
							this.gridItemClkedFn(toolObj);
						}
						this.gridContainer.addChild(gridItem);

						// 每行最多放 4 个
						if(j>=5)
						{
							gridItem.x = parseInt((j-5) % 5 + "") * (gridItem.width + 5);
							gridItem.y = (parseInt((j-5) / 5 + "")  + 1) * (gridItem.height + 5);
						}
						else
						{
							gridItem.x = (j-1) * (gridItem.width + 5);
						}
						gridItem.on(Event.CLICK,this,this.gridItemClkedFn,[toolObj]);
					}
				}
			}
		}

		/**
		 * 按等级从小到大排序
		 */
		private sortArrById(obj1:Object,obj2:Object):number
		{
			let l1:number = parseInt(obj1["level"]);
			let l2:number = parseInt(obj2["level"]);
			if(l1 > l2)
				return 1;
			else if(l1 < l2)
				return -1;
			else
				return 0;
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
			console.log("=== 当前类型："+obj["category"]);
			this.buyNums = 1;
			this.rightContent.buyNumTxt.text = "1";

			this.curBuyObj = {"si":obj["id"],"st":this.getObjType(obj),"bct":this.buyNums};
			this.curItem = obj;
			// 右侧信息
			this.updateRightContent(obj);
		}

		/**
		 * 更新右侧信息
		 */
		updateRightContent(obj:Object):void
		{
			// 名称、图标、售价、"类型"、 描述
			this.rightContent.nameTxt.text = obj["name"];
			this.rightContent.iconImg.skin = HttpConfig.serverResUrl + obj["res"];
			// 等级不足
			if(obj["level"] > models.player.PlayerInfoModel.playerInfo.level)
				this.rightContent.lvlNoEnougnImg.visible = true;
			else
				this.rightContent.lvlNoEnougnImg.visible = false;
			// 金币 or 钻石
			if(parseInt(obj["price"]))
			{
				this.singlePrice = parseInt(obj["price"]);
				this.rightContent.buyPrice.text = obj["price"];
				this.rightContent.priceIcon.skin = this.moneyUrl;
			}
			else if(parseInt(obj["yb"]))
			{
				this.singlePrice = parseInt(obj["yb"]);
				this.rightContent.buyPrice.text = obj["yb"];
				this.rightContent.priceIcon.skin = this.goldUrl;
			}
			this.rightContent.buyNumTxt.on(Event.INPUT,this,this.buyNumInputOverFn);
			this.rightContent.buyNumTxt.on(Event.BLUR,this,this.buyNumInputOverFn);
			this.rightContent.addOneBtn.on(Event.CLICK,this,this.addOneBtnFn);
			this.rightContent.reduceOneBtn.on(Event.CLICK,this,this.reduceOneBtnFn);

			if(this.curSelectedTabName == "seedTab")
			{
				this.rightContent.desTxt.text = obj["shopDesc"];

				// "预计收入":预计产量*果实售价 ？
				// "成熟时间": growCircle参数之和,秒换成小时
				// this.rightContent.contentArea.fontSize = 12;
				this.rightContent.contentArea.text = "作物类型:"+obj["seasonName"]+"\n\n预计产量:"+obj["output"]+
														"\n\n果实售价:"+obj["fruitShopPrice"]+"\n\n收获经验:"+obj["exp"]+"/季"+
														"\n\n作物等级:"+obj["level"];
			}
			else if(this.curSelectedTabName == "toolTab")
			{
				this.rightContent.desTxt.text = obj["desc"];
				this.rightContent.contentArea.text = "类型:"+obj["cname"];
			}
			else if(this.curSelectedTabName == "decorateTab")
			{

			}
		}

		/**
		 * 返回要购买项所属类型
		 */
		private getObjType(obj:Object):string
		{
			let curType:string = "";
			if(obj["group"])
			{
				curType = obj["group"];
				if(curType != "")
				{
					if(curType == "tea")
						curType = "teaseed";
					else if(curType == "flower")
						curType = "flowerseed";
					else if(curType == "others")
						curType = "othersseed";
				}
			}
			else if(obj["category"])
			{
				curType = obj["category"];
			}
			console.log("== 购买类型, curType:"+curType);
			return curType;
		}


	}
}