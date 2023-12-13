class CubicEquationSolver {
  constructor(a, b, c, d) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
  }

  solve() {
    let roots = [];
    if (this.a === 0) {
      roots = this.solveQuadratic();
    } else {
      const p = (3 * this.c / this.a - (this.b ** 2) / (this.a ** 2)) / 3;
      const q = ((2 * (this.b ** 3)) / (this.a ** 3) - (9 * this.b * this.c) / (this.a ** 2) + (27 * this.d) / this.a) / 27;
      const discriminant = ((q ** 2) / 4) + ((p ** 3) / 27);

      if (discriminant > 0) {
        const u = (-q / 2) + Math.sqrt(discriminant);
        const v = (-q / 2) - Math.sqrt(discriminant);

        const cubeRootU = this.cubeRoot(u);
        const cubeRootV = this.cubeRoot(v);

        const root1 = cubeRootU - cubeRootV - (this.b / (3 * this.a));
        roots.push(root1);
      } else if (discriminant === 0) {
        const u = -q / 2;
        const cubeRootU = this.cubeRoot(u);

        const root1 = 2 * cubeRootU - (this.b / (3 * this.a));
        const root2 = -cubeRootU - (this.b / (3 * this.a));
        roots.push(root1, root2);
      } else {
        const r = Math.sqrt((q ** 2) / 4 - (p ** 3) / 27);
        const theta = Math.atan2(Math.sqrt(-((p ** 3) / 27)), -(q / 2));

        const root1 = 2 * Math.cbrt(r) * Math.cos(theta / 3) - (this.b / (3 * this.a));
        const root2 = 2 * Math.cbrt(r) * Math.cos((theta + 2 * Math.PI) / 3) - (this.b / (3 * this.a));
        const root3 = 2 * Math.cbrt(r) * Math.cos((theta + 4 * Math.PI) / 3) - (this.b / (3 * this.a));

        roots.push(root1, root2, root3);
      }
    }
    return roots;
  }

  solveQuadratic() {
    const discriminant = this.c * this.c - 4 * this.b * this.d;

    if (discriminant > 0) {
      const root1 = (-this.c + Math.sqrt(discriminant)) / (2 * this.b);
      const root2 = (-this.c - Math.sqrt(discriminant)) / (2 * this.b);
      return [root1, root2];
    } else if (discriminant === 0) {
      const root = -this.c / (2 * this.b);
      return [root];
    } else {
      return [];
    }
  }

  cubeRoot(x) {
    if (x >= 0) {
      return Math.pow(x, 1 / 3);
    } else {
      return -Math.pow(Math.abs(x), 1 / 3);
    }
  }
}

function solveCubic() {
  const a = parseFloat(document.getElementById('a').value);
  const b = parseFloat(document.getElementById('b').value);
  const c = parseFloat(document.getElementById('c').value);
  const d = parseFloat(document.getElementById('d').value);

  const solver = new CubicEquationSolver(a, b, c, d);
  const roots = solver.solve();

  const resultDiv = document.getElementById('result');
  if (roots.length === 0) {
    resultDiv.innerHTML = 'No real roots found.';
  } else {
    resultDiv.innerHTML = 'Roots: ' + roots.join(', ');
  }
}
