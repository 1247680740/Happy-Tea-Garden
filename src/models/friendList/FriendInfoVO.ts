namespace models.friendList
{
	/** 好友列表数据 */
	export class FriendInfoVO
	{
		/** 好友ID编号 */
		userId: string;

		/** 好友昵称 */
        userName: string;

		/** 头像图片地址 */
        imgurl:string;

        /** 农作物状态 */
        status:number;

		/** 好友排名 */
		ranking:number;

		/** 好友等级 */
		level:number;

		/** 好友页数 */
		pageNums:string;
		constructor()
		{

		}
	}
}