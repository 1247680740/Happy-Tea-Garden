var controllers;
(function (controllers) {
    var teaRoom;
    (function (teaRoom) {
        var CropModel = models.teaRoom.crop.CropModel;
        var TeaGardenModel = models.teaRoom.TeaGardenModel;
        /**
         * 茶园场景（除土地外）控制器，在此处理茶农自动除虫除草浇水的流程
         * @author hsx
         */
        var TeaGardenCtrl = /** @class */ (function () {
            function TeaGardenCtrl() {
                if (!TeaGardenCtrl.model)
                    TeaGardenCtrl.model = TeaGardenModel.instance;
                // if(!TeaGardenCtrl.friendSceneLayer)
                // 	TeaGardenCtrl.friendSceneLayer = new views.layers.FriendSceneLayer();
            }
            TeaGardenCtrl.getInstance = function () {
                if (!TeaGardenCtrl._instance)
                    TeaGardenCtrl._instance = new TeaGardenCtrl();
                if (!TeaGardenCtrl.view)
                    TeaGardenCtrl.view = new views.teaRoom.TeaGardenView();
                if (!TeaGardenCtrl.friendView)
                    TeaGardenCtrl.friendView = new views.friendList.FriendTeaGardenView();
                return TeaGardenCtrl._instance;
            };
            /**
             * 场景初始化时，茶农相关状态及事务的处理器
             */
            TeaGardenCtrl.prototype.initFarmerProcessor = function () {
                // 有茶农
                if (TeaGardenModel.teaGardenVO.farmerUrl) {
                    // 有工作时间
                    if (TeaGardenModel.teaGardenVO.restTimeOfWork > 0) {
                        // if(CropModel.isHasDebuff())
                        // 浇水
                        if (CropModel.dryCropVOsArr.length) {
                            TeaGardenCtrl.curCropVO = CropModel.dryCropVOsArr[0];
                            var curCoordinate_1 = TeaGardenCtrl.getInstance().getLandGridCoordinate();
                            TeaGardenCtrl.view.addWaterFarmer(TeaGardenModel.teaGardenVO.farmerUrl, "water", curCoordinate_1);
                            Laya.timer.once(3000, this, function () {
                                if (TeaGardenCtrl.curCropVO.dry) {
                                    controllers.teaRoom.crop.CropCtrl.callback = function () {
                                        TeaGardenCtrl.curCropVO.dry = 0;
                                        CropModel.dryCropVOsArr.shift();
                                        Laya.timer.once(4000, this, function () {
                                            TeaGardenCtrl._instance.initFarmerProcessor();
                                        });
                                    };
                                    controllers.teaRoom.crop.CropCtrl.getInstance().request_actWater(TeaGardenCtrl.curCropVO, true, curCoordinate_1);
                                }
                            });
                        } // 除草
                        else if (CropModel.grassCropVOsArr.length) {
                            TeaGardenCtrl.curCropVO = CropModel.grassCropVOsArr[0];
                            var curCoordinate_2 = TeaGardenCtrl.getInstance().getLandGridCoordinate();
                            TeaGardenCtrl.view.addRemoveGrassWormFarmer(TeaGardenModel.teaGardenVO.farmerUrl, "removeGrass", curCoordinate_2);
                            Laya.timer.once(3000, this, function () {
                                if (TeaGardenCtrl.curCropVO.grass > 0) {
                                    controllers.teaRoom.crop.CropCtrl.callback = function () {
                                        TeaGardenCtrl.curCropVO.grass--;
                                        if (TeaGardenCtrl.curCropVO.grass == 0)
                                            CropModel.grassCropVOsArr.shift();
                                        Laya.timer.once(4000, this, function () {
                                            TeaGardenCtrl._instance.initFarmerProcessor();
                                        });
                                    };
                                    controllers.teaRoom.crop.CropCtrl.getInstance().request_actWipeGrass(TeaGardenCtrl.curCropVO, true, curCoordinate_2);
                                }
                            });
                        } // 除虫
                        else if (CropModel.wormCropVOsArr.length) {
                            TeaGardenCtrl.curCropVO = CropModel.wormCropVOsArr[0];
                            var curCoordinate = this.getLandGridCoordinate();
                            TeaGardenCtrl.view.addRemoveGrassWormFarmer(TeaGardenModel.teaGardenVO.farmerUrl, "killWorm", curCoordinate);
                            Laya.timer.once(3000, this, function () {
                                if (TeaGardenCtrl.curCropVO.worm > 0) {
                                    controllers.teaRoom.crop.CropCtrl.callback = function () {
                                        TeaGardenCtrl.curCropVO.worm--;
                                        if (TeaGardenCtrl.curCropVO.worm == 0)
                                            CropModel.wormCropVOsArr.shift();
                                        Laya.timer.once(4000, this, function () {
                                            TeaGardenCtrl._instance.initFarmerProcessor();
                                        });
                                    };
                                    controllers.teaRoom.crop.CropCtrl.getInstance().request_actPesticide(TeaGardenCtrl.curCropVO, true);
                                }
                            });
                        } // 空闲
                        else {
                            TeaGardenCtrl.view.addCommonFarmer(TeaGardenModel.teaGardenVO.farmerUrl);
                        }
                    } // 空闲（无工资情况的空闲状态，买入工资卡后，再来调用该函数！）
                    else {
                        TeaGardenCtrl.view.addCommonFarmer(TeaGardenModel.teaGardenVO.farmerUrl);
                    }
                }
            };
            TeaGardenCtrl.prototype.initFriendFarmerProcessor = function () {
                // 有茶农
                if (TeaGardenModel.friendTeaGardenVO.farmerUrl) {
                    // 有工作时间
                    if (TeaGardenModel.friendTeaGardenVO.restTimeOfWork > 0) {
                        // if(CropModel.isHasFriendDebuff())
                        // 浇水
                        if (CropModel.dryCropVOsArr1.length) {
                            TeaGardenCtrl.curCropVO = CropModel.dryCropVOsArr1[0];
                            var curCoordinate = TeaGardenCtrl.getInstance().getFriendLandGridCoordinate();
                            TeaGardenCtrl.friendView.addWaterFarmer(TeaGardenModel.friendTeaGardenVO.farmerUrl, "water", curCoordinate);
                            Laya.timer.once(3000, this, function () {
                                if (TeaGardenCtrl.curCropVO.dry) {
                                    controllers.teaRoom.crop.CropCtrl.callback = function () {
                                        TeaGardenCtrl.curCropVO.dry = 0;
                                        CropModel.dryCropVOsArr1.shift();
                                        Laya.timer.once(4000, this, function () {
                                            TeaGardenCtrl._instance.initFriendFarmerProcessor();
                                        });
                                    };
                                    controllers.teaRoom.crop.CropCtrl.getInstance().request_actFriendWater(TeaGardenCtrl.curCropVO);
                                }
                            });
                        } // 除草
                        else if (CropModel.grassCropVOsArr1.length) {
                            TeaGardenCtrl.curCropVO = CropModel.grassCropVOsArr1[0];
                            var curCoordinate = TeaGardenCtrl.getInstance().getFriendLandGridCoordinate();
                            TeaGardenCtrl.friendView.addRemoveGrassWormFarmer(TeaGardenModel.friendTeaGardenVO.farmerUrl, "removeGrass", curCoordinate);
                            Laya.timer.once(3000, this, function () {
                                if (TeaGardenCtrl.curCropVO.grass > 0) {
                                    controllers.teaRoom.crop.CropCtrl.callback = function () {
                                        TeaGardenCtrl.curCropVO.grass--;
                                        if (TeaGardenCtrl.curCropVO.grass == 0)
                                            CropModel.grassCropVOsArr1.shift();
                                        Laya.timer.once(4000, this, function () {
                                            TeaGardenCtrl._instance.initFriendFarmerProcessor();
                                        });
                                    };
                                    controllers.teaRoom.crop.CropCtrl.getInstance().request_actFriendWipeGrass(TeaGardenCtrl.curCropVO);
                                }
                            });
                        } // 除虫
                        else if (CropModel.wormCropVOsArr1.length) {
                            TeaGardenCtrl.curCropVO = CropModel.wormCropVOsArr1[0];
                            var curCoordinate = this.getFriendLandGridCoordinate();
                            TeaGardenCtrl.friendView.addRemoveGrassWormFarmer(TeaGardenModel.friendTeaGardenVO.farmerUrl, "killWorm", curCoordinate);
                            Laya.timer.once(3000, this, function () {
                                if (TeaGardenCtrl.curCropVO.worm > 0) {
                                    controllers.teaRoom.crop.CropCtrl.callback = function () {
                                        TeaGardenCtrl.curCropVO.worm--;
                                        if (TeaGardenCtrl.curCropVO.worm == 0)
                                            CropModel.wormCropVOsArr1.shift();
                                        Laya.timer.once(4000, this, function () {
                                            TeaGardenCtrl._instance.initFriendFarmerProcessor();
                                        });
                                    };
                                    controllers.teaRoom.crop.CropCtrl.getInstance().request_actFriendPesticide(TeaGardenCtrl.curCropVO);
                                }
                            });
                        } // 空闲
                        else {
                            TeaGardenCtrl.friendView.addCommonFarmer(TeaGardenModel.friendTeaGardenVO.farmerUrl);
                        }
                    } // 空闲（无工资情况的空闲状态，买入工资卡后，再来调用该函数！）
                    else {
                        TeaGardenCtrl.friendView.addCommonFarmer(TeaGardenModel.friendTeaGardenVO.farmerUrl);
                    }
                }
            };
            /**
             * 获取某地块的坐标点
             */
            TeaGardenCtrl.prototype.getLandGridCoordinate = function () {
                // 获取特定的地块
                var landId = TeaGardenCtrl.curCropVO.landId;
                var landGrid = teaRoom.LandCtrl.landView.getLandGridById(landId);
                var p = new Laya.Point();
                p.x = landGrid.x + 245;
                p.y = landGrid.y + 220;
                return p;
            };
            /**
             * 获取某地块的坐标点
             */
            TeaGardenCtrl.prototype.getFriendLandGridCoordinate = function () {
                // 获取特定的地块
                var landId = TeaGardenCtrl.curCropVO.landId;
                var landGrid = teaRoom.LandCtrl.friendLandView.getLandGridById(landId);
                var p = new Laya.Point();
                p.x = landGrid.x + 245;
                p.y = landGrid.y + 220;
                return p;
            };
            /**
             * 请求狗的数据
             */
            TeaGardenCtrl.prototype.request_initDog = function () {
                TeaGardenModel.callback = this.initDogOver;
                TeaGardenCtrl.model.request_initDog();
            };
            /**
             * 请求狗(好友)的数据
             */
            TeaGardenCtrl.prototype.request_initFriendDog = function () {
                TeaGardenModel.callback = this.initFriendDogOver;
                TeaGardenCtrl.model.request_initFriendDog(models.player.PlayerInfoModel.friendInfo.userId);
            };
            TeaGardenCtrl.prototype.initDogOver = function (takeData) {
                if (takeData["swfUrl"])
                    TeaGardenCtrl.view.addDog(takeData["swfUrl"]);
                TeaGardenCtrl.getInstance().request_initFarmer();
            };
            TeaGardenCtrl.prototype.initFriendDogOver = function (takeData) {
                if (takeData["swfUrl"])
                    TeaGardenCtrl.friendView.addDog(takeData["swfUrl"]);
                TeaGardenCtrl.getInstance().request_initFriendFarmer();
            };
            /**
             * 请求茶农的数据
             */
            TeaGardenCtrl.prototype.request_initFarmer = function () {
                TeaGardenModel.callback = this.initFarmerOver;
                TeaGardenCtrl.model.request_initFarmer();
            };
            /**
             * 请求好友茶农数据
             */
            TeaGardenCtrl.prototype.request_initFriendFarmer = function () {
                TeaGardenModel.callback = this.initFriendFarmerOver;
                TeaGardenCtrl.model.request_initFriendFarmer(models.player.PlayerInfoModel.friendInfo.userId);
            };
            TeaGardenCtrl.prototype.initFarmerOver = function (takeData) {
                // TeaGardenCtrl.instance.view.addFarmer(takeData);	// old
                // 根据减益状态，初始化茶农相关操作
                TeaGardenCtrl.getInstance().initFarmerProcessor();
            };
            TeaGardenCtrl.prototype.initFriendFarmerOver = function (takeData) {
                // TeaGardenCtrl.instance.view.addFarmer(takeData);	// old
                // 根据减益状态，初始化茶农相关操作
                TeaGardenCtrl.getInstance().initFriendFarmerProcessor();
            };
            /**
             * 加载好友茶园背景
             */
            TeaGardenCtrl.prototype.reLoadBg = function () {
                TeaGardenCtrl.getInstance().request_getTeaGardenDec(models.player.PlayerInfoModel.friendInfo.userId);
            };
            /**
             * 请求用户自己的茶园背景
             */
            TeaGardenCtrl.prototype.request_getUserGardenDec = function () {
                TeaGardenModel.callback = this.setUserDec;
                TeaGardenCtrl.model.request_getUserGardenDec();
            };
            TeaGardenCtrl.prototype.setUserDec = function (takeData) {
            };
            /**
             * 请求好友茶园装饰
             */
            TeaGardenCtrl.prototype.request_getTeaGardenDec = function (userId) {
                TeaGardenModel.callback = this.initLoadBg;
                TeaGardenCtrl.model.request_getFarmDecoration(userId);
            };
            TeaGardenCtrl.prototype.initLoadBg = function (takeData) {
                // PlayerInfoCtrl.instance.initFriendSceneLayar();
                UILayerManager.uiLayer.loadFriendTea();
            };
            return TeaGardenCtrl;
        }());
        teaRoom.TeaGardenCtrl = TeaGardenCtrl;
    })(teaRoom = controllers.teaRoom || (controllers.teaRoom = {}));
})(controllers || (controllers = {}));
//# sourceMappingURL=TeaGardenCtrl.js.map