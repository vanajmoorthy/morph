'use strict';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var Layer = function Layer(size) {
	classCallCheck(this, Layer);

	this.sides = 6;
	this.numShapes = this.sides;
	this.angle = 360 / this.numShapes;

	this.size = size;
	this.radius = this.size / 2;

	this.numSteps = random([8, 10]);
	this.stepLength = this.radius / this.numSteps;

	this.palette = [color(29, 167, 234), color(58, 51, 53), color(233, 114, 76)];
	this.color = random(this.palette);
	this.strokeWeight = random([1, 2]);
};

function polygon(n, x, y, r) {
	var angleOffset = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;

	var angle = 360 / n;
	beginShape();
	for (var i = 0; i < n; i++) {
		var nextX = x + cos(i * angle + angleOffset) * r;
		var nextY = y + sin(i * angle + angleOffset) * r;
		vertex(nextX, nextY);
	}
	endShape(CLOSE);
}

var Outline = function (_Layer) {
	inherits(Outline, _Layer);

	function Outline() {
		classCallCheck(this, Outline);
		return possibleConstructorReturn(this, (Outline.__proto__ || Object.getPrototypeOf(Outline)).apply(this, arguments));
	}

	createClass(Outline, [{
		key: "render",
		value: function render() {
			noFill();
			stroke(this.color);
			strokeWeight(this.strokeWeight);

			push();

			if (random([true, false])) {
				polygon(6, 0, 0, this.radius);
			} else {
				ellipse(0, 0, this.size, this.size);
			}

			pop();
		}
	}]);
	return Outline;
}(Layer);

var Center = function (_Layer) {
	inherits(Center, _Layer);

	function Center() {
		classCallCheck(this, Center);

		var _this = possibleConstructorReturn(this, (Center.__proto__ || Object.getPrototypeOf(Center)).apply(this, arguments));

		_this.randomShape = random([1, 2, 3]);
		_this.size = floor(random(_this.numSteps / 2, _this.numSteps - 2)) * _this.stepLength;
		return _this;
	}

	createClass(Center, [{
		key: "render",
		value: function render() {
			noStroke();
			fill(this.color);

			push();

			switch (this.randomShape) {
				case 1:
					rect(0, 0, this.size / 2, this.size / 2);
					break;

				case 2:
					ellipse(0, 0, this.size, this.size);
					break;

				case 3:
					polygon(6, 0, 0, this.size, 30);
					break;

				default:
			}

			pop();
		}
	}]);
	return Center;
}(Layer);

var Circles = function (_Layer) {
	inherits(Circles, _Layer);

	function Circles() {
		classCallCheck(this, Circles);

		var _this = possibleConstructorReturn(this, (Circles.__proto__ || Object.getPrototypeOf(Circles)).apply(this, arguments));

		_this.shapeSize = _this.radius * 0.93;
		_this.posX = _this.radius - _this.shapeSize / 2;
		return _this;
	}

	createClass(Circles, [{
		key: "render",
		value: function render() {
			noFill();
			stroke(this.color);

			push();

			for (var i = 0; i < this.numShapes; i++) {
				ellipse(this.posX, 0, this.shapeSize, this.shapeSize);
				rotate(this.angle);
			}

			pop();
		}
	}]);
	return Circles;
}(Layer);

var Lines = function (_Layer) {
	inherits(Lines, _Layer);

	function Lines() {
		classCallCheck(this, Lines);

		var _this = possibleConstructorReturn(this, (Lines.__proto__ || Object.getPrototypeOf(Lines)).apply(this, arguments));

		_this.numShapes = random([1, 2]) * _this.sides;
		_this.angle = 360 / _this.numShapes;

		_this.start = floor(random(_this.numSteps - 1));
		_this.end = floor(random(_this.start, _this.numSteps));
		return _this;
	}

	createClass(Lines, [{
		key: "render",
		value: function render() {
			stroke(this.color);
			strokeWeight(this.strokeWeight);

			push();

			for (var i = 0; i < this.numShapes; i++) {
				line(this.start * this.stepLength, 0, this.end * this.stepLength, 0);
				rotate(this.angle);
			}

			pop();
		}
	}]);
	return Lines;
}(Layer);

var DottedLines = function (_Layer) {
	inherits(DottedLines, _Layer);

	function DottedLines() {
		classCallCheck(this, DottedLines);

		var _this = possibleConstructorReturn(this, (DottedLines.__proto__ || Object.getPrototypeOf(DottedLines)).apply(this, arguments));

		_this.dotSize = 1;
		_this.offset = _this.stepLength;
		return _this;
	}

	createClass(DottedLines, [{
		key: "render",
		value: function render() {
			noStroke();
			fill(this.color);

			push();

			for (var i = 0; i < this.numShapes; i++) {
				for (var posX = this.offset; posX < this.radius; posX += this.stepLength) {
					rect(posX, 0, this.dotSize, this.dotSize);
				}

				rotate(this.angle);
			}

			pop();
		}
	}]);
	return DottedLines;
}(Layer);

