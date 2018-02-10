namespace views.base
{
    import Sprite = laya.display.Sprite;
    import Event = laya.events.Event;

    /**
     * 视图基类，所有的视图需继承于其
     */
    export class BaseView extends Sprite implements IBaseView
    {
        constructor()
        {
            super();

            // 注意：添加至父容器或向其内添加子对象，均会触发此事件！！！
            this.on(Event.ADDED, this, this.init);
            this.on(Event.REMOVED, this, this.dispose);
        }

        /**
         * 添加至显示列表时的初始化工作
         */
        init(event?: Event): void
        {
            // this.autoSize = true;

        }

        /**
         * 移除后的清理工作
         */
        dispose(event?: Event): void
        {
            console.log("dispose");
            this.off(Event.REMOVED, this, this.dispose);
            this.removeChildren(0, this.numChildren - 1);
            this.removeSelf();
        }

    }
}
