export interface HexState {  
  agent: string;
  feature: string;
  terrain: string;
}

export interface agentState {
  agent: string;
  hex: { rowIndex: number, cellIndex: number }
}
export interface featureState {
  type: string;
  hex: { rowIndex: number, cellIndex: number }
  baseHealth: number;
  currentHealth: number;
  possibleResources: string[];
  harvestable: boolean;
}
export interface playerState {
  hex: { rowIndex: number, cellIndex: number }
}

export type turnState = 'player' | 'machine'