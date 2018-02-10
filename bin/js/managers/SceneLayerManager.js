var managers;
(function (managers) {
    /**
     * 场景层管理器
     */
    var SceneLayerManager = /** @class */ (function () {
        function SceneLayerManager(interCls) {
            /**
             * 层容器
             */
            this.layersArr = [];
            /**
             * 是否为首次显示
             */
            this.isFirstShow = false;
            if (!interCls || interCls instanceof InternalClass === false)
                throw new Error("SceneLayerManager is singleton, not allow to use constructor!");
        }
        SceneLayerManager.getInstance = function () {
            if (!SceneLayerManager.instance)
                SceneLayerManager.instance = new SceneLayerManager(new InternalClass());
            return SceneLayerManager.instance;
        };
        /**
         * 茶园场景
         */
        SceneLayerManager.prototype.initTeaGardenScene = function () {
            if (!SceneLayerManager.sceneLayer) {
                SceneLayerManager.sceneLayer = new views.layers.SceneLayer();
                SceneLayerManager.sceneLayer.name = "sceneLayer";
                SceneLayerManager.sceneLayer.addLandView();
                SceneLayerManager.sceneLayer.addTeaGardenView();
                this.layersArr.push(SceneLayerManager.sceneLayer);
            }
            this.switchSceneState(SceneLayerManager.sceneLayer);
            // 游戏初始化时若有活动则自动弹出活动窗口一次
            if (managers.ResourceManager.activityObjArr) {
                if (!managers.UILayerManager.uiLayer)
                    managers.UILayerManager.getInstance();
                if (this.isFirstShow) {
                    this.isFirstShow = false;
                    managers.UILayerManager.uiLayer.loadActivityTip();
                }
            }
        };
        /**
         * 炒茶场景
         */
        SceneLayerManager.prototype.friedTeaScene = function () {
            if (!SceneLayerManager.friedTeaSceneLayer) {
                SceneLayerManager.friedTeaSceneLayer = new views.layers.FriedTeaHomeLayer();
                SceneLayerManager.friedTeaSceneLayer.name = "friedTeaSceneLayer";
                SceneLayerManager.friedTeaSceneLayer.addFriedTeaView();
                this.layersArr.push(SceneLayerManager.friedTeaSceneLayer);
            }
            this.switchSceneState(SceneLayerManager.friedTeaSceneLayer);
        };
        /**
         * 泡茶场景
         */
        SceneLayerManager.prototype.makeTeaScene = function () {
            if (!SceneLayerManager.makeTeaSceneLayer) {
                SceneLayerManager.makeTeaSceneLayer = new views.makeRoom.MakeTeaHomeLayer();
                SceneLayerManager.makeTeaSceneLayer.name = "makeTeaSceneLayer";
                SceneLayerManager.makeTeaSceneLayer.loadBg();
                Laya.stage.addChildAt(SceneLayerManager.makeTeaSceneLayer, 0);
                this.layersArr.push(SceneLayerManager.makeTeaSceneLayer);
            }
            else {
                SceneLayerManager.makeTeaSceneLayer.loadBg();
            }
            this.switchSceneState(SceneLayerManager.makeTeaSceneLayer);
        };
        /**
         * 好友茶园场景
         */
        SceneLayerManager.prototype.friendGardenScene = function () {
            if (!SceneLayerManager.friendSceneLayer) {
                SceneLayerManager.friendSceneLayer = new views.layers.FriendSceneLayer();
                SceneLayerManager.friendSceneLayer.name = "friendSceneLayer";
                Laya.stage.addChildAt(SceneLayerManager.friendSceneLayer, 0);
                // Laya.stage.addChild(SceneLayerManager.friendSceneLayer);
                SceneLayerManager.friendSceneLayer.addFriendLandView();
                SceneLayerManager.friendSceneLayer.addTeaGardenView();
                this.layersArr.push(SceneLayerManager.friendSceneLayer);
            }
            else {
                SceneLayerManager.friendSceneLayer.graphics.clear();
                SceneLayerManager.friendSceneLayer.resetLoadBg(models.teaRoom.TeaGardenModel.decorationVOArr);
                SceneLayerManager.friendSceneLayer.addFriendLandView();
                SceneLayerManager.friendSceneLayer.addTeaGardenView();
            }
            this.switchSceneState(SceneLayerManager.friendSceneLayer);
        };
        /**
         * 切换场景间的显示状态
         * @param curLayer 需显示的场景，其它的隐藏
         */
        SceneLayerManager.prototype.switchSceneState = function (curLayer) {
            if (this.layersArr.length == 0)
                return;
            if (!curLayer)
                return;
            var i;
            var len = this.layersArr.length;
            var view;
            for (i = 0; i < len; i++) {
                view = this.layersArr[i];
                if (!view)
                    continue;
                if (curLayer.name == view.name)
                    curLayer.visible = true;
                else
                    view.visible = false;
            }
        };
        return SceneLayerManager;
    }());
    managers.SceneLayerManager = SceneLayerManager;
    var InternalClass = /** @class */ (function () {
        function InternalClass() {
        }
        return InternalClass;
    }());
})(managers || (managers = {}));
//# sourceMappingURL=SceneLayerManager.js.map