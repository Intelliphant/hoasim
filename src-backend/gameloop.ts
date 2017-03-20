var gameState = {
    grassHeight: 30,
    propertyValue: 100000
};

function GameLoop() {
    gameState.grassHeight++;
    gameState.propertyValue -= gameState.grassHeight / 100;
    return gameState;    
}