var Ring = function (_Layer) {
	inherits(Ring, _Layer);

	function Ring() {
		classCallCheck(this, Ring);

		var _this = possibleConstructorReturn(this, (Ring.__proto__ || Object.getPrototypeOf(Ring)).apply(this, arguments));

		_this.fillColor = random([_this.color, color(0, 0, 0, 0)]);
		_this.randomShape = random([1, 2, 3]);

		_this.steps = floor(random(1, _this.numSteps));
		_this.posX = _this.steps * _this.stepLength;
		_this.size = floor(random(1, min(_this.numSteps - _this.steps, abs(0 - _this.steps)))) * _this.stepLength;

		_this.angleOffset = random([0, 60]);
		return _this;
	}

	createClass(Ring, [{
		key: "render",
		value: function render() {
			fill(this.fillColor);
			stroke(this.color);
			strokeWeight(this.strokeWeight);

			push();

			for (var i = 0; i < this.numShapes; i++) {
				switch (this.randomShape) {
					case 1:
						rect(this.posX, 0, this.size, this.size);
						break;

					case 2:
						ellipse(this.posX, 0, this.size, this.size);
						break;

					case 3:
						polygon(3, this.posX, 0, this.size, this.angleOffset);
						break;

					default:
				}

				rotate(this.angle);
			}

			pop();
		}
	}]);
	return Ring;
}(Layer);

var Wave = function (_Layer) {
	inherits(Wave, _Layer);

	function Wave() {
		classCallCheck(this, Wave);

		var _this = possibleConstructorReturn(this, (Wave.__proto__ || Object.getPrototypeOf(Wave)).apply(this, arguments));

		_this.offset = _this.radius * 0.15;
		_this.stepLength = _this.radius * 0.85 / _this.numSteps;
		return _this;
	}

	createClass(Wave, [{
		key: "render",
		value: function render() {
			noFill();
			stroke(this.color);
			strokeWeight(this.strokeWeight);

			push();

			for (var i = 1; i <= this.numSteps; i++) {
				polygon(6, 0, 0, this.offset + i * this.stepLength, 30);
			}

			pop();
		}
	}]);
	return Wave;
}(Layer);

var layerConfig = [{
	class: Outline,
	weight: 0.7
}, {
	class: Center,
	weight: 0.7
}, {
	class: Circles,
	weight: 0.7
}, {
	class: Lines,
	weight: 0.7
}, {
	class: DottedLines,
	weight: 0.5
}, {
	class: Ring,
	weight: 0.7
}, {
	class: Wave,
	weight: 0.3
}];

var Crystal = function () {
	function Crystal(x, y, size) {
		classCallCheck(this, Crystal);

		this.x = x;
		this.y = y;
		this.layers = layerConfig.filter(function (layer) {
			return random(1) <= layer.weight;
		}).map(function (layer) {
			return new layer.class(size);
		});
	}

	createClass(Crystal, [{
		key: "render",
		value: function render() {
			push();

			translate(this.x, this.y);

			this.layers.forEach(function (layer) {
				return layer.render();
			});

			pop();
		}
	}]);
	return Crystal;
}();

// import { functionDeclaration } from "babel-types";
// import { favicon } from "./util.js";

var canvasInstance = void 0;
var needsDraw = true;

var fade;

window.setup = function () {
	canvasInstance = createCanvas(windowWidth, windowHeight);
	// canvasInstance.doubleClicked()
	angleMode(DEGREES);
	rectMode(RADIUS);
	fade = 255;
};

window.draw = function () {
	if (!needsDraw) return;
	drawOnce();
	needsDraw = false;

	fill(0, 0, 0, fade);
	textSize(18);
	textStyle(BOLD);
	textAlign(CENTER);
	background(255, 255, 255, fade);
	text("Press space or double tap to refresh.", windowWidth / 2, windowHeight / 2);
};

window.doubleClicked = function () {
	needsDraw = true;
	fade = 0;
};

window.keyPressed = function () {
	if (keyCode === 32) {
		needsDraw = true;
		fade = 0;
	}
};

window.drawOnce = function () {
	background(255);
	var CRYSTAL_SIZE_MAX = 250;
	var GAP_MIN = 10;

	var crystalSize = min(CRYSTAL_SIZE_MAX, min(windowWidth, windowHeight) - 2 * GAP_MIN);

	var cols = int((windowWidth - GAP_MIN) / (crystalSize + GAP_MIN));
	var rows = int((windowHeight - GAP_MIN) / (crystalSize + GAP_MIN));

	var gapHor = (windowWidth - cols * crystalSize) / (cols + 1);
	var gapVer = (windowHeight - rows * crystalSize) / (rows + 1);

	for (var i = 0; i < cols * rows; i++) {
		var x = gapHor + crystalSize / 2 + i % cols * (crystalSize + gapHor);
		var y = gapVer + crystalSize / 2 + int(i / cols) * (crystalSize + gapVer);
		new Crystal(x, y, crystalSize).render();
	}

	// favicon(displayDensity(), crystalSize, gapHor, gapVer);
};

window.windowResized = function () {
	resizeCanvas(windowWidth, windowHeight);
	needsDraw = true;
};
