import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import TerritoryCard from '@/components/molecules/TerritoryCard';
import ApperIcon from '@/components/ApperIcon';

const GameMap = ({ 
  territories = [], 
  cultures = [], 
  empires = [],
  selectedTerritory,
  onTerritorySelect,
  onZoomChange
}) => {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const handleZoomIn = () => {
    const newZoom = Math.min(zoom * 1.2, 3);
    setZoom(newZoom);
    onZoomChange?.(newZoom);
  };

  const handleZoomOut = () => {
    const newZoom = Math.max(zoom / 1.2, 0.5);
    setZoom(newZoom);
    onZoomChange?.(newZoom);
  };

  const handleMouseDown = (e) => {
    if (e.target === e.currentTarget) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart]);

  const getEmpireById = (empireId) => {
    return empires.find(e => e.id === empireId);
  };

  return (
    <div className="relative w-full h-full bg-surface-100 rounded-lg border-2 border-accent/30 overflow-hidden">
      {/* Map Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleZoomIn}
          className="w-10 h-10 bg-surface-50 border-2 border-accent rounded-lg flex items-center justify-center shadow-parchment hover:bg-accent hover:text-white transition-colors"
        >
          <ApperIcon name="ZoomIn" size={16} />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleZoomOut}
          className="w-10 h-10 bg-surface-50 border-2 border-accent rounded-lg flex items-center justify-center shadow-parchment hover:bg-accent hover:text-white transition-colors"
        >
          <ApperIcon name="ZoomOut" size={16} />
        </motion.button>
      </div>

      {/* Zoom Level Indicator */}
      <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-surface-50/90 border border-accent/30 rounded-lg text-sm font-medium text-primary">
        Zoom: {Math.round(zoom * 100)}%
      </div>

      {/* Map Container */}
      <div
        className="w-full h-full cursor-grab active:cursor-grabbing relative"
        onMouseDown={handleMouseDown}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <motion.div
          className="relative"
          style={{
            transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
            transformOrigin: 'center center'
          }}
          transition={{ type: "tween", duration: 0.1 }}
        >
          {/* Territory Grid */}
          <div className="grid grid-cols-3 gap-4 p-8 min-w-[800px] min-h-[600px]">
            {territories.map((territory, index) => (
              <motion.div
                key={territory.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="min-h-[180px]"
              >
                <TerritoryCard
                  territory={territory}
                  cultures={cultures}
                  empire={getEmpireById(territory.controllingEmpire)}
                  isSelected={selectedTerritory?.id === territory.id}
                  onClick={onTerritorySelect}
                />
              </motion.div>
            ))}
          </div>

          {/* Cultural Influence Connections */}
          <svg 
            className="absolute inset-0 pointer-events-none" 
            style={{ width: '100%', height: '100%' }}
          >
            {territories.map((territory, index) => {
              if (!territory.neighbors) return null;
              
              return territory.neighbors.map(neighborId => {
                const neighbor = territories.find(t => t.id === neighborId);
                if (!neighbor) return null;
                
                // Simple connection visualization
                const startCol = index % 3;
                const startRow = Math.floor(index / 3);
                const neighborIndex = territories.findIndex(t => t.id === neighborId);
                const endCol = neighborIndex % 3;
                const endRow = Math.floor(neighborIndex / 3);
                
                const x1 = (startCol * 280) + 140 + 32; // Adjust for grid spacing
                const y1 = (startRow * 200) + 100 + 32;
                const x2 = (endCol * 280) + 140 + 32;
                const y2 = (endRow * 200) + 100 + 32;
                
                return (
                  <line
                    key={`${territory.id}-${neighborId}`}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#CD853F"
                    strokeWidth="2"
                    strokeOpacity="0.3"
                    strokeDasharray="5,5"
                  />
                );
              });
            })}
          </svg>
        </motion.div>
      </div>

      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 z-10 parchment-bg p-3 rounded-lg border border-accent/30 shadow-parchment">
        <h4 className="font-medium text-primary mb-2 text-sm">Empire Legend</h4>
        <div className="space-y-1">
          {empires.slice(0, 4).map(empire => (
            <div key={empire.id} className="flex items-center gap-2 text-xs">
              <div 
                className="w-3 h-3 rounded-full border border-white"
                style={{ backgroundColor: empire.color }}
              />
              <span className="text-primary/80">{empire.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameMap;