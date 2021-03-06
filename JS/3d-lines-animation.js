function init() {
  var e, n;
  (e = document.getElementById("canvas")),
    ((camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      1e4
    )).position.z = 100),
    (scene = new THREE.Scene()),
    (renderer = new THREE.CanvasRenderer({ alpha: !0 })).setPixelRatio(
      window.devicePixelRatio
    ),
    renderer.setClearColor(0, 0),
    renderer.setSize(window.innerWidth, window.innerHeight),
    e.appendChild(renderer.domElement);
  for (
    var o = 2 * Math.PI,
      i = new THREE.SpriteCanvasMaterial({
        color: 16777215,
        opacity: 0.5,
        program: function(e) {
          e.beginPath(), e.arc(0, 0, 0.5, 0, o, !0), e.fill();
        }
      }),
      t = new THREE.Geometry(),
      a = 0;
    a < 150;
    a++
  )
    ((n = new THREE.Sprite(i)).position.x = 2 * Math.random() - 1),
      (n.position.y = 2 * Math.random() - 1),
      (n.position.z = 2 * Math.random() - 1),
      n.position.normalize(),
      n.position.multiplyScalar(10 * Math.random() + 600),
      (n.scale.x = n.scale.y = 5),
      scene.add(n),
      t.vertices.push(n.position);
  var r = new THREE.Line(
    t,
    new THREE.LineBasicMaterial({ color: 16777215, opacity: 0.2 })
  );
  scene.add(r),
    document.addEventListener("mousemove", onDocumentMouseMove, !1),
    document.addEventListener("touchstart", onDocumentTouchStart, !1),
    document.addEventListener("touchmove", onDocumentTouchMove, !1),
    window.addEventListener("resize", onWindowResize, !1);
}
function onWindowResize() {
  (windowHalfX = window.innerWidth / 2),
    (windowHalfY = window.innerHeight / 2),
    (camera.aspect = window.innerWidth / window.innerHeight),
    camera.updateProjectionMatrix(),
    renderer.setSize(window.innerWidth, window.innerHeight);
}
function onDocumentMouseMove(e) {
  (mouseX = 0.05 * (e.clientX - windowHalfX)),
    (mouseY = 0.2 * (e.clientY - windowHalfY));
}
function onDocumentTouchStart(e) {
  e.touches.length > 1 &&
    (e.preventDefault(),
    (mouseX = 0.7 * (e.touches[0].pageX - windowHalfX)),
    (mouseY = 0.7 * (e.touches[0].pageY - windowHalfY)));
}
function onDocumentTouchMove(e) {
  1 == e.touches.length &&
    (e.preventDefault(),
    (mouseX = e.touches[0].pageX - windowHalfX),
    (mouseY = e.touches[0].pageY - windowHalfY));
}
function animate() {
  requestAnimationFrame(animate), render();
}
function render() {
  (camera.position.x += 0.1 * (mouseX - camera.position.x)),
    (camera.position.y += 0.05 * (200 - mouseY - camera.position.y)),
    camera.lookAt(scene.position),
    renderer.render(scene, camera);
}
var mouseX = 0,
  mouseY = 0,
  windowHalfX = window.innerWidth / 2,
  windowHalfY = window.innerHeight / 2,
  SEPARATION = 200,
  AMOUNTX = 1,
  AMOUNTY = 1,
  camera,
  scene,
  renderer;
init(), animate();
