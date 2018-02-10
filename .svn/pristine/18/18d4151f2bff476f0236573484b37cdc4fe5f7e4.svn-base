namespace views.common
{
    import View = laya.ui.View;
    import LoadingUI = ui.gameUI.common.LoadingUI;
    import ProgressBar = laya.ui.ProgressBar;
    import Handler = laya.utils.Handler;

    /**
     * 加载进度条
     * @author hsx
     */
    export class Loading extends LoadingUI
    {
        private static instance:Loading;
        handler = Handler.create(this, this.progChanged);

        constructor()
        {
            super();
            Loading.instance = this;


            this.init();
        }

        private init():void
        {
            // this.progBar=new ProgressBar("res/atlas/progressBar.png");
			// this.progBar.sizeGrid="5,5,5,5";
			//当this.progBar的value值改变时触发
            this.progressBar.sizeGrid = "5,5,5,5";
			this.progressBar.changeHandler = this.handler;
        }

        private progChanged(progNum:number):void
        {
            let _progNum:number = Math.floor(progNum*100);
            this.progressTxt.text = "当前加载进度为："+_progNum+"%";
            // ================= Android 使用 =================
            if(Laya.Browser.window.loadingView)
                Laya.Browser.window.loadingView.loading(_progNum);
            // console.log("==== Loading, progStr:"+_progNum+"%");
        }

        progressChanged(progNum:number):void
        {
            Loading.instance.progressBar.value = progNum;
        }
    }
}