namespace managers
{
    import Sprite = laya.display.Sprite;
    import UILayer = views.layers.UILayer;

    /**
     * UI模块的管理器
     */
    export class UILayerManager
    {
        /**
         * 各个场景中的通用UI层
         */
        static uiLayer: views.layers.UILayer;
        /**
         * 好友茶园的UI层
         */
        static friendUILayer: views.layers.FriendUILayer;
        /**
         * 茶园场景UI层
         */
        static teaGardenUI:views.layers.SceneUILayer;
        /**
         * 炒茶室UI层
         */
        static friedTeaLayer: views.layers.FriedTeaUILayer;
        /**
         * 泡茶室UI层
         */
         static makeTealayer: views.layers.MakeTeaUILayer;

        private static instance: UILayerManager = undefined;

        uiName: string;

        constructor(interCls: InternalClass)
        {
            if (!interCls || interCls instanceof InternalClass === false)
                throw new Error("UIManger is singleton, not allow to use constructor!");

            if (!UILayerManager.uiLayer)
                UILayerManager.uiLayer = new views.layers.UILayer;
            // if (!UILayerManager.friendUILayer)
            //     UILayerManager.friendUILayer = new views.layers.FriendUILayer;
        }

        static getInstance(): UILayerManager
        {
            if (!UILayerManager.instance)
                UILayerManager.instance = new UILayerManager(new InternalClass());

            return UILayerManager.instance;
        }

        /**
         * 默认初始化茶园UI
         */
        initTeaGardenUI(): void
        {
            // 茶园UI
            if(!UILayerManager.teaGardenUI)
            {
                UILayerManager.teaGardenUI = views.layers.SceneUILayer.instance;
                UILayerManager.teaGardenUI.name="teaGardenUI";
                UILayerManager.teaGardenUI.pos(180,85);
                SceneLayerManager.sceneLayer.addChild(UILayerManager.teaGardenUI);
            }
            UILayerManager.teaGardenUI.visible = true;
            UILayerManager.uiLayer.visible=true;
            // SceneLayerManager.sceneLayer.addChild(UILayerManager.teaGardenUI);

            // 隐藏好友茶园UI
            if(UILayerManager.friendUILayer)
                 UILayerManager.friendUILayer.visible = false;

            // 隐藏炒茶室UI
            if (UILayerManager.friedTeaLayer)
                UILayerManager.friedTeaLayer.visible = false;

            // 隐藏泡茶室UI
            if(UILayerManager.makeTealayer)
                UILayerManager.makeTealayer.visible = false;
        }

        /** 显示好友茶园UI */
        initFriendUILayer(): void
        {
            if(!UILayerManager.friendUILayer)
            {
                UILayerManager.friendUILayer = views.layers.FriendUILayer.instance;
                // UILayerManager.friendUILayer.pos(180,85);    // test
                SceneLayerManager.friendSceneLayer.addChild(UILayerManager.friendUILayer);
            }
            UILayerManager.friendUILayer.visible = true;

            // 隐藏茶园UI
            if(!UILayerManager.teaGardenUI)
                UILayerManager.teaGardenUI.visible = false;

            // 隐藏炒茶室UI
            if(UILayerManager.friedTeaLayer)
                UILayerManager.friedTeaLayer.visible = false;

            // 隐藏泡茶室UI
            if(UILayerManager.makeTealayer)
                UILayerManager.makeTealayer.visible = false;
        }

        /**
         * 显示炒茶室UI
         */
        showFriedTeaUI(): void
        {
            if (!UILayerManager.friedTeaLayer)
            {
                UILayerManager.friedTeaLayer = new views.layers.FriedTeaUILayer();
                SceneLayerManager.friedTeaSceneLayer.addChild(UILayerManager.friedTeaLayer);
            }
            UILayerManager.friedTeaLayer.visible = true;

            // 隐藏茶园UI
            if(!UILayerManager.teaGardenUI)
                UILayerManager.teaGardenUI.visible = false;

            // 隐藏好友茶园UI
            if(UILayerManager.friendUILayer)
                UILayerManager.friendUILayer.visible = false;

            // 隐藏泡茶室UI
            if(UILayerManager.makeTealayer)
             UILayerManager.makeTealayer.visible = false;
        }

        /**
         * 显示泡茶室UI
         */
        showMakeTeaUI():void
        {
            if (!UILayerManager.makeTealayer)
            {
                UILayerManager.makeTealayer = new views.layers.MakeTeaUILayer();
                SceneLayerManager.makeTeaSceneLayer.addChild(UILayerManager.makeTealayer);
            }
            UILayerManager.makeTealayer.visible = true;

            // 隐藏茶园UI
            if(UILayerManager.teaGardenUI)
                UILayerManager.teaGardenUI.visible = false;

            // 隐藏好友茶园UI
            if(UILayerManager.friendUILayer)
                 UILayerManager.friendUILayer.visible = false;

            // 隐藏炒茶室UI
            if(UILayerManager.friedTeaLayer)
                UILayerManager.friedTeaLayer.visible =false;
        }


    }

    class InternalClass
    {

    }
}
