namespace views.layers
{
	import BaseView = views.base.BaseView;
	import GameConfig = configs.GameConfig;
	import CropCtrl = controllers.teaRoom.crop.CropCtrl;
	import LandCtrl = controllers.teaRoom.LandCtrl;
	import UpGradePotCtrl = controllers.friedRoom.pot.UpGradePotCtrl;
	import IntensifyPotCtrl = controllers.friedRoom.pot.IntensifyPotCtrl;
	import PlayerInfoModel = models.player.PlayerInfoModel;
	import BuyUpDataTipUI = ui.gameUI.tips.BuyUpDataTipUI;
	import ConfirmCancelTipView = views.common.ConfirmCancelTipView;
	import Event = Laya.Event;
	/**
	* 游戏弹出层
	* 弹出UI层，不会隐藏，嵌入 TipManager 中，将弹出框添加至 TipLayer 后进行显示
	*/
	export class TipLayer extends BaseView
	{
		private static instance: TipLayer;
		/**
		 * 带有确定、取消按钮的提示框
		 */
		private yesOrNoTip:ConfirmCancelTipView;

		name: string = "TipLayer";

		isCheck: boolean = true;
		//当前点击的按钮名称
		curOverTabName: string;

		constructor()
		{
			super();

			this.updateZOrder();
			this.on(Laya.Event.ADDED, this, this.addedFn);
			this.on(Laya.Event.COMPONENT_ADDED, this, this.compAddedFn);
		}

		addedFn(): void
		{
			console.log("==== TipLayer,addedFn() ");
		}

		compAddedFn(): void
		{
			console.log("==== TipLayer,compAddedFn() ");
		}

		static getInstance(): TipLayer
		{
			if (!TipLayer.instance)
				TipLayer.instance = new TipLayer();
			return TipLayer.instance;
		}

		/**
		 * 带有确定、取消按钮的提示框
		 * @info 提示信息
		 * @myCallBack 确定后的回调
		 * @takeData 携带的数据
		 * @canSubmit 确定按钮是否可用
		 */
		showYesNoTip(info:string,myCallBack?:Function,takeData?:any,canSubmit:boolean=true):void
		{
			if(!this.yesOrNoTip)
			{
				this.yesOrNoTip = new views.common.ConfirmCancelTipView();
				this.addChild(this.yesOrNoTip);
			}
			this.yesOrNoTip.visible = true;
			this.yesOrNoTip.callback = myCallBack;
			this.yesOrNoTip.takeData = takeData;
			// Laya.HTMLDivElement: 图文混排
			this.yesOrNoTip.contentTxt.text = info;
			this.yesOrNoTip.confirmBtn.disabled = !canSubmit;
			this.yesOrNoTip.x = GameConfig.GAME_WINDOW_WIDTH - this.yesOrNoTip.width >> 1;
			this.yesOrNoTip.y = GameConfig.GAME_WINDOW_HEIGHT - this.yesOrNoTip.height >> 1;
		}

		/**
		 * 显示带有不同背景的信息提示
		 */
		showDrawBgTip(info: string, pos?: Laya.Point): void
		{
			if (!info)
				return;
			let tip: views.common.DrawBgTip = views.common.DrawBgTip.instance;
			tip.cacheAs = "bitmap";
			if (!this.getChildByName("drawBgTip"))
			{
				tip.name = "drawBgTip";
				this.addChild(tip);
			}

			tip.visible = true;
			tip.showTip(info);

			if (pos)
			{
				tip.x = pos.x;
				tip.y = pos.y;
			}
			else
			{
				tip.x = GameConfig.GAME_WINDOW_WIDTH - tip.width >> 1;
				tip.y = GameConfig.GAME_WINDOW_HEIGHT - tip.height >> 1;
			}
		}

		/** 弹出激活炒锅条件 */
		showEnableTip(needMoney: number): void
		{
			let assartPotTip: views.friedRoom.pot.AssartPotTipView = views.friedRoom.pot.AssartPotTipView.instance;
			assartPotTip.name = "assartPotTip";
			assartPotTip.needMoney.text = needMoney + "";
			// assartPotTip.x = GameConfig.GAME_WINDOW_HEIGHT - assartPotTip.width + 50;
			// assartPotTip.y = GameConfig.GAME_WINDOW_HEIGHT - assartPotTip.height >> 1;
			// this.addChild(assartPotTip);
			this.addChild(assartPotTip.bgUI);
			// UILayerManager.friedTeaLayer.addChild(assartPotTip);
			assartPotTip.bgUI.x = GameConfig.GAME_WINDOW_WIDTH - assartPotTip.bgUI.width >> 1;
			assartPotTip.bgUI.y = GameConfig.GAME_WINDOW_HEIGHT - assartPotTip.bgUI.height >> 1;
			assartPotTip.once(views.friedRoom.pot.AssartPotTipView.ASSART_POT_EVENT, this, this.assartPotFn);
		}

