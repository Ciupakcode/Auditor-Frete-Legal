export const DINATRAN_MATRIX = [
  { km: 10, base: 11618, coeff: 3.00 },
  { km: 20, base: 11618, coeff: 2.50 },
  { km: 30, base: 11618, coeff: 2.50 },
  { km: 40, base: 11618, coeff: 2.00 },
  { km: 50, base: 10711, coeff: 2.00 },
  { km: 60, base: 10711, coeff: 1.75 },
  { km: 70, base: 10032, coeff: 1.75 },
  { km: 80, base: 10032, coeff: 1.75 },
  { km: 90, base: 10032, coeff: 1.75 },
  { km: 100, base: 9503, coeff: 1.75 },
  { km: 110, base: 9080, coeff: 1.75 },
  { km: 120, base: 9080, coeff: 1.75 },
  { km: 130, base: 9080, coeff: 1.75 },
  { km: 140, base: 9080, coeff: 1.75 },
  { km: 150, base: 9080, coeff: 1.75 },
  { km: 160, base: 8445, coeff: 1.78 },
  { km: 170, base: 8445, coeff: 1.75 },
  { km: 180, base: 8445, coeff: 1.75 },
  { km: 190, base: 8445, coeff: 1.75 },
  { km: 200, base: 8201, coeff: 1.75 },
  { km: 210, base: 8201, coeff: 1.69 },
  { km: 220, base: 7992, coeff: 1.67 },
  { km: 230, base: 7992, coeff: 1.62 },
  { km: 240, base: 7992, coeff: 1.57 },
  { km: 250, base: 7992, coeff: 1.54 },
  { km: 260, base: 7992, coeff: 1.54 },
  { km: 270, base: 7992, coeff: 1.54 },
  { km: 280, base: 7992, coeff: 1.54 },
  { km: 290, base: 7992, coeff: 1.54 },
  { km: 300, base: 7811, coeff: 1.54 },
  { km: 310, base: 7663, coeff: 1.54 },
  { km: 320, base: 7663, coeff: 1.54 },
  { km: 330, base: 7663, coeff: 1.54 },
  { km: 340, base: 7663, coeff: 1.54 },
  { km: 350, base: 7663, coeff: 1.54 },
  { km: 360, base: 7663, coeff: 1.52 },
  { km: 370, base: 7663, coeff: 1.51 },
  { km: 380, base: 7663, coeff: 1.50 },
  { km: 390, base: 7663, coeff: 1.49 },
  { km: 400, base: 7663, coeff: 1.48 },
  { km: 410, base: 7663, coeff: 1.47 },
  { km: 420, base: 7663, coeff: 1.46 },
  { km: 430, base: 7663, coeff: 1.45 },
  { km: 440, base: 7663, coeff: 1.44 },
  { km: 450, base: 7663, coeff: 1.43 },
  { km: 460, base: 7663, coeff: 1.42 },
  { km: 470, base: 7663, coeff: 1.41 },
  { km: 480, base: 7663, coeff: 1.40 },
  { km: 490, base: 7663, coeff: 1.39 },
  { km: 500, base: 7663, coeff: 1.38 },
  { km: 550, base: 7276, coeff: 1.37 },
  { km: 600, base: 7086, coeff: 1.36 },
  { km: 650, base: 6928, coeff: 1.35 },
  { km: 700, base: 6737, coeff: 1.34 },
  { km: 750, base: 6585, coeff: 1.33 }
];

export function getDinatranReference(km: number) {
  if (km <= 0) return { km: 0, base: 0, coeff: 0, costoPorKm: 0, costoTotal: 0 };
  
  let closest = DINATRAN_MATRIX[0];
  let minDiff = Math.abs(km - closest.km);
  
  for (const row of DINATRAN_MATRIX) {
    const diff = Math.abs(km - row.km);
    if (diff < minDiff) {
      closest = row;
      minDiff = diff;
    }
  }

  // Costo = (Base * Coeficiente)
  const costoPorKm = Math.round(closest.base * closest.coeff);
  const costoTotal = Math.round(costoPorKm * km);

  return { 
    ...closest, 
    costoPorKm,
    costoTotal 
  };
}
