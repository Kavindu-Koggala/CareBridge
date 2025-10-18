import {
  CommonModule,
  DecimalPipe,
  NgSwitch,
  NgSwitchCase
} from "./chunk-7AO4SOAP.js";
import {
  Component,
  ContentChild,
  Directive,
  ElementRef,
  Input,
  NgModule,
  Renderer2,
  ViewChild,
  ViewEncapsulation$1,
  setClassMetadata,
  ɵɵNgOnChangesFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassProp,
  ɵɵcontentQuery,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵviewQuery
} from "./chunk-5EGFENCT.js";
import "./chunk-LBBSG2YE.js";
import "./chunk-WSXI74FV.js";
import "./chunk-NGNUV6BG.js";

// node_modules/ngx-gauge/fesm2022/ngx-gauge.mjs
var _c0 = ["canvas"];
var _c1 = ["rLabel"];
var _c2 = ["reading"];
var _c3 = [[["ngx-gauge-prepend"]], [["ngx-gauge-value"]], [["ngx-gauge-append"]], [["ngx-gauge-label"]]];
var _c4 = ["ngx-gauge-prepend", "ngx-gauge-value", "ngx-gauge-append", "ngx-gauge-label"];
function NgxGauge_ng_content_3_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵprojection(0, 0, ["*ngSwitchCase", "true"]);
  }
}
function NgxGauge_ng_container_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtext(1);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r0.prepend);
  }
}
function NgxGauge_ng_content_6_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵprojection(0, 1, ["*ngSwitchCase", "true"]);
  }
}
function NgxGauge_ng_container_7_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtext(1);
    ɵɵpipe(2, "number");
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵtextInterpolate(ɵɵpipeBind1(2, 1, ctx_r0.value));
  }
}
function NgxGauge_ng_content_9_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵprojection(0, 2, ["*ngSwitchCase", "true"]);
  }
}
function NgxGauge_ng_container_10_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtext(1);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r0.append);
  }
}
function NgxGauge_ng_content_13_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵprojection(0, 3, ["*ngSwitchCase", "true"]);
  }
}
function NgxGauge_ng_container_14_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelementContainerStart(0);
    ɵɵtext(1);
    ɵɵelementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵadvance();
    ɵɵtextInterpolate(ctx_r0.label);
  }
}
function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
function coerceBooleanProperty(value) {
  return value != null && `${value}` !== "false";
}
function coerceNumberProperty(value, fallbackValue = 0) {
  return isNaN(parseFloat(value)) || isNaN(Number(value)) ? fallbackValue : Number(value);
}
function cssUnit(value) {
  return `${value}px`;
}
function isNumber(value) {
  return value != void 0 && !isNaN(parseFloat(value)) && !isNaN(Number(value));
}
var NgxGaugeAppend = class _NgxGaugeAppend {
  static {
    this.ɵfac = function NgxGaugeAppend_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NgxGaugeAppend)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _NgxGaugeAppend,
      selectors: [["ngx-gauge-append"]],
      exportAs: ["ngxGaugeAppend"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxGaugeAppend, [{
    type: Directive,
    args: [{
      selector: "ngx-gauge-append",
      exportAs: "ngxGaugeAppend"
    }]
  }], null, null);
})();
var NgxGaugePrepend = class _NgxGaugePrepend {
  static {
    this.ɵfac = function NgxGaugePrepend_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NgxGaugePrepend)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _NgxGaugePrepend,
      selectors: [["ngx-gauge-prepend"]],
      exportAs: ["ngxGaugePrepend"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxGaugePrepend, [{
    type: Directive,
    args: [{
      selector: "ngx-gauge-prepend",
      exportAs: "ngxGaugePrepend"
    }]
  }], null, null);
})();
var NgxGaugeValue = class _NgxGaugeValue {
  static {
    this.ɵfac = function NgxGaugeValue_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NgxGaugeValue)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _NgxGaugeValue,
      selectors: [["ngx-gauge-value"]],
      exportAs: ["ngxGaugeValue"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxGaugeValue, [{
    type: Directive,
    args: [{
      selector: "ngx-gauge-value",
      exportAs: "ngxGaugeValue"
    }]
  }], null, null);
})();
var NgxGaugeLabel = class _NgxGaugeLabel {
  static {
    this.ɵfac = function NgxGaugeLabel_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NgxGaugeLabel)();
    };
  }
  static {
    this.ɵdir = ɵɵdefineDirective({
      type: _NgxGaugeLabel,
      selectors: [["ngx-gauge-label"]],
      exportAs: ["ngxGaugeLabel"]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxGaugeLabel, [{
    type: Directive,
    args: [{
      selector: "ngx-gauge-label",
      exportAs: "ngxGaugeLabel"
    }]
  }], null, null);
})();
var DEFAULTS = {
  MIN: 0,
  MAX: 100,
  TYPE: "arch",
  THICK: 4,
  FOREGROUND_COLOR: "rgba(0, 150, 136, 1)",
  BACKGROUND_COLOR: "rgba(0, 0, 0, 0.1)",
  CAP: "butt",
  SIZE: 200
};
var NgxGauge = class _NgxGauge {
  get size() {
    return this._size;
  }
  set size(value) {
    this._size = coerceNumberProperty(value);
  }
  get margin() {
    return this._margin;
  }
  set margin(value) {
    this._margin = coerceNumberProperty(value);
  }
  get min() {
    return this._min;
  }
  set min(value) {
    this._min = coerceNumberProperty(value, DEFAULTS.MIN);
  }
  get animate() {
    return this._animate;
  }
  set animate(value) {
    this._animate = coerceBooleanProperty(value);
  }
  get max() {
    return this._max;
  }
  set max(value) {
    this._max = coerceNumberProperty(value, DEFAULTS.MAX);
  }
  get value() {
    return this._value;
  }
  set value(val) {
    this._value = coerceNumberProperty(val);
  }
  constructor(_elementRef, _renderer) {
    this._elementRef = _elementRef;
    this._renderer = _renderer;
    this._size = DEFAULTS.SIZE;
    this._min = DEFAULTS.MIN;
    this._max = DEFAULTS.MAX;
    this._animate = true;
    this._margin = 0;
    this._initialized = false;
    this._animationRequestID = 0;
    this.ariaLabel = "";
    this.ariaLabelledby = null;
    this.type = DEFAULTS.TYPE;
    this.cap = DEFAULTS.CAP;
    this.thick = DEFAULTS.THICK;
    this.foregroundColor = DEFAULTS.FOREGROUND_COLOR;
    this.backgroundColor = DEFAULTS.BACKGROUND_COLOR;
    this.thresholds = /* @__PURE__ */ Object.create(null);
    this.markers = /* @__PURE__ */ Object.create(null);
    this._value = 0;
    this.duration = 1200;
  }
  ngOnInit() {
    if (this.markers && Object.keys(this.markers).length > 0 && !this._margin) this._margin = 10;
  }
  ngOnChanges(changes) {
    const isCanvasPropertyChanged = changes["thick"] || changes["type"] || changes["cap"] || changes["size"];
    const isDataChanged = changes["value"] || changes["min"] || changes["max"];
    if (this._initialized) {
      if (isDataChanged) {
        let nv;
        if (changes["value"]) {
          nv = Number(changes["value"].currentValue);
          nv = isNaN(nv) ? 0 : nv;
          const prevVal = Number(changes["value"].previousValue);
          this._oldChangeVal = isNaN(prevVal) ? this._oldChangeVal : prevVal;
        }
        this._update(nv, this._oldChangeVal);
      }
      if (isCanvasPropertyChanged) {
        this._destroy();
        this._init();
      }
    }
  }
  _updateSize() {
    this._renderer.setStyle(this._elementRef.nativeElement, "width", cssUnit(this._getWidth()));
    this._renderer.setStyle(this._elementRef.nativeElement, "height", cssUnit(this._getCanvasHeight()));
    this._canvas.nativeElement.width = this._getWidth();
    this._canvas.nativeElement.height = this._getCanvasHeight();
    this._renderer.setStyle(this._label.nativeElement, "transform", "translateY(" + (this.size / 3 * 2 - this.size / 13 / 4) + "px)");
    this._renderer.setStyle(this._reading.nativeElement, "transform", "translateY(" + (this.size / 2 - this.size * 0.22 / 2) + "px)");
  }
  ngAfterViewInit() {
    if (this._canvas) {
      this._init();
    }
  }
  ngOnDestroy() {
    this._destroy();
  }
  _getBounds(type) {
    let head, tail, start, end;
    if (type == "semi") {
      head = Math.PI;
      tail = 2 * Math.PI;
      start = 180;
      end = 360;
    } else if (type == "full") {
      head = 1.5 * Math.PI;
      tail = 3.5 * Math.PI;
      start = 270;
      end = start + 360;
    } else if (type === "arch") {
      head = 0.8 * Math.PI;
      tail = 2.2 * Math.PI;
      start = 180 - 0.2 * 180;
      end = 360 + 0.2 * 180;
    }
    return {
      head,
      tail,
      start,
      end
    };
  }
  _drawShell(start, middle, tail, color) {
    let center = this._getCenter(), radius = this._getRadius();
    if (this._initialized) {
      this._clear();
      this._drawMarkersAndTicks();
      let ranges = this._getBackgroundColorRanges();
      this._context.lineWidth = this.thick;
      if (ranges && ranges.length > 0) {
        this._context.lineCap = "butt";
        for (let i = 0; i < ranges.length; ++i) {
          let r = ranges[i];
          this._context.beginPath();
          this._context.strokeStyle = r.backgroundColor ? r.backgroundColor : r.bgOpacity ? r.color : this.backgroundColor;
          if (r.bgOpacity !== void 0 && r.bgOpacity !== null) {
            this._context.globalAlpha = r.bgOpacity;
          }
          this._context.arc(center.x, center.y, radius, this._getDisplacement(r.start), this._getDisplacement(r.end), false);
          this._context.stroke();
          this._context.globalAlpha = 1;
        }
      } else {
        this._context.lineCap = this.cap;
        this._context.beginPath();
        this._context.strokeStyle = this.backgroundColor;
        this._context.arc(center.x, center.y, radius, start, tail, false);
        this._context.stroke();
      }
      this._drawFill(start, middle, tail, color);
    }
  }
  _drawFill(start, middle, tail, color) {
    let center = this._getCenter(), radius = this._getRadius();
    this._context.lineCap = this.cap;
    this._context.lineWidth = this.thick;
    middle = Math.max(middle, start);
    middle = Math.min(middle, tail);
    this._context.lineCap = this.cap;
    this._context.lineWidth = this.thick;
    this._context.beginPath();
    this._context.strokeStyle = color;
    this._context.arc(center.x, center.y, radius, start, middle, false);
    this._context.stroke();
  }
  _addMarker(angle, color, label, type, len, font) {
    var rad = angle * Math.PI / 180;
    let offset = 2;
    if (!len) len = 8;
    if (!type) type = "line";
    let center = this._getCenter(), radius = this._getRadius();
    let x = (radius + this.thick / 2 + offset) * Math.cos(rad) + center.x;
    let y = (radius + this.thick / 2 + offset) * Math.sin(rad) + center.y;
    let x2 = (radius + this.thick / 2 + offset + len) * Math.cos(rad) + center.x;
    let y2 = (radius + this.thick / 2 + offset + len) * Math.sin(rad) + center.y;
    if (type == "triangle") {
      this._context.beginPath();
      this._context.strokeStyle = color;
      this._context.moveTo(x, y);
      this._context.lineWidth = 1;
      let a2 = angle - 45;
      let a3 = angle + 45;
      if (a2 < 0) a2 += 360;
      if (a2 > 360) a2 -= 360;
      if (a3 < 0) a3 += 360;
      if (a3 > 360) a3 -= 360;
      let rad2 = a2 * Math.PI / 180;
      let x3 = len * Math.cos(rad2) + x;
      let y3 = len * Math.sin(rad2) + y;
      this._context.lineTo(x3, y3);
      let rad3 = a3 * Math.PI / 180;
      let x4 = len * Math.cos(rad3) + x;
      let y4 = len * Math.sin(rad3) + y;
      this._context.lineTo(x4, y4);
      this._context.lineTo(x, y);
      this._context.closePath();
      this._context.stroke();
      this._context.fillStyle = color;
      this._context.fill();
    } else {
      this._context.beginPath();
      this._context.lineWidth = 0.5;
      this._context.strokeStyle = color;
      this._context.moveTo(x, y);
      this._context.lineTo(x2, y2);
      this._context.closePath();
      this._context.stroke();
    }
    if (label) {
      this._context.save();
      this._context.translate(x2, y2);
      this._context.rotate((angle + 90) * (Math.PI / 180));
      this._context.textAlign = "center";
      this._context.font = font ? font : "13px Arial";
      this._context.fillText(label, 0, -3);
      this._context.restore();
    }
  }
  _clear() {
    this._context.clearRect(0, 0, this._getWidth(), this._getHeight());
  }
  _getWidth() {
    return this.size;
  }
  _getHeight() {
    return this.size;
  }
  // canvas height will be shorter for type 'semi' and 'arch'
  _getCanvasHeight() {
    return this.type == "arch" || this.type == "semi" ? 0.85 * this._getHeight() : this._getHeight();
  }
  _getRadius() {
    const center = this._getCenter();
    var rad = center.x - this.thick;
    if (this._margin > 0) rad -= this._margin;
    return rad;
  }
  _getCenter() {
    var x = this._getWidth() / 2, y = this._getHeight() / 2;
    return {
      x,
      y
    };
  }
  _init() {
    this._context = this._canvas.nativeElement.getContext("2d");
    this._initialized = true;
    this._updateSize();
    this._create();
  }
  _destroy() {
    if (this._animationRequestID) {
      window.cancelAnimationFrame(this._animationRequestID);
      this._animationRequestID = 0;
    }
    this._clear();
    this._context = null;
    this._initialized = false;
  }
  _getForegroundColorByRange(value) {
    const thresh = this._getThresholdMatchForValue(value);
    return thresh && thresh.color ? thresh.color : this.foregroundColor;
  }
  _getThresholdMatchForValue(value) {
    const match = Object.keys(this.thresholds).filter(function(item) {
      return isNumber(item) && Number(item) <= value;
    }).sort((a, b) => Number(a) - Number(b)).reverse()[0];
    if (match !== void 0) {
      const thresh = this.thresholds[match];
      const t = {
        color: thresh.color,
        backgroundColor: thresh.backgroundColor,
        bgOpacity: thresh.bgOpacity,
        start: Number(match),
        end: this._getNextThreshold(Number(match))
      };
      return t;
    }
  }
  _getNextThreshold(value) {
    const match = Object.keys(this.thresholds).filter(function(item) {
      return isNumber(item) && Number(item) > value;
    }).sort((a, b) => Number(a) - Number(b));
    if (match && match[0] !== void 0) {
      return Number(match[0]);
    } else {
      return this.max;
    }
  }
  _getBackgroundColorRanges() {
    let i = 0, ranges = [];
    do {
      let thresh = this._getThresholdMatchForValue(i);
      if (thresh) {
        ranges.push({
          start: thresh.start,
          end: thresh.end,
          color: thresh.color,
          backgroundColor: thresh.backgroundColor,
          bgOpacity: thresh.bgOpacity
        });
        i = thresh.end;
        if (i >= this.max) break;
      } else break;
    } while (true);
    return ranges;
  }
  _getDisplacement(v) {
    let type = this.type, bounds = this._getBounds(type), min = this.min, max = this.max, start = bounds.head, value = clamp(v, this.min, this.max), unit = (bounds.tail - bounds.head) / (max - min), displacement = unit * (value - min);
    return start + displacement;
  }
  _create(nv, ov) {
    const self = this;
    const type = this.type;
    const bounds = this._getBounds(type);
    const duration = this.duration;
    const min = this.min;
    const max = this.max;
    const value = clamp(this.value, min, max);
    const start = bounds.head;
    const unit = (bounds.tail - bounds.head) / (max - min);
    let displacement = unit * (value - min);
    const tail = bounds.tail;
    const color = this._getForegroundColorByRange(value);
    let startTime;
    if (self._animationRequestID) {
      window.cancelAnimationFrame(self._animationRequestID);
    }
    const animate = (timestamp) => {
      timestamp = timestamp || (/* @__PURE__ */ new Date()).getTime();
      const runtime = timestamp - startTime;
      const progress = Math.min(runtime / duration, 1);
      const previousProgress = ov ? (ov - min) * unit : 0;
      const middle = start + previousProgress + displacement * progress;
      self._drawShell(start, middle, tail, color);
      if (self._animationRequestID && runtime < duration) {
        self._animationRequestID = window.requestAnimationFrame((ts) => animate(ts));
      } else {
        window.cancelAnimationFrame(self._animationRequestID);
      }
    };
    if (this._animate) {
      if (nv !== void 0 && ov !== void 0 && ov !== 0) {
        displacement = unit * nv - unit * ov;
      }
      self._animationRequestID = window.requestAnimationFrame((timestamp) => {
        startTime = timestamp || (/* @__PURE__ */ new Date()).getTime();
        animate(startTime);
      });
    } else {
      self._drawShell(start, start + displacement, tail, color);
    }
  }
  _drawMarkersAndTicks() {
    if (this.markers) {
      const bounds = this._getBounds(this.type);
      const degrees = bounds.end - bounds.start;
      const perD = degrees / (this.max - this.min);
      for (const mv in this.markers) {
        const n = Number(mv) - this.min;
        const angle = bounds.start + n * perD;
        const m = this.markers[mv];
        this._addMarker(angle, m.color, m.label, m.type, m.size, m.font);
      }
    }
  }
  _update(nv, ov) {
    this._clear();
    this._create(nv, ov);
  }
  static {
    this.ɵfac = function NgxGauge_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NgxGauge)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(Renderer2));
    };
  }
  static {
    this.ɵcmp = ɵɵdefineComponent({
      type: _NgxGauge,
      selectors: [["ngx-gauge"]],
      contentQueries: function NgxGauge_ContentQueries(rf, ctx, dirIndex) {
        if (rf & 1) {
          ɵɵcontentQuery(dirIndex, NgxGaugeLabel, 5);
          ɵɵcontentQuery(dirIndex, NgxGaugePrepend, 5);
          ɵɵcontentQuery(dirIndex, NgxGaugeAppend, 5);
          ɵɵcontentQuery(dirIndex, NgxGaugeValue, 5);
        }
        if (rf & 2) {
          let _t;
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._labelChild = _t.first);
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._prependChild = _t.first);
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._appendChild = _t.first);
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._valueDisplayChild = _t.first);
        }
      },
      viewQuery: function NgxGauge_Query(rf, ctx) {
        if (rf & 1) {
          ɵɵviewQuery(_c0, 7);
          ɵɵviewQuery(_c1, 7);
          ɵɵviewQuery(_c2, 7);
        }
        if (rf & 2) {
          let _t;
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._canvas = _t.first);
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._label = _t.first);
          ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx._reading = _t.first);
        }
      },
      hostAttrs: ["role", "slider", "aria-readonly", "true"],
      hostVars: 7,
      hostBindings: function NgxGauge_HostBindings(rf, ctx) {
        if (rf & 2) {
          ɵɵattribute("aria-valuemin", ctx.min)("aria-valuemax", ctx.max)("aria-valuenow", ctx.value)("aria-label", ctx.ariaLabel)("aria-labelledby", ctx.ariaLabelledby);
          ɵɵclassProp("ngx-gauge-meter", true);
        }
      },
      inputs: {
        ariaLabel: [0, "aria-label", "ariaLabel"],
        ariaLabelledby: [0, "aria-labelledby", "ariaLabelledby"],
        size: "size",
        margin: "margin",
        min: "min",
        animate: "animate",
        max: "max",
        type: "type",
        cap: "cap",
        thick: "thick",
        label: "label",
        append: "append",
        prepend: "prepend",
        foregroundColor: "foregroundColor",
        backgroundColor: "backgroundColor",
        thresholds: "thresholds",
        markers: "markers",
        value: "value",
        duration: "duration"
      },
      features: [ɵɵNgOnChangesFeature],
      ngContentSelectors: _c4,
      decls: 17,
      vars: 16,
      consts: [["reading", ""], ["rLabel", ""], ["canvas", ""], [1, "reading-block"], [1, "reading-affix", 3, "ngSwitch"], [4, "ngSwitchCase"], [3, "ngSwitch"], [1, "reading-label", 3, "ngSwitch"]],
      template: function NgxGauge_Template(rf, ctx) {
        if (rf & 1) {
          ɵɵprojectionDef(_c3);
          ɵɵelementStart(0, "div", 3, 0)(2, "u", 4);
          ɵɵtemplate(3, NgxGauge_ng_content_3_Template, 1, 0, "ng-content", 5)(4, NgxGauge_ng_container_4_Template, 2, 1, "ng-container", 5);
          ɵɵelementEnd();
          ɵɵelementContainerStart(5, 6);
          ɵɵtemplate(6, NgxGauge_ng_content_6_Template, 1, 0, "ng-content", 5)(7, NgxGauge_ng_container_7_Template, 3, 3, "ng-container", 5);
          ɵɵelementContainerEnd();
          ɵɵelementStart(8, "u", 4);
          ɵɵtemplate(9, NgxGauge_ng_content_9_Template, 1, 0, "ng-content", 5)(10, NgxGauge_ng_container_10_Template, 2, 1, "ng-container", 5);
          ɵɵelementEnd()();
          ɵɵelementStart(11, "div", 7, 1);
          ɵɵtemplate(13, NgxGauge_ng_content_13_Template, 1, 0, "ng-content", 5)(14, NgxGauge_ng_container_14_Template, 2, 1, "ng-container", 5);
          ɵɵelementEnd();
          ɵɵelement(15, "canvas", null, 2);
        }
        if (rf & 2) {
          ɵɵstyleProp("font-size", (ctx.size - ctx.margin * 2) * 0.22 + "px");
          ɵɵadvance(2);
          ɵɵproperty("ngSwitch", ctx._prependChild != null);
          ɵɵadvance();
          ɵɵproperty("ngSwitchCase", true);
          ɵɵadvance();
          ɵɵproperty("ngSwitchCase", false);
          ɵɵadvance();
          ɵɵproperty("ngSwitch", ctx._valueDisplayChild != null);
          ɵɵadvance();
          ɵɵproperty("ngSwitchCase", true);
          ɵɵadvance();
          ɵɵproperty("ngSwitchCase", false);
          ɵɵadvance();
          ɵɵproperty("ngSwitch", ctx._appendChild != null);
          ɵɵadvance();
          ɵɵproperty("ngSwitchCase", true);
          ɵɵadvance();
          ɵɵproperty("ngSwitchCase", false);
          ɵɵadvance();
          ɵɵstyleProp("font-size", (ctx.size - ctx.margin * 2) / 13 + "px");
          ɵɵproperty("ngSwitch", ctx._labelChild != null);
          ɵɵadvance(2);
          ɵɵproperty("ngSwitchCase", true);
          ɵɵadvance();
          ɵɵproperty("ngSwitchCase", false);
        }
      },
      dependencies: [NgSwitch, NgSwitchCase, DecimalPipe],
      styles: [".ngx-gauge-meter{display:inline-block;text-align:center;position:relative}.reading-block{position:absolute;width:100%;font-weight:400;white-space:nowrap;text-align:center;overflow:hidden;text-overflow:ellipsis}.reading-label{font-family:inherit;width:100%;display:inline-block;position:absolute;text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:400}.reading-affix{text-decoration:none;font-size:.6em;opacity:.8;font-weight:200;padding:0 .18em}.reading-affix:first-child{padding-left:0}.reading-affix:last-child{padding-right:0}\n"],
      encapsulation: 2
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxGauge, [{
    type: Component,
    args: [{
      selector: "ngx-gauge",
      host: {
        "role": "slider",
        "aria-readonly": "true",
        "[class.ngx-gauge-meter]": "true",
        "[attr.aria-valuemin]": "min",
        "[attr.aria-valuemax]": "max",
        "[attr.aria-valuenow]": "value",
        "[attr.aria-label]": "ariaLabel",
        "[attr.aria-labelledby]": "ariaLabelledby"
      },
      encapsulation: ViewEncapsulation$1.None,
      template: `<div class="reading-block" #reading [style.fontSize]="(size-(margin*2)) * 0.22 + 'px'">\r
  <!-- This block can not be indented correctly, because line breaks cause layout spacing, related problem: https://pt.stackoverflow.com/q/276760/2998 -->\r
  <u class="reading-affix" [ngSwitch]="_prependChild != null"><ng-content select="ngx-gauge-prepend" *ngSwitchCase="true"></ng-content><ng-container *ngSwitchCase="false">{{prepend}}</ng-container></u><ng-container [ngSwitch]="_valueDisplayChild != null"><ng-content *ngSwitchCase="true" select="ngx-gauge-value"></ng-content><ng-container *ngSwitchCase="false">{{value | number}}</ng-container></ng-container><u class="reading-affix" [ngSwitch]="_appendChild != null"><ng-content select="ngx-gauge-append" *ngSwitchCase="true"></ng-content><ng-container *ngSwitchCase="false">{{append}}</ng-container></u>\r
</div>\r
<div class="reading-label" #rLabel\r
     [style.fontSize]="(size-(margin*2)) / 13 + 'px'"\r
     [ngSwitch]="_labelChild != null">\r
  <ng-content select="ngx-gauge-label" *ngSwitchCase="true"></ng-content>\r
  <ng-container *ngSwitchCase="false">{{label}}</ng-container>\r
</div>\r
<canvas #canvas></canvas>\r
`,
      styles: [".ngx-gauge-meter{display:inline-block;text-align:center;position:relative}.reading-block{position:absolute;width:100%;font-weight:400;white-space:nowrap;text-align:center;overflow:hidden;text-overflow:ellipsis}.reading-label{font-family:inherit;width:100%;display:inline-block;position:absolute;text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-weight:400}.reading-affix{text-decoration:none;font-size:.6em;opacity:.8;font-weight:200;padding:0 .18em}.reading-affix:first-child{padding-left:0}.reading-affix:last-child{padding-right:0}\n"]
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: Renderer2
  }], {
    _canvas: [{
      type: ViewChild,
      args: ["canvas", {
        static: true
      }]
    }],
    _label: [{
      type: ViewChild,
      args: ["rLabel", {
        static: true
      }]
    }],
    _reading: [{
      type: ViewChild,
      args: ["reading", {
        static: true
      }]
    }],
    _labelChild: [{
      type: ContentChild,
      args: [NgxGaugeLabel]
    }],
    _prependChild: [{
      type: ContentChild,
      args: [NgxGaugePrepend]
    }],
    _appendChild: [{
      type: ContentChild,
      args: [NgxGaugeAppend]
    }],
    _valueDisplayChild: [{
      type: ContentChild,
      args: [NgxGaugeValue]
    }],
    ariaLabel: [{
      type: Input,
      args: ["aria-label"]
    }],
    ariaLabelledby: [{
      type: Input,
      args: ["aria-labelledby"]
    }],
    size: [{
      type: Input
    }],
    margin: [{
      type: Input
    }],
    min: [{
      type: Input
    }],
    animate: [{
      type: Input
    }],
    max: [{
      type: Input
    }],
    type: [{
      type: Input
    }],
    cap: [{
      type: Input
    }],
    thick: [{
      type: Input
    }],
    label: [{
      type: Input
    }],
    append: [{
      type: Input
    }],
    prepend: [{
      type: Input
    }],
    foregroundColor: [{
      type: Input
    }],
    backgroundColor: [{
      type: Input
    }],
    thresholds: [{
      type: Input
    }],
    markers: [{
      type: Input
    }],
    value: [{
      type: Input
    }],
    duration: [{
      type: Input
    }]
  });
})();
var NgxGaugeModule = class _NgxGaugeModule {
  static {
    this.ɵfac = function NgxGaugeModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NgxGaugeModule)();
    };
  }
  static {
    this.ɵmod = ɵɵdefineNgModule({
      type: _NgxGaugeModule,
      declarations: [NgxGauge, NgxGaugeAppend, NgxGaugePrepend, NgxGaugeValue, NgxGaugeLabel],
      imports: [CommonModule],
      exports: [NgxGauge, NgxGaugeAppend, NgxGaugePrepend, NgxGaugeValue, NgxGaugeLabel]
    });
  }
  static {
    this.ɵinj = ɵɵdefineInjector({
      imports: [CommonModule]
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgxGaugeModule, [{
    type: NgModule,
    args: [{
      imports: [CommonModule],
      declarations: [NgxGauge, NgxGaugeAppend, NgxGaugePrepend, NgxGaugeValue, NgxGaugeLabel],
      exports: [NgxGauge, NgxGaugeAppend, NgxGaugePrepend, NgxGaugeValue, NgxGaugeLabel]
    }]
  }], null, null);
})();
export {
  NgxGauge,
  NgxGaugeAppend,
  NgxGaugeLabel,
  NgxGaugeModule,
  NgxGaugePrepend,
  NgxGaugeValue
};
//# sourceMappingURL=ngx-gauge.js.map
