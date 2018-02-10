namespace views.player
{
	import PlayerInfoVO = models.player.PlayerInfoVO;
	import FriendInfoVO = models.player.FriendInfoVO;

	/**
	 * 玩家信息视图
	 */
	export class PlayerInfoView extends ui.gameUI.player.PlayerInfoUI
	{

		constructor()
		{
			super();

		}

		/**
		 * 填充数据，初始化视图
		 */
		initUI(playerInfoVO:PlayerInfoVO):void
		{
			if(!playerInfoVO)
				return;

			this.playerName.text = playerInfoVO.userName;
			this.lvlProgress.value = playerInfoVO.exp / playerInfoVO.nextLevelExp;
			this.lvlProgressTxt.text = playerInfoVO.exp + "/"+ playerInfoVO.nextLevelExp;
			this.money.text = playerInfoVO.money+"";
			this.diamond.text = playerInfoVO.diamond+"";
			if(playerInfoVO.ico)
			{
				this.defaultIcon.skin = playerInfoVO.ico;
				this.defaultIcon.size(47,47);
			}
			this.showLvl(playerInfoVO.level);
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