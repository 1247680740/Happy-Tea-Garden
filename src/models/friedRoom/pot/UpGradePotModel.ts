namespace models.friedRoom.pot{
    /**
     * 炒锅升级相关的数据层（包括购买炒锅升级材料，及炒锅升级两部分数据）
     */
    export class UpGradePotModel{

        private static instance:UpGradePotModel;
        // 炒锅升级整体界面
		static upGradeview:views.friedRoom.pot.UpGradePotView;
		static callback:Function;
        /** 存放炒锅的容器 */
		static potArr:Array<PotVO>;
        receiveData:any;
		takeData:any;
        potVOArr:Array<models.base.PotVO>;
        // static PotVO:PotVO;
        constructor(){
            this.potVOArr=new Array<models.base.PotVO>();

            if(!UpGradePotModel.potArr)
				UpGradePotModel.potArr = new Array<PotVO>();
        }

        static getInstance():UpGradePotModel
		{
			if(!UpGradePotModel.instance)
				UpGradePotModel.instance = new UpGradePotModel();
			return UpGradePotModel.instance;
		}

        // 请求所有炒锅状态
        request_getFarmPot(): void
		{
			HttpServiceProxy.request("getCauldron", null, this.getFarmPotFn);
		}
        // 请求炒锅所有状态接口后的回调
		private getFarmPotFn(receiveData?: any, takeData?: any): void
		{
			if (!receiveData)
				return;

			this.receiveData = receiveData;
			if (takeData)
				this.takeData = takeData;

				UpGradePotModel.potArr = new Array<PotVO>();

			let allPotArr:Object[] = this.receiveData["_d"];

			var tempObj:Object;
			let index:number;
			for(index = 0; index<allPotArr.length; index++)
			{
				tempObj = allPotArr[index];
				if(!tempObj)
					continue;
				UpGradePotModel.potArr.push(new PotVO(tempObj["hi"],tempObj["hl"],tempObj["status"],tempObj["hs"],tempObj["li"],tempObj["lc"]));
			}
			// 在 View 中更新炒锅
			UpGradePotModel.instance.handleCallback(takeData);
		}

        // 请求炒锅升级所需要的数据
        request_UPDate(id:number,level:number):void{ //curPotVO:models.base.PotVO
            HttpServiceProxy.request("getHollowareUpgradeInfo",{"hi":id},this.getUpDataOverFn,{"hi":id,"hl":level});
        }

        private  getUpDataOverFn(receiveData?:any,takeData?:any):void {
            if (receiveData)
				this.receiveData=receiveData;
			if(takeData)
				this.takeData=takeData;

			let potsObj:Object = this.receiveData["materials"];
            let potObj:Object;
            let toolObj:Object;
            let potVO:models.base.PotVO;
			let key:string;
            UpGradePotModel.instance.potVOArr.splice(0, UpGradePotModel.instance.potVOArr.length);
            for (key in potsObj) {
                if(key=="money"){
                    potObj=potsObj[key];
                    potVO=new models.base.PotVO();
                    potVO.needMoney=potObj["need"];
                    potVO.lockMoney=potObj["less"];
                    potVO.potId = takeData["hi"];
                    UpGradePotModel.instance.potVOArr.push(potVO);
                }
                if(key=="tools"){
                    potObj=potsObj[key];
                        for (key in potObj) {
                            if(key=="51001"){  //强化工艺书
                                toolObj=potObj[key];
                                potVO=new models.base.PotVO();
                                potVO.toolId=parseInt(key);
                                potVO.toolNums=toolObj["need"]+" ";
                                potVO.lockToolNums=toolObj["less"]+" ";
                                // UpGradePotModel.instance.potVOArr.push(potVO);
                            }
                            if(key=="51003"){   //铜矿石
                                toolObj=potObj[key];
                                potVO=new models.base.PotVO();
                                potVO.toolId=parseInt(key);
                                potVO.toolNums=toolObj["need"]+" ";
                                potVO.lockToolNums=toolObj["less"]+" ";
                                // UpGradePotModel.instance.potVOArr.push(potVO);
                            }
                            if(key=="51004"){   //精钢矿石
                                toolObj=potObj[key];
                                potVO=new models.base.PotVO();
                                potVO.toolId=parseInt(key);
                                potVO.toolNums=toolObj["need"]+" ";
                                potVO.lockToolNums=toolObj["less"]+" ";
                                // UpGradePotModel.instance.potVOArr.push(potVO);
                            }
                            if(key=="51007"){   //玛瑙石
                                toolObj=potObj[key];
                                potVO=new models.base.PotVO();
                                potVO.toolId=parseInt(key);
                                potVO.toolNums=toolObj["need"]+" ";
                                potVO.lockToolNums=toolObj["less"]+" ";
                                // UpGradePotModel.instance.potVOArr.push(potVO);
                            }
                            if(key=="51010"){  //红宝石
                                toolObj=potObj[key];
                                potVO=new models.base.PotVO();
                                potVO.toolId=parseInt(key);
                                potVO.toolNums=toolObj["need"]+" ";
                                potVO.lockToolNums=toolObj["less"]+" ";
                                // UpGradePotModel.instance.potVOArr.push(potVO);
                            }
                            if(key=="51011"){ //绿松石
                                toolObj=potObj[key];
                                potVO=new models.base.PotVO();
                                potVO.toolId=parseInt(key);
                                potVO.toolNums=toolObj["need"]+" ";
                                potVO.lockToolNums=toolObj["less"]+" ";
                                // UpGradePotModel.instance.potVOArr.push(potVO);
                            }
                            if(key=="51005"){ //玄铁
                                toolObj=potObj[key];
                                potVO=new models.base.PotVO();
                                potVO.toolId=parseInt(key);
                                potVO.toolNums=toolObj["need"]+" ";
                                potVO.lockToolNums=toolObj["less"]+" ";
                                // UpGradePotModel.instance.potVOArr.push(potVO);
                            }
                            if(key=="51012"){ //祖母绿
                                toolObj=potObj[key];
                                potVO=new models.base.PotVO();
                                potVO.toolId=parseInt(key);
                                potVO.toolNums=toolObj["need"]+" ";
                                potVO.lockToolNums=toolObj["less"]+" ";
                                // UpGradePotModel.instance.potVOArr.push(potVO);
                            }
                            if(key=="51013"){ //寒铁矿石
                                toolObj=potObj[key];
                                potVO=new models.base.PotVO();
                                potVO.toolId=parseInt(key);
                                potVO.toolNums=toolObj["need"]+" ";
                                potVO.lockToolNums=toolObj["less"]+" ";
                                // UpGradePotModel.instance.potVOArr.push(potVO);
                            }
                            if(potVO)
                            {
                                potVO.potId = takeData["hi"];
                                UpGradePotModel.instance.potVOArr.push(potVO);
                            }
                        }
                }
                console.log("==========获取到的数据:"+JSON.stringify(UpGradePotModel.instance.potVOArr)+"===="+UpGradePotModel.instance.potVOArr.length);
            }
	        if(UpGradePotModel.callback)
			{
				if(this.takeData)
					UpGradePotModel.callback(takeData);
				else
					UpGradePotModel.callback();
			}
        }

        // 升级炒锅
        request_UpGrade(id:number):void{
            HttpServiceProxy.request("hollowareUpgrade",{"hi":id},this.getGrade,{"potId":id});
        }

        private getGrade(receiveData?:any,takeData?:any):void {
             if(receiveData){
                this.receiveData=receiveData;
            }
            if(takeData){
                this.takeData=takeData;
            }
            let spendsObj=this.receiveData;
            let potVO:models.base.PotVO=new models.base.PotVO();
            let key:string;
            potVO.needMoney=spendsObj["_g"];//强化用去的金钱
            potVO.potLvl=spendsObj["l"];   //炒锅等级
            potVO.potId = spendsObj["hi"]; //炒锅ID
            potVO.strengthLv1 = spendsObj["hs"]; // 强化等级

            let newVO:models.base.PotVO = UpGradePotModel.instance.updatePotLvl(potVO);
            this.takeData["potVO"] = newVO;
            // UpGradePotModel.instance.potVOArr.push(potVO);   // old
            if(UpGradePotModel.callback)
			{
				if(this.takeData)
					UpGradePotModel.callback(takeData);
				else
					UpGradePotModel.callback();
			}
        }

        /**
         * 确认购买升级材料
         */
        request_ConfirmBuy(potVO:models.base.PotVO):void{  //材料ID 材料数量 (dataId:number,dataNums:number)51004   12
            HttpServiceProxy.request("buySingleGoods",{"st":"saute_tool","si":potVO.toolId,"bct":potVO.lockToolNums},this.buyUpDateOverFn,{"toolId":potVO.toolId});
        }

        buyUpDateOverFn(receiveData?:any,takeData?:any):void{
            if(receiveData){
                this.receiveData=receiveData;
            }
			// 花费的金币、钻石: "_g"  "_y"
			let spendObj:Object;
			// 花费返回的是负数，需在原值基础上加上花费值
			if(receiveData["_g"])
			{
				models.player.PlayerInfoModel.playerInfo.money += receiveData["_g"];
				spendObj = {"type":"金币","nums":receiveData["_g"]};
			}
			else if(receiveData["_y"])
			{
				models.player.PlayerInfoModel.playerInfo.diamond += receiveData["_y"];
				spendObj = {"type":"钻石","nums":receiveData["_y"]};
			}
			if(spendObj)
			{
                if(receiveData["_c"]==1){
				    TipLayerManager.tipLayer.showDrawBgTip("购买成功！花费："+receiveData["_y"]+"个钻石！");
                }else{
                    TipLayerManager.tipLayer.showDrawBgTip("购买成功！花费："+receiveData["_g"]+"个金币！");
                }
				// 更新玩家信息
				controllers.player.PlayerInfoCtrl.instance.updatePlayerDataAndRender(receiveData);
                // 更新材料数量及显示
                console.log("=======当前更新材料状态获取的信息："+JSON.stringify(this.potVOArr));
                // UpGradePotModel.upGradeview.showInitCenter(this.potVOArr,id,);
            }

            UpGradePotModel.instance.handleCallback(takeData);
        }

        handleCallback(takeData?:any):void
		{
			if(UpGradePotModel.callback)
			{
				if(takeData)
					UpGradePotModel.callback(takeData);
				else
					UpGradePotModel.callback();
			}
		}

        /**
		 * 通过炒锅 id 获取炒锅数据
		 */
		static getPotVOByPotId(potId:number):models.base.PotVO
		{
			let potVO:models.base.PotVO;
			let len:number = UpGradePotModel.instance.potVOArr.length;
			let i:number;
			for(i=0; i<len; i++)
			{
				potVO = UpGradePotModel.instance.potVOArr[i];
				if(potId == potVO.potId)
					return potVO;
			}
			return null;
		}

        /**
		 * 更新炒锅等级，并返回数据
		 */
		updatePotLvl(potVo:models.base.PotVO):models.base.PotVO
		{
			let i:number;
			let len:number = UpGradePotModel.instance.potVOArr.length;
			let curPotVO:models.base.PotVO;
			for(i=0; i<len; i++)
			{
				curPotVO = UpGradePotModel.instance.potVOArr[i];
				if(curPotVO.potId == potVo.potId)
				{
					curPotVO.potLvl = potVo.potLvl;
					return curPotVO;
				}
			}
            return null;
		}

        /**
         * 购买材料后更新相关数据
         */
        updatePotVOArr(toolId:number):void
        {
            if(!toolId)
                return;
            if(!UpGradePotModel.instance.potVOArr.length)
                return;
            let i:number;
            let len:number = UpGradePotModel.instance.potVOArr.length;
            let potVO:models.base.PotVO;
            for(i=0; i<len; i++)
            {
                potVO = UpGradePotModel.instance.potVOArr[i];
                if(toolId == potVO.toolId)
                {
                    potVO.lockToolNums = "0";
                    break;
                }
            }
        }

    }
}