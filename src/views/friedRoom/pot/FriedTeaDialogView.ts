namespace views.friedRoom.pot
{
	import Event = laya.events.Event;
	import Image = laya.ui.Image;
	import Box = laya.ui.Box;
	import SeedVO = models.base.SeedVO;
	import ToolVO = models.base.ToolVO;
	import FriedTeaDialogCtrl=controllers.friedRoom.pot.FriedTeaDialogCtrl;
	import PotGridView=views.friedRoom.pot.PotGridView;
	import BaseBorderUI = ui.gameUI.common.BaseBorderUI;
	import FriedTeaDialogUI = ui.gameUI.pot.FriedTeaDialogUI;
	import FriedDialogGridLeftUI = ui.gameUI.pot.FriedDialogGridLeftUI;

	/**
	 * 炒茶面板
	 */
	export class FriedTeaDialogView extends FriedTeaDialogUI
	{
		/**
		 * Dialog底部边框
		 */
		bgUI:BaseBorderUI;

		/** 当前选中的 Tab 选项卡的名称 */
		curSelectedTabName:string;
		/**
		 * 左侧 Tab 栏的所有项
		 */
		tabArr:Box[] = [this.tab1,this.tab2,this.tab3,this.tab4,this.tab5,this.tab6,this.tab7,this.tab8,this.tab9];
		/**
		 * 当前炒锅对应的数据
		 */
		curPotVO:models.friedRoom.pot.PotVO;
		/** 当前要购买项的数据封装 */
		curBuyTeaArr:Array<any>;
		curBuyBookArr:Array<any>;
		/** 炒茶的总量 */
		yieldNums:number=0;
		/**
		 * 存放茶叶具体名称的 Tab
		 */
		gridItemsArr:FriedDialogGridLeftUI[];
		/**
		 * 与 gridItemsArr 配合使用，默认为8）
		 */
		gridItemIndex:number = 8;

		/**
		 * 确认炒茶后的回调
		 */
		static callback:Function;

		constructor()
		{
			super();

			this.cacheAs = "bitmap";
			this.dragArea = `0,0,${this.width},60`;
			this.teaNums.restrict = "0-9";
			this.teaNums.text="1" //默认是1

			////////// =>
			this.bgUI = new BaseBorderUI();
			this.bgUI.bgImg.size(800,500);
			this.bgUI.size(800,500);
			this.bgUI.addChild(this);
			this.y = 10;

			this.bgUI.titleImg.skin = "gameUI/common/icon/fireTeaName.png";
			this.bgUI.titleImg.x = this.width-this.bgUI.titleImg.width>>1;
			this.bgUI.titleImg.y += 3;

			this.mouseThrough = true; // 解除closeBtn事件屏蔽
			// 根据缩放率来动态调整标题、关闭按钮
			let wRate:number = (800-600)/600;
			let hRate:number = (500-400)/400;
			this.bgUI.closeBtn.x += this.bgUI.closeBtn.x*wRate;
			this.bgUI.closeBtn.y += this.bgUI.closeBtn.y*hRate;
			this.bgUI.closeBtn.scale(1.5,1.5);
			this.bgUI.closeBtn.on(Event.CLICK,this,this.closeBtnFn);
			////////// <=

			this.gridItemsArr = [];
			this.selectTab(this.tab1);
            for(let i:number=1;i<10;i++){
                (this.getChildByName("tab"+i) as Laya.Box).on(Event.CLICK,this,this.setStatus);
            }
			this.numBtn_add.on(Event.CLICK,this,this.addOneBtnFn);
			this.numBtn_sub.on(Event.CLICK,this,this.reduceOneBtnFn);
			this.btn_direction_top.on(Event.CLICK,this,this.direction_top);
			this.btn_direction_down.on(Event.CLICK,this,this.direction_down);
			this.btn_affirm.on(Event.CLICK,this,this.closeBtnFn);
			// this.btn_close.on(Event.CLICK,this,this.closeBtnFn);
			this.btn_cancel.on(Event.CLICK,this,this.closeBtnFn);
			this.teaNums.on(Event.INPUT,this,this.saleNumsInputOverFn);
			this.teaNums.on(Event.BLUR,this,this.saleNumsInputOverFn);
		}


		/**
		 * 左侧选项卡的切换
		 */

		 setStatus(event:Event):void{
			let i:number;
			let len:number=this.tabArr.length;
			let tempBox:Laya.Box;
			this.curSelectedTabName=event.target.name;
			let eventBox:Laya.Box=this.getChildByName(this.curSelectedTabName) as Laya.Box;
			for(i=0;i<len;i++){
				tempBox=this.tabArr[i];
				if(eventBox==tempBox)
					this.selectTab(eventBox);
				else
					this.unSelectTab(tempBox);
			}
			this.addStorageGrids([]);
		}
		selectTab(tab:Box):void
		{
			(tab.getChildByName("whiteBg") as Laya.Image).visible = true;
			(tab.getChildByName("grayBg") as Laya.Image).visible = false;
		}

		unSelectTab(tab:Box):void
		{
			(tab.getChildByName("whiteBg") as Laya.Image).visible = false;
			(tab.getChildByName("grayBg") as Laya.Image).visible = true;
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

		private itemClked(event:Event):void
		{
			let gridItem:FriedDialogGridLeftUI;
			let childNums:number = this.gridContainer.numChildren;
			let i:number;
			for (i=0; i<childNums; i++)
			{
				gridItem = this.gridContainer.getChildAt(i) as FriedDialogGridLeftUI;
				if(!gridItem)
					continue;
				gridItem.check.visible = false;
			}
			(event.target.getChildByName("check") as Laya.Image).visible=true;
		}

		/**
		 * 填充茶叶种类格子（茶叶）
		 * @param potObj 当前所选的炒锅
		 */
		addStorageGrids(voArr:Array<any>):void
		{
			this.gridContainer.removeChildren(0,this.gridContainer.numChildren);
			if(!voArr || !voArr.length)
				return;

			this.initShowTea(voArr);
		}

		/** 点击左侧茶叶种类Tab后填充其下茶子项 */
		initShowTea(voArr:Array<any>):void
		{
			let len:number = voArr.length;
			let i:number;
			let seedVO:SeedVO;
			this.gridItemsArr = [];
			for(i=0; i<len; i++)
			{
				seedVO = voArr[i];
				let gridItem:FriedDialogGridLeftUI = new FriedDialogGridLeftUI();
				gridItem.check.visible=false;
				gridItem.name = (i+1)+"";
				// gridItem.name=seedVO.id+"";
				gridItem.teaName.text=seedVO.Teaname+"";
				gridItem.y=i*(gridItem.height+5);
				// 请求第一个茶叶的详细信息
				if(i==0)
				{
					gridItem.check.visible=true;
					FriedTeaDialogCtrl.getInstance().itemClkedFn(seedVO);
				}

				// 最多显示8小项
				if(i <= 7)
					this.gridContainer.addChild(gridItem);
				this.gridItemsArr.push(gridItem);

				// 点击每一项请求获取详细信息
				gridItem.on(Event.CLICK,this,this.itemClked);
				gridItem.on(Event.CLICK,this,this.gridItemClked,[seedVO]);
			}
		}

		private gridItemClked(seedVO:SeedVO):void
		{
			if(!seedVO)
				return;
			FriedTeaDialogCtrl.getInstance().itemClkedFn(seedVO);
		}

		/**
		 * 加载右侧茶叶信息
		 * @param teaId 只获取 teaId 对应的数据
		 */
		updateRightContent(voShowArr:Array<any>,teaId:number):void
		{
			if(!voShowArr || !teaId)
				return;

			// 当前茶叶等级，与炒锅所炒最大等级相较
			let curTeaLvl:number;
			let len:number = voShowArr.length;
			let i:number;
			let teaShowVO:SeedVO;
			let tealeafObjArr:Object[] =  ResourceManager.tealeafObjArr;
			let tempObj:Object;
			let len2:number = tealeafObjArr.length;
			for(i=0; i<len2; i++)
			{
				tempObj = tealeafObjArr[i];
				if(teaId == parseInt(tempObj["id"]))
				{
					curTeaLvl = parseInt(tempObj["level"]);
					break;
				}
			}
			for(i=0; i<len; i++)
			{
				teaShowVO = voShowArr[i];
				if((teaId==teaShowVO.id) && (teaShowVO.type==undefined))
				{
					// 炒锅等级不足图标
					if(this.curPotVO.friedTeaMaxLvl < curTeaLvl)
						this.potLvlNotEnough.visible = true;
					else
						this.potLvlNotEnough.visible = false;
					// 小时
					let hour:number=parseInt(((teaShowVO.friedTeaTime*teaShowVO.friedteanum)/(60*60))+"");
					let diff:number=(teaShowVO.friedTeaTime*teaShowVO.friedteanum)%(60*60);
					// 分钟
					let minute:number=parseInt(diff/60+"");
					this.teaName_top.text=teaShowVO.Teaname+"";		//顶部茶叶名称
					this.iconImg.skin=this.translateSwfTypeToPngType(teaShowVO.teaIcon); //茶叶图片
					this.teaNums.text=teaShowVO.friedteanum+""; //炒茶数量
					this.yieldNums = teaShowVO.friedteanum;
					this.friedTeaTime.text=hour+"小时"+minute+"分钟"; //炒茶所需时间
					this.hireprice.text=50+""; //雇用价格 默认50
					this.costprice.text=(teaShowVO.friedteanum*teaShowVO.teaPrice+50)+""; //配料成本
					this.yield.text=teaShowVO.friedteanum+""; //加工产量
					this.teaPirce.text=teaShowVO.teaPrice+""; // 产品单价

					// 获取炒茶所需材料
					FriedTeaDialogCtrl.getInstance().itemClkedMaterial(teaShowVO.id);
					break;
				}
			}
		}

		/**
		 * 加载炒茶的配置信息
		 */
		loadFriedTeaSecret(teaShowVOArr:Array<any>):void{
			if(!teaShowVOArr || !teaShowVOArr.length)
				return;

			let len:number = teaShowVOArr.length;
			let i:number;
			let teaShowVO:SeedVO;
				for (i =0;i<len;i++) {
					teaShowVO =teaShowVOArr[i];
					switch (teaShowVO.type) {
						case "teafruit":
						case "othersfruit":
							this.curBuyTeaArr=new Array<any>();
							this.data1.skin=this.translateSwfTypeToPngType(teaShowVO.icon);
							this.input_teaName.text=teaShowVO.name;
							this.input_teaNums.text=teaShowVO.seedNums+"";
							this.input_teaLock.text=teaShowVO.lockNums+"";

							this.curBuyTeaArr.push(teaShowVO.type);
							this.curBuyTeaArr.push(teaShowVO.teaPrice);
							this.curBuyTeaArr.push(teaShowVO.id);
							this.curBuyTeaArr.push(teaShowVO.name);
							this.curBuyTeaArr.push(teaShowVO.lockNums);

							if(teaShowVO.lockNums>0){
								this.note.text="当前材料不足,请凑齐后再来吧";
								this.btn_affirm.disabled = true;
								this.btn_buy1.visible=true;
							}else{
								this.note.text="";
								this.btn_affirm.disabled = false;
								this.btn_buy1.visible=false;
							}
							break;
						case "book":
							this.curBuyBookArr=new Array<any>();
							this.data2.skin=this.translateSwfTypeToPngType(teaShowVO.icon);
							this.input_bookName.text=teaShowVO.name;
							this.input_bookNums.text=teaShowVO.storageNums+"";
							this.input_bookLock.text=teaShowVO.lockNums+"";
							this.curBuyBookArr.push(teaShowVO.type);
							this.curBuyBookArr.push(teaShowVO.teaPrice);
							this.curBuyBookArr.push(teaShowVO.id);
							this.curBuyBookArr.push(teaShowVO.name);
							this.curBuyBookArr.push(teaShowVO.lockNums);

							if(teaShowVO.lockNums>0){
								this.note.text="当前材料不足,请凑齐后再来吧";
								this.btn_affirm.disabled = true;
								this.btn_buy2.visible=true;
							}else{
								this.note.text="";
								this.btn_affirm.disabled = false;
								this.btn_buy2.visible=false;
							}
							break;

						default:
							console.log("炒茶材料类型不正确！ -> teaShowVO.type:"+teaShowVO.type);
							break;
					}
				}
		}

		/**
		 * 开始炒茶
		 */
		startFriedTea(vo:models.base.PotVO):void{
			if(!vo)
				return;

			if(FriedTeaDialogView.callback)
				FriedTeaDialogView.callback(vo);
		}

		/**
		 * 输入框输入后
		 */
		private saleNumsInputOverFn(event:Event):void
		{
			if(parseInt(this.teaNums.text) > 10)
				this.yieldNums = 10;
			else if(parseInt(this.teaNums.text) < 1)
				this.yieldNums = 1;
			else if (isNaN(parseInt(this.teaNums.text)))
				this.yieldNums =1;
			else
				this.yieldNums = parseInt(this.teaNums.text);

			// 单价
			// let _costPrice:number = (parseInt(this.costprice.text)-parseInt(this.hireprice.text)) / this.yieldNums;
			let _costPrice:number = parseInt(this.teaPirce.text);
			// // 炒茶总数
			// this.teaNums.text = this.yieldNums+"";
			// 加工产量
			this.yield.text=this.yieldNums+"";
			// 加工时间赋值
			let hour:number=parseInt(((300*this.yieldNums)/(60*60))+"");
			let diff:number=(300*this.yieldNums)%(60*60);
			// 分钟
			let minute:number=parseInt(diff/60+"");
			this.friedTeaTime.text=hour+"小时"+minute+"分钟";

			// 配料成本赋值
			this.costprice.text=(_costPrice * this.yieldNums +parseInt(this.hireprice.text))+"";
		}

		/**
		 * 炒茶数量+1
		 */
		private addOneBtnFn(event:Event):void
		{
			if(this.yieldNums > 10){
				return;
			}
			else if(isNaN(parseInt(this.teaNums.text))){
				this.yieldNums =1;
			}
			else{
				this.yieldNums=parseInt(this.teaNums.text);
			}

			// 单价
			// let _costPrice:number = (parseInt(this.costprice.text)-parseInt(this.hireprice.text)) / this.yieldNums;
			let _costPrice:number = parseInt(this.teaPirce.text);
			this.yieldNums++;
			// 炒茶总数
			this.teaNums.text = this.yieldNums+"";
			// 加工产量
			this.yield.text=this.yieldNums+"";
			// 加工时间赋值
			let hour:number=parseInt(((300*this.yieldNums)/(60*60))+"");
			let diff:number=(300*this.yieldNums)%(60*60);
			// 分钟
			let minute:number=parseInt(diff/60+"");
			this.friedTeaTime.text=hour+"小时"+minute+"分钟";

			// 配料成本赋值
			this.costprice.text = (_costPrice * this.yieldNums + parseInt(this.hireprice.text))+"";
			console.log("配料成本:"+this.costprice.text);

			// this.teaPirce.text=teaShowVO.teaPrice+""; // 产品单价

		}

		/**
		 * 炒茶数量-1
		 */
		private reduceOneBtnFn(event:Event):void
		{
			if(this.yieldNums==1)
				return;

			// 单价
			// let _costPrice:number = (parseInt(this.costprice.text)-parseInt(this.hireprice.text)) / this.yieldNums;
			let _costPrice:number = parseInt(this.teaPirce.text);
			this.yieldNums--;
			// 炒茶总数
			this.teaNums.text = this.yieldNums+"";
			// 加工产量
			this.yield.text=this.yieldNums+"";
			// 加工时间赋值
			let hour:number=parseInt(((300*this.yieldNums)/(60*60))+"");
			let diff:number=(300*this.yieldNums)%(60*60);
			// 分钟
			let minute:number=parseInt(diff/60+"");
			this.friedTeaTime.text=hour+"小时"+minute+"分钟";

			// 配料成本赋值
			this.costprice.text=(_costPrice * this.yieldNums +parseInt(this.hireprice.text))+"";
		}

		/**
		 * 上一个茶叶 Tab
		 */
		direction_top():void
		{
			if(this.gridItemsArr.length <= this.gridItemIndex)
				return;
			if(this.gridItemIndex <= 8)
				return;
			this.gridContainer.removeChildByName(this.gridItemIndex+"") as View;
			this.gridItemIndex--;

			let downNums:number = this.gridItemIndex-8;
			let i:number;
			for(i=downNums+2; i<=downNums+8; i++)
			{
				(this.gridContainer.getChildByName(i+"") as View).y += 42;
			}
			let curGrid:FriedDialogGridLeftUI = this.gridItemsArr[downNums];
			curGrid.name = (downNums+1)+"";
			curGrid.y = 0;
			this.gridContainer.addChild(curGrid);
		}

		/**
		 * 下一个茶叶 Tab
		 */
		direction_down():void
		{
			if(this.gridItemsArr.length <= this.gridItemIndex)
				return;
			this.gridItemIndex++;

			let upNums:number = this.gridItemIndex-8;
			let i:number;
			for(i=1; i<=upNums; i++)
			{
				this.gridContainer.removeChildByName(i+"");
			}
			for(i=upNums+1; i<=upNums+7; i++)
			{
				(this.gridContainer.getChildByName(i+"") as View).y -= 42;
			}

			let curGrid:FriedDialogGridLeftUI = this.gridItemsArr[this.gridItemIndex-1];
			curGrid.name = this.gridItemIndex+"";
			curGrid.y = 294;
			this.gridContainer.addChild(curGrid);
		}

		closeBtnFn():void
		{
			// this.close();
			this.bgUI.removeSelf();
		}
	}
}