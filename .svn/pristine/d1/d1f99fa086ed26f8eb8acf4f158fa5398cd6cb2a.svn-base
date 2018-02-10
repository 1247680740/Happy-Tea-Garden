namespace utils
{
	import CropVO = models.base.CropVO;

	/**
	 * 数组操作相关工具
	 */
	export class ArrayUtil
	{
		constructor()
		{

		}

		/**
		 * 根据某属性排序某类型的数组
		 * @ a：排序类型元素
		 * @ b：排序类型元素
		 * @ p：排序依据
		 */
		static sortArrByProperty(a:any,b:any,p:any):number
		{
			if(a.hasOwnProperty(p) && b.hasOwnProperty(p))
			{
				if(a.p > b.p)
					return 1;
				else if(a.p < b.p)
					return -1;
				else
					return 0;
			}
		}

	}
}