/**
 * 高度图模型
 * 
 */

class ElevationSample {

    public constructor() {
        StageMgr.Instance().init();
        this.init();
    }

    private loader: egret3d.UnitLoader;
    private init() {

        this.loader = new egret3d.UnitLoader("resource/elevation/timg.jpg");
        this.loader.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onLoader, this);
    }

    private onLoader(e: egret3d.LoaderEvent3D) {
        let img: egret3d.ImageTexture = e.target.data;

        let geom: egret3d.ElevationGeometry = new egret3d.ElevationGeometry(img, 512, 100, 512);
        let mat: egret3d.TextureMaterial = new egret3d.TextureMaterial(img);
        let cube: egret3d.Mesh = new egret3d.Mesh(geom, mat);
        StageMgr.Instance().view3d.addChild3D(cube);

        this.InitCameraCtl();
        StageMgr.Instance().stage3d.addEventListener(egret3d.Event3D.ENTER_FRAME, this.update, this);
    }


    private cameraCtl: egret3d.LookAtController;
    private InitCameraCtl() {
        this.cameraCtl = new egret3d.LookAtController(StageMgr.Instance().view3d.camera3D, new egret3d.Object3D());
        this.cameraCtl.distance = 300;
        this.cameraCtl.rotationX = 40;
    }

    public update(e: egret3d.Event3D) {
        this.cameraCtl.update();
    }

}