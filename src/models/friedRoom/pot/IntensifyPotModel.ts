namespace models.friedRoom.pot
{
    // import IntensifyPotCtrl = controllers.friedRoom.pot.IntensifyPotCtrl;

    /**
     * 炒锅升级相关的数据层（包括购买炒锅升级材料，及炒锅升级两部分数据）
     */
    export class IntensifyPotModel
    {

        private static instance: IntensifyPotModel;
        // 炒锅强化整体界面
        static intensifyPotView: views.friedRoom.pot.IntensifyPotView;
        static callback: Function;
        /** 存放炒锅的容器 */
        static potArr: Array<PotVO>;
        receiveData: any;
        takeData: any;
        potVOArr: Array<models.base.PotVO>;
        // static PotVO:PotVO;
        constructor()
        {
            this.potVOArr = new Array<models.base.PotVO>();

            if (!IntensifyPotModel.potArr)
                IntensifyPotModel.potArr = new Array<PotVO>();
        }

        static getInstance(): IntensifyPotModel
        {
            if (!IntensifyPotModel.instance)
                IntensifyPotModel.instance = new IntensifyPotModel();
            return IntensifyPotModel.instance;
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

            IntensifyPotModel.potArr = new Array<PotVO>();

            let allPotArr: Object[] = this.receiveData["_d"];

            var tempObj: Object;
            let index: number;
            for (index = 0; index < allPotArr.length; index++)
            {
                tempObj = allPotArr[index];
                if (!tempObj)
                    continue;
                IntensifyPotModel.potArr.push(new PotVO(tempObj["hi"], tempObj["hl"], tempObj["status"], tempObj["hs"], tempObj["li"], tempObj["lc"]));
            }
            // 在 View 中更新炒锅
            IntensifyPotModel.instance.handleCallback(takeData);
        }

        // 请求强化炒锅所需要的数据
        request_UPDate(id: number, level: number): void
        { //curPotVO:models.base.PotVO
            HttpServiceProxy.request("getHollowareStrengthenInfo", { "hi": id }, this.getUpDataOverFn, { "hi": id, "hl": level });
        }

        private getUpDataOverFn(receiveData?: any, takeData?: any): void
        {
            if (receiveData)
                this.receiveData = receiveData;
            if (takeData)
                this.takeData = takeData;

            let potsObj: Object = this.receiveData["materials"];
            let potObj: Object;
            let toolObj: Object;
            let potVO: models.base.PotVO;
            let key: string;
            IntensifyPotModel.instance.potVOArr.splice(0, IntensifyPotModel.instance.potVOArr.length);
            for (key in potsObj)
            {
                if (key == "money")
                {
                    potObj = potsObj[key];
                    potVO = new models.base.PotVO();
                    potVO.needMoney = potObj["need"];
                    potVO.lockMoney = potObj["less"];
                    potVO.potId = takeData["hi"];
                    potVO.potLvl = takeData["hl"];
                    IntensifyPotModel.instance.potVOArr.push(potVO);
                }
                if (key == "tools")
                {
                    potObj = potsObj[key];
                    for (key in potObj)
                    {
                        if (key == "51002")
                        {
                            toolObj = potObj[key];
                            potVO = new models.base.PotVO();
                            potVO.toolId = parseInt(key);
                            potVO.toolNums = toolObj["need"] + " ";
                            potVO.lockToolNums = toolObj["less"] + " ";
                            IntensifyPotModel.instance.potVOArr.push(potVO);
                        }
                        if (key == "51003")
                        {   //寒铁矿石
                            toolObj = potObj[key];
                            potVO = new models.base.PotVO();
                            potVO.toolId = parseInt(key);
                            potVO.toolNums = toolObj["need"] + " ";
                            potVO.lockToolNums = toolObj["less"] + " ";
                            IntensifyPotModel.instance.potVOArr.push(potVO);
                        }
                        if (key == "51004")
                        {   //精钢矿石
                            toolObj = potObj[key];
                            potVO = new models.base.PotVO();
                            potVO.toolId = parseInt(key);
                            potVO.toolNums = toolObj["need"] + " ";
                            potVO.lockToolNums = toolObj["less"] + " ";
                            IntensifyPotModel.instance.potVOArr.push(potVO);
                        }
                        if (key == "51007")
                        {   //
                            toolObj = potObj[key];
                            potVO = new models.base.PotVO();
                            potVO.toolId = parseInt(key);
                            potVO.toolNums = toolObj["need"] + " ";
                            potVO.lockToolNums = toolObj["less"] + " ";
                            IntensifyPotModel.instance.potVOArr.push(potVO);
                        }
                        if (key == "51010")
                        {  //玛瑙石
                            toolObj = potObj[key];
                            potVO = new models.base.PotVO();
                            potVO.toolId = parseInt(key);
                            potVO.toolNums = toolObj["need"] + " ";
                            potVO.lockToolNums = toolObj["less"] + " ";
                            IntensifyPotModel.instance.potVOArr.push(potVO);
                        }
                        if (key == "51011")
                        { //绿松石
                            toolObj = potObj[key];
                            potVO = new models.base.PotVO();
                            potVO.toolId = parseInt(key);
                            potVO.toolNums = toolObj["need"] + " ";
                            potVO.lockToolNums = toolObj["less"] + " ";
                            IntensifyPotModel.instance.potVOArr.push(potVO);
                        }
                        if (key == "51001")
                        {  //强化工艺书
                            toolObj = potObj[key];
                            potVO = new models.base.PotVO();
                            potVO.toolId = parseInt(key);
                            potVO.toolNums = toolObj["need"] + " ";
                            potVO.lockToolNums = toolObj["less"] + " ";
                            IntensifyPotModel.instance.potVOArr.push(potVO);
                        }
                    }
                }
                // console.log("==========获取到的数据:"+JSON.stringify(IntensifyPotModel.instance.potVOArr)+"===="+IntensifyPotModel.instance.potVOArr.length);
            }
            if (IntensifyPotModel.callback)
            {
                if (this.takeData)
                    IntensifyPotModel.callback(takeData);
                else
                    IntensifyPotModel.callback();
            }
        }

        // 强化炒锅
        request_strengthPot(id: number): void
        {
            HttpServiceProxy.request("hollowareStrengthen", { "hi": id }, this.getStrength);
        }

        private getStrength(receiveData?: any, takeData?: any): void
        {
            if (receiveData)
            {
                this.receiveData = receiveData;
            }
            let spendsObj = this.receiveData;
            let potVO: models.base.PotVO;
            let key: string;
            for (key in spendsObj)
            {
                if (spendsObj.hasOwnProperty("_g"))
                {
                    potVO.potId = spendsObj["hi"];
                    potVO.potLvl = spendsObj["l"];
                    potVO.strengthLv1 = spendsObj["hs"];
                    potVO.needMoney = spendsObj["_g"];
                    potVO.literStatus = spendsObj["ok"];
                    IntensifyPotModel.instance.potVOArr.push(potVO);
                }
            }
            if (IntensifyPotModel.callback)
            {
                if (this.takeData)
                    IntensifyPotModel.callback(takeData);
                else
                    IntensifyPotModel.callback();
            }
        }

        // 确认购买强化材料
        request_ConfirmBuy(id: number, nums: number): void
        {
            HttpServiceProxy.request("buySingleGoods", { "st": "saute_tool", "si": id, "bct": nums }, this.buyStrengthOverFn);
        }
        buyStrengthOverFn(receiveData?: any, takeData?: any): void
        {
            if (receiveData)
            {
                this.receiveData = receiveData;
            }
            // 花费的金币、钻石: "_g"  "_y"
            let spendObj: Object;
            // 花费返回的是负数，需在原值基础上加上花费值
            if (receiveData["_g"])
            {
                models.player.PlayerInfoModel.playerInfo.money += receiveData["_g"];
                spendObj = { "type": "金币", "nums": receiveData["_g"] };
            }
            else if (receiveData["_y"])
            {
                models.player.PlayerInfoModel.playerInfo.diamond += receiveData["_y"];
                spendObj = { "type": "钻石", "nums": receiveData["_y"] };
            }
            if (spendObj)
            {
                if (receiveData["_c"] == 1)
                {
                    TipLayerManager.tipLayer.showDrawBgTip("购买成功！花费：" + receiveData["_y"] + "个钻石！");
                } else
                {
                    TipLayerManager.tipLayer.showDrawBgTip("购买成功！花费：" + receiveData["_g"] + "个金币！");
                }
                // 更新玩家信息
                controllers.player.PlayerInfoCtrl.instance.updatePlayerDataAndRender(receiveData);
                // 更新材料数量及显示
                console.log("=======当前更新材料状态获取的信息：" + JSON.stringify(this.potVOArr));
                controllers.friedRoom.pot.IntensifyPotCtrl.getInstance().request_getUPDate();
            }
        }

        handleCallback(takeData?: any): void
        {
            if (IntensifyPotModel.callback)
            {
                if (takeData)
                    IntensifyPotModel.callback(takeData);
                else
                    IntensifyPotModel.callback();
            }
        }

    }
}