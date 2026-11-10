export const CATEGORIES = [
  'Execução e entrada', 'Mira e combate', 'Posicionamento e mapa',
  'Recursos e habilidades', 'Equipe e comunicação'
];

export const INITIAL_DATA = {
  players: [
    { id: 'ana', name: 'Ana', rank: 'Ascendant 1', color: '#ff5364', avatar: 'AN' },
    { id: 'diogo', name: 'Diogo', rank: 'Diamond 3', color: '#57a8ff', avatar: 'DI' },
    { id: 'isa', name: 'Isa', rank: 'Platinum 3', color: '#b58cff', avatar: 'IS' },
    { id: 'jao', name: 'Joãozin', rank: 'Immortal 2', color: '#ffc45c', avatar: 'JZ' }
  ],
  goals: [
    { id: 'g1', name: 'Análise de VOD', description: 'Escolha uma partida para análise completa.', points: 400, kind: 'shared', reward: 'Análise completa de VOD' },
    { id: 'g2', name: 'Energetico', description: 'Recompensa para o primeiro a cruzar o marco.', points: 450, kind: 'exclusive', reward: 'Energético' },
    { id: 'g3', name: 'Açaí', description: 'Recompensa para o primeiro a cruzar o marco.', points: 800, kind: 'exclusive', reward: 'Açaí' },
    { id: 'g4', name: 'Skin', description: 'Recompensa para o primeiro a cruzar o marco.', points: 1000, kind: 'exclusive', reward: 'Skin' }
  ],
  objectives: {
    ana: ['Entrar após o util do time', 'Trocar o duelista sem hesitar', 'Priorizar first bullet', 'Usar flash para espaço', 'Comunicar plano antes do round'],
    diogo: ['Limpar ângulos em sequência', 'Evitar repeek em desvantagem', 'Reposicionar após contato', 'Guardar util para retake', 'Dar informação curta e objetiva'],
    isa: ['Acompanhar o ritmo da entrada', 'Buscar duelos com vantagem', 'Checar flancos no avanço', 'Combinar util com o time', 'Avisar dano e posição'],
    jao: ['Criar espaço para o time', 'Converter vantagem numérica', 'Variar posição após abate', 'Sincronizar util no execute', 'Orientar rotação com antecedência']
  },
  evaluations: [],
  redeemed: []
};

export function loadData() {
  try {
    const saved = localStorage.getItem('valorant-race-v1');
    if (!saved) return INITIAL_DATA;
    const parsed = JSON.parse(saved);
    return { ...INITIAL_DATA, ...parsed, players: (parsed.players || INITIAL_DATA.players).map(player => player.id === 'jao' ? { ...player, name: 'Joãozin', avatar: 'JZ' } : player) };
  } catch { return INITIAL_DATA; }
}
