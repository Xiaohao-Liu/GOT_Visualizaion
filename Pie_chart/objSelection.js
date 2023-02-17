THREE.ObjectSelection = function(parameters) {
    parameters = parameters || {};
  
    this.domElement = parameters.domElement || document;
    this.INTERSECTED = null;
  
    var _this = this;
  
    var callbackSelected = parameters.selected;//处理函数通过外界传入
    var callbackClicked = parameters.clicked;
    var callbackMousedown = parameters.mousedown;
    var callbackMouseup = parameters.mouseup;
    var mouse = { x: 0, y: 0 };
  
    //鼠标移入事件
    this.domElement.addEventListener( 'mousemove', onDocumentMouseMove, false );
    //获取当前二维坐标
    function onDocumentMouseMove( event ) {
      mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
      mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    }
  
    //单击事件
    this.domElement.addEventListener( 'click', onDocumentMouseClick, false );
    function onDocumentMouseClick( event ) {
      if(_this.INTERSECTED) {
        if(typeof callbackClicked === 'function') {
          callbackClicked(_this.INTERSECTED);
        }
      }
    }
  
    this.domElement.addEventListener('mousedown', onDocumentMouseDown, false);
    function onDocumentMouseDown( event ) {
      if(_this.INTERSECTED) {
        if(typeof callbackMousedown === 'function') {
          callbackMousedown(_this.INTERSECTED);
        }
      }
    }
    this.domElement.addEventListener('mouseup', onDocumentMouseUp, false);
    function onDocumentMouseUp( event ) {
      if(_this.INTERSECTED) {
        if(typeof callbackMouseup === 'function') {
          callbackMouseup(_this.INTERSECTED);
        }
      }
    }
  
  
    //在渲染中注意选择对象
    this.render = function(scene, camera) {
      var vector = new THREE.Vector3( mouse.x, mouse.y, 0.5 );
      vector.unproject(camera);//获取当前三维坐标
  
      var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position).normalize());
      var intersects = raycaster.intersectObject(scene, true);//把scene作为检测对象
  
      if( intersects.length > 0 ) {
        if ( this.INTERSECTED != intersects[ 0 ] ) {
          if ( this.INTERSECTED ) {//若此类中实例对象不是选取对象，则颜色值任不变
            this.INTERSECTED.object.material.color.setHex( this.INTERSECTED.currentHex );
          }
          this.INTERSECTED = intersects[ 0 ];//依据检测，更换当前类中几何对象
          this.INTERSECTED.currentHex = this.INTERSECTED.object.material.color.getHex();//对象当前颜色
          // this.INTERSECTED.material.color.setHex( 0xff0000 );//移入对象则变红
          if(typeof callbackSelected === 'function') {
            callbackSelected(this.INTERSECTED);//调用选择处理函数，个性化处理
          }
        }
      } else {//若没有检测到scene中选择对象
        if ( this.INTERSECTED ) {
          this.INTERSECTED.object.material.color.setHex( this.INTERSECTED.currentHex );
        }
        this.INTERSECTED = null;//初始化
        if(typeof callbackSelected === 'function') {
          callbackSelected(this.INTERSECTED);
        }
      }
    };
  };