		// 激活炒锅事件
		private assartPotFn(): void
		{
			controllers.friedRoom.pot.PotCtrl.getInstance().request_actAssartPot();
		}

		/**
		 * 购买升级提示
		 */
		private buyUpDataTipUI(buyUpDataTipUI: ui.gameUI.tips.BuyUpDataTipUI, potVO: models.base.PotVO, txtMsg: string): void
		{
			if (parseInt(potVO.lockToolNums) > 0)
			{
				buyUpDataTipUI.needMoney.text = (parseInt(potVO.lockToolNums) * 5).toString();
				buyUpDataTipUI.buyNums.text = potVO.lockToolNums;
				buyUpDataTipUI.needData.text = txtMsg;
			}
			else
			{
				buyUpDataTipUI.visible = false;
				return;
			}
			if (!this.getChildByName(buyUpDataTipUI.name))
				this.addChild(buyUpDataTipUI);
			buyUpDataTipUI.visible = true;
			buyUpDataTipUI.x = GameConfig.GAME_WINDOW_WIDTH - buyUpDataTipUI.width >> 1;
			buyUpDataTipUI.y = GameConfig.GAME_WINDOW_HEIGHT - buyUpDataTipUI.height >> 1;

			buyUpDataTipUI.okBtn.on(Event.CLICK, this, function (): void
			{
				UpGradePotCtrl.getInstance().request_confirmBuy(potVO);
				this.removeChild(buyUpDataTipUI);
			});
			buyUpDataTipUI.cancelBtn.on(Event.CLICK, this, function (): void
			{
				this.removeChild(buyUpDataTipUI);
			});
			buyUpDataTipUI.closeBtn.on(Event.CLICK, this, function (): void
			{
				this.removeChild(buyUpDataTipUI);
			});
		}

		/** 弹出购买炒锅升级材料的弹窗 */
		showPotDataTip(infoObjArr: Array<any>, name: string): void //infoObj:Object
		{
			let potVO: models.base.PotVO;
			let len: number = infoObjArr.length;
			let i: number;
			let buyUpDataTipUI: BuyUpDataTipUI = new ui.gameUI.tips.BuyUpDataTipUI();
			buyUpDataTipUI.name = "buyUpDataTipUI";
			buyUpDataTipUI.cacheAs = "bitmap";

			if (name == "btn_buy2")
			{
				potVO = infoObjArr[1];
				if (!potVO || potVO == undefined)
					return;
				if (potVO.toolId == 51001)
				{
					this.buyUpDataTipUI(buyUpDataTipUI, potVO, "强化工艺书");
				}
			} else if (name == "btn_buy3")
			{
				potVO = infoObjArr[2];
				console.log("potVO的数据类型为：" + typeof (potVO));
				if (!potVO || potVO == undefined)
					return;
				if (potVO.toolId == 51003)  //铜矿石
				{
					this.buyUpDataTipUI(buyUpDataTipUI, potVO, "铜矿石");
				}
				if (potVO.toolId == 51004)  //精钢矿石
				{
					this.buyUpDataTipUI(buyUpDataTipUI, potVO, "精钢矿石");
				}
				if (potVO.toolId == 51005)  //玄铁矿石
				{
					this.buyUpDataTipUI(buyUpDataTipUI, potVO, "玄铁矿石");
				}
				if (potVO.toolId == 51013)  //寒铁矿石
				{
					this.buyUpDataTipUI(buyUpDataTipUI, potVO, "寒铁矿石");
				}
			} else if (name == "btn_buy4")
			{
				potVO = infoObjArr[3];
				if (!potVO || potVO == undefined)
					return;
				if (potVO.toolId == 51010)
				{  //红宝石
					this.buyUpDataTipUI(buyUpDataTipUI, potVO, "红宝石");
				}
				if (potVO.toolId == 51011)
				{  //绿松石
					this.buyUpDataTipUI(buyUpDataTipUI, potVO, "绿松石");
				}
				if (potVO.toolId == 51012)
				{  //祖母绿
					this.buyUpDataTipUI(buyUpDataTipUI, potVO, "祖母绿");
				}
				if (potVO.toolId == 51007)
				{  //玛瑙石
					this.buyUpDataTipUI(buyUpDataTipUI, potVO, "玛瑙石");
				}
			}
		}

