import { fabric } from 'fabric'

export function cssToFabricGradient (stops, width, height, angle){
  const gradAngleToCoords = (paramsAngle) => {
    const anglePI = -parseInt(paramsAngle, 10) * (Math.PI / 180);
    return {
      x1: Math.round(50 + Math.sin(anglePI) * 50) / 100,
      y1: Math.round(50 + Math.cos(anglePI + Math.PI) * 50) / 100,
      x2: Math.round(50 + Math.sin(anglePI + Math.PI) * 50) / 100,
      y2: Math.round(50 + Math.cos(anglePI) * 50) / 100,
    };
  };
  const angleCoords = gradAngleToCoords(angle);
  return new fabric.Gradient({
    type: 'linear',
    gradientUnits: 'pencentage',
    coords: {
      x1: angleCoords.x1 * width,
      y1: angleCoords.y1 * height,
      x2: angleCoords.x2 * width,
      y2: angleCoords.y2 * height,
    },
    colorStops: [...stops],
  });
};
