namespace views.player
{
	import FriendInfoVO = models.player.FriendInfoVO;
	import TeaGardenCtrl = controllers.teaRoom.TeaGardenCtrl;
	/**
	 * 好友信息视图
	 */
	export class FriendInfoView extends ui.gameUI.player.PlayerInfoUI
	{

		constructor()
		{
			super();

		}

		/** 填充好友数据 */
		initFriendUI(friendInfoVO:FriendInfoVO):void{
			if(!friendInfoVO)
				return;
			this.playerName.text = friendInfoVO.userName;
			this.lvlProgress.value = friendInfoVO.exp / friendInfoVO.nextLevelExp;
			this.lvlProgressTxt.text = friendInfoVO.exp + "/"+ friendInfoVO.nextLevelExp;
			this.money.text = friendInfoVO.money+"";
			this.diamond.text = friendInfoVO.userName+"的茶园";
			if(friendInfoVO.ico)
			{
				this.defaultIcon.skin = friendInfoVO.ico;
				this.defaultIcon.size(47,47);
			}
			this.showLvl(friendInfoVO.level);

			TeaGardenCtrl.getInstance().reLoadBg();
		}

		/** 更新等级数 */
		showLvl(_lvl:number): void
		{
			let data = {};
			let lvl: number = _lvl;
			let i: number;
			for (i = 1; i >= 0; i--)
			{
				data["item" + i] = { index: Math.floor(lvl % 10) };
				lvl /= 10;
			}
			this.lvl.dataSource = data;
		}

	}
}