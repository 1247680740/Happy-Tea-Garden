namespace views.friedRoom.pot
{
    import Image = laya.ui.Image;
    import UpGradePotCtrl = controllers.friedRoom.pot.UpGradePotCtrl;
    import Event = laya.events.Event;
    import grideUi = ui.gameUI.pot.UpGradePotGrideUI;
    import potVO = models.base.PotVO;
    import TipLayer = views.layers.TipLayer;
    import ColorFilter = laya.filters.ColorFilter;
    import GlowFilter = laya.filters.GlowFilter;
    import BaseBorderUI = ui.gameUI.common.BaseBorderUI;
    import UpGradePotDialogUI = ui.gameUI.pot.UpGradePotDialogUI;

    /**
     * 炒锅升级
     */
    export class UpGradePotView extends UpGradePotDialogUI
    {
        /**
		 * Dialog底部边框
		 */
		bgUI:BaseBorderUI;
        /** 当前选中的 Tab 选项卡的名称 */
        curSelectedTabName: string = "metal";
        /** 当前点击按钮的名称 */
        curOverTabName: string;
        private glowFilter: GlowFilter;
        // 图片路径
        imgPath: string = "gameUI/pot/";
        //图片后缀名
        imgSuffix: string = ".png";
        curPotVO: models.base.PotVO;

        constructor()
        {
            super();
            this.cacheAs = "bitmap";
            this.dragArea = `0,0,${this.width},60`;
            this.glowFilter = new GlowFilter("#FFE553", 10, 0, 0);

            ////////// =>
			this.bgUI = new BaseBorderUI();
			this.bgUI.bgImg.size(700,500);
			this.bgUI.size(700,500);
			this.bgUI.addChild(this);
			this.y = 5;

			this.bgUI.titleImg.skin = "gameUI/common/icon/potUpgradeName.png";
			this.bgUI.titleImg.x = this.width-this.bgUI.titleImg.width>>1;
			this.bgUI.titleImg.y += 3;

			this.mouseThrough = true; // 解除closeBtn事件屏蔽
			// 根据缩放率来动态调整标题、关闭按钮
			let wRate:number = (700-600)/600;
			let hRate:number = (500-400)/400;
			this.bgUI.closeBtn.x += this.bgUI.closeBtn.x*wRate;
			this.bgUI.closeBtn.y += this.bgUI.closeBtn.y*hRate;
			this.bgUI.closeBtn.scale(1.5,1.5);
			// this.bgUI.closeBtn.on(Event.CLICK,this,this.closeBtnFn);
			////////// <=

            this.showMetal();
            this.upgrade.on(Event.CLICK, this, this.showUpGrade);
            this.upgrade.on(Event.MOUSE_OVER, this, this.setGlowFilter);
            this.upgrade.on(Event.MOUSE_OUT, this, this.resetFilter);
            this.metal.on(Event.CLICK, this, this.showMetal);
            this.wood.on(Event.CLICK, this, this.showWood);
            this.water.on(Event.CLICK, this, this.showWater);
            this.fire.on(Event.CLICK, this, this.showFire);
            this.earth.on(Event.CLICK, this, this.showEarth);
            this.way.on(Event.CLICK, this, this.showWay);
            // this.tipview.okBtn.on(Event.CLICK,this,this.showTip);
        }
        showUpGrade(): void
        {
            this.curOverTabName = "upgrade";
            UpGradePotCtrl.getInstance().request_getUPDate();
            this.bgUI.removeSelf();
        }
        // showTip():void{
        //     this.curOverTabName="okBtn";
        // }
        showMetal(): void
        {
            this.curSelectedTabName = "metal";
            this.setSelectState(this.metal);
        }
        showWood(): void
        {
            this.curSelectedTabName = "wood";
            this.setSelectState(this.wood);
        }
        showWater(): void
        {
            this.curSelectedTabName = "water";
            this.setSelectState(this.water);
        }
        showFire(): void
        {
            this.curSelectedTabName = "fire";
            this.setSelectState(this.fire);
        }
        showEarth(): void
        {
            this.curSelectedTabName = "earth";
            this.setSelectState(this.earth);
        }
        showWay(): void
        {
            this.curSelectedTabName = "way";
            this.setSelectState(this.way);
        }

        /**
         * 设置当前所选锅位名称的状态
         * @param curTitleImg 当前选择的锅位名称
         */
        private setSelectState(curTitleImg:Image):void
        {
            // 左侧偏移量
            let leftNum:number = this.posBg.width-curTitleImg.width>>1;
            // 上部偏移量
            let topNum:number = this.posBg.height-curTitleImg.height>>1;
            this.posBg.x = curTitleImg.x-leftNum;
            this.posBg.y = curTitleImg.y-topNum;
        }
        showBuy2(): void
        {
            this.curOverTabName = "btn_buy2";
            UpGradePotCtrl.getInstance().request_getUPDate();
        }
        showBuy3(): void
        {
            this.curOverTabName = "btn_buy3";
            UpGradePotCtrl.getInstance().request_getUPDate();
        }
        showBuy4(): void
        {
            this.curOverTabName = "btn_buy4";
            UpGradePotCtrl.getInstance().request_getUPDate();
        }

        fillUpData(potArr: Array<models.friedRoom.pot.PotVO>): void
        {
            if (!potArr)
                return;

            let i: number;
            let len: number = potArr.length; //显示炒锅的数量
            let potGridVO: models.friedRoom.pot.PotVO; //每个炒锅对象
            let potsArr = new Array<models.friedRoom.pot.PotVO>();
            switch (len)
            {
                case 1:
                    this.setPotPosName(true, false, false, false, false, false);
                    break;
                case 2:
                    this.setPotPosName(true, false, true, false, false, false);
                    break;
                case 3:
                    this.setPotPosName(true, true, true, false, false, false);
                    break;
                case 4:
                    this.setPotPosName(true, true, true, true, false, false);
                    break;
                case 5:
                    this.setPotPosName(true, true, true, true, true, false);
                    break;
                case 6:
                    this.setPotPosName(true, true, true, true, true, true);
                    break;
            }
            for (i = 0; i <= len; i++)
            {
                if (this.curSelectedTabName == "metal")
                {
                    potGridVO = potArr[0];
                    this.showPotImg(potGridVO);
                } else if (this.curSelectedTabName == "wood")
                {
                    potGridVO = potArr[1];
                    this.showPotImg(potGridVO);
                } else if (this.curSelectedTabName == "water")
                {
                    potGridVO = potArr[2];
                    this.showPotImg(potGridVO);
                } else if (this.curSelectedTabName == "fire")
                {
                    potGridVO = potArr[3];
                    this.showPotImg(potGridVO);
                } else if (this.curSelectedTabName == "earth")
                {
                    potGridVO = potArr[4];
                    this.showPotImg(potGridVO);
                } else if (this.curSelectedTabName == "way")
                {
                    potGridVO = potArr[5];
                    this.showPotImg(potGridVO);
                }
            }
        }

        /**
         * 设置炒锅位置的名称是否显示
         */
        private setPotPosName(f1: boolean, f2: boolean, f3: boolean, f4: boolean, f5: boolean, f6: boolean): void
        {
            this.metal.visible = f1;
            this.wood.visible = f2;
            this.water.visible = f3;
            this.fire.visible = f4;
            this.earth.visible = f5;
            this.way.visible = f6;
        }

        showPotImg(potGridVO: models.friedRoom.pot.PotVO)
        {
            switch (potGridVO.level)
            {
                case 1:
                    this.pot1.skin = this.imgPath + "pot_1" + this.imgSuffix;
                    this.pot2.skin = this.imgPath + "pot_2" + this.imgSuffix;
                    this.potName1.text = "生铁锅"
                    this.potName2.text = "铜锅"
                    this.potLevel1.text = "1";
                    this.potLevel2.text = "2"
                    this.friedTeaNums1.text = "5";
                    this.friedTeaNums2.text = "10"
                    this.friedTeaTopLevel1.text = "20";
                    this.friedTeaTopLevel2.text = "30"
                    UpGradePotCtrl.getInstance().request_needUpData(potGridVO.id, potGridVO.level);
                    break;
                case 2:
                    this.pot1.skin = this.imgPath + "pot_2" + this.imgSuffix;
                    this.pot2.skin = this.imgPath + "pot_3" + this.imgSuffix;
                    this.potName1.text = "铜锅"
                    this.potName2.text = "金锅"
                    this.potLevel1.text = "2";
                    this.potLevel2.text = "3"
                    this.friedTeaNums1.text = "10";
                    this.friedTeaNums2.text = "15"
                    this.friedTeaTopLevel1.text = "30";
                    this.friedTeaTopLevel2.text = "40"
                    UpGradePotCtrl.getInstance().request_needUpData(potGridVO.id, potGridVO.level);
                    break;
                case 3:
                    this.pot1.skin = this.imgPath + "pot_3" + this.imgSuffix;
                    this.pot2.skin = this.imgPath + "pot_4" + this.imgSuffix;
                    this.potName1.text = "金锅";
                    this.potName2.text = "玄铁锅";
                    this.potLevel1.text = "3";
                    this.potLevel2.text = "4"
                    this.friedTeaNums1.text = "15";
                    this.friedTeaNums2.text = "20"
                    this.friedTeaTopLevel1.text = "40";
                    this.friedTeaTopLevel2.text = "50"
                    UpGradePotCtrl.getInstance().request_needUpData(potGridVO.id, potGridVO.level);
                    break;
                case 4:
                    this.pot1.skin = this.imgPath + "pot_4" + this.imgSuffix;
                    this.pot2.skin = this.imgPath + "pot_5" + this.imgSuffix;
                    this.potName1.text = "玄铁锅"
                    this.potName2.text = "寒铁锅"
                    this.potLevel1.text = "4";
                    this.potLevel2.text = "5"
                    this.friedTeaNums1.text = "20";
                    this.friedTeaNums2.text = "25"
                    this.friedTeaTopLevel1.text = "50";
                    this.friedTeaTopLevel2.text = "60"
                    UpGradePotCtrl.getInstance().request_needUpData(potGridVO.id, potGridVO.level);
                    break;
                case 5:
                    this.pot1.skin = this.imgPath + "pot_5" + this.imgSuffix;
                    this.pot2.skin = this.imgPath + "pot_6" + this.imgSuffix;
                    this.potName1.text = "寒铁锅"
                    this.potName2.text = "精钢锅"
                    this.potLevel1.text = "5";
                    this.potLevel2.text = "6"
                    this.friedTeaNums1.text = "25";
                    this.friedTeaNums2.text = "30"
                    this.friedTeaTopLevel1.text = "60";
                    this.friedTeaTopLevel2.text = "70"
                    UpGradePotCtrl.getInstance().request_needUpData(potGridVO.id, potGridVO.level);
                    break;
            }
        }

        addUpDate(potsArr: Array<any>, takeData): void
        {
            let id: number = takeData.hi;
            let level: number = takeData.hl;

            this.gridContainer.removeChildren(0, this.gridContainer.numChildren);
            if (!potsArr || !potsArr.length)
                return;
            if (this.curSelectedTabName == "metal")
            {
                this.showData(potsArr, id, level);
                if (this.curOverTabName == "upgrade")
                {
                    this.startUpGrade(potsArr, id);
                }
                if (this.curOverTabName == "btn_buy2")
                {
                    UpGradePotCtrl.getInstance().willBuyDataOver(potsArr, this.curOverTabName);
                } else if (this.curOverTabName == "btn_buy3")
                {
                    UpGradePotCtrl.getInstance().willBuyDataOver(potsArr, this.curOverTabName);
                } else if (this.curOverTabName == "btn_buy4")
                {
                    UpGradePotCtrl.getInstance().willBuyDataOver(potsArr, this.curOverTabName);
                }
            } else if (this.curSelectedTabName == "wood")
            {
                this.showData(potsArr, id, level);
                if (this.curOverTabName == "upgrade")
                {
                    this.startUpGrade(potsArr, id);
                }
                if (this.curOverTabName == "btn_buy1")
                {
                    UpGradePotCtrl.getInstance().willBuyDataOver(potsArr, this.curOverTabName);
                } else if (this.curOverTabName == "btn_buy2")
                {
                    UpGradePotCtrl.getInstance().willBuyDataOver(potsArr, this.curOverTabName);
                } else if (this.curOverTabName == "btn_buy3")
                {
                    UpGradePotCtrl.getInstance().willBuyDataOver(potsArr, this.curOverTabName);
                } else if (this.curOverTabName == "btn_buy4")
                {
                    UpGradePotCtrl.getInstance().willBuyDataOver(potsArr, this.curOverTabName);
                }
            } else if (this.curSelectedTabName == "water")
            {
                this.showData(potsArr, id, level);
                if (this.curOverTabName == "upgrade")
                {
                    this.startUpGrade(potsArr, id);
                }
                if (this.curOverTabName == "btn_buy1")
                {
                    UpGradePotCtrl.getInstance().willBuyDataOver(potsArr, this.curOverTabName);
                } else if (this.curOverTabName == "btn_buy2")
                {
                    UpGradePotCtrl.getInstance().willBuyDataOver(potsArr, this.curOverTabName);
                } else if (this.curOverTabName == "btn_buy3")
                {
                    UpGradePotCtrl.getInstance().willBuyDataOver(potsArr, this.curOverTabName);
                } else if (this.curOverTabName == "btn_buy4")
                {
                    UpGradePotCtrl.getInstance().willBuyDataOver(potsArr, this.curOverTabName);
                }
            } else if (this.curSelectedTabName == "fire")
            {
                this.showData(potsArr, id, level);
                if (this.curOverTabName == "upgrade")
                {
                    this.startUpGrade(potsArr, id);
                }
                if (this.curOverTabName == "btn_buy1")
                {
                    UpGradePotCtrl.getInstance().willBuyDataOver(potsArr, this.curOverTabName);
                } else if (this.curOverTabName == "btn_buy2")
                {
                    UpGradePotCtrl.getInstance().willBuyDataOver(potsArr, this.curOverTabName);
                } else if (this.curOverTabName == "btn_buy3")
                {
                    UpGradePotCtrl.getInstance().willBuyDataOver(potsArr, this.curOverTabName);
                } else if (this.curOverTabName == "btn_buy4")
                {
                    UpGradePotCtrl.getInstance().willBuyDataOver(potsArr, this.curOverTabName);
                }
            } else if (this.curSelectedTabName == "earth")
            {
                this.showData(potsArr, id, level);
                if (this.curOverTabName == "upgrade")
                {
                    this.startUpGrade(potsArr, id);
                }
                if (this.curOverTabName == "btn_buy1")
                {
                    UpGradePotCtrl.getInstance().willBuyDataOver(potsArr, this.curOverTabName);
                } else if (this.curOverTabName == "btn_buy2")
                {
                    UpGradePotCtrl.getInstance().willBuyDataOver(potsArr, this.curOverTabName);
                } else if (this.curOverTabName == "btn_buy3")
                {
                    UpGradePotCtrl.getInstance().willBuyDataOver(potsArr, this.curOverTabName);
                } else if (this.curOverTabName == "btn_buy4")
                {
                    UpGradePotCtrl.getInstance().willBuyDataOver(potsArr, this.curOverTabName);
                }
            } else if (this.curSelectedTabName == "way")
            {
                this.showData(potsArr, id, level);
                if (this.curOverTabName == "upgrade")
                {
                    this.startUpGrade(potsArr, id);
                }
                if (this.curOverTabName == "btn_buy1")
                {
                    UpGradePotCtrl.getInstance().willBuyDataOver(potsArr, this.curOverTabName);
                } else if (this.curOverTabName == "btn_buy2")
                {
                    UpGradePotCtrl.getInstance().willBuyDataOver(potsArr, this.curOverTabName);
                } else if (this.curOverTabName == "btn_buy3")
                {
                    UpGradePotCtrl.getInstance().willBuyDataOver(potsArr, this.curOverTabName);
                } else if (this.curOverTabName == "btn_buy4")
                {
                    UpGradePotCtrl.getInstance().willBuyDataOver(potsArr, this.curOverTabName);
                }
            }
        }

        /**
         * 判断升级材料需要或缺失按钮的显隐
         */
        showData(dataArr: Array<any>, id, level): void
        {
            this.showInitCenter(dataArr, id, level);
        }

        setGlowFilter(): void
        {
            this.upgrade.filters = [this.glowFilter];
        }
        resetFilter(): void
        {
            this.upgrade.filters = [];
        }

        /** 判断升级每个升级炒锅升级材料是否缺失 */
        startUpGrade(potsArr: Array<any>, id): void
        {
            //  console.log("+++++++++++++++当前数据数组对象:"+JSON.stringify(potsArr));
            if (!potsArr || !potsArr.length)
                return;
            if (parseInt(potsArr[0].lockMoney) > 0 || parseInt(potsArr[1].lockToolNums) > 0 || parseInt(potsArr[2].lockToolNums) > 0 || parseInt(potsArr[3].lockToolNums) > 0)
            {
                TipLayerManager.tipLayer.showDrawBgTip("升级材料不足，请购买升级炒锅所需的材料（金币数量也要满足哦）");
                console.log("+++++++已经打印材料不足提示");
            } else if (parseInt(potsArr[0].lockMoney) <= 0 && parseInt(potsArr[1].lockToolNums) <= 0 && parseInt(potsArr[2].lockToolNums) <= 0 && parseInt(potsArr[3].lockToolNums) <= 0)
            {
                UpGradePotCtrl.getInstance().request_FinishData(id);
            }
        }

        /**
         * 炒锅升级成功后
         */
        finishUpGrade(obj: Object): void
        {
            if (!obj)
                return;

            let curPotVO: models.base.PotVO = obj["potVO"];
            controllers.friedRoom.pot.PotCtrl.friedPotView.updatePotGrid2(curPotVO);
        }

        /**
         * 升级所需素材（中间显示部分）
         */
        showInitCenter(potsArr, id, level)
        {
            let potVO: models.base.PotVO;
            let len: number = potsArr.length;
            let i: number;
            let grideView: ui.gameUI.pot.UpGradePotGrideUI = new ui.gameUI.pot.UpGradePotGrideUI();
            grideView.money.visible = true;
            grideView.book.visible = true;
            for (i = 0; i < len; i++)
            {
                potVO = potsArr[i];
                if (!potVO || potVO == undefined)
                    return;
                if (potVO.needMoney)
                    grideView.need1.text = potVO.needMoney.toString();
                if (potVO.lockMoney)
                    grideView.lock1.text = potVO.lockMoney;
                if (parseInt(grideView.lock1.text) > 0)
                {
                    grideView.t_lock1.visible = true;
                    grideView.lock1.visible = true;
                } else
                {
                    grideView.t_lock1.visible = false;
                    grideView.lock1.visible = false;
                }
                if (potVO.toolId == 51001)
                {   //强化工艺书
                    grideView.need2.text = potVO.toolNums;
                    grideView.lock2.text = potVO.lockToolNums;
                    if (parseInt(grideView.lock2.text) > 0)
                    {
                        grideView.t_lock2.visible = true;
                        grideView.lock2.visible = true;
                        grideView.btn_buy2.visible = true;
                    } else
                    {
                        grideView.t_lock2.visible = false;
                        grideView.lock2.visible = false;
                        grideView.btn_buy2.visible = false;
                    }
                }
                if (potVO.toolId == 51003)
                {  //铜矿石
                    grideView.need3.text = potVO.toolNums;
                    grideView.lock3.text = potVO.lockToolNums;
                    grideView.iron3.skin = this.imgPath + "copper" + this.imgSuffix;
                    if (parseInt(grideView.lock3.text) > 0)
                    {
                        grideView.t_lock3.visible = true;
                        grideView.lock3.visible = true;
                        grideView.btn_buy3.visible = true;
                    } else
                    {
                        grideView.t_lock3.visible = false;
                        grideView.lock3.visible = false;
                        grideView.btn_buy3.visible = false;
                    }
                }
                if (potVO.toolId == 51004)
                {  //精钢矿石
                    grideView.need3.text = potVO.toolNums;
                    grideView.lock3.text = potVO.lockToolNums;
                    grideView.iron3.skin = this.imgPath + "mineral" + this.imgSuffix;
                    if (parseInt(grideView.lock3.text) > 0)
                    {
                        grideView.t_lock3.visible = true;
                        grideView.lock3.visible = true;
                        grideView.btn_buy3.visible = true;
                    } else
                    {
                        grideView.t_lock3.visible = false;
                        grideView.lock3.visible = false;
                        grideView.btn_buy3.visible = false;
                    }
                }
                if (potVO.toolId == 51005)
                {  //玄铁
                    grideView.need3.text = potVO.toolNums;
                    grideView.lock3.text = potVO.lockToolNums;
                    grideView.iron3.skin = this.imgPath + "mdash" + this.imgSuffix;
                    if (parseInt(grideView.lock3.text) > 0)
                    {
                        grideView.t_lock3.visible = true;
                        grideView.lock3.visible = true;
                        grideView.btn_buy3.visible = true;
                    } else
                    {
                        grideView.t_lock3.visible = false;
                        grideView.lock3.visible = false;
                        grideView.btn_buy3.visible = false;
                    }
                }
                if (potVO.toolId == 51007)
                {  //玛瑙石
                    grideView.need4.text = potVO.toolNums;
                    grideView.lock4.text = potVO.lockToolNums;
                    grideView.iron4.skin = this.imgPath + "agate" + this.imgSuffix;
                    if (parseInt(grideView.lock4.text) > 0)
                    {
                        grideView.t_lock4.visible = true;
                        grideView.lock4.visible = true;
                        grideView.btn_buy4.visible = true;
                    } else
                    {
                        grideView.t_lock4.visible = false;
                        grideView.lock4.visible = false;
                        grideView.btn_buy4.visible = false;
                    }
                }
                if (potVO.toolId == 51010)
                {   //红宝石
                    grideView.need4.text = potVO.toolNums;
                    grideView.lock4.text = potVO.lockToolNums;
                    grideView.iron4.skin = this.imgPath + "redIron" + this.imgSuffix;
                    if (parseInt(grideView.lock4.text) > 0)
                    {
                        grideView.t_lock4.visible = true;
                        grideView.lock4.visible = true;
                        grideView.btn_buy4.visible = true;
                    } else
                    {
                        grideView.t_lock4.visible = false;
                        grideView.lock4.visible = false;
                        grideView.btn_buy4.visible = false;
                    }
                }
                if (potVO.toolId == 51011)
                {  //绿松石
                    grideView.need4.text = potVO.toolNums;
                    grideView.lock4.text = potVO.lockToolNums;
                    grideView.iron4.skin = this.imgPath + "kallaite" + this.imgSuffix;
                    if (parseInt(grideView.lock4.text) > 0)
                    {
                        grideView.t_lock4.visible = true;
                        grideView.lock4.visible = true;
                        grideView.btn_buy4.visible = true;
                    } else
                    {
                        grideView.t_lock4.visible = false;
                        grideView.lock4.visible = false;
                        grideView.btn_buy4.visible = false;
                    }
                }
                if (potVO.toolId == 51012)
                {  //祖母绿
                    grideView.need4.text = potVO.toolNums;
                    grideView.lock4.text = potVO.lockToolNums;
                    grideView.iron4.skin = this.imgPath + "emerald" + this.imgSuffix;
                    if (parseInt(grideView.lock4.text) > 0)
                    {
                        grideView.t_lock4.visible = true;
                        grideView.lock4.visible = true;
                        grideView.btn_buy4.visible = true;
                    } else
                    {
                        grideView.t_lock4.visible = false;
                        grideView.lock4.visible = false;
                        grideView.btn_buy4.visible = false;
                    }
                }
                if (potVO.toolId == 51013)
                {  //寒铁矿石
                    grideView.need3.text = potVO.toolNums;
                    grideView.lock3.text = potVO.lockToolNums;
                    grideView.iron3.skin = this.imgPath + "coldIron" + this.imgSuffix;
                    if (parseInt(grideView.lock3.text) > 0)
                    {
                        grideView.t_lock3.visible = true;
                        grideView.lock3.visible = true;
                        grideView.btn_buy3.visible = true;
                    } else
                    {
                        grideView.t_lock3.visible = false;
                        grideView.lock3.visible = false;
                        grideView.btn_buy3.visible = false;
                    }
                }
            }
            grideView.btn_buy2.on(Event.CLICK, this, this.showBuy2);
            grideView.btn_buy3.on(Event.CLICK, this, this.showBuy3);
            grideView.btn_buy4.on(Event.CLICK, this, this.showBuy4);
            this.gridContainer.addChild(grideView);
        }
    }
}