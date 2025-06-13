import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import GameHeader from '@/components/organisms/GameHeader';
import GameMap from '@/components/organisms/GameMap';
import CulturePanel from '@/components/molecules/CulturePanel';
import ActionPanel from '@/components/molecules/ActionPanel';
import VictoryModal from '@/components/organisms/VictoryModal';

import { 
  territoryService, 
  cultureService, 
  empireService, 
  gameService 
} from '@/services';

const Game = () => {
  const navigate = useNavigate();
  
  // Game State
  const [territories, setTerritories] = useState([]);
  const [cultures, setCultures] = useState([]);
  const [empires, setEmpires] = useState([]);
  const [gameState, setGameState] = useState(null);
  const [playerEmpire, setPlayerEmpire] = useState(null);
  
  // UI State
  const [selectedTerritory, setSelectedTerritory] = useState(null);
  const [selectedCulture, setSelectedCulture] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [victoryModal, setVictoryModal] = useState({ open: false, data: null });
  const [processingTurn, setProcessingTurn] = useState(false);

  // Load initial game data
  useEffect(() => {
    loadGameData();
  }, []);

  const loadGameData = async () => {
    setLoading(true);
    setError(null);
    
    try {
const [territoriesData, culturesData, empiresData, gameStateData] = await Promise.all([
        territoryService.getAll(),
        cultureService.getAll(),
        empireService.getAll(),
        gameService.getGameState()
      ]);
      
      setTerritories(territoriesData);
      setCultures(culturesData);
      setEmpires(empiresData);
      setGameState(gameStateData);
const player = empiresData.find(e => e.is_player);
      setPlayerEmpire(player);
      
      toast.success('Game loaded successfully');
    } catch (err) {
      setError(err.message || 'Failed to load game data');
      toast.error('Failed to load game');
    } finally {
      setLoading(false);
    }
  };

  const handleTerritorySelect = async (territory) => {
    try {
      await gameService.selectTerritory(territory.id);
      setSelectedTerritory(territory);
    } catch (err) {
      toast.error('Failed to select territory');
    }
  };

  const handleCultureSelect = (culture) => {
    setSelectedCulture(culture);
  };

  const handleAction = async (actionType, territory) => {
    if (!playerEmpire || processingTurn) return;

    setProcessingTurn(true);
    
    try {
      switch (actionType) {
        case 'influence':
          await handleInfluenceAction(territory);
          break;
        case 'develop':
          await handleDevelopAction(territory);
          break;
        case 'assimilate':
          await handleAssimilateAction(territory);
          break;
        case 'innovate':
          await handleInnovateAction(territory);
          break;
        case 'endTurn':
          await handleEndTurn();
          break;
        default:
          throw new Error('Unknown action type');
      }
    } catch (err) {
      toast.error(err.message || 'Action failed');
    } finally {
      setProcessingTurn(false);
    }
  };

  const handleInfluenceAction = async (territory) => {
const cost = 30;
    if (playerEmpire.culture_points < cost) {
      throw new Error('Insufficient culture points');
    }

    // Spend culture points
    const updatedEmpire = await empireService.spendCulturePoints(playerEmpire.Id, cost);
    setPlayerEmpire(updatedEmpire);

// Increase cultural influence
    const updatedTerritory = await territoryService.influenceTerritory(
      territory.Id, 
      'romano', // Assuming player uses Romano culture
      15
    );
    
// Update territories state
    setTerritories(prev => prev.map(t => 
      t.Id === territory.Id ? updatedTerritory : t
    ));

toast.success(`Cultural influence increased in ${territory.Name}`);

  const handleDevelopAction = async (territory) => {
const cost = 50;
    if (playerEmpire.culture_points < cost) {
      throw new Error('Insufficient culture points');
    }

    const updatedEmpire = await empireService.spendCulturePoints(playerEmpire.Id, cost);
    setPlayerEmpire(updatedEmpire);

const updatedTerritory = await territoryService.update(territory.Id, {
      development: Math.min(100, territory.development + 10),
      happiness: Math.min(100, territory.happiness + 5)
    });

setTerritories(prev => prev.map(t => 
      t.Id === territory.Id ? updatedTerritory : t
    ));

toast.success(`Development improved in ${territory.Name}`);

  const handleAssimilateAction = async (territory) => {
const cost = 80;
    if (playerEmpire.culture_points < cost) {
      throw new Error('Insufficient culture points');
    }

    const updatedEmpire = await empireService.spendCulturePoints(playerEmpire.Id, cost);
    setPlayerEmpire(updatedEmpire);

    // Simulate cultural assimilation - reduce minority culture influence
    const updatedCultures = territory.cultures.map(c => {
      if (c.cultureId !== 'romano') {
        return { ...c, influence: Math.max(0, c.influence - 10) };
      }
      return { ...c, influence: Math.min(100, c.influence + 5) };
    });

const updatedTerritory = await territoryService.update(territory.Id, {
      cultures: updatedCultures,
      happiness: Math.max(0, territory.happiness - 10) // Assimilation reduces happiness
    });

setTerritories(prev => prev.map(t => 
      t.Id === territory.Id ? updatedTerritory : t
    ));

toast.success(`Cultural assimilation attempted in ${territory.Name}`);

  const handleInnovateAction = async (territory) => {
const cost = 40;
    if (playerEmpire.culture_points < cost) {
      throw new Error('Insufficient culture points');
    }

    const updatedEmpire = await empireService.spendCulturePoints(playerEmpire.Id, cost);
    setPlayerEmpire(updatedEmpire);

    // Boost innovation in dominant culture
    const dominantCultureId = territory.cultures.reduce((prev, current) => 
      (prev.influence > current.influence) ? prev : current
    ).cultureId;

    await cultureService.innovate(dominantCultureId);
    
    const updatedCultures = await cultureService.getAll();
    setCultures(updatedCultures);

toast.success(`Innovation fostered in ${territory.Name}`);

  const handleEndTurn = async () => {
    const newGameState = await gameService.nextTurn();
    setGameState(newGameState);

// Add culture points for new turn
    const updatedEmpire = await empireService.addCulturePoints(
      playerEmpire.Id, 
      20 + (playerEmpire.territories?.length * 5) || 25
    );
    setPlayerEmpire(updatedEmpire);
    setPlayerEmpire(updatedEmpire);

    // Check victory conditions
    const victoryCheck = await gameService.checkVictoryConditions(
      updatedEmpire, 
      territories, 
      cultures
    );

    if (victoryCheck.victory) {
      setVictoryModal({ 
        open: true, 
        data: { 
          condition: victoryCheck.condition,
          score: victoryCheck.score,
          turns: newGameState.currentTurn
        }
      });
    } else {
      toast.success(`Turn ${newGameState.currentTurn} - Culture points gained!`);
    }
  };

  const handleMenuAction = async (action) => {
    switch (action) {
      case 'save':
        try {
          await gameService.saveGame();
          toast.success('Game saved successfully');
        } catch (err) {
          toast.error('Failed to save game');
        }
        break;
      case 'settings':
        toast.info('Settings panel would open here');
        break;
      case 'menu':
        navigate('/menu');
        break;
      default:
        break;
    }
  };

  const handleVictoryClose = () => {
    setVictoryModal({ open: false, data: null });
  };

  const handleVictoryContinue = () => {
    setVictoryModal({ open: false, data: null });
    toast.info('Continuing beyond victory conditions');
  };

  const handleVictoryNewGame = () => {
    navigate('/menu');
  };

  if (loading) {
    return (
      <div className="h-screen bg-surface-100 bg-parchment flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 bg-accent rounded-lg flex items-center justify-center mx-auto mb-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full" />
            </motion.div>
          </div>
          <h2 className="font-display text-xl font-semibold text-primary mb-2">
            Loading Empire...
          </h2>
          <p className="text-primary/60">Preparing your cultural conquest</p>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen bg-surface-100 bg-parchment flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 bg-semantic-error rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl">⚠</span>
          </div>
          <h2 className="font-display text-xl font-semibold text-primary mb-2">
            Failed to Load Game
          </h2>
          <p className="text-primary/60 mb-4">{error}</p>
          <button
            onClick={loadGameData}
            className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-primary transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <GameHeader
        gameState={gameState}
        playerEmpire={playerEmpire}
        onMenuAction={handleMenuAction}
        loading={processingTurn}
      />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Culture Panel */}
        <aside className="w-80 bg-surface-50 border-r-2 border-accent/30 overflow-y-auto p-4">
<CulturePanel
            cultures={cultures.filter(c => c.empire_id === 'player')}
            selectedCulture={selectedCulture}
            onCultureSelect={handleCultureSelect}
          />
        </aside>

        {/* Main Game Area */}
        <main className="flex-1 flex overflow-hidden">
          {/* Map Container */}
          <div className="flex-1 p-4">
            <GameMap
              territories={territories}
              cultures={cultures}
              empires={empires}
              selectedTerritory={selectedTerritory}
              onTerritorySelect={handleTerritorySelect}
            />
          </div>

          {/* Right Sidebar - Action Panel */}
          <aside className="w-80 bg-surface-50 border-l-2 border-accent/30 overflow-y-auto p-4">
            <ActionPanel
              selectedTerritory={selectedTerritory}
              playerEmpire={playerEmpire}
              cultures={cultures}
              onAction={handleAction}
              disabled={processingTurn}
            />
          </aside>
        </main>
      </div>

      {/* Victory Modal */}
      <VictoryModal
        isOpen={victoryModal.open}
        victoryData={victoryModal.data}
        onClose={handleVictoryClose}
        onContinue={handleVictoryContinue}
        onNewGame={handleVictoryNewGame}
      />
    </div>
  );
};

export default Game;