		/**
		 * 显示购买炒锅强化的弹窗
		 */
		showIntensifyPotTip(infoObjArr: Array<models.base.PotVO>, name: string): void
		{
			let potVO: models.base.PotVO;
			let len: number = infoObjArr.length;
			let i: number;
			if (name == "btn_buy2")
			{
				let strengthPotTipUI: BuyUpDataTipUI = new ui.gameUI.tips.BuyUpDataTipUI();
				strengthPotTipUI.cacheAs = "bitmap";
				potVO = infoObjArr[2];
				if (!potVO || potVO == undefined)
					return;
				if (potVO.toolId == 51002)  //生铁矿石
				{
					if (parseInt(potVO.lockToolNums) > 0)
					{
						strengthPotTipUI.needMoney.text = (parseInt(potVO.lockToolNums) * 5).toString();
						strengthPotTipUI.buyNums.text = potVO.lockToolNums;
						strengthPotTipUI.needData.text = "生铁矿石";
					}
					this.addChild(strengthPotTipUI);
					strengthPotTipUI.x = GameConfig.GAME_WINDOW_WIDTH - strengthPotTipUI.width >> 1;
					strengthPotTipUI.y = GameConfig.GAME_WINDOW_HEIGHT - strengthPotTipUI.height >> 1;
					strengthPotTipUI.okBtn.on(Event.CLICK, this, function (): void
					{
						IntensifyPotCtrl.getInstance().request_confirmBuy(potVO);
						IntensifyPotCtrl.getInstance().cancelBtnClkFn();
					});
					strengthPotTipUI.cancelBtn.on(Event.CLICK, this, function (): void
					{
						IntensifyPotCtrl.getInstance().cancelBtnClkFn();
					});
					strengthPotTipUI.closeBtn.on(Event.CLICK, this, function (): void
					{
						IntensifyPotCtrl.getInstance().cancelBtnClkFn();
					});
				}
				if (potVO.toolId == 51004)  //金矿石
				{
					if (parseInt(potVO.lockToolNums) > 0)
					{
						strengthPotTipUI.needMoney.text = (parseInt(potVO.lockToolNums) * 5).toString();
						strengthPotTipUI.buyNums.text = potVO.lockToolNums;
						strengthPotTipUI.needData.text = "金矿石";
					}
					this.addChild(strengthPotTipUI);
					strengthPotTipUI.x = GameConfig.GAME_WINDOW_WIDTH - strengthPotTipUI.width >> 1;
					strengthPotTipUI.y = GameConfig.GAME_WINDOW_HEIGHT - strengthPotTipUI.height >> 1;
					strengthPotTipUI.okBtn.on(Event.CLICK, this, function (): void
					{
						IntensifyPotCtrl.getInstance().request_confirmBuy(potVO);
						IntensifyPotCtrl.getInstance().cancelBtnClkFn();
					});
					strengthPotTipUI.cancelBtn.on(Event.CLICK, this, function (): void
					{
						IntensifyPotCtrl.getInstance().cancelBtnClkFn();
					});
					strengthPotTipUI.closeBtn.on(Event.CLICK, this, function (): void
					{
						IntensifyPotCtrl.getInstance().cancelBtnClkFn();
					});
				}
				if (potVO.toolId == 51005)  //玄铁矿石
				{
					if (parseInt(potVO.lockToolNums) > 0)
					{
						strengthPotTipUI.needMoney.text = (parseInt(potVO.lockToolNums) * 5).toString();
						strengthPotTipUI.buyNums.text = potVO.lockToolNums;
						strengthPotTipUI.needData.text = "玄铁矿石";
					}
					this.addChild(strengthPotTipUI);
					strengthPotTipUI.x = GameConfig.GAME_WINDOW_WIDTH - strengthPotTipUI.width >> 1;
					strengthPotTipUI.y = GameConfig.GAME_WINDOW_HEIGHT - strengthPotTipUI.height >> 1;
					strengthPotTipUI.okBtn.on(Event.CLICK, this, function (): void
					{
						IntensifyPotCtrl.getInstance().request_confirmBuy(potVO);
						IntensifyPotCtrl.getInstance().cancelBtnClkFn();
					});
					strengthPotTipUI.cancelBtn.on(Event.CLICK, this, function (): void
					{
						IntensifyPotCtrl.getInstance().cancelBtnClkFn();
					});
					strengthPotTipUI.closeBtn.on(Event.CLICK, this, function (): void
					{
						IntensifyPotCtrl.getInstance().cancelBtnClkFn();
					});
				}
			} else if (name == "btn_buy3")
			{
				let strengthPotTipUI: BuyUpDataTipUI = new ui.gameUI.tips.BuyUpDataTipUI();
				strengthPotTipUI.cacheAs = "bitmap";
				potVO = infoObjArr[1];
				if (!potVO || potVO == undefined)
					return;
				if (potVO.toolId == 51001)  //强化工艺书
				{
					if (parseInt(potVO.lockToolNums) > 0)
					{
						strengthPotTipUI.needMoney.text = (parseInt(potVO.lockToolNums) * 3).toString();
						strengthPotTipUI.buyNums.text = potVO.lockToolNums;
						strengthPotTipUI.needData.text = "强化工艺书";
					}
					this.addChild(strengthPotTipUI);
					strengthPotTipUI.x = GameConfig.GAME_WINDOW_WIDTH - strengthPotTipUI.width >> 1;
					strengthPotTipUI.y = GameConfig.GAME_WINDOW_HEIGHT - strengthPotTipUI.height >> 1;
					strengthPotTipUI.okBtn.on(Event.CLICK, this, function (): void
					{
						IntensifyPotCtrl.getInstance().request_confirmBuy(potVO);
						IntensifyPotCtrl.getInstance().cancelBtnClkFn();
					});
					strengthPotTipUI.cancelBtn.on(Event.CLICK, this, function (): void
					{
						IntensifyPotCtrl.getInstance().cancelBtnClkFn();
					});
					strengthPotTipUI.closeBtn.on(Event.CLICK, this, function (): void
					{
						IntensifyPotCtrl.getInstance().cancelBtnClkFn();
					});
				}
			}
		}

