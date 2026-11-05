/* Rive Bowl · fond « soie » animé (WebGL), porté du composant 21st « Silky Moving Background » (Shader Builder « Silk »)
   sans React : même GLSL, un canvas par zone. Studio FTT, 05/11/2026.
   Zones : tout élément qui porte l'attribut data-soie (bandeau de l'application sur les 6 pages, en-tête de la page franchise).
   Repli : si « réduire les animations » est activé ou si WebGL manque, aucun canvas n'est créé et le dégradé CSS fixe
   (--soie-repli dans rive.css, mêmes couleurs) reste affiché. Le voile qui garde le texte lisible est --soie-voile (rive.css). */
(function () {
  'use strict';

  /* ================= RÉGLAGES (à modifier ici) ================= */
  var COULEURS = [            // jusqu'à 8 couleurs. Les couleurs des deux bouts de la liste couvrent le plus de surface
    '#03432F',                // vert sapin (dominant : il est aux deux bouts)
    '#03A9B5',                // turquoise
    '#759A55',                // vert feuille
    '#FEB302',                // touche de jaune (au milieu = fine bande seulement)
    '#759A55',                // vert feuille
    '#03432F'                 // vert sapin
  ];
  var VITESSE = 0.6;          // 0 = immobile · 0,86 dans le composant d'origine
  var INTENSITE = 0.47;       // amplitude des vagues (0 à 1) · 0,47 d'origine
  var ECHELLE = 1.3;          // taille des plis (plus grand = plis plus serrés)
  var GRAIN = 0.035;          // grain de la soie (0 = lisse)
  var EFFET_SOURIS = true;    // la soie tourne doucement sous la souris (jamais au toucher)
  /* Limites de calcul : écran tactile (téléphone, tablette) / ordinateur */
  var TEL = { pixels: 1000000, densite: 1.5 };
  var ORDI = { pixels: 2000000, densite: 2 };
  /* ============================================================= */

  /* Shaders d'origine du composant 21st, inchangés */
  var VERT = `attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

  var FRAG = `#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec3 u_colors[8];
uniform vec4 u_scene;      // resolution.xy, time, colour count
uniform vec4 u_shape;      // scale, intensity, paramA, warp
uniform vec4 u_surface;    // detail, contrast, brightness, saturation
uniform vec4 u_finish;     // hue, vignette, blur, grain
uniform vec4 u_transform;  // seed, rotation, drift, OKLab toggle
uniform vec4 u_space;      // offset.xy, pointer.xy
uniform vec4 u_cursor;

#define u_resolution u_scene.xy
#define u_time u_scene.z
#define u_colorCount u_scene.w
#define u_scale u_shape.x
#define u_intensity u_shape.y
#define u_paramA u_shape.z
#define u_warp u_shape.w
#define u_detail u_surface.x
#define u_contrast u_surface.y
#define u_brightness u_surface.z
#define u_saturation u_surface.w
#define u_hue u_finish.x
#define u_vignette u_finish.y
#define u_blur u_finish.z
#define u_grain u_finish.w
#ifdef GL_FRAGMENT_PRECISION_HIGH
#define u_seed u_transform.x
#else
#define u_seed mod(u_transform.x, 31.0)
#endif
#define u_rotate u_transform.y
#define u_drift u_transform.z
#define u_oklab u_transform.w
#define u_offset u_space.xy
#define u_mouse u_space.zw
#define u_cursorPresence u_cursor.x
#define u_cursorEffect u_cursor.y
#define u_cursorStrength u_cursor.z
#define u_cursorRadius u_cursor.w

float hash21(vec2 p) {
#ifndef GL_FRAGMENT_PRECISION_HIGH
  p = mod(p, 31.0);
#endif
  p = fract(p * vec2(234.34, 435.345));
  p += dot(p, p + 34.23);
  return fract(p.x * p.y);
}

float grainHash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

vec2 hash22(vec2 p) {
#ifndef GL_FRAGMENT_PRECISION_HIGH
  p = mod(p, 31.0);
#endif
  float n = sin(dot(p, vec2(41.0, 289.0)));
  return fract(vec2(15731.743, 7892.321) * n);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash21(i), hash21(i + vec2(1.0, 0.0)), u.x),
    mix(hash21(i + vec2(0.0, 1.0)), hash21(i + vec2(1.0, 1.0)), u.x),
    u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec2(17.0, 9.2);
    a *= 0.5;
  }
  return v;
}

vec3 srgbToLinear(vec3 c) {
  return mix(c / 12.92, pow((c + 0.055) / 1.055, vec3(2.4)),
    step(0.04045, c));
}
vec3 linearToSrgb(vec3 c) {
  return mix(c * 12.92, 1.055 * pow(max(c, vec3(0.0)), vec3(1.0 / 2.4)) - 0.055,
    step(0.0031308, c));
}
vec3 linToOklab(vec3 c) {
  float l = 0.4122214708 * c.r + 0.5363325363 * c.g + 0.0514459929 * c.b;
  float m = 0.2119034982 * c.r + 0.6806995451 * c.g + 0.1073969566 * c.b;
  float s = 0.0883024619 * c.r + 0.2817188376 * c.g + 0.6299787005 * c.b;
  l = pow(max(l, 0.0), 1.0 / 3.0);
  m = pow(max(m, 0.0), 1.0 / 3.0);
  s = pow(max(s, 0.0), 1.0 / 3.0);
  return vec3(
    0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s);
}
vec3 oklabToLin(vec3 c) {
  float l = c.x + 0.3963377774 * c.y + 0.2158037573 * c.z;
  float m = c.x - 0.1055613458 * c.y - 0.0638541728 * c.z;
  float s = c.x - 0.0894841775 * c.y - 1.2914855480 * c.z;
  l = l * l * l; m = m * m * m; s = s * s * s;
  return vec3(
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s);
}
vec3 mixColour(vec3 a, vec3 b, float t) {
  if (u_oklab > 0.5) {
    vec3 la = linToOklab(srgbToLinear(a));
    vec3 lb = linToOklab(srgbToLinear(b));
    return clamp(linearToSrgb(oklabToLin(mix(la, lb, t))), 0.0, 1.0);
  }
  return mix(a, b, t);
}

vec3 palette(float x) {
  float n = max(u_colorCount - 1.0, 1.0);
  float f = clamp(x, 0.0, 1.0) * n;
  vec3 col = u_colors[0];
  for (int i = 0; i < 7; i++) {
    if (float(i) < n)
      col = mixColour(col, u_colors[i + 1],
        smoothstep(0.0, 1.0, clamp(f - float(i), 0.0, 1.0)));
  }
  return col;
}

vec3 hueRotate(vec3 col, float a) {
  const mat3 toYIQ = mat3(0.299, 0.596, 0.211,
                          0.587, -0.274, -0.523,
                          0.114, -0.322, 0.312);
  const mat3 toRGB = mat3(1.0, 1.0, 1.0,
                          0.956, -0.272, -1.106,
                          0.621, -0.647, 1.703);
  vec3 yiq = toYIQ * col;
  float ca = cos(a), sa = sin(a);
  yiq = vec3(yiq.x, yiq.y * ca - yiq.z * sa, yiq.y * sa + yiq.z * ca);
  return toRGB * yiq;
}

