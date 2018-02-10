namespace views.base
{
    export interface IBaseView
    {

        /** 初始化 */
        init(): void;

        /** 内存释放 */
        dispose(): void;

    }
}