var managers;
(function (managers) {
    /**
     * UI模块的管理器
     */
    var UILayerManager = /** @class */ (function () {
        function UILayerManager(interCls) {
            if (!interCls || interCls instanceof InternalClass === false)
                throw new Error("UIManger is singleton, not allow to use constructor!");
            if (!UILayerManager.uiLayer)
                UILayerManager.uiLayer = new views.layers.UILayer;
            // if (!UILayerManager.friendUILayer)
            //     UILayerManager.friendUILayer = new views.layers.FriendUILayer;
        }
        UILayerManager.getInstance = function () {
            if (!UILayerManager.instance)
                UILayerManager.instance = new UILayerManager(new InternalClass());
            return UILayerManager.instance;
        };
        /**
         * 默认初始化茶园UI
         */
        UILayerManager.prototype.initTeaGardenUI = function () {
            // 茶园UI
            if (!UILayerManager.teaGardenUI) {
                UILayerManager.teaGardenUI = views.layers.SceneUILayer.instance;
                UILayerManager.teaGardenUI.name = "teaGardenUI";
                UILayerManager.teaGardenUI.pos(180, 85);
                managers.SceneLayerManager.sceneLayer.addChild(UILayerManager.teaGardenUI);
            }
            UILayerManager.teaGardenUI.visible = true;
            UILayerManager.uiLayer.visible = true;
            // SceneLayerManager.sceneLayer.addChild(UILayerManager.teaGardenUI);
            // 隐藏好友茶园UI
            if (UILayerManager.friendUILayer)
                UILayerManager.friendUILayer.visible = false;
            // 隐藏炒茶室UI
            if (UILayerManager.friedTeaLayer)
                UILayerManager.friedTeaLayer.visible = false;
            // 隐藏泡茶室UI
            if (UILayerManager.makeTealayer)
                UILayerManager.makeTealayer.visible = false;
        };
        /** 显示好友茶园UI */
        UILayerManager.prototype.initFriendUILayer = function () {
            if (!UILayerManager.friendUILayer) {
                UILayerManager.friendUILayer = views.layers.FriendUILayer.instance;
                // UILayerManager.friendUILayer.pos(180,85);    // test
                managers.SceneLayerManager.friendSceneLayer.addChild(UILayerManager.friendUILayer);
            }
            UILayerManager.friendUILayer.visible = true;
            // 隐藏茶园UI
            if (!UILayerManager.teaGardenUI)
                UILayerManager.teaGardenUI.visible = false;
            // 隐藏炒茶室UI
            if (UILayerManager.friedTeaLayer)
                UILayerManager.friedTeaLayer.visible = false;
            // 隐藏泡茶室UI
            if (UILayerManager.makeTealayer)
                UILayerManager.makeTealayer.visible = false;
        };
        /**
         * 显示炒茶室UI
         */
        UILayerManager.prototype.showFriedTeaUI = function () {
            if (!UILayerManager.friedTeaLayer) {
                UILayerManager.friedTeaLayer = new views.layers.FriedTeaUILayer();
                managers.SceneLayerManager.friedTeaSceneLayer.addChild(UILayerManager.friedTeaLayer);
            }
            UILayerManager.friedTeaLayer.visible = true;
            // 隐藏茶园UI
            if (!UILayerManager.teaGardenUI)
                UILayerManager.teaGardenUI.visible = false;
            // 隐藏好友茶园UI
            if (UILayerManager.friendUILayer)
                UILayerManager.friendUILayer.visible = false;
            // 隐藏泡茶室UI
            if (UILayerManager.makeTealayer)
                UILayerManager.makeTealayer.visible = false;
        };
        /**
         * 显示泡茶室UI
         */
        UILayerManager.prototype.showMakeTeaUI = function () {
            if (!UILayerManager.makeTealayer) {
                UILayerManager.makeTealayer = new views.layers.MakeTeaUILayer();
                managers.SceneLayerManager.makeTeaSceneLayer.addChild(UILayerManager.makeTealayer);
            }
            UILayerManager.makeTealayer.visible = true;
            // 隐藏茶园UI
            if (UILayerManager.teaGardenUI)
                UILayerManager.teaGardenUI.visible = false;
            // 隐藏好友茶园UI
            if (UILayerManager.friendUILayer)
                UILayerManager.friendUILayer.visible = false;
            // 隐藏炒茶室UI
            if (UILayerManager.friedTeaLayer)
                UILayerManager.friedTeaLayer.visible = false;
        };
        UILayerManager.instance = undefined;
        return UILayerManager;
    }());
    managers.UILayerManager = UILayerManager;
    var InternalClass = /** @class */ (function () {
        function InternalClass() {
        }
        return InternalClass;
    }());
})(managers || (managers = {}));
//# sourceMappingURL=UILayerManager.js.map