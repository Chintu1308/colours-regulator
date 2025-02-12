import React, { useState, useMemo } from 'react';
import { Sliders } from 'lucide-react';

function App() {
  const [colors, setColors] = useState({
    red: 100,
    green: 100,
    blue: 100
  });

  const handleColorChange = (color: keyof typeof colors) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setColors(prev => ({
      ...prev,
      [color]: parseInt(e.target.value)
    }));
  };

  // Memoize the color matrix calculation
  const colorMatrix = useMemo(() => {
    const r = colors.red / 100;
    const g = colors.green / 100;
    const b = colors.blue / 100;
    
    return `
      brightness(1)
      saturate(100%)
      sepia(50%)
      hue-rotate(${((r - 1) * 30)}deg)
      saturate(${g * 200}%)
      brightness(${b * 1.5})
    `;
  }, [colors.red, colors.green, colors.blue]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-2 mb-8">
          <Sliders className="w-6 h-6" />
          <h1 className="text-2xl font-bold">Image Color Regulator</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative overflow-hidden rounded-lg bg-gray-800 p-1">
            <img
              src="https://images.unsplash.com/photo-1534447677768-be436bb09401"
              alt="Colorful flowers"
              className="w-full h-[400px] object-cover rounded-lg transition-all duration-200"
              style={{
                filter: colorMatrix,
              }}
            />
          </div>

          <div className="space-y-6 bg-gray-800 p-6 rounded-lg">
            <div>
              <label className="flex items-center justify-between">
                <span className="text-red-400 font-medium">Red Channel</span>
                <span className="bg-gray-700 px-2 py-1 rounded text-sm">{colors.red}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="200"
                value={colors.red}
                onChange={handleColorChange('red')}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-500 mt-2"
              />
            </div>

            <div>
              <label className="flex items-center justify-between">
                <span className="text-green-400 font-medium">Green Channel</span>
                <span className="bg-gray-700 px-2 py-1 rounded text-sm">{colors.green}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="200"
                value={colors.green}
                onChange={handleColorChange('green')}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500 mt-2"
              />
            </div>

            <div>
              <label className="flex items-center justify-between">
                <span className="text-blue-400 font-medium">Blue Channel</span>
                <span className="bg-gray-700 px-2 py-1 rounded text-sm">{colors.blue}%</span>
              </label>
              <input
                type="range"
                min="0"
                max="200"
                value={colors.blue}
                onChange={handleColorChange('blue')}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500 mt-2"
              />
            </div>

            <div className="pt-4 border-t border-gray-700">
              <button
                onClick={() => setColors({ red: 100, green: 100, blue: 100 })}
                className="w-full py-2 px-4 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors font-medium"
              >
                Reset Colors
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;