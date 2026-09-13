export function applyNetAction(game, action, seat) {
  if (!game || !action) return false;
  const k = action.k;
  if (k === 'roll') return !!game.roll();
  if (k === 'end') return !!game.endTurn();
  if (k === 'settlement') return !!game.placeSettlement(action.id, seat);
  if (k === 'city') return !!game.placeCity(action.id, seat);
  if (k === 'road') return !!game.placeRoad(action.id, seat);
  if (k === 'robber') return !!game.moveRobber(action.id, seat);
  if (k === 'steal') return !!game.steal(Number(action.from), seat);
  if (k === 'trade') return !!game.bankTrade(seat, action.give, action.get);
  if (k === 'dev') return !!game.buyDev(seat);
  if (k === 'playDev') return !!game.playDev(action.id);
  if (k === 'discard') return !!game.discard(seat, action.give);
  if (k === 'plenty') return !!game.yearOfPlenty(action.a, action.b, seat);
  if (k === 'mono') return !!game.monopoly(action.r, seat);
  return false;
}

export function actionAllowed(game, action, seat) {
  if (!game || seat == null) return false;
  if (action.k === 'discard') {
    return game.phase === 'discard' && game.discardQueue.some((d) => d.player === seat);
  }
  if (game.phase === 'discard') return false;
  return game.current === seat;
}
