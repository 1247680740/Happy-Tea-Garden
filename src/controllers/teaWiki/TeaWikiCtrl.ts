namespace controllers.teaWiki
{
	import FireTeaWikiModel = models.teaWiki.TeaWikiModel;
	import Event = laya.events.Event;
	import TweenUtil = utils.TweenUtil;
	import FireTeaWikiGridItemUI = ui.gameUI.teaWiki.TeaWikiDialogUI;


	/**
	 * 茶百科控制器类
	 */
	export class TeaWikiCtrl
	{
		static model:models.teaWiki.TeaWikiModel;

		static view:views.teaWiki.TeaWikiView;

		private static instance: TeaWikiCtrl;

		/** 底部工具栏的高度 */
		private toolBarH: number = 30;

		/** 当前选中项的名称 */
		curSelectItemName:string="summarize";

		constructor()
		{
			if (!TeaWikiCtrl.model)
				TeaWikiCtrl.model = FireTeaWikiModel.getInstance();
			if (!TeaWikiCtrl.view)
				TeaWikiCtrl.view = new views.teaWiki.TeaWikiView();

			for(let i:number=1;i<9;i++){
					(TeaWikiCtrl.view.getChildByName("tab"+i) as Laya.Box).on(Event.CLICK,this,this.request_getItemList);
			}
			TeaWikiCtrl.view.pre.on(Event.CLICK,this,this.pageBtnFn);
			TeaWikiCtrl.view.next.on(Event.CLICK,this,this.pageBtnFn);
		}

		static getInstance(): TeaWikiCtrl
		{
			if (!TeaWikiCtrl.instance)
				TeaWikiCtrl.instance = new TeaWikiCtrl();
			return TeaWikiCtrl.instance;
		}

		/**
		 * 点击工具栏茶百科图标显示茶百科面板
		 */
		showFireTeaWiki(): void
		{
			UILayerManager.uiLayer.addChildAt(TeaWikiCtrl.view,UILayerManager.uiLayer.numChildren-1);
			TeaWikiCtrl.view.visible = true;
			TeaWikiCtrl.view.x = configs.GameConfig.GAME_WINDOW_WIDTH - TeaWikiCtrl.view.width;
			TeaWikiCtrl.view.y = configs.GameConfig.GAME_WINDOW_HEIGHT - TeaWikiCtrl.view.height - this.toolBarH;
      		this.request_getAll(this.curSelectItemName);
		}

		request_getItemList(event:Event):void{
				switch (event.target.name) {
					case "tab1":
						this.curSelectItemName="summarize";
						this.request_getAll(this.curSelectItemName);
					break;
					case "tab2":
						this.curSelectItemName="green";
						this.request_getAll(this.curSelectItemName);
					break;
					case "tab3":
						this.curSelectItemName="red";
						this.request_getAll(this.curSelectItemName);
					break;
					case "tab4":
						this.curSelectItemName="uron";
						this.request_getAll(this.curSelectItemName);
					break;
					case "tab5":
						this.curSelectItemName="white";
						this.request_getAll(this.curSelectItemName);
					break;
					case "tab6":
						this.curSelectItemName="yellow";
						this.request_getAll(this.curSelectItemName);
					break;
					case "tab7":
						this.curSelectItemName="black";
						this.request_getAll(this.curSelectItemName);
					break;
					case "tab8":
						this.curSelectItemName="flower";
						this.request_getAll(this.curSelectItemName);
					break;
					default:
					break;
				}
		}

		/**
		 * 点击后请求右侧的列表项
		 */
		request_getAll(name:string):void
		{
			FireTeaWikiModel.callback = this.getAllOverFn;
			TeaWikiCtrl.model.request_getDataByLeft(name);
		}

		getAllOverFn(takeData?: any):void
		{
			TeaWikiCtrl.view.addFireTeaWikiGrids(takeData);
		}

		/**
		 * 第一次请求详情页
		 */
		itemClkedFn(teaWikiInfoVO:models.teaWiki.TeaWikiInfoVO):void
		{
			FireTeaWikiModel.callback = this.FireItemClkedFn;
			TeaWikiCtrl.model.request_getFirstInfo(teaWikiInfoVO);
		}
		/**
		 * 点击每一项获取的数据
		 */
		itemTauchFn(id:number,teaWikiInfoVO:models.teaWiki.TeaWikiInfoVO):void{
			FireTeaWikiModel.callback = this.FireItemClkedFn;
			TeaWikiCtrl.model.request_getTouchInfo(id,teaWikiInfoVO);
		}
		FireItemClkedFn(takeData?:any):void
		{
			TeaWikiCtrl.view.addFireTeaWikiImgs(takeData);
		}

		/**
		 * 翻页按钮的信息
		 */
		pageBtnFn(event:Event):void
		{
			let des:string=event.target.name;
			FireTeaWikiModel.callback = this.FireItemClkedFn;
			TeaWikiCtrl.model.request_getPageData(TeaWikiCtrl.model.teaVOArr,des);
		}
	}
}