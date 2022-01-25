export enum colour {
  BLUE = 'Blue',
  RED = 'Red',
  GREEN = 'Green',
  YELLOW = 'Yellow',
  CYAN = 'Cyan',
  PURPLE = 'Purple',
  GREY = 'Grey',
  ORANGE = 'Orange',
}

export enum civilisation {
  BRITONS = 'Britons',
  BYZANTINES = 'Byzantines',
  CELTS = 'Celts',
  CHINESE = 'Chinese',
  FRANKS = 'Franks',
  GOTHS = 'Goths',
  JAPANESE = 'Japanese',
  MONGOLS = 'Mongols',
  PERSIANS = 'Persians',
  SARACENS = 'Saracens',
  TEUTONS = 'Teutons',
  TURKS = 'Turks',
  VIKINGS = 'Vikings',
  AZTECS = 'Aztecs',
  HUNS = 'Huns',
  KOREANS = 'Koreans',
  MAYANS = 'Mayans',
  SPANISH = 'Spanish',
  INCAS = 'Incas',
  INDIANS = 'Indians',
  ITALIANS = 'Italians',
  MAGYARS = 'Magyars',
  SLAVS = 'Slavs',
  BERBERS = 'BERBERS',
  ETHIOPIANS = 'Ethiopians',
  MALIANS = 'Malians',
  PORTUGUESE = 'Portuguese',
  BURMESE = 'Burmese',
  KHMER = 'Khmer',
  MALAY = 'Malay',
  VIETNAMESE = 'Vietnamese',
  BULGARIANS = 'Bulgarians',
  CUMANS = 'Cumans',
  LITHUANIANS = 'Lithuanians',
  TATARS = 'Tatars',
  BURGUNDIANS = 'Burgundians',
  SICILIANS = 'Sicilians',
  BOHEMIANS = 'Bohemians',
  POLES = 'Poles',
}

export interface IPlayer {
  colour: colour;
  name: string;
  nationality: string;
  civ: civilisation;
  ELO: number;
}

export interface ITeam {
  players: IPlayer[];
}

export interface IMatch {
  teams: ITeam[];
  map: string;
}

