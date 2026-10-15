import * as handoff from './20261014_180000_handoff_sections';
import * as migration_20261014_065425_initial_platform from './20261014_065425_initial_platform';

export const migrations = [
  {
    up: migration_20261014_065425_initial_platform.up,
    down: migration_20261014_065425_initial_platform.down,
    name: '20261014_065425_initial_platform'
  },
  {up:handoff.up,down:handoff.down,name:'20261014_180000_handoff_sections'},
];
