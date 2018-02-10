var configs;
(function (configs) {
    /**
     * 游戏配置数据
     */
    var GameConfig = /** @class */ (function () {
        function GameConfig() {
        }
        /**
         * 初始化配置
         */
        GameConfig.init = function () {
        };
        GameConfig.PC = "PC";
        GameConfig.MOBILE = "Mobile";
        /**
         * 当前游戏版本号
         */
        GameConfig.GAME_VERSION = '1.0.0';
        /**
         * 密钥串(与服务器校验)
         */
        GameConfig.PRIVATE_KEY = 'bobo';
        /**
         * 游戏主窗口宽度
         */
        GameConfig.GAME_WINDOW_WIDTH = 1000;
        /**
         * 游戏主窗口高度
         */
        GameConfig.GAME_WINDOW_HEIGHT = 600;
        /**
         * 土地的最大数量
         */
        GameConfig.MAX_LAND_NUMS = 24;
        /**
         * 土地的最高等级
         */
        GameConfig.MAX_LAND_LEVEL = 2;
        /**
         * 炒锅的最大数量
         */
        GameConfig.MAX_POT_NUMS = 6;
        /**
         * 炒锅的最高等级
         */
        GameConfig.MAX_POT_LEVEL = 2;
        /**
         * teaArea场景中各个物件的深度值
         */
        GameConfig.DOG_HOUSE_DEPTH = 0;
        GameConfig.DOG_DEPTH = 1;
        GameConfig.DOG_POT_DEPTH = 0;
        GameConfig.LAND_DEPTH = 2;
        GameConfig.CROP_DEPTH = 1;
        GameConfig.FARMER_DEPTH = 1;
        /**
         * teaArea场景中的房屋距离容器的距离
         */
        GameConfig.HOUSE_DISTANCE_X = 900;
        GameConfig.HOUSE_DISTANCE_Y = 400;
        /**
         * teaArea场景中的狗窝距离容器的距离
         */
        GameConfig.DOG_HOUSE_DISTANCE_X = 720;
        GameConfig.DOG_HOUSE_DISTANCE_Y = 270;
        /**
         * teaArea场景中的狗盆的坐标位置
         */
        GameConfig.DOG_POT_X = 660;
        GameConfig.DOG_POT_Y = 225;
        /**
         * teaArea场景中的狗狗坐标位置
         */
        GameConfig.DOG_DISTANCE_X = 530;
        GameConfig.DOG_DISTANCE_Y = 200;
        /**
         * teaArea场景中的狗狗巡逻的距离
         */
        GameConfig.DOG_PATROL_DISTANCE = 230;
        /**
         * teaArea场景中的茶农坐标位置
         */
        GameConfig.FARMER_X = 590;
        GameConfig.FARMER_Y = -5;
        /**
         * teaArea场景中土地容器的坐标位置
         */
        GameConfig.LAND_CONTAINER_X = 372;
        GameConfig.LAND_CONTAINER_Y = 305;
        /**
         * teaArea场景中的土地区域坐标位置
         */
        GameConfig.LAND_RELATIVE_X = 230; // 315;
        GameConfig.LAND_RELATIVE_Y = 10; // 45;
        /**
         * teaArea场景中的土地素材的宽度和高度
         */
        GameConfig.LAND_WIDTH = 140;
        GameConfig.LAND_HEIGHT = 77;
        GameConfig.areaId = { "teaArea": 1, "chaoArea": 2, "paoArea": 3 };
        return GameConfig;
    }());
    configs.GameConfig = GameConfig;
})(configs || (configs = {}));
//# sourceMappingURL=GameConfig.js.map