		/**
		 * 清理炒锅中的茶叶（刷锅）
		 */
		showClearPot(potVO:models.friedRoom.pot.PotVO): void
		{
			if(!potVO || potVO.status==0)
				return;
			let tipView: ui.gameUI.tips.ConfirmCancelTipUI = new ui.gameUI.tips.ConfirmCancelTipUI();
			tipView.cacheAs = "bitmap";
			tipView.contentTxt.text = "是否要清理掉茶叶？";
			this.addChild(tipView);
			tipView.x = GameConfig.GAME_WINDOW_WIDTH - tipView.width >> 1;
			tipView.y = GameConfig.GAME_WINDOW_HEIGHT - tipView.height >> 1;
			tipView.confirmBtn.on(Event.CLICK, this, function (): void
			{
				controllers.friedRoom.pot.PotCtrl.callback = views.friedRoom.pot.PotGridView.instance.brushPotOver;
				controllers.friedRoom.pot.PotCtrl.getInstance().request_brushPot(potVO);
				this.removeChild(tipView);
			});
			tipView.closeBtn.on(Event.CLICK, this, function (): void
			{
				this.removeChild(tipView);
			});
			tipView.cancelBtn.on(Event.CLICK, this, function (): void
			{
				this.removeChild(tipView);
			});
		}

		/**
		 * 显示茶园光标
		 */
		showMainSceneCursor(): void
		{
			// 光标复位
			UILayerManager.teaGardenUI.resetCursorState();

			views.teaRoom.toolBar.DownToolBarView.curShowCursor.name = "sceneCursor";
			if (!this.getChildByName("sceneCursor"))
				this.addChild(views.teaRoom.toolBar.DownToolBarView.curShowCursor);
			views.teaRoom.toolBar.DownToolBarView.curShowCursor.visible = true;
			views.teaRoom.toolBar.DownToolBarView.curShowCursor.zOrder = 9999;

			if (views.friendList.FriendList_DownToolBarView)
			{
				if (views.friendList.FriendList_DownToolBarView.curShowCursor)
					views.friendList.FriendList_DownToolBarView.curShowCursor.visible = false;
			}
			if (views.friedRoom.toolBar.FireTeaHome_DownToolBarView)
			{
				if (views.friedRoom.toolBar.FireTeaHome_DownToolBarView.curCursor)
					views.friedRoom.toolBar.FireTeaHome_DownToolBarView.curCursor.visible = false;
			}
			if(views.makeRoom.toolBar.MakeTeaHome_DownToolBarView)
			{
				if(views.makeRoom.toolBar.MakeTeaHome_DownToolBarView.curCursor)
					views.makeRoom.toolBar.MakeTeaHome_DownToolBarView.curCursor.visible = false;
			}
		}