vec3 shade(vec2 uv, vec2 p, float t) {
  vec2 q = p * 1.6;
  float amp = 0.25 + u_intensity * 0.85;
  for (float i = 1.0; i < 5.0; i += 1.0) {
    q.x += amp / i * cos(i * 2.4 * q.y + t * 0.8 + u_seed);
    q.y += amp / i * cos(i * 1.7 * q.x + t * 0.6);
  }
  return palette(0.5 + 0.5 * sin(q.x + q.y));
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 screenUv = uv;
  vec2 p = (gl_FragCoord.xy - 0.5 * u_resolution.xy)
    / min(u_resolution.x, u_resolution.y);
  float cursorMask = 0.0;

  if (u_cursorPresence > 0.001) {
    vec2 cursor = (0.5 * u_mouse * u_resolution.xy)
      / min(u_resolution.x, u_resolution.y);
    vec2 cursorDelta = p - cursor;
    if (u_cursorEffect < 0.5) {
      p += cursor * u_cursorPresence * u_cursorStrength * 0.55;
    } else {
      float cursorDistance = length(cursorDelta);
      vec2 cursorDirection = cursorDelta / max(cursorDistance, 0.0001);
      cursorMask = u_cursorPresence
        * (1.0 - smoothstep(0.0, u_cursorRadius, cursorDistance));
      if (u_cursorEffect < 1.5) {
        p -= cursorDirection * cursorMask * u_cursorStrength * 0.24;
      } else if (u_cursorEffect < 2.5) {
        float cursorAngle = cursorMask * u_cursorStrength * 2.2;
        float cc = cos(cursorAngle), cs = sin(cursorAngle);
        p = cursor + mat2(cc, -cs, cs, cc) * cursorDelta;
      } else if (u_cursorEffect < 3.5) {
        float ripple = sin(
          cursorDistance / max(u_cursorRadius, 0.001) * 18.0 - u_time * 5.0);
        p -= cursorDirection * ripple * cursorMask * u_cursorStrength * 0.07;
      }
    }
  }

  uv = p * min(u_resolution.x, u_resolution.y) / u_resolution.xy + 0.5;
  p *= u_scale;
  if (abs(u_rotate) > 0.0001) {
    float cr = cos(u_rotate), sr = sin(u_rotate);
    p = mat2(cr, -sr, sr, cr) * p;
  }
  p += u_offset;
  if (u_drift > 0.0001)
    p += u_drift * vec2(sin(u_time * 0.31), cos(u_time * 0.23));
  if (u_warp > 0.0) {
    p += u_warp * (vec2(
      fbm(p * u_detail + u_seed),
      fbm(p * u_detail + vec2(5.2, 1.3))) - 0.5);
  }
  vec3 col;
  if (u_blur > 0.0) {
    float e = u_blur;
    float pe = e * u_scale;
    vec2 uvE = vec2(e) * min(u_resolution.x, u_resolution.y) / u_resolution.xy;
    col  = shade(uv, p, u_time) * 0.36;
    col += shade(uv + vec2(uvE.x, 0.0), p + vec2(pe, 0.0), u_time) * 0.16;
    col += shade(uv - vec2(uvE.x, 0.0), p - vec2(pe, 0.0), u_time) * 0.16;
    col += shade(uv + vec2(0.0, uvE.y), p + vec2(0.0, pe), u_time) * 0.16;
    col += shade(uv - vec2(0.0, uvE.y), p - vec2(0.0, pe), u_time) * 0.16;
  } else {
    col = shade(uv, p, u_time);
  }
  if (abs(u_contrast - 1.0) > 0.0001)
    col = (col - 0.5) * u_contrast + 0.5;
  if (abs(u_saturation - 1.0) > 0.0001) {
    float luma = dot(col, vec3(0.299, 0.587, 0.114));
    col = mix(vec3(luma), col, u_saturation);
  }
  if (abs(u_hue) > 0.0001)
    col = hueRotate(col, u_hue);
  if (abs(u_brightness) > 0.0001)
    col += u_brightness;
  if (u_vignette > 0.0001) {
    float vd = length(screenUv - 0.5) * 1.41421356;
    col *= 1.0 - u_vignette * smoothstep(0.35, 1.0, vd);
  }
  if (u_cursorPresence > 0.001 && u_cursorEffect > 3.5)
    col += (vec3(0.18) + col * 0.12) * cursorMask * u_cursorStrength;
  if (u_grain > 0.0001)
    col += (grainHash(
      gl_FragCoord.xy + vec2(u_seed * 17.0, u_seed * 31.0)) - 0.5) * u_grain;
  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;

  var zones = document.querySelectorAll('[data-soie]');
  if (!zones.length) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  function rvb(h) { h = h.replace('#', ''); return [parseInt(h.slice(0, 2), 16) / 255, parseInt(h.slice(2, 4), 16) / 255, parseInt(h.slice(4, 6), 16) / 255]; }
  var cols = COULEURS.slice(0, 8).map(rvb);
  var nb = cols.length;
  while (cols.length < 8) cols.push(cols[cols.length - 1]);
  var plat = new Float32Array(24);
  cols.forEach(function (c, i) { plat[i * 3] = c[0]; plat[i * 3 + 1] = c[1]; plat[i * 3 + 2] = c[2]; });

  var tactile = !(window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches);
  var LIM = tactile ? TEL : ORDI;
  var souris = EFFET_SOURIS && !tactile;

  zones.forEach(function (zone) {
    var canvas = document.createElement('canvas');
    canvas.className = 'soie';
    canvas.setAttribute('aria-hidden', 'true');
    var gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' });
    if (!gl) return;                                   // pas de WebGL : le dégradé CSS reste

    function compile(type, s) { var sh = gl.createShader(type); gl.shaderSource(sh, s); gl.compileShader(sh); return gl.getShaderParameter(sh, gl.COMPILE_STATUS) ? sh : null; }
    var vs = compile(gl.VERTEX_SHADER, VERT), fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    var prog = gl.createProgram();
    gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
    gl.deleteShader(vs); gl.deleteShader(fs);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    var buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    var loc = gl.getAttribLocation(prog, 'a_position');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    var u = {};
    ['colors', 'scene', 'shape', 'surface', 'finish', 'transform', 'space', 'cursor'].forEach(function (n) { u[n] = gl.getUniformLocation(prog, 'u_' + n); });
    // mêmes réglages que le composant d'origine, sauf couleurs, vitesse, intensité, échelle et grain
    gl.uniform3fv(u.colors, plat);
    gl.uniform4f(u.shape, ECHELLE, INTENSITE, 0.5, 0.0);
    gl.uniform4f(u.surface, 2.4, 1.05, 0.01, 1.02);
    gl.uniform4f(u.finish, 0.0, 0.02, 0.0, GRAIN);
    gl.uniform4f(u.transform, 1.0, 0.0, 0.004, 1.0);

    zone.insertBefore(canvas, zone.firstChild);
    zone.classList.add('soie-active');

    var tx = 0, ty = 0, tp = 0, mx = 0, my = 0, pres = 0;
    var raf = 0, visible = document.visibilityState === 'visible', vue = false, debut = performance.now(), dernier = null;

    function taille() {
      var r = canvas.getBoundingClientRect();
      var dpr = Math.min(window.devicePixelRatio || 1, LIM.densite);
      var w = Math.max(1, Math.round(r.width * dpr)), h = Math.max(1, Math.round(r.height * dpr));
      var k = Math.min(1, Math.sqrt(LIM.pixels / Math.max(1, w * h)));
      w = Math.max(1, Math.round(w * k)); h = Math.max(1, Math.round(h * k));
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; gl.viewport(0, 0, w, h); }
    }
    function demander() { if (visible && vue && !raf) raf = requestAnimationFrame(dessiner); }
    function arreter() { if (raf) { cancelAnimationFrame(raf); raf = 0; } dernier = null; }

    function dessiner(now) {
      raf = 0;
      if (!visible || !vue) return;
      var dt = dernier === null ? 0 : Math.min((now - dernier) / 1000, 0.1);
      dernier = now;
      var suivi = 1 - Math.exp(-12 * dt);
      mx += (tx - mx) * suivi; my += (ty - my) * suivi; pres += (tp - pres) * suivi;
      taille();
      gl.uniform4f(u.scene, canvas.width, canvas.height, ((now - debut) / 1000) * VITESSE, nb);
      gl.uniform4f(u.space, 0.02, 0.0, mx, my);
      gl.uniform4f(u.cursor, souris ? pres : 0, 2.0, 0.3, 0.657);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      zone.soieImages = (zone.soieImages || 0) + 1;   // compteur d'images (sert à vérifier la pause hors écran)
      if (VITESSE !== 0 || Math.abs(tp - pres) > 0.001) demander();
    }

    if (souris) {
      zone.addEventListener('pointermove', function (e) {
        if (e.pointerType !== 'mouse') return;
        var r = canvas.getBoundingClientRect();
        tx = ((e.clientX - r.left) / r.width) * 2 - 1;
        ty = -(((e.clientY - r.top) / r.height) * 2 - 1);
        if (tp === 0 && pres < 0.01) { mx = tx; my = ty; }
        tp = 1; demander();
      }, { passive: true });
      zone.addEventListener('pointerleave', function () { tp = 0; demander(); });
    }
    new ResizeObserver(function () { taille(); demander(); }).observe(canvas);
    new IntersectionObserver(function (e) { vue = e[0].isIntersecting; if (vue) demander(); else arreter(); }).observe(zone);
    document.addEventListener('visibilitychange', function () { visible = document.visibilityState === 'visible'; if (visible) demander(); else arreter(); });
    canvas.addEventListener('webglcontextlost', function (e) { e.preventDefault(); arreter(); canvas.remove(); zone.classList.remove('soie-active'); });
  });
})();
