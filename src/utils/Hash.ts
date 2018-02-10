namespace utils
{
	export class Hash
	{
		/**
		 * 从数组中随机选取一项
		 * @param paramArray
		 * @return
		 */
		static selectItemFromArray(paramArray: any[]): any
		{
			let nums: number = paramArray.length;
			let index: number = parseInt(Math.random() * nums + "");
			return paramArray[index];
		}

		/**
		 * 随机变换数字
		 * @param bitAmount 位数总计
		 * @return
		 */
		static alterationNum(bitAmount: number): any
		{
			var random: number = Math.random();
			if (random == 0)
			{
				Hash.alterationNum(bitAmount);
				return;
			}
			var minNum: string = '1';
			for (var i: number = 0; i < bitAmount; i++)
			{
				minNum += '0';
			}
			return random * parseInt(minNum);
		}

		/**
		 * 生成校验密钥串
		 * @param content 要加密的串数据
		 */
		static createPrivateKey(content: String, key: String = ''): number
		{
			if (key === "")
			{
				key = "bobo";
			}

			var result: number = 0;
			var keyCode: number = 0;
			var i: number;

			for (i = 0; i < key.length; i++)
			{
				keyCode += key.charCodeAt(i);
			}

			for (i = 0; i < content.length; i++)
			{
				result += content.charCodeAt(i) ^ keyCode;
			}
			return result;
		}

		/**
		 * 生成一个随机数字
		 * @param 数字的位数
		 * @return
		 */
		static createRandomNumber(digit: string): number
		{
			return parseInt(Math.random() * Math.pow(10, parseInt(digit)) + "");
		}
	}
}