		/**
		 * 显示好友茶园光标
		 */
		showFriendSceneCursor(): void
		{
			// 光标复位
			UILayerManager.friendUILayer.resetCursorState();

			views.friendList.FriendList_DownToolBarView.curShowCursor.name = "friendSceneCursor";
			if (!this.getChildByName("friendSceneCursor"))
				this.addChild(views.friendList.FriendList_DownToolBarView.curShowCursor);
			views.friendList.FriendList_DownToolBarView.curShowCursor.visible = true;
			views.friendList.FriendList_DownToolBarView.curShowCursor.zOrder = 9999;

			views.teaRoom.toolBar.DownToolBarView.curShowCursor.visible = false;
			if (views.friedRoom.toolBar.FireTeaHome_DownToolBarView)
			{
				if (views.friedRoom.toolBar.FireTeaHome_DownToolBarView.curCursor)
					views.friedRoom.toolBar.FireTeaHome_DownToolBarView.curCursor.visible = false;
			}
			if(views.makeRoom.toolBar.MakeTeaHome_DownToolBarView)
			{
				if(views.makeRoom.toolBar.MakeTeaHome_DownToolBarView.curCursor)
					views.makeRoom.toolBar.MakeTeaHome_DownToolBarView.curCursor.visible = false;
			}
		}

		/**
		 * 显示炒茶室光标
		 */
		showFriedTeaCursor(): void
		{
			// 光标复位
			UILayerManager.friedTeaLayer.resetCursorState();

			views.friedRoom.toolBar.FireTeaHome_DownToolBarView.curCursor.name = "fireTeaCursor";
			if (!this.getChildByName("fireTeaCursor"))
				this.addChild(views.friedRoom.toolBar.FireTeaHome_DownToolBarView.curCursor);
			views.friedRoom.toolBar.FireTeaHome_DownToolBarView.curCursor.visible = true;
			views.friedRoom.toolBar.FireTeaHome_DownToolBarView.curCursor.zOrder = 9999;

			views.teaRoom.toolBar.DownToolBarView.curShowCursor.visible = false;
			if(views.makeRoom.toolBar.MakeTeaHome_DownToolBarView)
			{
				if(views.makeRoom.toolBar.MakeTeaHome_DownToolBarView.curCursor)
					views.makeRoom.toolBar.MakeTeaHome_DownToolBarView.curCursor.visible = false;
			}
			if (views.friendList.FriendList_DownToolBarView)
			{
				if (views.friendList.FriendList_DownToolBarView.curShowCursor)
					views.friendList.FriendList_DownToolBarView.curShowCursor.visible = false;
			}
		}

		/**
		 * 显示泡茶室光标
		 */
		showMakeTeaCursor(): void
		{
			// 光标复位
			UILayerManager.makeTealayer.resetCursorState();
			views.makeRoom.toolBar.MakeTeaHome_DownToolBarView.curCursor.name = "makeTeaCursor";
			if(!this.getChildByName("makeTeaCursor"))
				this.addChild(views.makeRoom.toolBar.MakeTeaHome_DownToolBarView.curCursor);
			views.makeRoom.toolBar.MakeTeaHome_DownToolBarView.curCursor.visible = true;
			views.makeRoom.toolBar.MakeTeaHome_DownToolBarView.curCursor.zOrder = 9999;
			views.teaRoom.toolBar.DownToolBarView.curShowCursor.visible = false;
			// if(views.teaRoom.toolBar.DownToolBarView)
			// {
			// 	if(views.teaRoom.toolBar.DownToolBarView.curShowCursor)
			// 		views.teaRoom.toolBar.DownToolBarView.curShowCursor.visible = false;
			// }
			if (views.friedRoom.toolBar.FireTeaHome_DownToolBarView)
			{
				if (views.friedRoom.toolBar.FireTeaHome_DownToolBarView.curCursor)
					views.friedRoom.toolBar.FireTeaHome_DownToolBarView.curCursor.visible = false;
			}
			if (views.friendList.FriendList_DownToolBarView)
			{
				if (views.friendList.FriendList_DownToolBarView.curShowCursor)
					views.friendList.FriendList_DownToolBarView.curShowCursor.visible = false;
			}
		}

	}
}