(THREE.SpriteCanvasMaterial = function(e) {
  THREE.Material.call(this),
    (this.type = "SpriteCanvasMaterial"),
    (this.color = new THREE.Color(16777215)),
    (this.program = function(e, t) {}),
    this.setValues(e);
}),
  (THREE.SpriteCanvasMaterial.prototype = Object.create(
    THREE.Material.prototype
  )),
  (THREE.SpriteCanvasMaterial.prototype.constructor =
    THREE.SpriteCanvasMaterial),
  (THREE.SpriteCanvasMaterial.prototype.clone = function() {
    var e = new THREE.SpriteCanvasMaterial();
    return (
      THREE.Material.prototype.clone.call(this, e),
      e.color.copy(this.color),
      (e.program = this.program),
      e
    );
  }),
  (THREE.CanvasRenderer = function(e) {
    function t() {
      ue.setRGB(0, 0, 0), ve.setRGB(0, 0, 0), Se.setRGB(0, 0, 0);
      for (var e = 0, t = w.length; e < t; e++) {
        var i = w[e],
          n = i.color;
        i instanceof THREE.AmbientLight
          ? ue.add(n)
          : i instanceof THREE.DirectionalLight
            ? ve.add(n)
            : i instanceof THREE.PointLight && Se.add(n);
      }
    }
    function i(e, t, i) {
      for (var n = 0, o = w.length; n < o; n++) {
        var r = w[n];
        if ((me.copy(r.color), r instanceof THREE.DirectionalLight)) {
          a = Te.setFromMatrixPosition(r.matrixWorld).normalize();
          if ((s = t.dot(a)) <= 0) continue;
          (s *= r.intensity), i.add(me.multiplyScalar(s));
        } else if (r instanceof THREE.PointLight) {
          var a = Te.setFromMatrixPosition(r.matrixWorld),
            s = t.dot(Te.subVectors(a, e).normalize());
          if (s <= 0) continue;
          if (
            0 ==
            (s *=
              0 == r.distance
                ? 1
                : 1 - Math.min(e.distanceTo(a) / r.distance, 1))
          )
            continue;
          (s *= r.intensity), i.add(me.multiplyScalar(s));
        }
      }
    }
    function n(e, t, i) {
      h(i.opacity), m(i.blending);
      var n = t.scale.x * K,
        o = t.scale.y * Q,
        r = 0.5 * Math.sqrt(n * n + o * o);
      if (
        (Re.min.set(e.x - r, e.y - r),
        Re.max.set(e.x + r, e.y + r),
        i instanceof THREE.SpriteMaterial)
      ) {
        var a = i.map;
        if (null !== a && void 0 !== a.image) {
          !1 === a.hasEventListener("update", c) &&
            (a.image.width > 0 && p(a), a.addEventListener("update", c));
          var s = de[a.id];
          u(void 0 !== s ? s : "rgba( 0, 0, 0, 1 )");
          var l = a.image,
            E = l.width * a.offset.x,
            f = l.height * a.offset.y,
            d = l.width * a.repeat.x,
            x = l.height * a.repeat.y,
            y = n / d,
            v = o / x;
          ee.save(),
            ee.translate(e.x, e.y),
            0 !== i.rotation && ee.rotate(i.rotation),
            ee.translate(-n / 2, -o / 2),
            ee.scale(y, v),
            ee.translate(-E, -f),
            ee.fillRect(E, f, d, x),
            ee.restore();
        } else
          u(i.color.getStyle()),
            ee.save(),
            ee.translate(e.x, e.y),
            0 !== i.rotation && ee.rotate(i.rotation),
            ee.scale(n, -o),
            ee.fillRect(-0.5, -0.5, 1, 1),
            ee.restore();
      } else
        i instanceof THREE.SpriteCanvasMaterial &&
          (R(i.color.getStyle()),
          u(i.color.getStyle()),
          ee.save(),
          ee.translate(e.x, e.y),
          0 !== i.rotation && ee.rotate(i.rotation),
          ee.scale(n, o),
          i.program(ee),
          ee.restore());
    }
    function o(e, t, i, n) {
      if (
        (h(n.opacity),
        m(n.blending),
        ee.beginPath(),
        ee.moveTo(e.positionScreen.x, e.positionScreen.y),
        ee.lineTo(t.positionScreen.x, t.positionScreen.y),
        n instanceof THREE.LineBasicMaterial)
      ) {
        if (
          (d(n.linewidth),
          x(n.linecap),
          y(n.linejoin),
          n.vertexColors !== THREE.VertexColors)
        )
          R(n.color.getStyle());
        else {
          var o = i.vertexColors[0].getStyle(),
            r = i.vertexColors[1].getStyle();
          if (o === r) R(o);
          else {
            try {
              var a = ee.createLinearGradient(
                e.positionScreen.x,
                e.positionScreen.y,
                t.positionScreen.x,
                t.positionScreen.y
              );
              a.addColorStop(0, o), a.addColorStop(1, r);
            } catch (e) {
              a = o;
            }
            R(a);
          }
        }
        ee.stroke(), Re.expandByScalar(2 * n.linewidth);
      } else
        n instanceof THREE.LineDashedMaterial &&
          (d(n.linewidth),
          x(n.linecap),
          y(n.linejoin),
          R(n.color.getStyle()),
          v([n.dashSize, n.gapSize]),
          ee.stroke(),
          Re.expandByScalar(2 * n.linewidth),
          v([]));
    }
    function r(e, t, n, o, r, c, p, f) {
      (I.info.render.vertices += 3),
        I.info.render.faces++,
        h(f.opacity),
        m(f.blending),
        (b = e.positionScreen.x),
        (B = e.positionScreen.y),
        (P = t.positionScreen.x),
        (z = t.positionScreen.y),
        (V = n.positionScreen.x),
        (j = n.positionScreen.y),
        a(b, B, P, z, V, j),
        (f instanceof THREE.MeshLambertMaterial ||
          f instanceof THREE.MeshPhongMaterial) &&
        null === f.map
          ? (fe.copy(f.color),
            he.copy(f.emissive),
            f.vertexColors === THREE.FaceColors && fe.multiply(p.color),
            Ee.copy(ue),
            ge
              .copy(e.positionWorld)
              .add(t.positionWorld)
              .add(n.positionWorld)
              .divideScalar(3),
            i(ge, p.normalModel, Ee),
            Ee.multiply(fe).add(he),
            !0 === f.wireframe
              ? s(
                  Ee,
                  f.wireframeLinewidth,
                  f.wireframeLinecap,
                  f.wireframeLinejoin
                )
              : l(Ee))
          : f instanceof THREE.MeshBasicMaterial ||
            f instanceof THREE.MeshLambertMaterial ||
            f instanceof THREE.MeshPhongMaterial
            ? null !== f.map
              ? f.map.mapping === THREE.UVMapping &&
                ((D = p.uvs),
                E(
                  b,
                  B,
                  P,
                  z,
                  V,
                  j,
                  D[o].x,
                  D[o].y,
                  D[r].x,
                  D[r].y,
                  D[c].x,
                  D[c].y,
                  f.map
                ))
              : null !== f.envMap
                ? f.envMap.mapping === THREE.SphericalReflectionMapping &&
                  (we.copy(p.vertexNormalsModel[o]).applyMatrix3(He),
                  (W = 0.5 * we.x + 0.5),
                  (F = 0.5 * we.y + 0.5),
                  we.copy(p.vertexNormalsModel[r]).applyMatrix3(He),
                  (N = 0.5 * we.x + 0.5),
                  (k = 0.5 * we.y + 0.5),
                  we.copy(p.vertexNormalsModel[c]).applyMatrix3(He),
                  (O = 0.5 * we.x + 0.5),
                  (G = 0.5 * we.y + 0.5),
                  E(b, B, P, z, V, j, W, F, N, k, O, G, f.envMap))
                : (Ee.copy(f.color),
                  f.vertexColors === THREE.FaceColors && Ee.multiply(p.color),
                  !0 === f.wireframe
                    ? s(
                        Ee,
                        f.wireframeLinewidth,
                        f.wireframeLinecap,
                        f.wireframeLinejoin
                      )
                    : l(Ee))
            : f instanceof THREE.MeshDepthMaterial
              ? ((Ee.r = Ee.g = Ee.b =
                  1 -
                  S(e.positionScreen.z * e.positionScreen.w, H.near, H.far)),
                !0 === f.wireframe
                  ? s(
                      Ee,
                      f.wireframeLinewidth,
                      f.wireframeLinecap,
                      f.wireframeLinejoin
                    )
                  : l(Ee))
              : f instanceof THREE.MeshNormalMaterial
                ? (we.copy(p.normalModel).applyMatrix3(He),
                  Ee.setRGB(we.x, we.y, we.z)
                    .multiplyScalar(0.5)
                    .addScalar(0.5),
                  !0 === f.wireframe
                    ? s(
                        Ee,
                        f.wireframeLinewidth,
                        f.wireframeLinecap,
                        f.wireframeLinejoin
                      )
                    : l(Ee))
                : (Ee.setRGB(1, 1, 1),
                  !0 === f.wireframe
                    ? s(
                        Ee,
                        f.wireframeLinewidth,
                        f.wireframeLinecap,
                        f.wireframeLinejoin
                      )
                    : l(Ee));
    }
    function a(e, t, i, n, o, r) {
      ee.beginPath(),
        ee.moveTo(e, t),
        ee.lineTo(i, n),
        ee.lineTo(o, r),
        ee.closePath();
    }
    function s(e, t, i, n) {
      d(t), x(i), y(n), R(e.getStyle()), ee.stroke(), Re.expandByScalar(2 * t);
    }
    function l(e) {
      u(e.getStyle()), ee.fill();
    }
    function c(e) {
      p(e.target);
    }
    function p(e) {
      if (!(e instanceof THREE.CompressedTexture)) {
        var t = e.wrapS === THREE.RepeatWrapping,
          i = e.wrapT === THREE.RepeatWrapping,
          n = e.image,
          o = document.createElement("canvas");
        (o.width = n.width), (o.height = n.height);
        var r = o.getContext("2d");
        r.setTransform(1, 0, 0, -1, 0, n.height),
          r.drawImage(n, 0, 0),
          (de[e.id] = ee.createPattern(
            o,
            !0 === t && !0 === i
              ? "repeat"
              : !0 === t && !1 === i
                ? "repeat-x"
                : !1 === t && !0 === i
                  ? "repeat-y"
                  : "no-repeat"
          ));
      }
    }
    function E(e, t, i, n, o, r, a, s, l, E, f, h, m) {
      if (!(m instanceof THREE.DataTexture)) {
        !1 === m.hasEventListener("update", c) &&
          (void 0 !== m.image && m.image.width > 0 && p(m),
          m.addEventListener("update", c));
        var d = de[m.id];
        if (void 0 === d) return u("rgba(0,0,0,1)"), void ee.fill();
        u(d);
        var x,
          y,
          R,
          v,
          S,
          T,
          g,
          w,
          H = m.offset.x / m.repeat.x,
          C = m.offset.y / m.repeat.y,
          M = m.image.width * m.repeat.x,
          L = m.image.height * m.repeat.y;
        (l = (l + H) * M),
          (E = (E + C) * L),
          (f = (f + H) * M),
          (h = (h + C) * L),
          (i -= e),
          (n -= t),
          (o -= e),
          (r -= t),
          0 !==
            (g =
              (l -= a = (a + H) * M) * (h -= s = (s + C) * L) -
              (f -= a) * (E -= s)) &&
            ((S =
              e -
              (x = (h * i - E * o) * (w = 1 / g)) * a -
              (R = (l * o - f * i) * w) * s),
            (T =
              t -
              (y = (h * n - E * r) * w) * a -
              (v = (l * r - f * n) * w) * s),
            ee.save(),
            ee.transform(x, y, R, v, S, T),
            ee.fill(),
            ee.restore());
      }
    }
    function f(e, t, i) {
      var n,
        o = t.x - e.x,
        r = t.y - e.y,
        a = o * o + r * r;
      0 !== a &&
        ((o *= n = i / Math.sqrt(a)),
        (r *= n),
        (t.x += o),
        (t.y += r),
        (e.x -= o),
        (e.y -= r));
    }
    function h(e) {
      ne !== e && ((ee.globalAlpha = e), (ne = e));
    }
    function m(e) {
      oe !== e &&
        (e === THREE.NormalBlending
          ? (ee.globalCompositeOperation = "source-over")
          : e === THREE.AdditiveBlending
            ? (ee.globalCompositeOperation = "lighter")
            : e === THREE.SubtractiveBlending &&
              (ee.globalCompositeOperation = "darker"),
        (oe = e));
    }
    function d(e) {
      se !== e && ((ee.lineWidth = e), (se = e));
    }
    function x(e) {
      le !== e && ((ee.lineCap = e), (le = e));
    }
    function y(e) {
      ce !== e && ((ee.lineJoin = e), (ce = e));
    }
    function R(e) {
      re !== e && ((ee.strokeStyle = e), (re = e));
    }
    function u(e) {
      ae !== e && ((ee.fillStyle = e), (ae = e));
    }
    function v(e) {
      pe.length !== e.length && (ee.setLineDash(e), (pe = e));
    }
    void 0;
    var S = THREE.Math.smoothstep;
    e = e || {};
    var T,
      g,
      w,
      H,
      C,
      M,
      L,
      b,
      B,
      P,
      z,
      V,
      j,
      D,
      W,
      F,
      N,
      k,
      O,
      G,
      I = this,
      A = new THREE.Projector(),
      q = void 0 !== e.canvas ? e.canvas : document.createElement("canvas"),
      U = q.width,
      J = q.height,
      K = Math.floor(U / 2),
      Q = Math.floor(J / 2),
      X = 0,
      Y = 0,
      Z = U,
      $ = J,
      _ = 1,
      ee = q.getContext("2d", { alpha: !0 === e.alpha }),
      te = new THREE.Color(0),
      ie = !0 === e.alpha ? 0 : 1,
      ne = 1,
      oe = 0,
      re = null,
      ae = null,
      se = null,
      le = null,
      ce = null,
      pe = [],
      Ee = (new THREE.RenderableVertex(),
      new THREE.RenderableVertex(),
      new THREE.Color()),
      fe = (new THREE.Color(),
      new THREE.Color(),
      new THREE.Color(),
      new THREE.Color(),
      new THREE.Color()),
      he = new THREE.Color(),
      me = new THREE.Color(),
      de = {},
      xe = new THREE.Box2(),
      ye = new THREE.Box2(),
      Re = new THREE.Box2(),
      ue = new THREE.Color(),
      ve = new THREE.Color(),
      Se = new THREE.Color(),
      Te = new THREE.Vector3(),
      ge = new THREE.Vector3(),
      we = new THREE.Vector3(),
      He = new THREE.Matrix3();
    void 0 === ee.setLineDash && (ee.setLineDash = function() {}),
      (this.domElement = q),
      (this.autoClear = !0),
      (this.sortObjects = !0),
      (this.sortElements = !0),
      (this.info = { render: { vertices: 0, faces: 0 } }),
      (this.supportsVertexTextures = function() {}),
      (this.setFaceCulling = function() {}),
      (this.getPixelRatio = function() {
        return _;
      }),
      (this.setPixelRatio = function(e) {
        _ = e;
      }),
      (this.setSize = function(e, t, i) {
        (U = e * _),
          (J = t * _),
          (q.width = U),
          (q.height = J),
          (K = Math.floor(U / 2)),
          (Q = Math.floor(J / 2)),
          !1 !== i && ((q.style.width = e + "px"), (q.style.height = t + "px")),
          xe.min.set(-K, -Q),
          xe.max.set(K, Q),
          ye.min.set(-K, -Q),
          ye.max.set(K, Q),
          (ne = 1),
          (oe = 0),
          (re = null),
          (ae = null),
          (se = null),
          (le = null),
          (ce = null),
          this.setViewport(0, 0, e, t);
      }),
      (this.setViewport = function(e, t, i, n) {
        (X = e * _), (Y = t * _), (Z = i * _), ($ = n * _);
      }),
      (this.setScissor = function() {}),
      (this.enableScissorTest = function() {}),
      (this.setClearColor = function(e, t) {
        te.set(e),
          (ie = void 0 !== t ? t : 1),
          ye.min.set(-K, -Q),
          ye.max.set(K, Q);
      }),
      (this.setClearColorHex = function(e, t) {
        void 0, this.setClearColor(e, t);
      }),
      (this.getClearColor = function() {
        return te;
      }),
      (this.getClearAlpha = function() {
        return ie;
      }),
      (this.getMaxAnisotropy = function() {
        return 0;
      }),
      (this.clear = function() {
        !1 === ye.empty() &&
          (ye.intersect(xe),
          ye.expandByScalar(2),
          (ye.min.x = ye.min.x + K),
          (ye.min.y = -ye.min.y + Q),
          (ye.max.x = ye.max.x + K),
          (ye.max.y = -ye.max.y + Q),
          ie < 1 &&
            ee.clearRect(
              0 | ye.min.x,
              0 | ye.max.y,
              (ye.max.x - ye.min.x) | 0,
              (ye.min.y - ye.max.y) | 0
            ),
          ie > 0 &&
            (m(THREE.NormalBlending),
            h(1),
            u(
              "rgba(" +
                Math.floor(255 * te.r) +
                "," +
                Math.floor(255 * te.g) +
                "," +
                Math.floor(255 * te.b) +
                "," +
                ie +
                ")"
            ),
            ee.fillRect(
              0 | ye.min.x,
              0 | ye.max.y,
              (ye.max.x - ye.min.x) | 0,
              (ye.min.y - ye.max.y) | 0
            )),
          ye.makeEmpty());
      }),
      (this.clearColor = function() {}),
      (this.clearDepth = function() {}),
      (this.clearStencil = function() {}),
      (this.render = function(e, i) {
        if (i instanceof THREE.Camera != !1) {
          !0 === this.autoClear && this.clear(),
            (I.info.render.vertices = 0),
            (I.info.render.faces = 0),
            ee.setTransform(Z / U, 0, 0, -$ / J, X, J - Y),
            ee.translate(K, Q),
            (T = A.projectScene(e, i, this.sortObjects, this.sortElements)),
            (g = T.elements),
            (w = T.lights),
            (H = i),
            He.getNormalMatrix(i.matrixWorldInverse),
            t();
          for (var a = 0, s = g.length; a < s; a++) {
            var l = g[a],
              c = l.material;
            if (void 0 !== c && 0 !== c.opacity) {
              if ((Re.makeEmpty(), l instanceof THREE.RenderableSprite))
                ((C = l).x *= K), (C.y *= Q), n(C, l, c);
              else if (l instanceof THREE.RenderableLine)
                (C = l.v1),
                  (M = l.v2),
                  (C.positionScreen.x *= K),
                  (C.positionScreen.y *= Q),
                  (M.positionScreen.x *= K),
                  (M.positionScreen.y *= Q),
                  Re.setFromPoints([C.positionScreen, M.positionScreen]),
                  !0 === xe.isIntersectionBox(Re) && o(C, M, l, c);
              else if (l instanceof THREE.RenderableFace) {
                if (
                  ((C = l.v1),
                  (M = l.v2),
                  (L = l.v3),
                  C.positionScreen.z < -1 || C.positionScreen.z > 1)
                )
                  continue;
                if (M.positionScreen.z < -1 || M.positionScreen.z > 1) continue;
                if (L.positionScreen.z < -1 || L.positionScreen.z > 1) continue;
                (C.positionScreen.x *= K),
                  (C.positionScreen.y *= Q),
                  (M.positionScreen.x *= K),
                  (M.positionScreen.y *= Q),
                  (L.positionScreen.x *= K),
                  (L.positionScreen.y *= Q),
                  c.overdraw > 0 &&
                    (f(C.positionScreen, M.positionScreen, c.overdraw),
                    f(M.positionScreen, L.positionScreen, c.overdraw),
                    f(L.positionScreen, C.positionScreen, c.overdraw)),
                  Re.setFromPoints([
                    C.positionScreen,
                    M.positionScreen,
                    L.positionScreen
                  ]),
                  !0 === xe.isIntersectionBox(Re) && r(C, M, L, 0, 1, 2, l, c);
              }
              ye.union(Re);
            }
          }
          ee.setTransform(1, 0, 0, 1, 0, 0);
        } else void 0;
      });
  });
