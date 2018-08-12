(THREE.RenderableObject = function() {
  (this.id = 0), (this.object = null), (this.z = 0);
}),
  (THREE.RenderableFace = function() {
    (this.id = 0),
      (this.v1 = new THREE.RenderableVertex()),
      (this.v2 = new THREE.RenderableVertex()),
      (this.v3 = new THREE.RenderableVertex()),
      (this.normalModel = new THREE.Vector3()),
      (this.vertexNormalsModel = [
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3()
      ]),
      (this.vertexNormalsLength = 0),
      (this.color = new THREE.Color()),
      (this.material = null),
      (this.uvs = [
        new THREE.Vector2(),
        new THREE.Vector2(),
        new THREE.Vector2()
      ]),
      (this.z = 0);
  }),
  (THREE.RenderableVertex = function() {
    (this.position = new THREE.Vector3()),
      (this.positionWorld = new THREE.Vector3()),
      (this.positionScreen = new THREE.Vector4()),
      (this.visible = !0);
  }),
  (THREE.RenderableVertex.prototype.copy = function(e) {
    this.positionWorld.copy(e.positionWorld),
      this.positionScreen.copy(e.positionScreen);
  }),
  (THREE.RenderableLine = function() {
    (this.id = 0),
      (this.v1 = new THREE.RenderableVertex()),
      (this.v2 = new THREE.RenderableVertex()),
      (this.vertexColors = [new THREE.Color(), new THREE.Color()]),
      (this.material = null),
      (this.z = 0);
  }),
  (THREE.RenderableSprite = function() {
    (this.id = 0),
      (this.object = null),
      (this.x = 0),
      (this.y = 0),
      (this.z = 0),
      (this.rotation = 0),
      (this.scale = new THREE.Vector2()),
      (this.material = null);
  }),
  (THREE.Projector = function() {
    function e() {
      if (c === x) {
        var e = new THREE.RenderableObject();
        return d.push(e), x++, c++, e;
      }
      return d[c++];
    }
    function t() {
      if (p === y) {
        var e = new THREE.RenderableVertex();
        return T.push(e), y++, p++, e;
      }
      return T[p++];
    }
    function r() {
      if (u === w) {
        var e = new THREE.RenderableFace();
        return H.push(e), w++, u++, e;
      }
      return H[u++];
    }
    function i() {
      if (f === b) {
        var e = new THREE.RenderableLine();
        return g.push(e), b++, f++, e;
      }
      return g[f++];
    }
    function o() {
      if (m === S) {
        var e = new THREE.RenderableSprite();
        return M.push(e), S++, m++, e;
      }
      return M[m++];
    }
    function n(e, t) {
      return e.z !== t.z ? t.z - e.z : e.id !== t.id ? e.id - t.id : 0;
    }
    function a(e, t) {
      var r = 0,
        i = 1,
        o = e.z + e.w,
        n = t.z + t.w,
        a = -e.z + e.w,
        s = -t.z + t.w;
      return (
        (o >= 0 && n >= 0 && a >= 0 && s >= 0) ||
        (!((o < 0 && n < 0) || (a < 0 && s < 0)) &&
          (o < 0
            ? (r = Math.max(r, o / (o - n)))
            : n < 0 && (i = Math.min(i, o / (o - n))),
          a < 0
            ? (r = Math.max(r, a / (a - s)))
            : s < 0 && (i = Math.min(i, a / (a - s))),
          !(i < r) && (e.lerp(t, r), t.lerp(e, 1 - i), !0)))
      );
    }
    var s,
      c,
      l,
      p,
      E,
      u,
      h,
      f,
      v,
      m,
      R,
      d = [],
      x = 0,
      T = [],
      y = 0,
      H = [],
      w = 0,
      g = [],
      b = 0,
      M = [],
      S = 0,
      z = { objects: [], lights: [], elements: [] },
      V = new THREE.Vector3(),
      j = new THREE.Vector4(),
      L = new THREE.Box3(
        new THREE.Vector3(-1, -1, -1),
        new THREE.Vector3(1, 1, 1)
      ),
      C = new THREE.Box3(),
      k = new Array(3),
      N = (new Array(4), new THREE.Matrix4()),
      W = new THREE.Matrix4(),
      B = new THREE.Matrix4(),
      F = new THREE.Matrix3(),
      P = new THREE.Frustum(),
      I = new THREE.Vector4(),
      O = new THREE.Vector4();
    (this.projectVector = function(e, t) {
      void 0, e.project(t);
    }),
      (this.unprojectVector = function(e, t) {
        void 0, e.unproject(t);
      }),
      (this.pickingRay = function(e, t) {
        void 0;
      });
    var D = new function() {
      var e = [],
        o = [],
        n = null,
        a = null,
        s = new THREE.Matrix3(),
        c = function(e) {
          var t = e.position,
            r = e.positionWorld,
            i = e.positionScreen;
          r.copy(t).applyMatrix4(R), i.copy(r).applyMatrix4(W);
          var o = 1 / i.w;
          (i.x *= o),
            (i.y *= o),
            (i.z *= o),
            (e.visible =
              i.x >= -1 &&
              i.x <= 1 &&
              i.y >= -1 &&
              i.y <= 1 &&
              i.z >= -1 &&
              i.z <= 1);
        },
        p = function(e, t, r) {
          return (
            !0 === e.visible ||
            !0 === t.visible ||
            !0 === r.visible ||
            ((k[0] = e.positionScreen),
            (k[1] = t.positionScreen),
            (k[2] = r.positionScreen),
            L.isIntersectionBox(C.setFromPoints(k)))
          );
        },
        u = function(e, t, r) {
          return (
            (r.positionScreen.x - e.positionScreen.x) *
              (t.positionScreen.y - e.positionScreen.y) -
              (r.positionScreen.y - e.positionScreen.y) *
                (t.positionScreen.x - e.positionScreen.x) <
            0
          );
        };
      return {
        setObject: function(t) {
          (a = (n = t).material),
            s.getNormalMatrix(n.matrixWorld),
            (e.length = 0),
            (o.length = 0);
        },
        projectVertex: c,
        checkTriangleVisibility: p,
        checkBackfaceCulling: u,
        pushVertex: function(e, r, i) {
          (l = t()).position.set(e, r, i), c(l);
        },
        pushNormal: function(t, r, i) {
          e.push(t, r, i);
        },
        pushUv: function(e, t) {
          o.push(e, t);
        },
        pushLine: function(e, t) {
          var r = T[e],
            o = T[t];
          ((h = i()).id = n.id),
            h.v1.copy(r),
            h.v2.copy(o),
            (h.z = (r.positionScreen.z + o.positionScreen.z) / 2),
            (h.material = n.material),
            z.elements.push(h);
        },
        pushTriangle: function(t, i, c) {
          var l = T[t],
            h = T[i],
            f = T[c];
          if (
            !1 !== p(l, h, f) &&
            (a.side === THREE.DoubleSide || !0 === u(l, h, f))
          ) {
            ((E = r()).id = n.id),
              E.v1.copy(l),
              E.v2.copy(h),
              E.v3.copy(f),
              (E.z =
                (l.positionScreen.z + h.positionScreen.z + f.positionScreen.z) /
                3);
            for (var v = 0; v < 3; v++) {
              var m = 3 * arguments[v],
                R = E.vertexNormalsModel[v];
              R.set(e[m], e[m + 1], e[m + 2]), R.applyMatrix3(s).normalize();
              var d = 2 * arguments[v];
              E.uvs[v].set(o[d], o[d + 1]);
            }
            (E.vertexNormalsLength = 3),
              (E.material = n.material),
              z.elements.push(E);
          }
        }
      };
    }();
    this.projectScene = function(l, d, x, y) {
      (u = 0),
        (f = 0),
        (m = 0),
        (z.elements.length = 0),
        !0 === l.autoUpdate && l.updateMatrixWorld(),
        void 0 === d.parent && d.updateMatrixWorld(),
        N.copy(d.matrixWorldInverse.getInverse(d.matrixWorld)),
        W.multiplyMatrices(d.projectionMatrix, N),
        P.setFromMatrix(W),
        (c = 0),
        (z.objects.length = 0),
        (z.lights.length = 0),
        l.traverseVisible(function(t) {
          if (t instanceof THREE.Light) z.lights.push(t);
          else if (
            t instanceof THREE.Mesh ||
            t instanceof THREE.Line ||
            t instanceof THREE.Sprite
          ) {
            if (!1 === t.material.visible) return;
            (!1 !== t.frustumCulled && !0 !== P.intersectsObject(t)) ||
              (((s = e()).id = t.id),
              (s.object = t),
              V.setFromMatrixPosition(t.matrixWorld),
              V.applyProjection(W),
              (s.z = V.z),
              z.objects.push(s));
          }
        }),
        !0 === x && z.objects.sort(n);
      for (var H = 0, w = z.objects.length; H < w; H++) {
        var g = z.objects[H].object,
          b = g.geometry;
        if (
          (D.setObject(g),
          (R = g.matrixWorld),
          (p = 0),
          g instanceof THREE.Mesh)
        ) {
          if (b instanceof THREE.BufferGeometry) {
            var M = b.attributes,
              S = b.offsets;
            if (void 0 === M.position) continue;
            for (var L = 0, C = (ye = M.position.array).length; L < C; L += 3)
              D.pushVertex(ye[L], ye[L + 1], ye[L + 2]);
            if (void 0 !== M.normal)
              for (var k = M.normal.array, L = 0, C = k.length; L < C; L += 3)
                D.pushNormal(k[L], k[L + 1], k[L + 2]);
            if (void 0 !== M.uv)
              for (var G = M.uv.array, L = 0, C = G.length; L < C; L += 2)
                D.pushUv(G[L], G[L + 1]);
            if (void 0 !== M.index) {
              var U = M.index.array;
              if (S.length > 0)
                for (H = 0; H < S.length; H++)
                  for (
                    var A = S[H],
                      q = A.index,
                      L = A.start,
                      C = A.start + A.count;
                    L < C;
                    L += 3
                  )
                    D.pushTriangle(U[L] + q, U[L + 1] + q, U[L + 2] + q);
              else
                for (var L = 0, C = U.length; L < C; L += 3)
                  D.pushTriangle(U[L], U[L + 1], U[L + 2]);
            } else
              for (var L = 0, C = ye.length / 3; L < C; L += 3)
                D.pushTriangle(L, L + 1, L + 2);
          } else if (b instanceof THREE.Geometry) {
            var J = b.vertices,
              K = b.faces,
              Q = b.faceVertexUvs[0];
            F.getNormalMatrix(R);
            for (
              var X = g.material,
                Y = X instanceof THREE.MeshFaceMaterial,
                Z = !0 === Y ? g.material : null,
                $ = 0,
                _ = J.length;
              $ < _;
              $++
            ) {
              var ee = J[$];
              if ((V.copy(ee), !0 === X.morphTargets))
                for (
                  var te = b.morphTargets,
                    re = g.morphTargetInfluences,
                    ie = 0,
                    oe = te.length;
                  ie < oe;
                  ie++
                ) {
                  var ne = re[ie];
                  if (0 !== ne) {
                    var ae = te[ie].vertices[$];
                    (V.x += (ae.x - ee.x) * ne),
                      (V.y += (ae.y - ee.y) * ne),
                      (V.z += (ae.z - ee.z) * ne);
                  }
                }
              D.pushVertex(V.x, V.y, V.z);
            }
            for (var se = 0, ce = K.length; se < ce; se++) {
              var le = K[se];
              if (
                void 0 !==
                (X = !0 === Y ? Z.materials[le.materialIndex] : g.material)
              ) {
                var pe = X.side,
                  Ee = T[le.a],
                  ue = T[le.b],
                  he = T[le.c];
                if (!1 !== D.checkTriangleVisibility(Ee, ue, he)) {
                  var fe = D.checkBackfaceCulling(Ee, ue, he);
                  if (pe !== THREE.DoubleSide) {
                    if (pe === THREE.FrontSide && !1 === fe) continue;
                    if (pe === THREE.BackSide && !0 === fe) continue;
                  }
                  ((E = r()).id = g.id),
                    E.v1.copy(Ee),
                    E.v2.copy(ue),
                    E.v3.copy(he),
                    E.normalModel.copy(le.normal),
                    !1 !== fe ||
                      (pe !== THREE.BackSide && pe !== THREE.DoubleSide) ||
                      E.normalModel.negate(),
                    E.normalModel.applyMatrix3(F).normalize();
                  for (
                    var ve = le.vertexNormals,
                      me = 0,
                      Re = Math.min(ve.length, 3);
                    me < Re;
                    me++
                  ) {
                    var de = E.vertexNormalsModel[me];
                    de.copy(ve[me]),
                      !1 !== fe ||
                        (pe !== THREE.BackSide && pe !== THREE.DoubleSide) ||
                        de.negate(),
                      de.applyMatrix3(F).normalize();
                  }
                  E.vertexNormalsLength = ve.length;
                  var xe = Q[se];
                  if (void 0 !== xe)
                    for (var Te = 0; Te < 3; Te++) E.uvs[Te].copy(xe[Te]);
                  (E.color = le.color),
                    (E.material = X),
                    (E.z =
                      (Ee.positionScreen.z +
                        ue.positionScreen.z +
                        he.positionScreen.z) /
                      3),
                    z.elements.push(E);
                }
              }
            }
          }
        } else if (g instanceof THREE.Line) {
          if (b instanceof THREE.BufferGeometry) {
            if (void 0 !== (M = b.attributes).position) {
              for (
                var ye = M.position.array, L = 0, C = ye.length;
                L < C;
                L += 3
              )
                D.pushVertex(ye[L], ye[L + 1], ye[L + 2]);
              if (void 0 !== M.index)
                for (var L = 0, C = (U = M.index.array).length; L < C; L += 2)
                  D.pushLine(U[L], U[L + 1]);
              else
                for (
                  var He = g.mode === THREE.LinePieces ? 2 : 1,
                    L = 0,
                    C = ye.length / 3 - 1;
                  L < C;
                  L += He
                )
                  D.pushLine(L, L + 1);
            }
          } else if (b instanceof THREE.Geometry) {
            if (
              (B.multiplyMatrices(W, R), 0 === (J = g.geometry.vertices).length)
            )
              continue;
            (Ee = t()).positionScreen.copy(J[0]).applyMatrix4(B);
            for (
              var He = g.mode === THREE.LinePieces ? 2 : 1, $ = 1, _ = J.length;
              $ < _;
              $++
            )
              (Ee = t()).positionScreen.copy(J[$]).applyMatrix4(B),
                ($ + 1) % He > 0 ||
                  ((ue = T[p - 2]),
                  I.copy(Ee.positionScreen),
                  O.copy(ue.positionScreen),
                  !0 === a(I, O) &&
                    (I.multiplyScalar(1 / I.w),
                    O.multiplyScalar(1 / O.w),
                    ((h = i()).id = g.id),
                    h.v1.positionScreen.copy(I),
                    h.v2.positionScreen.copy(O),
                    (h.z = Math.max(I.z, O.z)),
                    (h.material = g.material),
                    g.material.vertexColors === THREE.VertexColors &&
                      (h.vertexColors[0].copy(g.geometry.colors[$]),
                      h.vertexColors[1].copy(g.geometry.colors[$ - 1])),
                    z.elements.push(h)));
          }
        } else if (g instanceof THREE.Sprite) {
          j.set(R.elements[12], R.elements[13], R.elements[14], 1),
            j.applyMatrix4(W);
          var we = 1 / j.w;
          (j.z *= we),
            j.z >= -1 &&
              j.z <= 1 &&
              (((v = o()).id = g.id),
              (v.x = j.x * we),
              (v.y = j.y * we),
              (v.z = j.z),
              (v.object = g),
              (v.rotation = g.rotation),
              (v.scale.x =
                g.scale.x *
                Math.abs(
                  v.x -
                    (j.x + d.projectionMatrix.elements[0]) /
                      (j.w + d.projectionMatrix.elements[12])
                )),
              (v.scale.y =
                g.scale.y *
                Math.abs(
                  v.y -
                    (j.y + d.projectionMatrix.elements[5]) /
                      (j.w + d.projectionMatrix.elements[13])
                )),
              (v.material = g.material),
              z.elements.push(v));
        }
      }
      return !0 === y && z.elements.sort(n), z;
    };
  });
